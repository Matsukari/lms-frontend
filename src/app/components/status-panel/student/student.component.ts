import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../../pipes/TimeAgoPipe';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-status-panel-student',
  standalone: true,
  imports: [
    RouterLink,
    TimeAgoPipe,
    MatIconModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
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
