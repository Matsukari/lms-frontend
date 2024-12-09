import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(
    private router: Router,
  ) { }
  init() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    })
  }
  getPreviousUrl() {
    return this.previousUrl;
  }
  getCurrentUrl() {
    return this.currentUrl;
  }

}
