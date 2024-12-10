import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { UiStateService } from './ui-state.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private onLoggedOut = new EventEmitter();
  private loggedUser = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private ui: UiStateService,
  ) { }
  login(formData: FormData, loading: WritableSignal<boolean>) {
    loading.set(true);
    this.http.post(environment.apiUrl + "/login", formData).subscribe({
      next: (data: any) => {
        this.ui.openSnackBar("Succes! Moving on...");
        localStorage.setItem("token", data.access_token);
        this.update();
        this.router.navigate(["/"]);
        loading.set(false);
      },
      error: (err: Error) => {
        this.ui.openSnackBar("Error login");
        loading.set(false);
      }
    });
  }
  authenticate() {
    return this.http.get(environment.apiUrl + "/auth",
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }
    );
  }
  update() {
    this.authenticate().subscribe((user: any) => {
      this.loggedUser.next(user);
    })
  }
  getLoggedUser() {
    return this.loggedUser.asObservable();
  }
  loggedOut() {
    return this.onLoggedOut.asObservable();
  }
  logout() {
    localStorage.clear();
    this.loggedUser.next(null);
    this.router.navigate(["/login"]);
    this.onLoggedOut.emit();
  }
}
