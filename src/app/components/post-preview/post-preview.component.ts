import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../services/user.service';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    TimeAgoPipe,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss'
})
export class PostPreviewComponent {
  @Input() post: any;
  hasReaction = signal(false);
  isFavorited = signal(false);
  user: any;

  constructor(
    private service: PostService,
    private userService: UserService,
    private ui: UiStateService,
  ) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      if (!user) return;
      this.user = user;
      this.service.isFavorited(this.post.id, this.user.id).subscribe((result: any) => this.isFavorited.set(result ? true : false));
      this.service.hasReacted(this.post.id, this.user.id).subscribe((result: any) => this.hasReaction.set(result ? true : false));
    });
  }
  react(reaction: string = "LIKE") {
    this.service.react({ post: this.post.id, user: this.user.id, reaction: reaction }).subscribe(_ => {
      this.service.hasReacted(this.post.id, this.user.id).subscribe((result: any) => {
        this.hasReaction.set(result?true:false);
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
      this.service.isFavorited(this.post.id, this.user.id).subscribe((result: any) => {
        this.isFavorited.set(result?true:false);
        if (result)
          this.ui.openSnackBar("Added post to favorites.");
        else
          this.ui.openSnackBar("Removed post to favorites.");
      });
    });
  }
}
