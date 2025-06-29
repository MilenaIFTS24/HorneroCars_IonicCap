import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ReservarService {

  reservas: Reserva[] = []; //array para guardar las reservas
  storageKey: string = 'reservas';//para guardar las reservas en el almacenamiento local de la app

  constructor() { 
    this.cargarReservas();
  }

  async cargarReservas() {
    const respuesta = await Preferences.get({key: this.storageKey});//traigo los datos del almacenamiento de la app
    this.reservas = respuesta.value ? JSON.parse(respuesta.value) : []; //si trae algo, lo parsea al formato original, sinó pasa un array vacío
  }

  //si no hay elementos en el array, invoca el método para traerlos del almacenamiento. luego lo devuelve
  async obtenerReservas():Promise<Reserva[]> {
    if (this.reservas.length === 0) {
      await this.cargarReservas();
    }

    return this.reservas;
  }

  //guardo en el array una nueva reserva y luego guardo el array en el almacenamiento
  async agregarReserva(reserva: Reserva) {    
    this.reservas.push(reserva);

    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(this.reservas)
    });
  }
}
