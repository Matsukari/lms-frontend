import { Component, ComponentRef, Input, signal } from '@angular/core';
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
  dueTasks = signal(null);
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    //alert(this.userService.loggedUser());
    this.userService.getLoggedUser().subscribe((user: any) => {
      if (!user) return;
      this.user.set(user);
      this.taskService.getTasksFromUser(user.id, "due", true, true, true).subscribe((data: any) => {
        //alert("Due: " + data.length.toString());
        this.dueTasks.set(data.slice(0, Math.min(data.length, 10)));
      })
    })
  }
}
