import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
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
    private snackBar: MatSnackBar,
    private appRef: ApplicationRef,
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
  pushSideContentTop<T>(componentType: ComponentType<T>, data = {}) {
    return this.pushAcrossHtml("side-content", componentType, data, (component, where) => {
      where.insertBefore(component.location.nativeElement, where.firstChild);
    })
  }
  pushOverlay<T>(componentType: ComponentType<T>, data = {}) {
    return this.pushAcrossHtml("overlay-content", componentType, data, (component, where) => {
      where.insertBefore(component.location.nativeElement, where.firstChild);
    })
  }
  pushAcrossHtml<T>(toWhere: string, componentType: ComponentType<T>, data: {}, insertFunction: (component: ComponentRef<T>, where: HTMLElement) => void) {
    const appRef = this.appRef;
    const target = document.getElementById(toWhere);
    const component = createComponent(componentType, {
      environmentInjector: appRef.injector,
    })
    for (const key in data) {
      component.setInput(key, data[key]);
    }
    appRef.attachView(component.hostView);
    insertFunction(component, target);
    return component;
  }
  popChildAcrossHtml(toWhere: string, component: ComponentRef<unknown>) {
    const sideContent = document.getElementById(toWhere);
    sideContent.removeChild(component.location.nativeElement);
  }
  popSideContent(component: ComponentRef<unknown>) {
    const sideContent = document.getElementById("side-content");
    sideContent.removeChild(component.location.nativeElement);
  }
  getHeaderHeight() {
    return document.getElementById("header").offsetHeight;
  }
  // MatDialog somehow loads the dialog into the component caller
  openDialog(component: ComponentType<unknown>, config: any) {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef;
  }
  openSnackBar(message: string, config: any = { duration: 2000 }) {
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
