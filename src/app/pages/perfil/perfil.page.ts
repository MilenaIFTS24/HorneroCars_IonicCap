import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { RouterLink } from '@angular/router'; //para que funcione la llamada en el html


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule,ReactiveFormsModule]
})
export class PerfilPage implements OnInit {

  nombreArchivo: string = 'Ningún archivo seleccionado'; // Le dejo un nombre por default porque yafu
  fotoBase64: string | undefined;
  formPerfil!: FormGroup;
  segmentoActual: string = 'mis-datos';   // Variable para controlar el segmento activo, por defecto 'mis-datos'


  constructor(private cameraService: CameraService) {

    //Validators para el formgroup (formPerfil)
    this.formPerfil = new FormGroup({
      nombre: new FormControl('', Validators.required,),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('',Validators.required),
      fechaNacimiento: new FormControl('',Validators.required),
    });
  }

  async ngOnInit() {
    // Cargar la foto guardada solo si el segmento es 'documentacion-fotografica' al inicio
    if (this.segmentoActual === 'documentacion-fotografica') {
      await this.cargarFotoGuardada();
    }
  }

  // Metodo para cambiar el segmento
  cambiarSegmento(event: any) {
    this.segmentoActual = event.detail.value;
    // Si el segmento cambia a 'documentacion-fotografica', carga la foto
    if (this.segmentoActual === 'documentacion-fotografica' && !this.fotoBase64) {
      this.cargarFotoGuardada();
    }
  }

  // Funcion para sacar foto con la camara
  async sacarFoto() {
    this.fotoBase64 = await this.cameraService.sacarFoto();

    if (this.fotoBase64) {
      this.nombreArchivo = 'Foto Capturada';
      await this.cameraService.guardarFoto(this.fotoBase64);
    } else {
      this.nombreArchivo = 'Ningún archivo seleccionado';
    }
  }

  // Carga la foto guardada desde el servicio
  async cargarFotoGuardada() {
    this.fotoBase64 = await this.cameraService.cargarFoto();
    if (this.fotoBase64) {
      this.nombreArchivo = 'Foto Guardada';
    }
  }

  // Elimina la foto guardada
  async eliminarFoto() {
    await this.cameraService.eliminarFoto();
    this.fotoBase64 = undefined;
    this.nombreArchivo = 'Ningún archivo seleccionado';
  }
}
