import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  @ViewChild("menu") menu!: MatMenu;
}
