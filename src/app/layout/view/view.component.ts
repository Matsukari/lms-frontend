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
import { UiStateService } from '../../services/ui-state.service';
import { StatusPanelComponent } from '../../components/status-panel/status-panel.component';
import { SideContentComponent } from '../../components/side-content/side-content.component';
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
    StatusPanelComponent,
    SideContentComponent,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
  constructor(
    private userService: UserService,
    private uiState: UiStateService,
  ) {}
  async ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
    })
    this.uiState.sidenavOpen.subscribe(async (open) => {
      if (open) this.sidenav.open();
      else this.sidenav.close();
    })
  }
  @ViewChild('header', { static: true }) header: ElementRef;
  @ViewChild('sidenav') sidenav: MatSidenav;
  user: any;
  sidenavPosition = 59;
  sidenavIsOpen = false;

  navChanged() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }
}
