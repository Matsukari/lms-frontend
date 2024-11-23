import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { CreatePostComponent } from '../../pages/create-post/create-post.component';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(
    private dialog: MatDialog,
  ) {}
  openCreatePost() {
    this.dialog.open(CreatePostComponent, {
      minWidth: "90vw",
      maxWidth: "90vw",
      minHeight: "90vh",
      maxHeight: "90vh",
    })
  }
}
