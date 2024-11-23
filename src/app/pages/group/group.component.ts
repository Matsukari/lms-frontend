import { Component, Input, signal, WritableSignal } from '@angular/core';
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
import { MatGridListModule } from "@angular/material/grid-list";
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { PostPreviewComponent } from '../../components/post-preview/post-preview.component';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { PassThrough } from 'node:stream';

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
    PostPreviewComponent,
    TimeAgoPipe,
    RouterOutlet,
    MatGridListModule,

  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  tabs = [
    { name: "Events", icon: "event", url: "events"},
    { name: "Tasks", icon: "task", url: "tasks"},
    { name: "Resources", icon: "task", url: "resources"},
  ];
  group: any;
  posts: any;
  activeTab: any;

  @Input()
  set id(groupId: string) {
    this.groupService.getGroup(groupId, true, true, true).subscribe((data: any) => {
      this.group = data;
      this.posts = data.posts;
    });
  }
  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.route.firstChild.url.subscribe(url => {
      this.activeTab = url;
    })
  }
  taskIsOverdue(task: any) {
    return new Date().toISOString() > task.due_at;
  }
}
