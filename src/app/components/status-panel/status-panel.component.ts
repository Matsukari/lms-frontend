import { Component, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';

@Component({
  selector: 'app-status-panel',
  standalone: true,
  imports: [
    AdminComponent,
    StudentComponent,
    TeacherComponent
  ],
  templateUrl: './status-panel.component.html',
  styleUrl: './status-panel.component.scss'
})
export class StatusPanelComponent {
  user = signal(null);
  constructor(
    private userService: UserService,
  ) { }
  ngOnInit() {
    //alert(this.userService.loggedUser());
    this.userService.getLoggedUser().subscribe((user: any) => {
      if (!user) return;
      this.user.set(user);
    })
  }
}
