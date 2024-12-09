import { Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser = new BehaviorSubject<any>(null);


  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.authService.authenticate().subscribe((user: any) => {
      this.loggedUser.next(user);
    });
  }

  getLoggedUser() {
    return this.loggedUser.asObservable();
    //return this.authService.authenticate();
  }
  //callUser(callback: (result: any) => void) {
  //  if (this.loggedUser.observed) {
  //    callback(this.loggedUser)
  //  }
  //}
  getUser(username: string) {
    //const params = new HttpParams()
    //  .set("role", role);
    return this.http.get(environment.apiUrl + "/get/user/by-username/" + username);
  }
  getAllUsersByRole(role: string) {
    const params = new HttpParams()
      .set("role", role);
    return this.http.get(environment.apiUrl + "/get/users/", { params: params });
  }
  updateUser(user: string, data: any) {
    return this.http.put(environment.apiUrl + "/update/user/" + user, data);
  }
  updateProfile(user: string, data: any) {
    return this.http.put(environment.apiUrl + "/update/profile/" + user, data);
  }
}
