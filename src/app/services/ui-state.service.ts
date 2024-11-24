import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { ViewComponent } from '../layout/view/view.component';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  sidenavOpen = new Subject<boolean>();
  constructor() { }
  openSidenav(open = true) {
    this.sidenavOpen.next(open);
  }
}
