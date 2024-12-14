import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { MatIconModule } from '@angular/material/icon';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { MatButtonModule } from '@angular/material/button';
import { CommentServiceInterface } from '../../services/interface/comment.interface';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TimeAgoPipe,
    CommentBoxComponent,
    MatMenuModule,
  ],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.scss'
})
export class CommentsSectionComponent {
  @Output() onSubmit = new EventEmitter<string>();
  @Output() onChange = new EventEmitter<void>();
  @Input() commentService: CommentServiceInterface;
  @Input() comments = [];
  commentSelected = signal(null);
  user: any;

  constructor(
    private userService: UserService,
    private ui: UiStateService,
  ) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
    })
  }
  submitComment(comment: string) {
    this.onSubmit.emit(comment);
  }
  editComment() {

  }
  ownComment() {
    return (this.user && this.commentSelected()?.user.id == this.user?.id)

  }
  deleteComment() {
    if (this.ownComment()) {
      this.commentService.deleteComment(this.commentSelected().id.toString()).subscribe(_ => {
        this.onChange.emit();
        this.ui.openSnackBar("Deleted your comment!");
      });
    }
  }
  reportComment() {

  }
}
