import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import emailjs from '@emailjs/browser';

import { environment } from '../../../../environment';

import { ButtonModule } from 'primeng/button';
import { HomeServiceService } from '../../../services/home/home-service.service';

// alerta  https://marcelodolza.github.io/iziToast/
declare const iziToast: any;

@Component({
  selector: 'app-contact',
  standalone: true, // <-- asegúrate de agregar esto si usas Angular standalone
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ButtonModule
  ],
  providers: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private homeS: HomeServiceService) { }
  form = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  validDataFromContact() {
    if (this.homeS.isEmpty(this.form.nombre)) {
      iziToast.info({
        title: 'Info',
        message: 'Nombre y apellidos completos',
        position: 'topRight',
      });
      return;
    }

    if (this.homeS.isEmpty(this.form.correo)) {
      iziToast.info({
        title: 'Info',
        message: 'Correo obligatorio',
        position: 'topRight'
      });
      return;
    }

    // Validar que sea un correo Gmail válido
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(this.form.correo)) {
      iziToast.warning({
        title: 'Warning',
        message: 'Solo se aceptan correos @gmail.com',
        position: 'topRight'
      });
      return;
    }

    if (this.homeS.isEmpty(this.form.asunto)) {
      iziToast.info({
        title: 'Info',
        message: 'Asunto obligatorio',
        position: 'topRight'
      });
      return;
    }

    if (this.homeS.isEmpty(this.form.mensaje)) {
      iziToast.info({
        title: 'Info',
        message: 'Mensaje obligatorio',
        position: 'topRight'
      });
      return;
    }

    // Todo pasó la validación
    this.sendData();
  }

  sendData() {
    const serviceId = environment.serviceId;
    const templateId = environment.templateId;
    const userId = environment.userId;

    // Concatenar el mensaje
    const fullMessage = `Remitente: ${this.form.nombre}\nCorreo: ${this.form.correo}\n\nMensaje: ${this.form.mensaje}`;

    // Actualizar formData con los campos necesarios para la plantilla
    const updatedFormData = {
      to_name: 'Destinatario',  // Cambiar por el nombre del destinatario si es necesario
      from_name: this.form.nombre,  // El nombre del remitente
      message: fullMessage,  // El mensaje concatenado
      user_email: this.form.correo,  // El correo del remitente
    };
    // Enviar el correo con el objeto actualizado
    emailjs
      .send(serviceId, templateId, updatedFormData, userId)
      .then((response) => {
        // Limpiar campos
        this.form = {
          nombre: '',
          correo: '',
          asunto: '',
          mensaje: ''
        };
        iziToast.success({
          title: 'OK',
          message: 'Correo enviado. Uno de nuestros asesores se pondrá en contacto contigo lo antes posible.',
          position: 'topRight'
        });
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar tu mensaje. Inténtalo nuevamente o contacta a inverteccupos.');
      });
  }
}
