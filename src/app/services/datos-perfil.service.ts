import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class DatosPerfilService {

  private readonly STORAGE_KEY = 'datosPerfilUsuario';

  constructor() { }

  guardarDatos(datos: any): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(datos));
      console.log('Datos de perfil guardados en localStorage:', datos);
    } catch (error) {
      console.error('Error al guardar datos en localStorage:', error);
    }
  }

  obtenerDatos(): any {
    try {
      const datosGuardados = localStorage.getItem(this.STORAGE_KEY);
      if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        console.log('Datos de perfil obtenidos de localStorage:', datos);
        return datos;
      }
    } catch (error) {
      console.error('Error al obtener datos de localStorage:', error);
    }
    return null;
  }
}


