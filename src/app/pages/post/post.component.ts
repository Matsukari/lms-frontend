import { Component, Input, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { CommentBoxComponent } from '../../components/comment-box/comment-box.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    TimeAgoPipe,
    CommentBoxComponent,
    MatMenuModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post: any;
  hasReaction = signal(false);
  commentSelected = signal(0);
  @Input()
  set id(postId: string) {
    this.service.getPost(postId, true, true).subscribe((data: any) => {
      this.post = data;
    });
  }
  constructor(
    private service: PostService,
    private location: Location
  ) { }

  ngOnInit() {
    this.service.hasReacted(this.post.id, this.post.source.id).subscribe((data: boolean) => this.hasReaction.set(data));
  }
  submitComment(comment: string) {
    this.service.comment({ text: comment, post: this.post.id, user: this.post.source.id }).subscribe(_ => {
      this.service.getPost(this.post.id, true, true).subscribe((data: any) => {
        this.post = data;
      });
    });
  }
  gotoLastPage() {
    this.location.back();
  }
  react(reaction: string = "LIKE") {
    this.service.react({ post: this.post.id, user: this.post.source.id, reaction: reaction }).subscribe(_ => {
      this.service.hasReacted(this.post.id, this.post.source.id).subscribe((result: boolean) => this.hasReaction.set(result));
      this.service.getPost(this.post.id, true, true).subscribe((data: any) => {
        this.post = data;
      });
    })
  }
  editComment() {

  }
  deleteComment() {
    this.service.deleteComment(this.commentSelected().toString()).subscribe(_ => {
      this.service.getPost(this.post.id, true, true).subscribe((data: any) => {
        this.post = data;
      });
    });
  }
  reportComment() {

  }
}
