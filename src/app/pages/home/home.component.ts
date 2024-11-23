import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatRadioModule } from "@angular/material/radio";
import { ProfileMenuComponent } from '../../components/profile-menu/profile-menu.component';
import { CreateMenuComponent } from '../../components/create-menu/create-menu.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { PostService } from '../../services/post.service';
import { PostPreviewComponent } from '../../components/post-preview/post-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTabsModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    MatChipsModule,
    MatMenuModule,
    MatListModule,
    ProfileMenuComponent,
    CreateMenuComponent,
    SideNavComponent,
    RouterLink,
    PostPreviewComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  posts = signal(null);
  view = 0;
  views = [
    {label: "List", icon: "reorder"},
    {label: "Grid", icon: "grid_view"},
  ]
  sorting = 0;
  sortings = [
    "Most Recent",
    "Monthly Popular",
    "Weekly Popular",
    "All Time"
  ]
  @Input() user: any;
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

