import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-submission-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './submission-panel.component.html',
  styleUrl: './submission-panel.component.scss'
})
export class SubmissionPanelComponent {
  @Input() task: any;
  user: any;
  yourSubmission = signal(null);
  yourSubmissionResponse = signal(null);
  otherSubmissions = signal(null);
  submissionForm = new FormGroup({
    attachments: new FormArray([]),
    remark: new FormControl(""),
  });
  @Input()
  set userData(user: any) {
    this.user = user;
    this.service.getTaskSubmission(this.task.id, this.user.id).subscribe((submission: any) => {
      this.yourSubmission.set(submission);
    });
    this.service.getTaskResponse(this.task.id, this.user.id).subscribe((data: any) => {
      this.yourSubmissionResponse.set(data);
    });
    this.service.getTaskOtherSubmissions(this.task.id, this.user.id).subscribe((data: any) => {
      this.otherSubmissions.set(data);
    });
  }
  constructor(
    private service: TaskService,
  ) { }
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
