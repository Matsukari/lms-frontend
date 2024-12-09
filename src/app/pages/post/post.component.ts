import { Component, Input, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { CommentBoxComponent } from '../../components/comment-box/comment-box.component';
import { MatMenuModule } from '@angular/material/menu';
import { CommentsSectionComponent } from '../../components/comments-section/comments-section.component';
import { UiStateService } from '../../services/ui-state.service';
import { NavigationService } from '../../services/navigation.service';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    CommonModule,
    MatToolbarModule,
    CommentsSectionComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post: any;
  user: any;
  hasReaction = signal(false);
  isFavorited = signal(false);
  @Input()
  set id(postId: string) {
    this.service.getPost(postId, true, true).subscribe((data: any) => {
      this.post = data;
      this.userService.getLoggedUser().subscribe((user: any) => {
        this.user = user;
        this.service.isFavorited(this.post.id, this.user.id).subscribe((result: boolean) => this.isFavorited.set(result));
        this.service.hasReacted(this.post.id, this.user.id).subscribe((data: boolean) => this.hasReaction.set(data));
      });
    });
  }
  constructor(
    protected service: PostService,
    private userService: UserService,
    private ui: UiStateService,
    private navigationService: NavigationService,
  ) { }

  submitComment(comment: string) {
    this.service.comment({ text: comment, post: this.post.id, user: this.user.id }).subscribe(_ => {
      this.service.getPost(this.post.id, true, true).subscribe((data: any) => {
        this.post = data;
      });
    });
  }
  getLastPage() {
    return this.navigationService.getPreviousUrl();
  }
  react(reaction: string = "LIKE") {
    this.service.react({ post: this.post.id, user: this.user.id, reaction: reaction }).subscribe(_ => {
      this.service.hasReacted(this.post.id, this.user.id).subscribe((result: boolean) => {
        this.hasReaction.set(result)
        if (result)
          this.ui.openSnackBar("Liked post!");
        else
          this.ui.openSnackBar("Unliked post.");
      });
    })
  }
  favorite() {
    this.service.favorite({
      post: this.post.id,
      user: this.user.id,
    }).subscribe((_: any) => {
      this.service.isFavorited(this.post.id, this.user.id).subscribe((result: boolean) => {
        this.isFavorited.set(result)
        if (result)
          this.ui.openSnackBar("Added post to favorites.");
        else
          this.ui.openSnackBar("Removed post to favorites.");
      });
    });
  }
}

