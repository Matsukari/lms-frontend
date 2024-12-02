import { Component } from '@angular/core';
import { CommentsSectionComponent } from '../../../components/comments-section/comments-section.component';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommentsSectionComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  task: any;
  user: any;
  constructor(
    protected service: TaskService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      let taskId = params["id"];
      this.service.getTask(taskId, true, true, true).subscribe((data: any) => {
        this.task = data;
      })
      this.userService.getLoggedUser().subscribe((user: any) => {
        this.user = user;
      })
    })
  }
  submitComment(comment: string) {
    this.service.comment({ text: comment, post: this.task.id, user: this.user.id }).subscribe(_ => {
      this.service.getTask(this.task.id, true, true, true).subscribe((data: any) => {
        this.task = data;
      });
    });
  }
}
