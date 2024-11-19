import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClassesComponent } from '../classes/classes.component';


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
    ClassesComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent {
  navChanged() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }
  @Input() groups: any;
  @Input() classes: any;
  @Input() overlayComponent!: ClassesComponent;

  onElementClick(event: Event) {
    this.overlayComponent.targetElement = event.target as HTMLElement;
    this.overlayComponent.toggleOverlay();
  }


  sidenavIsOpen = false;

  //accordion = viewChild.required(MatAccordion);
  popular: NavSection[] = [
    {
      name: 'Home',
      desc: "zxcvzxcvzxcv",
      icon: "home",
      url: "/home"
    },
    {
      name: 'Dashboard',
      desc: "zxcvzxcv",
      icon: "bar_chart_4_bars",
      url: "/dashboard"
    },
  ];
}
