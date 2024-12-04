import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';


export interface NavSection {
  name: string;
  desc: string;
  url: string;
  icon: string;
}
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    CommonModule,
    RouterLink,
    MatMenuModule,
    MatCardModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent {
  constructor(
    private route: Router,
  ) {}
  navChanged() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }
  isCurrentRoute(route: string) {
    return this.route.url.includes(route);
  }

  sidenavIsOpen = false;

  //accordion = viewChild.required(MatAccordion);
  popular: NavSection[] = [
    {
      name: 'Dashboard',
      desc: "zxcvzxcv",
      icon: "bar_chart_4_bars",
      url: "/dashboard"
    },
    {
      name: 'Social',
      desc: "zxcvzxcvzxcv",
      icon: "diversity_1",
      url: "/social"
    },
  ];
}
