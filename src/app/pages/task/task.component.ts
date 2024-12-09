import { ApplicationRef, Component, ComponentRef, createComponent, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { SubmissionPanelComponent } from '../../components/submission-panel/submission-panel.component';
import { CommentsSectionComponent } from '../../components/comments-section/comments-section.component';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    CommonModule,
    MatCardModule,
    SubmissionPanelComponent,
    CommentsSectionComponent,
    TimeAgoPipe,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  submissionPanel: ComponentRef<SubmissionPanelComponent>;
  user: any;
  task = signal(null);
  activeTab: any;
  tabs = [
    { name: "Comments", icon: "forum", url: "comments" },
    { name: "Submissions", icon: "book_4", url: "submissions" },
  ];
  constructor(
    protected service: TaskService,
    private userService: UserService,
    private ui: UiStateService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
  ) { }
  @Input()
  set id(taskId: string) {
    this.service.getTask(taskId, true, true, true).subscribe((data: any) => {
      this.task.set(data);
      this.userService.getLoggedUser().subscribe((user: any) => {
        this.user = user;
        this.submissionPanel = this.ui.pushSideContentTop(SubmissionPanelComponent, {
          taskData: this.task(),
        })
      })
    });
    this.route.firstChild.url.subscribe(url => {
      this.activeTab = url;
    })
  }
  ngOnDestroy() {
    const sideContent = document.getElementById("side-content");
    sideContent.removeChild(this.submissionPanel.location.nativeElement);
  }
  getLastPage() {
    return this.navigationService.getPreviousUrl();
  }
}
