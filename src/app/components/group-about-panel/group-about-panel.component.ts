import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MemberListComponent } from '../member-list/member-list.component';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-group-about-panel',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,

  ],
  templateUrl: './group-about-panel.component.html',
  styleUrl: './group-about-panel.component.scss',
})
export class GroupAboutPanelComponent {
  @Input() group: any;

  constructor(
    private ui: UiStateService,
  ) {}
  ngOnInit() {
  }
  seeMembers() {
    this.ui.openDialog(MemberListComponent, {
      data: {
        members: this.group.members,
      }
    })
  }
}
