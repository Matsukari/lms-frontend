import { Component, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-status-panel',
  standalone: true,
  imports: [
    RouterLink,
    TimeAgoPipe,
    MatIconModule,
  ],
  templateUrl: './status-panel.component.html',
  styleUrl: './status-panel.component.scss'
})
export class StatusPanelComponent {
  user = signal(null);
  completedTasks = signal(null);
  dueTasks = signal(null);
  missedTasks = signal(null);
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    //alert(this.userService.loggedUser());
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
      this.taskService.getTasksFromUser(user.id, "completed", true, true, true).subscribe((data: any) => {
        //alert("completed: " + data.length.toString());
        //this.completedTasks.set(data);
      })
      this.taskService.getTasksFromUser(user.id, "due", true, true, true).subscribe((data: any) => {
        //alert("Due: " + data.length.toString());
        this.dueTasks.set(data.slice(0, Math.min(data.length, 10)));
      })
      this.taskService.getTasksFromUser(user.id, "missed", true, true, true).subscribe((data: any) => {
        //alert("missed: " + data.length.toString());
        this.missedTasks.set(data);
      })
      this.taskService.getTasksFromUser(user.id, "graded", true, true, true).subscribe((data: any) => {
        //alert("graded: " + data.length.toString());
        //this.missedTasks.set(data);
      })
    })
  }
}
