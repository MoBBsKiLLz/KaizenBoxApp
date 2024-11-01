import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/users.model';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.getAuthStatus());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  handleLogin(user: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, user).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Store the token in local storage
        this.isAuthenticatedSubject.next(true); // Update authentication status
      })
    );
  }

  handleRegister(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
    this.isAuthenticatedSubject.next(false); // Update authentication status
    this.router.navigate(['/auth/login']);
  }

  getAuthStatus(): boolean {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token'); // Check if the token exists
    }
    return false; // Return false if localStorage is not available
  }
}
