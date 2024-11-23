import { Component, Input, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { CommentBoxComponent } from '../../components/comment-box/comment-box.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    TimeAgoPipe,
    CommentBoxComponent,
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  user: any;
  task: any;
  yourSubmission = signal(null);
  yourSubmissionResponse = signal(null);
  otherSubmissions = signal(null);
  submissionForm = new FormGroup({
    attachments: new FormArray([]),
    remark: new FormControl(""),
  })
  constructor(
    private service: TaskService,
    private userService: UserService,
    private location: Location,
  ) { }
  @Input()
  set id(taskId: string) {
    this.service.getTask(taskId, true, true, true).subscribe((data: any) => {
      this.task = data;
      this.userService.getLoggedUser().subscribe((user: any) => {
        this.user = user;
        this.service.getTaskSubmission(this.task.id, user.id).subscribe((submission: any) => {
          this.yourSubmission.set(submission);
        });
        this.service.getTaskResponse(this.task.id, user.id).subscribe((data: any) => {
          this.yourSubmissionResponse.set(data);
        });
        this.service.getTaskOtherSubmissions(this.task.id, user.id).subscribe((data: any) => {
          this.otherSubmissions.set(data);
        });
      })
    });
  }
  submitComment(comment: string) {
    //alert(this.task.id);
    this.service.comment({ text: comment, post: this.task.id, user: this.user.id }).subscribe(_ => {
      this.service.getTask(this.task.id, true, true, true).subscribe((data: any) => {
        this.task = data;
      });
    });
  }
  gotoLastPage() {
    this.location.back();
  }
  getSubmissionAttachments() {
    return this.submissionForm.get("attachments") as FormArray;
  }
  getSubmissionRemark() {
    return this.submissionForm.get("remark") as FormControl;
  }
  addAttachment() {
    this.getSubmissionAttachments().push(new FormControl(""));
  }
  makeChange() {
    this.getSubmissionAttachments().setValue(this.yourSubmission().attachments);
    this.getSubmissionRemark().setValue(this.yourSubmission().desc);
    this.yourSubmission.set(null);
  }
  submit() {
    this.service.submit({
      attachments: this.getSubmissionAttachments().value,
      source: this.task.id,
      user: this.user.id,
      remark: this.submissionForm.get("remark").value
    }).subscribe((data: any) => {
      this.yourSubmission.set(data);
    })
  }
}
