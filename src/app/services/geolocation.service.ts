import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { Sucursal } from '../models/sucursal.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  rutaSucursales = 'assets/data/sucursales.json'//ruta al json con las sucursales para traer latitud y longitud.
  sucursales: Sucursal[] = [];
  lat?: number;
  long?: number;
  errorMensaje?: string;

  constructor(private _httpClient: HttpClient) { } //llamo al httpClient para hacer solicitudes al json

  private async otorgaPermisoDeUbicacion(): Promise<boolean> {
    const permisos = await Geolocation.checkPermissions();

    //Si está concedido devuelve true
    if (permisos.location === 'granted') return true;

    //Si no, pide permiso al usuario
    const solicitud: PermissionStatus = await Geolocation.requestPermissions();

    return solicitud.location === 'granted';
  }

  async obtenerPosicionActual() {
    try {
      const otorgaPermiso = await this.otorgaPermisoDeUbicacion();

      //si el usuario no otorga el permiso
      if (!otorgaPermiso) {
        this.errorMensaje = 'Permiso de ubicacion denegado';
        this.lat = undefined;
        this.long = undefined;
        return;
      }
      //si otorga permiso, se obtiene la ubicacion y se asigna a las variables
      const ubicacion = await Geolocation.getCurrentPosition();
      this.lat = ubicacion.coords.latitude;
      this.long = ubicacion.coords.longitude;

      this.errorMensaje = undefined; //borramos el error
    } catch (err) {//en caso de error, se lo asigno a la variable
      this.errorMensaje = "Error obteniendo ubicacion: " + (err as any).message
    }
  }

  //carga y comparacion con las sucursales

  //cargo las sucursales
  async cargarSucursales(): Promise<void> {
    if (this.sucursales.length > 0) {
      console.log('Sucursales ya cargadas. Evitando recarga.');
      return;
    }
    try {
      // lastValueFrom convierte un observable en una promise
      this.sucursales = await lastValueFrom(
        this._httpClient.get<Sucursal[]>(this.rutaSucursales)
      );
      console.log('Sucursales cargadas exitosamente:', this.sucursales);
    } catch (error) {
      console.error('Error al cargar las sucursales:', error);
      this.errorMensaje = 'Error al cargar las sucursales.';
    }
  }

  //uso la diferencia de los cuadrados(a² - b² = (a + b)(a - b)) para calcular la distancia entre el usuario y las sucursales
  private calcularDistanciaSucursalUsuario(lat1: number, long1: number, lat2: number, long2: number): number {
    const distanciaLat = lat2 - lat1;
    const distanciaLong = long2 - long1;
    
    return (distanciaLat * distanciaLat) + (distanciaLong * distanciaLong);
  }

  //encuentro la sucursal mas cercana al usuario con if anidados
  getSucursalMasCercana(): Sucursal | null {
    //error si no se pudo obtener la ubicacion del usuario
    if (this.lat === undefined || this.long === undefined) {
      this.errorMensaje = 'No se pudo obtener la ubicación actual del usuario.';
      return null;
    }
    //error si las sucursales no se pudieron cargar previamente
    if (this.sucursales.length === 0) {
      this.errorMensaje = 'No hay sucursales cargadas para comparar. Asegúrate de llamar a cargarSucursales().';
      return null;
    }

    let sucursalMasCercana: Sucursal | null = null;
    //para la primer sucursal, valor de referencia por si es la sucursal mas cercana
    //cualquier distancia va a ser menor a infinito
    let distanciaMinima = Infinity; 

    // uso la funcion definida antes para cada sucursal
    for (const sucursal of this.sucursales) {      
      const distancia = this.calcularDistanciaSucursalUsuario(
        this.lat,
        this.long,
        sucursal.coordenadas.lat,
        sucursal.coordenadas.lng
      );
      //comparo la primer sucursal con infinito, y se reemplaza el resultado
      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        sucursalMasCercana = sucursal;
      }
    }
    
    //si el valor encuentra una sucursal válida
    if (sucursalMasCercana) {
        // distancia como valor de comparacion, no km reales, con 4 decimales
        console.log(`La sucursal más cercana es: ${sucursalMasCercana.nombre} (distancia comparativa: ${distanciaMinima.toFixed(4)})`);
    } else {
        this.errorMensaje = 'No se encontró ninguna sucursal cercana válida.';
    }
    return sucursalMasCercana;
  }

  //genero la url para la sucursal mas cercana al usuario
  get googleMapsUrl(): string | null {
    const sucursal = this.getSucursalMasCercana();

    //si se encontró la sucursal mas cercana, obtengo las coordenadas
    //sino devuelve null
    if (sucursal) {
      this.lat = sucursal.coordenadas.lat;
      this.long = sucursal.coordenadas.lng;
      
      return this.lat !== undefined && this.long !== undefined ? `https://www.google.com/maps?q=$${this.lat},${this.long}&hl=es&z=15&output=embed` : null;
    }
    return null;
  }
}
  



