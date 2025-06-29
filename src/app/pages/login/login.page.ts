import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule, Validator, Validators } from '@angular/forms';
import {IonicModule} from '@ionic/angular'
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { eye, eyeOff } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]
})
export class LoginPage {

  private fb=inject(FormBuilder)
  private auth=inject(LoginAuthService)

  iniciarSesionForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(4)]],
  })

  contraseniaVisible = false;

  mostrarContrasenia(){
    this.contraseniaVisible = !this.contraseniaVisible
  }

  async enviarForm(){
    if(this.iniciarSesionForm.valid){
      const {email, contraseña} = this.iniciarSesionForm.value
      try{
        await this.auth.iniciarSesion(email!, contraseña!)
      } catch(error){
        alert('que macana che, hay algun error')
      }
    }
    else{
      this.iniciarSesionForm.markAllAsTouched();
      alert('formulario invalido')
    }
  }

  async registrarse(){
    if(this.iniciarSesionForm.valid){
      const {email, contraseña} = this.iniciarSesionForm.value
      try {
        await this.auth.registrarse(email!, contraseña!)
      } catch (error) {
        alert('No logo registrarse, verifique sus datos')
      }
    }
  }
 constructor() {
  addIcons({ eye, eyeOff });
}

}
