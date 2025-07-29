import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
@Component({
  selector: 'app-privacy-policies',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './privacy-policies.component.html',
  styleUrl: './privacy-policies.component.css'
})
export class PrivacyPoliciesComponent {
  currentYear: number = new Date().getFullYear();
}
