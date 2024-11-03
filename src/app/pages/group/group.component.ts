import { Component, Input } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    CommonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  constructor(
    private groupService: GroupService
  ) {}
  @Input()
  set id(groupId: string) {
    this.groupService.getGroup(groupId, true, true, true).subscribe((data: any)=>{
      this.group = data;
    });
  }
  group: any;
}
