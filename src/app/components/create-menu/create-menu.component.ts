import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-create-menu',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.scss'
})
export class CreateMenuComponent {
  @ViewChild("menu") menu!: MatMenu;

}
