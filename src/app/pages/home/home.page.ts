import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { IonNav } from '@ionic/angular/standalone'; //para poder navegar hacia home 


import {PerfilPage} from 'src/app/pages/perfil/perfil.page'



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,IonNav]
})
export class HomePage implements OnInit {
  component = PerfilPage; //para poder navegar hacia home 


  constructor() { }

  ngOnInit() {
  }

}

