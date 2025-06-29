import { Vehiculo } from "./vehiculo.model";

export interface Reserva {

    reservaId: string;
    userNombre: string;
    vehiculo: 'Sedan Confort' | 'Económico' | 'SUV' | 'Utilitario' | 'Lujo';    
    fechaInicio: Date;
    fechaDevolucion: Date;    
    estado: string; 

}