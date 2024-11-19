import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { PostService } from '../../services/post.service';

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
  ],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss'
})
export class PostPreviewComponent {
  @Input() post: any;
  hasReaction = signal(false);

  constructor(
    private service: PostService,
  ) { }
  ngOnInit() {
    this.service.hasReacted(this.post.id, this.post.source.id).subscribe((data: boolean) => this.hasReaction.set(data));
  }
  react(reaction: string = "LIKE") {
    this.service.react({ post: this.post.id, user: this.post.source.id, reaction: reaction }).subscribe(_ => {
      this.service.hasReacted(this.post.id, this.post.source.id).subscribe((result: boolean) => this.hasReaction.set(result));
    })
  }
}
