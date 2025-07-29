import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent as  FooterComponentAngularUI } from '@coreui/angular';

@Component({
  selector: 'app-footer',
  imports: [RouterModule,CommonModule, FooterComponentAngularUI],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isChatOpen = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
  showButtons: boolean = false;
  currentYear: number = new Date().getFullYear();
  
}
