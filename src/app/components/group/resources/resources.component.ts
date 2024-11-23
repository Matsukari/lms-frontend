import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TimeAgoPipe } from '../../../pipes/TimeAgoPipe';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    RouterLink,
    TimeAgoPipe,
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  posts = signal(null);

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }
  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      let groupId = params["id"];
      this.postService.getResourcesFromGroup(groupId, true, true).subscribe((data: any) => {
        this.posts.set(data);
      });
    });
  }
}
