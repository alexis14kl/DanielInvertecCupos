import { Component, ViewChild, signal, computed } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstallPwaButtonComponent } from '../install-pwa-button/install-pwa-button.component';

import {
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective
} from '@coreui/angular';

@Component({
  selector: 'app-header',
  imports: [DrawerModule, ButtonModule, RouterModule, CommonModule,
    DropdownComponent,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective, InstallPwaButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  visible: boolean = false;

  @ViewChild('drawer') drawer: any;

  // Promo rotativa top utility bar
  private static readonly MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  protected readonly currentMonth = computed(() => HeaderComponent.MONTHS_ES[new Date().getMonth()]);
  protected readonly promos = computed(() => [
    `🎉 Promociones de ${this.currentMonth()}`,
    `Cambia tu cupo <strong class="promo-accent">Sistecredito</strong> por <strong>efectivo</strong> al instante`,
    `Convierte tu cupo <strong class="promo-accent">Addi</strong> en <strong>efectivo</strong> rapido y seguro`,
    `Consultas <strong class="promo-accent">DataCredito</strong> y <strong>CIFIN</strong> en linea`,
    `Avances con <strong class="promo-accent">Su+ Pay</strong> y <strong>Vanti</strong> 100% seguro`,
    `<strong class="promo-accent">Ya estamos en linea!</strong> Atencion inmediata por WhatsApp`,
  ]);
  protected currentPromoIndex = signal(0);
  protected promoVisible = signal(true);
  private promoIntervalId: any = null;

  // scrollToSection(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //     this.visible = false; // cierra el drawer
  //   }
  // }


  private fragmentSubscription: Subscription | undefined;

  constructor(private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) { }
  isStandalone = false;


  deferredPrompt: any = null;
  showInstallButton: boolean = false;


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as any).standalone === true;

      const storedPrompt = localStorage.getItem('canPromptPWA');

      if (storedPrompt === 'true') {
        this.showInstallButton = true;
      }

      window.addEventListener('beforeinstallprompt', (event: Event) => {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallButton = true;
        localStorage.setItem('canPromptPWA', 'true');
      });

      this.startPromoRotation();
    }

    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  ngOnDestroy() {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
    if (this.promoIntervalId !== null) {
      clearInterval(this.promoIntervalId);
    }
  }

  private startPromoRotation() {
    const total = this.promos().length;
    this.promoIntervalId = setInterval(() => {
      this.promoVisible.set(false);
      setTimeout(() => {
        this.currentPromoIndex.update(i => (i + 1) % total);
        this.promoVisible.set(true);
      }, 600);
    }, 5000);
  }

  private scrollToSection(fragment: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(fragment);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
      }
    }
  }

}
