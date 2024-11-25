import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quote-header',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './quote-header.component.html',
  styleUrl: './quote-header.component.scss'
})
export class QuoteHeaderComponent {

}
