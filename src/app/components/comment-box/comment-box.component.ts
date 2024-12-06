import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})
export class CommentBoxComponent {
  @Output() onSubmit = new EventEmitter<string>();
  comment = new FormControl("");
  showFull = signal(false);
  constructor(
    private ui: UiStateService,
  ) {}

  submitComment() {
    this.onSubmit.emit(this.comment.value);
    this.comment.reset();
    this.ui.openSnackBar("Made a comment", {
      duration: 2 * 1000
    })

  }
  cancel() {
    this.showFull.set(false);
  }
  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("box")) {
      this.showFull.set(true);
    }
  }
}
