import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  sidenavOpen = new Subject<boolean>();
  sidenavIsOpen = true;
  theme = "light";
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
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
  // MatDialog somehow loads the dialog into the component caller
  openDialog(component: ComponentType<unknown>, config: any) {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef;
  }
  openSnackBar(message: string, config: any) {
    const snackbar = this.snackBar.open(message, "Ok", config);
    return snackbar;
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
