import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode correctly

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.cookieService.get('accessToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken.role;
      const requiredRoles = route.data['roles'] as Array<string>;

      if (requiredRoles.includes(userRole)) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
