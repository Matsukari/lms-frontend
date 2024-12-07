import { Component, signal } from '@angular/core';
import { PostPreviewComponent } from '../../post-preview/post-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { GroupService } from '../../../services/group.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [
    PostPreviewComponent,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss'
})
export class UpdatesComponent {
  posts = signal(null);
  news = signal(null);
  events = signal(null);
  currentEvent = signal(null);

  constructor(
    private postService: PostService,
    private groupService: GroupService
  ) { }
  ngOnInit() {
    this.groupService.getSchool().subscribe((data: any) => {
      let groupId = data.id;
      this.postService.getPostsFromGroup(groupId, true, true).subscribe((data: any) => {
        this.posts.set(data);
      })
    })
    this.news.set([
      {
        title: "Jeleron wins 2023 Math Contest",
        desc: "Activity clear recently friend debate stand might form. Property specific fact option protect. Animal that employee again industry. Product key drive already dog. Traditional information college manage mean. Night house sound when begin. Pull ball test course. Form strategy agreement when president get movie. Meeting Republican another say which pressure policy. Bag design several wish thousand beat. Sister peace air born case project rock. Expect against chance ability. Peace recognize whose himself. Amount society this. Organization change me image operation take prepare. Pick walk attack see up all pretty prepare.",
        created_at: Date.now(),
      },
      {
        title: "Introducing the newly acquired research Sample",
        desc: "Activity clear recently friend debate stand might form. Property specific fact option protect. Animal that employee again industry. Product key drive already dog. Traditional information college manage mean. Night house sound when begin. Pull ball test course. Form strategy agreement when president get movie. Meeting Republican another say which pressure policy. Bag design several wish thousand beat. Sister peace air born case project rock. Expect against chance ability. Peace recognize whose himself. Amount society this. Organization change me image operation take prepare. Pick walk attack see up all pretty prepare.",
        created_at: Date.now(),
      },
    ])
    this.events.set([this.news()[0]])
    this.currentEvent.set(this.events()[0]);

  }
}
