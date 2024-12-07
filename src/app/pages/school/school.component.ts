import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './school.component.html',
  styleUrl: './school.component.scss'
})
export class SchoolComponent {
  school = signal(null);
  activeTab: any;
  tabs = [
    { name: "Updates", icon: "event", url: "updates" },
    { name: "About", icon: "task", url: "about" },
    { name: "Staff", icon: "task", url: "staff" },
    { name: "Student", icon: "task", url: "student" },
    { name: "Resources", icon: "task", url: "resources" },
  ];
  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.groupService.getSchool().subscribe((data: any) => {
      data.banner = environment.apiUrl + "/static/images/banner.png";
      data.logo = environment.apiUrl + "/static/images/logo.png";
      this.school.set(data);
    })
    this.route.firstChild.url.subscribe(url => {
      this.activeTab = url;
    })
  }
}
