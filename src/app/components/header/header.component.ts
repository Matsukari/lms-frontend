import { Component, ComponentRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateMenuComponent } from '../create-menu/create-menu.component';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AppMenuComponent } from '../app-menu/app-menu.component';
import { UiStateService } from '../../services/ui-state.service';
import { MessengesComponent } from '../messenges/messenges.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    CreateMenuComponent,
    ProfileMenuComponent,
    MatMenuModule,
    CommonModule,
    NotificationsComponent,
    AppMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() username: string;
  @Input() role: string;
  user: any;
  messenges: ComponentRef<MessengesComponent>;


  constructor(
    private uiState: UiStateService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((data: any) => {
      this.user = data;
    })
  }
  toggleSidenav() {
    this.uiState.toggleSidenav();
  }
  openMessenges() {
    if (this.messenges) {
      this.uiState.popSideContent(this.messenges);
      this.messenges = null;
    }
    else {
      this.messenges = this.uiState.pushSideContentTop(MessengesComponent, {
        chatrooms: this.user.message_rooms,
      })
    }
  }
}
