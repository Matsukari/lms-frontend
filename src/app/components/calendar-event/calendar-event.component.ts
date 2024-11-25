import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar-event',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './calendar-event.component.html',
  styleUrl: './calendar-event.component.scss'
})
export class CalendarEventComponent {
 currentDate: Date = new Date();
  displayedMonth: number = this.currentDate.getMonth();
  displayedYear: number = this.currentDate.getFullYear();
  daysInMonth: { date: Date; events: string[] }[] = [];

  weekDays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  sampleEvents = [
    { date: new Date(2024, 10, 25), events: ['Event A', 'Event B'] },
    { date: new Date(2024, 10, 26), events: ['Event C'] },
  ];

  constructor() {
    this.generateCalendar();
  }

  generateCalendar() {
    const days: { date: Date; events: string[] }[] = [];
    const firstDayOfMonth = new Date(this.displayedYear, this.displayedMonth, 1);
    const lastDayOfMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0);

    // Padding for previous month's days
    const firstWeekday = firstDayOfMonth.getDay();
    for (let i = firstWeekday; i > 0; i--) {
      const date = new Date(this.displayedYear, this.displayedMonth, -i + 1);
      days.push({ date, events: [] });
    }

    // Current month's days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(this.displayedYear, this.displayedMonth, i);
      const events = this.sampleEvents
        .filter(event => this.isSameDate(event.date, date))
        .map(event => event.events)
        .flat();
      days.push({ date, events });
    }

    // Padding for next month's days
    const remainingDays = 7 - (days.length % 7);
    for (let i = 1; i <= remainingDays && remainingDays < 7; i++) {
      const date = new Date(this.displayedYear, this.displayedMonth + 1, i);
      days.push({ date, events: [] });
    }

    this.daysInMonth = days;
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  isToday(date: Date): boolean {
    return this.isSameDate(this.currentDate, date);
  }

  navigateMonth(direction: number) {
    this.displayedMonth += direction;
    if (this.displayedMonth < 0) {
      this.displayedMonth = 11;
      this.displayedYear--;
    } else if (this.displayedMonth > 11) {
      this.displayedMonth = 0;
      this.displayedYear++;
    }
    this.generateCalendar();
  }
}
