import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { CreatePostComponent } from '../../pages/create-post/create-post.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-app-menu',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss'
})
export class AppMenuComponent {
  @ViewChild("menu") menu!: MatMenu;
  user: any;
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
  ) {}
  ngOnInit() {
    this.userService.getLoggedUser().subscribe(user => {
      this.user = user;
    });
  }
  openCreatePost() {
    this.dialog.open(CreatePostComponent, {
      minWidth: "90vw",
      maxWidth: "90vw",
      minHeight: "90vh",
      maxHeight: "90vh",
    })
  }
}
