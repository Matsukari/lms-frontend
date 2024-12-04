import { Component, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  classes = signal([]);
  activeTab: any;
  tabs = [
    { name: "Clubs", icon: "event", url: "clubs" },
    { name: "Organization", icon: "task", url: "orgs" },
    { name: "Casual", icon: "task", url: "customs" },
  ];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      const array = [];
      user.member_groups.forEach((item: any) => {
        if (item.type === "CLASS") {
          array.push(item);
        }
      })
      this.classes.set(array);
    })
    this.route.firstChild.url.subscribe(url => {
      this.activeTab = url;
    })
  }
}


