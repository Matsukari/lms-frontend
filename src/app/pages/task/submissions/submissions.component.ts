import { Component, signal } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.scss'
})
export class SubmissionsComponent {

  otherSubmissions = signal(null);
  user: any;
  constructor(
    protected service: TaskService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      let taskId = params["id"];
      this.userService.getLoggedUser().subscribe((user: any) => {
        this.user = user;
        this.service.getTaskOtherSubmissions(taskId, this.user.id).subscribe((data: any) => {
          this.otherSubmissions.set(data);
        });
      })
    })
  }
}
