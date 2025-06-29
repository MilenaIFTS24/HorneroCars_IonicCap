import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validator } from '@angular/forms';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';
import { Reserva } from 'src/app/models/reserva.model';
import { ReservarService } from 'src/app/services/reservar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ReservarPage {

  formReserva: FormGroup; //Defino el form
  reservaNueva?: Reserva;

  //Inyecto el form builder y luego instancio el formulario de reserva
  constructor(private _formBuilder: FormBuilder, private _reservarService: ReservarService, private _router: Router) {
    this.formReserva = this._formBuilder.group({
      userNombre: ['', [Validators.required, Validators.minLength(3)]],
      vehiculo: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaDevolucion: ['', [Validators.required]],     
    });
    //agrego el ícono de IonicIcons
    addIcons({
      calendarOutline,
    })
  }

  submitForm() {
    if (this.formReserva.invalid) {
      this.formReserva.markAllAsTouched();//si alguna parte es invalida, marca todas las casillas y muestra los errores
    } else {   
      this.guardarReserva();
      console.log(this.formReserva.value);

      this.formReserva.reset();
      alert('Reserva completada con éxito.')
    }    
  }

  //método para comprobar errores en los controles del form segun el validator y si la casilla ha sido tocada.
  //ya no es necesario, la propiedad errorText de ionic cumple la misma funcion
  hayErrores(controlName: string, validator: string) {
    const control = this.formReserva.get(controlName);
    const hayErrores = this.formReserva.get(controlName)?.hasError(validator) && this.formReserva.get(controlName)?.touched;
    
    return hayErrores;
  }
 
  //llamo al servicio para guardar la reserva
  async guardarReserva(){
    if (this.formReserva.invalid) {
      return;
    }
    //obtengo los datos del formulario y se los paso al metodo agregarReserva del servicio
    const reservaId = new Date().toLocaleDateString();
    const userNombre = this.formReserva.get('userNombre')?.value;
    const vehiculo = this.formReserva.get('vehiculo')?.value;
    const fechaInicio = this.formReserva.get('fechaInicio')?.value;
    const fechaDevolucion = this.formReserva.get('fechaDevolucion')?.value;
    const estado = 'Pendiente de Pago';
    await this._reservarService.agregarReserva({
      reservaId: reservaId,
      userNombre: userNombre,
      vehiculo: vehiculo,
      fechaInicio: fechaInicio,
      fechaDevolucion: fechaDevolucion,
      estado: estado,
    });
    console.log('Reserva guardada en el almacenamiento de la app')
  }

  volverAHome() {
    this._router.navigate(['/home'])
  }

  irAMisReservas() {
    if(this.formReserva.invalid){
      return;
    }
    this._router.navigate(['/mis-reservas'])
  }

}
