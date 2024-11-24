import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-group-about-panel',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,

  ],
  templateUrl: './group-about-panel.component.html',
  styleUrl: './group-about-panel.component.scss'
})
export class GroupAboutPanelComponent {
  @Input() group: any;
}
