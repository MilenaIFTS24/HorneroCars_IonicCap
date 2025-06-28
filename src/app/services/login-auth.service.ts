import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private usuarioActual: User | null = null;  

  constructor(private autorizacion: Auth, private router: Router) { 
    onAuthStateChanged(this.autorizacion, (usuario) => this.usuarioActual = usuario)
    
  }

async registrarse(email: string, contraseña: string){
  const cred = await createUserWithEmailAndPassword(this.autorizacion, email, contraseña);
  await sendEmailVerification(cred.user);
  await signOut(this.autorizacion);
  alert("verificaaa tu correo");
}

async iniciarSesion(emial:string, contraseña:string){
  const cred = await signInWithEmailAndPassword(this.autorizacion, emial, contraseña);
  if(!cred.user.emailVerified){
    await signOut(this.autorizacion)
    throw new Error("correo no aprobado");
  }
  this.router.navigate(['/home'])
}

async cerrarSesion(){
  await signOut(this.autorizacion);
  this.router.navigate(['/login'])

}

usuarioLogueado(): boolean {
    return !!this.usuarioActual && this.usuarioActual.emailVerified
  }
}




