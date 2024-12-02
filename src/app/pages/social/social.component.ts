import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialComponent {
  posts = signal(null);
  tabs = [
    { name: "Community", url: "community", icon: "diversity_3" },
    { name: "Live", url: "live", icon: "live_tv" },
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

