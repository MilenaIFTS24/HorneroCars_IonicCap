import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonNavLink } from '@ionic/angular/standalone';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // imports para abrir la camara

import { HomePage } from 'src/app/pages/home/home.page'  //para poder navegar hacia home, queda pendiente


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonNavLink]
})
export class PerfilPage {

  nombreArchivo: string = 'Ningún archivo seleccionado';
  fotoBase64: string | undefined; // aca almacenamos la foto base64


 constructor() {} 

  // Funcion para sacar foto con la camara
  async sacarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, 
        source: CameraSource.Camera, 
      });

      if (image.base64String) {
        this.nombreArchivo = 'Foto Capturada'; //cambia label si se subio img
        this.fotoBase64 = image.base64String;

      } else {
        this.nombreArchivo = 'Ningún archivo seleccionado';
        this.fotoBase64 = undefined;
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      this.nombreArchivo = 'Ningún archivo seleccionado';
      this.fotoBase64 = undefined;
    }
  }


}
