import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// Inserta dinámicamente la meta CSP según el entorno
// const cspMeta = document.createElement('meta');
// cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');

// const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

// const localCSP = "default-src 'self' data: blob:; img-src * data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src *";
// const prodCSP = "default-src 'self'; img-src https://inverteccupos.co data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'";

// cspMeta.content = isLocalhost ? localCSP : prodCSP;
// document.head.appendChild(cspMeta);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
