import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ClassesComponent } from '../../components/classes/classes.component';
import { MessengesComponent } from '../../components/messenges/messenges.component';
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
    ClassesComponent,
    MessengesComponent,
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
      user.member_groups.forEach((item: any) => {
        if (item.type === "CLASS") {
          this.classes.push(item);
        }
      })
    })
  }
  @ViewChild('header', { static: true }) header: ElementRef;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild(ClassesComponent) overlayComponent!: ClassesComponent;
  user: any;
  sidenavPosition = 59;
  groups: any;
  sidenavIsOpen = false;
  classes = [];

  navChanged() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }
}
