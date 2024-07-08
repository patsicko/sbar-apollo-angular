// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private cookieService: CookieService,
    private router:Router

  ) {}

  private hasToken(): boolean {
    return !!this.cookieService.get('accessToken');
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  checkLoginStatus(): void {
    this.loggedIn.next(this.hasToken());
  }

  logout(): void {
    this.cookieService.delete('accessToken', '/'); 
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
