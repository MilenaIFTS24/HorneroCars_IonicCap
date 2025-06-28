import { Vehiculo } from "./vehiculo.model";

export interface Reserva {

    reservaId: string;
    userNombre: string;
    vehiculo: Vehiculo;    
    fechaInicio: string;
    fechaDevolucion: string;
    dias: number;
    costoVehiculo: number;
    costoTotal: number;
    seguro: string;
    estado: 'Confirmado' | 'Pendiente De Pago' | 'En Curso' | 'Finalizada' | 'Cancelada'; 

}