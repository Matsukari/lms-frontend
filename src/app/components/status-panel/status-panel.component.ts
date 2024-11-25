import { Component, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-status-panel',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './status-panel.component.html',
  styleUrl: './status-panel.component.scss'
})
export class StatusPanelComponent {
  completedTasks = signal(null);
  dueTasks = signal(null);
  missedTasks = signal(null);
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.taskService.getTasksFromUserAndGroup("1", user.id, "completed", true, true, true).subscribe((data: any) => {
        //alert("completed: " + data.length.toString());
        this.completedTasks.set(data);
      })
      this.taskService.getTasksFromUserAndGroup("1", user.id, "due", true, true, true).subscribe((data: any) => {
        //alert("Due: " + data.length.toString());
        this.dueTasks.set(data);
      })
      this.taskService.getTasksFromUserAndGroup("1", user.id, "missed", true, true, true).subscribe((data: any) => {
        //alert("missed: " + data.length.toString());
        this.missedTasks.set(data);
      })
    })
  }
}
