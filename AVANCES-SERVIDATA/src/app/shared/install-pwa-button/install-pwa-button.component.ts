import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-install-pwa-button',
  standalone: true,
  templateUrl: './install-pwa-button.component.html',
  styleUrl: './install-pwa-button.component.css'
})
export class InstallPwaButtonComponent {
  @Input() deferredPrompt: any;

  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();

      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario rechazó la instalación');
        }
      });
    }
  }
}
