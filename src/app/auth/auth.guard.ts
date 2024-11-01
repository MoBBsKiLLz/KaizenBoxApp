import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.getAuthStatus();
    // Allow access to registration and login pages if not logged in
    if (!isLoggedIn && (state.url === '/auth/register' || state.url === '/auth/login')) {
      return true;
    }
  
    // Redirect unauthenticated users to login page for protected routes
    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return false;
    }
  
    return true;
  }
}
