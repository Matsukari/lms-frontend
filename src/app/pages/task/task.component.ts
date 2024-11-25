import { ApplicationRef, Component, ComponentRef, createComponent, ElementRef, Input, ViewChild } from '@angular/core';
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
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  submissionPanel: ComponentRef<SubmissionPanelComponent>;
  activeTab: any;
  user: any;
  task: any;
  constructor(
    protected service: TaskService,
    private userService: UserService,
    private location: Location,
    private appRef: ApplicationRef,
  ) { }
  @Input()
  set id(taskId: string) {
    this.service.getTask(taskId, true, true, true).subscribe((data: any) => {
      this.task = data;
      this.userService.getLoggedUser().subscribe((user: any) => {
        this.user = user;
        const appRef = this.appRef;
        const sideContent = document.getElementById("side-content");
        const component = createComponent(SubmissionPanelComponent, {
          environmentInjector: appRef.injector,
        })
        component.setInput("task", this.task);
        component.setInput("userData", this.user);
        this.submissionPanel = component;
        appRef.attachView(component.hostView);
        sideContent.insertBefore(component.location.nativeElement, sideContent.firstChild);
      })
    });
  }
  ngOnDestroy() {
    const sideContent = document.getElementById("side-content");
    sideContent.removeChild(this.submissionPanel.location.nativeElement);
  }
  submitComment(comment: string) {
    this.service.comment({ text: comment, post: this.task.id, user: this.user.id }).subscribe(_ => {
      this.service.getTask(this.task.id, true, true, true).subscribe((data: any) => {
        this.task = data;
      });
    });
  }
  gotoLastPage() {
    this.location.back();
  }
}
