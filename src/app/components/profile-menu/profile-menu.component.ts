import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  @ViewChild("menu") menu!: MatMenu;
  constructor(
    private authService: AuthService,
  ) {}
  logout() {
    this.authService.logout();
  }
}
