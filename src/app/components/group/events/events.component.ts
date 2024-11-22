import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PostPreviewComponent } from '../../post-preview/post-preview.component';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    PostPreviewComponent,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  posts = signal(null);

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}
  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      let groupId = params["id"];
      this.postService.getPostsFromGroup(groupId, true, true).subscribe((data: any) => {
        this.posts.set(data);
      })
    })
  }
}
