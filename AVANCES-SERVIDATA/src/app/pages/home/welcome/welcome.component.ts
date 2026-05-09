import { Component, Inject, PLATFORM_ID, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('heroCanvas') private heroCanvas?: ElementRef<HTMLCanvasElement>;
  private rafId: number | null = null;
  private resizeHandler: (() => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;


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
  carouselInterval = 3000;
  carouselReady = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.currentIndex = 0;
    if (isPlatformBrowser(this.platformId)) {
      // defer activacion carousel para asegurar binding limpio cada mount
      setTimeout(() => { this.carouselReady = true; }, 0);
    } else {
      this.carouselReady = true;
    }
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Doble RAF garantiza canvas montado + layout aplicado antes init
      requestAnimationFrame(() => requestAnimationFrame(() => this.initParticleNetwork()));
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initParticleNetwork() {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    let W = 0, H = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = canvas.width = Math.max(rect.width, 1);
      H = canvas.height = Math.max(rect.height, 1);
    };
    resize();
    this.resizeHandler = resize;
    window.addEventListener('resize', resize, { passive: true });

    // ResizeObserver auto-ajusta cuando carousel monta y altura cambia
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => resize());
      this.resizeObserver.observe(canvas);
    }

    const BLUE_GLOW = 'rgba(34,64,177,';
    const CYAN_GLOW = 'rgba(0,208,255,';

    const N = isMobile ? 30 : 90;
    const pts = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: i < 18 ? 3 + Math.random() * 3 : 1 + Math.random() * 1.5,
      isHub: i < 18,
      phase: Math.random() * Math.PI * 2,
    }));

    const pulses: Array<{ ax: number; ay: number; bx: number; by: number; t: number; speed: number; r: number }> = [];
    let pulseTimer = 0;
    let connections: Array<{ ax: number; ay: number; bx: number; by: number }> = [];

    const spawnPulse = () => {
      if (!connections.length) return;
      const c = connections[Math.floor(Math.random() * connections.length)];
      pulses.push({
        ax: c.ax, ay: c.ay, bx: c.bx, by: c.by,
        t: 0,
        speed: 0.006 + Math.random() * 0.008,
        r: 2 + Math.random() * 3,
      });
    };

    let last = performance.now();
    let elapsed = 0;
    const FRAME_INTERVAL = isMobile ? 67 : 33;

    const tick = (now: number) => {
      this.rafId = requestAnimationFrame(tick);
      if (now - last < FRAME_INTERVAL) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      const alpha = Math.min(elapsed / 1.5, 0.7);

      const CONN = Math.min(W, H) * 0.22;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a1840';
      ctx.fillRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }

      connections = [];
      ctx.save();
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN) {
            const s = (1 - d / CONN) * alpha;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            const bright = (pts[i].isHub || pts[j].isHub) ? s * 0.8 : s * 0.45;
            ctx.strokeStyle = CYAN_GLOW + bright + ')';
            ctx.lineWidth = pts[i].isHub || pts[j].isHub ? 1.2 : 0.7;
            ctx.stroke();
            connections.push({ ax: pts[i].x, ay: pts[i].y, bx: pts[j].x, by: pts[j].y });
          }
        }
      }
      ctx.restore();

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const pulse = 0.6 + 0.4 * Math.sin(elapsed * 1.8 + p.phase);
        const a = (p.isHub ? pulse * 0.95 : 0.65) * alpha;
        const r = p.r;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * (p.isHub ? 6 : 4));
        grad.addColorStop(0, (p.isHub ? CYAN_GLOW : BLUE_GLOW) + a + ')');
        grad.addColorStop(0.3, BLUE_GLOW + (a * 0.4) + ')');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * (p.isHub ? 6 : 4), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.isHub
          ? `rgba(120,220,255,${a})`
          : `rgba(34,64,177,${a})`;
        ctx.fill();
      }

      pulseTimer -= dt;
      if (pulseTimer <= 0 && alpha > 0.5) {
        spawnPulse(); spawnPulse();
        pulseTimer = 0.08 + Math.random() * 0.12;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pu = pulses[i];
        pu.t += pu.speed;
        if (pu.t > 1) { pulses.splice(i, 1); continue; }
        const fade = pu.t < 0.12 ? pu.t / 0.12 : pu.t > 0.85 ? (1 - pu.t) / 0.15 : 1;
        const px = pu.ax + (pu.bx - pu.ax) * pu.t;
        const py = pu.ay + (pu.by - pu.ay) * pu.t;
        const pr = pu.r;

        const pg = ctx.createRadialGradient(px, py, 0, px, py, pr * 5);
        pg.addColorStop(0, `rgba(220,245,255,${fade * alpha})`);
        pg.addColorStop(0.3, `rgba(0,180,230,${fade * alpha * 0.6})`);
        pg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(px, py, pr * 5, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${fade * alpha})`;
        ctx.fill();
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }
}
