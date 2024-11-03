import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) { }
  @Input()
  set id(taskId: string) {
    this.taskService.getTask(taskId, true, true, true).subscribe((data: any) => {
      this.task = data;
      this.userService.getLoggedUser().subscribe((user: any) => {
        this.taskService.getTaskSubmisison(this.task.id, user.id).subscribe((submission: any) => {
          this.yourSubmission = submission;
        });
      })
    });
  }
  submitComment() {
    this.taskService.comment(this.comment.value);
  }
  task: any;
  yourSubmission: any;
  comment = new FormControl("");
}
