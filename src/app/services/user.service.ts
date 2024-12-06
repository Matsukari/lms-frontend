import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }
  ngOnInit() {
    this.getLoggedUser().subscribe((user: any) => this.loggedUser = user);
  }

  getLoggedUser() {
    return this.authService.authenticate();
  }
  updateUser(user: string, data: any) {
    return this.http.put(environment.apiUrl + "/update/user/" + user, data);
  }
  updateProfile(user: string, data: any) {
    return this.http.put(environment.apiUrl + "/update/profile/" + user, data);
  }
}
