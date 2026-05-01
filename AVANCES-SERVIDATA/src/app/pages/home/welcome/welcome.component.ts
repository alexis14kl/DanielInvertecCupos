import { Component} from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

import { AnimateOnScroll } from 'primeng/animateonscroll';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


// CarouselComponent
import { RouterLink } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from '@coreui/angular';

interface FinancialService {
  title: string;
  description: string;
  image: string;
  whatsappLink: string; // Añade esta línea
}

@Component({
  selector: 'app-welcome',
  imports: [HeaderComponent, FooterComponent, AnimateOnScrollModule,
    GalleriaModule,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterLink,
    AnimateOnScroll
  ],
  styles: [
    `
            :host {
                @keyframes slidedown-icon {
                    0% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(20px);
                    }

                    100% {
                        transform: translateY(0);
                    }
                }

                .slidedown-icon {
                    animation: slidedown-icon;
                    animation-duration: 3s;
                    animation-iteration-count: infinite;
                }

                .box {
                    background-image: radial-gradient(var(--primary-300), var(--primary-600));
                    border-radius: 50% !important;
                    color: var(--primary-color-text);
                }
            }
        `

  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  // cards services
  services = [
    {
      title: 'Consultas en DataCrédito',
      description: 'Conoce tu historial crediticio con reportes claros y confiables.',
      image: 'assets/images/home/services/Service01.jpeg'
    },
    {
      title: 'Consulta rapida y segura',
      description: 'Solicita su consulta a datacredito y cifin en forma segura y rapida.',
      image: 'assets/images/home/services/Service02.jpeg'
    },
    {
      title: 'Siempre disponibles',
      description: 'Atención continua para ayudarte cuando lo necesites, cupos en efectivo addi y sistecredito.',
      image: 'assets/images/home/services/Service03.jpeg'
    },
    {
      title: 'Transacciones Nequi/Daviplata',
      description: 'Recibe tu dinero directamente a Nequi o Bancolombia, daviplata o davivienda transferencias 100% seguras.',
      image: 'assets/images/home/services/Service04.JPEG'
    },
    {
      title: 'Sistecrédito a efectivo',
      description: 'Convierte tu cupo disponible de Sistecrédito en dinero, forma rapida y segura.',
      image: 'assets/images/home/services/Service05.jpeg'
    },
    {
      title: 'Addi a efectivo',
      description: 'Transforma tu cupo disponible y preaprobado de Addi en efectivo de forma rápida y segura.',
      image: 'assets/images/home/services/Service06.jpeg'
    },
    {
      title: 'Tecnología',
      description: 'Compra celulares, TVS y tecnologia con Addi o Sistecrédito con su cupo disponible.',
      image: 'assets/images/home/services/Service07.jpeg'
    },
    {
      title: 'Tecnología',
      description: 'Compra celulares, TVS y tecnologia con Addi o Sistecrédito con su cupo disponible.',
      image: 'assets/images/home/services/Service08.jpeg'
    }
    ,
    {
      title: 'Tecnología',
      description: 'Compra celulares, TVS y tecnologia con Addi o Sistecrédito con su cupo disponible.',
      image: 'assets/images/home/services/Service09.jpeg'
    }
  ];
  
 
  // Carousel usando Angular ui
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });  
  currentIndex = 0;
  interval: any;

  ngOnInit() {
    this.slides[0] = {
      id: 0,
      src: 'assets/images/home/AVANCES-SERVIDATA-img00.jpeg',
      title: 'Crédito rápido y efectivo',
      subtitle: 'Con INVERTECCUPOS accede de forma ágil y segura al financiamiento que necesitas, gracias a nuestras alianzas con addi, sistecrédito, vanti y su+ pay.'
    };

    this.slides[1] = {
      id: 1,
      src: 'assets/images/home/logoApp-1.png',
      title: 'Crédito rápido y efectivo',
      subtitle: 'Con INVERTECCUPOS accede de forma ágil y segura al financiamiento que necesitas, gracias a nuestras alianzas con addi, sistecrédito, vanti y su+ pay.'
    };
    
    this.slides[2] = {
      id: 2,
      src: 'assets/images/home/AVANCES-SERVIDATA-img01.jpeg',
      title: 'Crédito rápido y efectivo',
      subtitle: 'En INVERTECCUPOS transformamos el sector financiero, facilitando el acceso al crédito y financiamiento con nuestras plataformas aliadas addi, sistecredito, vanti y su+ pay.'
    };

    this.slides[3] = {
      id: 3,
      src: 'assets/images/home/AVANCES-SERVIDATA-img02.jpeg',
      title: 'cambia tus cupos de sistecredito y addi al instante',
      subtitle: 'cupos en efectivo con tasas preferenciales las mejores tasas del mercado 💯 seguro'
    };
    this.slides[4] = {
      id: 4,
      src: 'assets/images/home/AVANCES-SERVIDATA-img03.jpeg',
      title: '¿Quieres ser nuestro aliado comercial?',
      subtitle: 'Únete a cientos de comercios que ya disfrutan de nuestros servicios financieros rápidos y seguros con nuestras plataformas financieras addi, sistecredito, vanti y su+ pay.'
    };

    this.slides[5] = {
      id: 5,
      src: 'assets/images/home/AVANCES-SERVIDATA-img04.jpeg',
      title: 'Solicita tu cupo en efectivo',
      subtitle: 'Accede a tu cupo en efectivo de manera fácil y rápida, sin papeleos ni complicaciones. ¡Disfruta de la libertad financiera que mereces hoy mismo con nuestras plataformas financieras addi, sistecredito, vanti y su+ pay.'
    };

    this.slides[6] = {
      id: 6,
      src: 'assets/images/home/AVANCES-SERVIDATA-img05.jpeg',
      title: 'AVANCES RAPIDOS Y EFECTIVOS',
      subtitle: 'Obtén tu cupo en efectivo de manera ágil, segura y sin trámites largos. Nosotros te facilitamos el acceso al dinero que necesitas para tus proyectos y necesidades con nuestras plataformas financieras addi, sistecredito, vanti y su+ pay.'
    };

    this.slides[7] = {
      id: 7,
      src: 'assets/images/home/AVANCES-SERVIDATA-img06.jpeg',
      title: '¡Haz efectivo tu cupo al instante!',
      subtitle: 'En INVERTECCUPOS hacemos efectivo tu cupo disponible addi, sistecredito, vanti y su+ pay, Consultas a datacredito y cifin. 💯 seguro'
    };

    this.slides[8] = {
      id: 8,
      src: 'assets/images/home/AVANCES-SERVIDATA-img07.jpeg',
      title: 'Consulta tu puntaje en DataCrédito y CIFIN',
      subtitle: 'Obtén tu historial crediticio completo y actualizado en formato PDF. Consulta rápida, confidencial y sin complicaciones. Ideal para trámites financieros, créditos y más. 💯 Seguro y confiable, línea económica y experian.'
    };

    this.slides[9] = {
      id: 9,
      src: 'assets/images/home/AVANCES-SERVIDATA-img08.jpeg',
      title: 'Solicita tu cupo en ADDI: https://co.addi.com/',
      subtitle: 'Nosotros te entregamos el dinero en efectivo o por transferencia.'
    };
    
    this.slides[10] = {
      id: 10,
      src: 'assets/images/home/AVANCES-SERVIDATA-img09.jpeg',
      title: 'Solicita tu cupo en SISTECREDITO: https://www.sistecredito.com/',
      subtitle: 'Te entregamos el dinero en efectivo o transferencia directa.'
    };
    
    this.slides[11] = {
      id: 11,
      src: 'assets/images/home/AVANCES-SERVIDATA-img10.jpeg',
      title: 'Aliados estratégicos',
      subtitle: 'Conviértete en beneficiario de ADDI, Sistecrédito, vanti y su+ pay con cupos convertidos a efectivo.'
    };

    this.slides[12] = {
      id: 12,
      src: 'assets/images/home/AVANCES-SERVIDATA-img11.jpeg',
      title: 'Aliados estratégicos',
      subtitle: 'Conviértete en beneficiario de ADDI, Sistecrédito, vanti y su+ pay con cupos convertidos a efectivo.'
    };
    
    
  }
}
