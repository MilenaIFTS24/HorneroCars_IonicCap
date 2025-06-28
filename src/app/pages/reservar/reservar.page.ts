import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validator } from '@angular/forms';


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ReservarPage {

  formReserva: FormGroup; //Defino el form
  fechaActual: string = new Date().toISOString(); //fecha actual con el formato que necesita el control ion-datetime
  

  //Inyecto el form builder y luego instancio el formulario de reserva
  constructor(private _formBuilder: FormBuilder) {
    this.formReserva = this._formBuilder.group({
      reservaId: [Date.now().toString],//le ponemos fecha y hora actual como id unico, en formato string
      userNombre: ['', [Validators.required, Validators.minLength(3)]],
      vehiculo: ['', [Validators.required]],
      fechaInicio: [this.fechaActual, [Validators.required]],
      fechaDevolucion: [this.fechaActual, [Validators.required]],
      estado: ['Pendiente De Pago'],//inicia como pendiente de pago      
    });
  }


  submitForm() {
    if (this.formReserva.invalid) {
      this.formReserva.markAllAsTouched();//si alguna parte es invalida, marca todas las casillas y muestra los errores
    } else {
      this.formReserva.reset();
    }
    
  }

  //método para comprobar errores en los controles del form segun el validator y si la casilla ha sido tocada.
  hayErrores(controlName: string, validator: string) {
    const control = this.formReserva.get(controlName);
    const hayErrores = this.formReserva.get(controlName)?.hasError(validator) && this.formReserva.get(controlName)?.touched;
    
    return hayErrores;
  }
}
