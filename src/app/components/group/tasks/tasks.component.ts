import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TimeAgoPipe } from '../../../pipes/TimeAgoPipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    TimeAgoPipe,
    MatChipsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  tasks = signal(null);
  allTasks = signal([]);
  categories = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      let groupId = params["id"];
      this.taskService.getTasksFromGroup(groupId, true, true, true).subscribe((data: any) => {
        this.tasks.set(data);
        this.allTasks.set(this.tasks());
        this.userService.getLoggedUser().subscribe((user: any) => {
          this.taskService.getTasksFromUser(user.id, "due", true, true, true).subscribe((items: any) => {
            this.categories.push({ label: "Due", items: items });
          })
          this.taskService.getTasksFromUser(user.id, "missed", true, true, true).subscribe((items: any) => {
            this.categories.push({ label: "Missed", items: items });
          })
          this.taskService.getTasksFromUser(user.id, "completed", true, true, true).subscribe((items: any) => {
            this.categories.push({ label: "Completed", items: items });
          })
          this.taskService.getTasksFromUser(user.id, "graded", true, true, true).subscribe((items: any) => {
            this.categories.push({ label: "Graded", items: items });
          })
          //this.taskService.submit({ attachments: ["Sample"], remark: "Sample remark", user: user.id, source: data[0].id }).subscribe(data => {
          //});
          //this.taskService.grade({ attachments: [], remark: "You did a fucking good job", grade: 99, user: user.id, source: data[0].id }).subscribe(data => {
          //})
        });
      })
    })
  }
}
