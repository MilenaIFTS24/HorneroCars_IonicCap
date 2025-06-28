import { inject, Injectable } from '@angular/core';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private usuarioActual: User | null = null;  

  constructor(private _auth: Auth, private _router: Router) { 
    
  }





  /*async usuarioLogueado(): Promise<boolean> {
    
  }*/
}
