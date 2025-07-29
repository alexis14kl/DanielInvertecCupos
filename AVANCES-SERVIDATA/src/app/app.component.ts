import { Component, HostListener, Inject, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { InstallPwaButtonComponent } from './shared/install-pwa-button/install-pwa-button.component';
@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, InstallPwaButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = ' INVERTECCUPOS';
  private viewportScroller = inject(ViewportScroller);

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Establecer el desplazamiento del scroll aquí
      this.viewportScroller.setOffset([0, 70]); // Ajusta el valor según tus necesidades
    });
  }
}
