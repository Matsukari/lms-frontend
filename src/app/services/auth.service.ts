import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  login(formData: FormData, loading: WritableSignal<boolean>) {
    loading.set(true);
    this.http.post(environment.apiUrl + "/login", formData).subscribe({
      next: (data: any) => {
        localStorage.setItem("token", data.access_token);
        this.router.navigate(["/"]);
        loading.set(false);
      },
      error: (err: Error) => {
        alert("Error: " + err.message);
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
  errorHandler(err: Error) {
    alert("Error: " + err.message);
  }
}
