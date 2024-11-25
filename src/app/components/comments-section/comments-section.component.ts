import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { MatIconModule } from '@angular/material/icon';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { MatButtonModule } from '@angular/material/button';
import { CommentServiceInterface } from '../../services/interface/comment.interface';
import { MatMenuModule } from '@angular/material/menu';

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
  commentSelected = signal(0);

  submitComment(comment: string) {
    this.onSubmit.emit(comment);
  }
  editComment() {

  }
  deleteComment() {
    this.commentService.deleteComment(this.commentSelected().toString()).subscribe(_ => {
      this.onChange.emit();
    });
  }
  reportComment() {

  }
}
