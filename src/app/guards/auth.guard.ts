import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    if (typeof window !== "undefined") {
      return this.auth.authenticate().pipe(
        map(() => true),
        catchError(() => {
          alert("Returned");
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }
    return of(false);
  }
}
