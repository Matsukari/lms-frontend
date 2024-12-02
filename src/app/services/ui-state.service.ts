import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  sidenavOpen = new Subject<boolean>();
  sidenavIsOpen = true;
  theme = "light";
  constructor() { }
  init() {
    this.setTheme(this.theme);
  }
  openSidenav(open = true) {
    this.sidenavOpen.next(open);
    this.sidenavIsOpen = open;
  }
  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
    this.sidenavOpen.next(this.sidenavIsOpen);
  }
  setTheme(theme: string) {
    this.theme = theme;
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }
  toggleDarkMode() {
    if (this.theme == "light")
      this.setTheme("dark");
    else
      this.setTheme("light");
  }

}
