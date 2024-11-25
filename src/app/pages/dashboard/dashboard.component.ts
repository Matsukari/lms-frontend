import { Component, } from '@angular/core';
import { CalendarEventComponent } from '../../components/calendar-event/calendar-event.component';
import { QuoteHeaderComponent } from '../../components/quote-header/quote-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CalendarEventComponent,
    QuoteHeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}
