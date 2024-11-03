import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.http.get(environment.apiUrl + "/get/user")
  }

  getLoggedUser() {
    return this.authService.authenticate();
  }
  getUser() {

  }
}
