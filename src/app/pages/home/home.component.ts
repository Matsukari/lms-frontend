import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  posts = signal(null);
  tabs = [
    { name: "Community", url: "community" },
    { name: "Live", url: "live" },
  ]
  activeTab: any;
  @Input() user: any;
  constructor(
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.route.firstChild.url.subscribe(url => {
      this.activeTab = url;
    })
  }
}

