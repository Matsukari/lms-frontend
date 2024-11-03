import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  @ViewChild("menu") menu!: MatMenu;
}
