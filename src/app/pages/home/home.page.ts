import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UrlSeguraPipe } from 'src/app/pipes/url-segura.pipe';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [UrlSeguraPipe, IonicModule, CommonModule, FormsModule]
})
export class HomePage{

  nombreSucursalCercana: string | null = null;
  urlGoogleMaps: string | null = null;
  errorUbicacionMensaje: string = ''; //error para mostrar en la plantilla y los console.log

  constructor(private _servicioGeolocation: GeolocationService) { }
  
  private async procesoGeolocalizacion(): Promise<void> {
    this.limpiarMensajes(); // reseteo las variables

    try {
      console.log('Proceso de geolocalización iniciado.');

      // cargo las sucursales
      await this.cargarSucursales();

      // obtengo la posicion del usuario
      await this.obtenerPosicion();

      // 3. busco y obtengo la sucursal mas cercana al usuario
      if (!this.errorUbicacionMensaje) {
        this.buscarSucursalMasCercana();
      }

    } catch (error) { 
      //error si falla algun paso
      console.error('Error en el proceso de geolocalización:', error);
      this.errorUbicacionMensaje = 'Ocurrió un error inesperado. Vuelva a intentarlo.';
    }
  }

  //métodos llamados del servicio de geolocalizacion con mensajes de consola en cada uno

  private async cargarSucursales(): Promise<void> {
    console.log('Ejecutando carga de sucursales...');
    await this._servicioGeolocation.cargarSucursales();
    // si se produjo un error en el servicio al obtener las sucursales, se muestra un mensaje en consola para ese error
    if (this._servicioGeolocation.errorMensaje) {
      this.errorUbicacionMensaje = this._servicioGeolocation.errorMensaje;
      console.error('Error al cargar sucursales:', this.errorUbicacionMensaje);
    } else {
      console.log('Sucursales cargadas correctamente.');
    }
  }

  private async obtenerPosicion(): Promise<void> {
    console.log('Ejecutando obtención de posición actual...');
    await this._servicioGeolocation.obtenerPosicionActual();
    //si se produjo un error en el servicio al obtener la ubicacion, se muestra un mensaje en consola para ese error
    if (this._servicioGeolocation.errorMensaje) {
      this.errorUbicacionMensaje = this._servicioGeolocation.errorMensaje;
      console.error('Error al obtener posición:', this.errorUbicacionMensaje);
    } else {
      console.log('Posición del usuario obtenida correctamente.');
    }
  }

  private buscarSucursalMasCercana(): void {
    console.log('Ejecutando búsqueda de sucursal más cercana...');
    const sucursalCercana = this._servicioGeolocation.getSucursalMasCercana();

    //si se encuentra una sucursal, se trae el nombre y la url de google maps
    if (sucursalCercana) {
      this.nombreSucursalCercana = sucursalCercana.nombre;
      this.urlGoogleMaps = this._servicioGeolocation.googleMapsUrl;
      console.log(`Sucursal más cercana: ${this.nombreSucursalCercana}`);
      console.log(`URL Google Maps: ${this.urlGoogleMaps}`);
    } else {
      //error si no se encuentra la sucursal cercana
      this.errorUbicacionMensaje = this._servicioGeolocation.errorMensaje || 'No se pudo encontrar una sucursal cercana.';
      console.warn('No se encontró una sucursal cercana válida.');
    }
  }

  // limpio las variables
  private limpiarMensajes(): void {
    this.errorUbicacionMensaje = '';
    this.nombreSucursalCercana = null;
    this.urlGoogleMaps = null;
  }

  // método para reintentar el proceso de geolocalizacion
  async reintentarProceso(): Promise<void> {
    console.log('Reintentando proceso de geolocalización...');
    await this.procesoGeolocalizacion();
  }

}
