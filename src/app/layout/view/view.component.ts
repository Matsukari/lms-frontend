import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, ViewChild } from '@angular/core';
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
})
export class ViewComponent {
  constructor(
    private userService: UserService,
    private uiState: UiStateService,
  ) { }
  async ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      if (!user) return;
      this.user = user;
      this.uiState.pushSideContentTop(StatusPanelComponent);
    })
    this.uiState.sidenavOpen.subscribe(async (open) => {
      if (open) this.sidenavIsOpen.set(true);
      else this.sidenavIsOpen.set(false);
    })

    window.onresize = this.onWindowResize;
  }
  // Host elements from components requries the type of component itself
  @ViewChild('header') header!: ElementRef;
  @ViewChild('sidenav') sidenav!: ElementRef;
  @ViewChild('sidecontent') sidecontent!: ElementRef;
  user: any;
  sidenavPosition = 59;
  sidenavIsOpen = signal(true);

  ngAfterViewInit() {
    this.onWindowResize();
  }


  onWindowResize() {
    if (typeof window === "undefined")
      return;

    if (window.outerWidth < 1000) {
      this.sidenavIsOpen.set(false);
    }
    else {
      this.sidenavIsOpen.set(true);
    }
    const sidenav = this.sidenav.nativeElement as HTMLElement;
    const sidecontent = this.sidecontent.nativeElement as HTMLElement;
    const header = this.header.nativeElement as HTMLElement;
    sidenav.style.top = header.offsetHeight.toString() + "px";
    sidecontent.style.top = header.offsetHeight.toString() + "px";
  }
  navChanged() {
    this.sidenavIsOpen.set(!this.sidenavIsOpen());
  }
}
