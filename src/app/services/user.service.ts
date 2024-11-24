import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: any;

  constructor(
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.getLoggedUser().subscribe((user: any) => this.loggedUser = user);
  }

  getLoggedUser() {
    return this.authService.authenticate();
  }
  getUser() {

  }
}
