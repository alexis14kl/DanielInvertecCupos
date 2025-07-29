import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-frequently-asked-questions',
  imports: [HeaderComponent, FooterComponent, AccordionModule],
  templateUrl: './frequently-asked-questions.component.html',
  styleUrl: './frequently-asked-questions.component.css'
})
export class FrequentlyAskedQuestionsComponent {

}
