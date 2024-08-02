import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {jwtDecode} from 'jwt-decode';
import { Observable } from '@apollo/client';
import { Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<any>(null); 

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.checkUser(); 
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  checkLoginStatus(): void {
    this.loggedIn.next(this.hasToken());
    this.checkUser(); 
  }

  logout(): void {
    // this.cookieService.delete('accessToken', '/');
    localStorage.removeItem('accessToken')
    this.loggedIn.next(false);
    this.currentUserSubject.next(null); 
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
    this.toastr.warning('You logged out!');
  }

  private checkUser(): void {
    // const token = this.cookieService.get('accessToken');
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decodedToken: any = jwtDecode(token);
      
      this.currentUserSubject.next(decodedToken); 
    } else {
      this.currentUserSubject.next(null); 
    }
  }
}
