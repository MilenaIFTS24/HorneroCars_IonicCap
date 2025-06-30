import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, EmailValidator} from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { RouterLink } from '@angular/router'; //para que funcione la llamada en el html
import { DatosPerfilService } from 'src/app/services/datos-perfil.service'; // Importa el servicio datos-perfil




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


  constructor(private cameraService: CameraService,
          private datosPerfilService: DatosPerfilService) {  // Inyecta servicios
    
    //Validators para el formgroup (formPerfil)
    this.formPerfil = new FormGroup({
      nombre: new FormControl('', Validators.required,),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required,),
      telefono: new FormControl('',Validators.required),
      fechaNacimiento: new FormControl('',Validators.required),
    });
    this.cargarDatosGuardados();  //carga los datos guardados en el formulario
  }

  //funciones sobre el form 
  guardarCambios() {
    if (this.formPerfil.valid) {
      this.datosPerfilService.guardarDatos(this.formPerfil.value); // Usa el servicio para guardar los datos
    } else {
      console.log('Formulario inválido, no se pueden guardar los cambios.');
      this.formPerfil.markAllAsTouched();
    }
  }

  cargarDatosGuardados() {
    const datos = this.datosPerfilService.obtenerDatos(); // Usa el servicio para cargar los datos
    if (datos) {
      this.formPerfil.patchValue(datos);
    }
  }

  cancelarCambios() {  
    this.cargarDatosGuardados();   // Se cancelan los cambios
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



