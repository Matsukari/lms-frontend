import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
export interface NavSection {
  name: string;
  desc: string;
  icon: string;
}
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SideNavComponent,
    HeaderComponent,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
      user.member_groups.forEach((item: any)=>{
        if (item.type === "CLASS") {
          this.classes.push(item);
        }
      })
    })
  }
  user: any;

  navChanged() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }
  groups: any;


  sidenavIsOpen = false;

  //accordion = viewChild.required(MatAccordion);
  popular: NavSection[] = [
    {
      name: 'Home',
      desc: "zxcvzxcvzxcv",
      icon: "home",
    },
    {
      name: 'Dashboard',
      desc: "zxcvzxcv",
      icon: "bar_chart_4_bars"
    },
    {
      name: 'Updates',
      desc: "Schools announcements & per group",
      icon: "campaign"
    },
  ];
  classes = [];
}
