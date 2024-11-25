import { Component } from '@angular/core';
import { StatusPanelComponent } from '../status-panel/status-panel.component';

@Component({
  selector: 'app-side-content',
  standalone: true,
  imports: [
    StatusPanelComponent,
  ],
  templateUrl: './side-content.component.html',
  styleUrl: './side-content.component.scss'
})
export class SideContentComponent {

}
