import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent {
  groups = signal([]);
  icon = "";
  constructor(
    private route: ActivatedRoute,
    //private groupService: GroupService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.icon = data["icon"];
      this.userService.getLoggedUser().subscribe((user: any) => {
        const array = [];
        user.member_groups.forEach((item: any) => {
          if (item.type === data["type"]) {
            array.push(item);
          }
        })
        this.groups.set(array);
      })
    })
  }
}
