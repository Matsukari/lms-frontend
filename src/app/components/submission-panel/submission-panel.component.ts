import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';

@Component({
  selector: 'app-submission-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TimeAgoPipe,
    FileUploaderComponent,
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
    remark: new FormControl(""),
  });
  submissionAttachments = [];
  @Input()
  set userData(user: any) {
    this.user = user;
    this.service.getTaskSubmission(this.task.id, this.user.id).subscribe((submission: any) => {
      this.yourSubmission.set(submission);
      this.submissionAttachments = this.yourSubmission().attachments;
      this.submissionForm.get("remark").setValue(this.yourSubmission().desc);
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
    return this.submissionAttachments;
  }
  getSubmissionRemark() {
    return (this.submissionForm.get("remark") as FormControl).value;
  }
  isValidForm() {
    return this.yourSubmission() || this.submissionAttachments.length != 0 || this.getSubmissionRemark();
  }
  addAttachment() {
    this.getSubmissionAttachments().push(new FormControl(""));
  }
  openFileSelector(fileSelector: HTMLInputElement) {
    fileSelector.click();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach(file => {
        this.submissionAttachments.push(file.name);
      })
    }
  }
  submit() {
    this.service.submit({
      attachments: this.getSubmissionAttachments(),
      source: this.task.id,
      user: this.user.id,
      remark: this.submissionForm.get("remark").value
    }).subscribe((data: any) => {
      this.yourSubmission.set(data);
    })
  }
}
