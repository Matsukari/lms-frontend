import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PostPreviewComponent } from '../../components/post-preview/post-preview.component';
import { PostService } from '../../services/post.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    PostPreviewComponent,
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  posts = signal(null);
  view = 0;
  views = [
    { label: "List", icon: "reorder" },
    { label: "Grid", icon: "grid_view" },
  ]
  sorting = 0;
  sortings = [
    "Most Recent",
    "Monthly Popular",
    "Weekly Popular",
    "All Time"
  ]
  constructor(
    private postService: PostService,
  ) {}
  ngOnInit() {
    this.postService.getCommunity().subscribe((posts: any) => {
      posts[0].attachments.push("First one");
      this.posts.set(posts.slice(0, Math.min(posts.length, 10)));
    });

  }
}
