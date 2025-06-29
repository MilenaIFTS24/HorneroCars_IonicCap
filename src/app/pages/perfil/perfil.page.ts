import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonNavLink } from '@ionic/angular/standalone';



import { HomePage } from 'src/app/pages/home/home.page'  //para poder navegar hacia home 


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonNavLink]
})
export class PerfilPage {

  nombreArchivo: string = 'Ningún archivo seleccionado';

  actualizarNombreArchivo(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.nombreArchivo = file.name;
    } else {
      this.nombreArchivo = 'Ningún archivo seleccionado';
    }

  }
}
