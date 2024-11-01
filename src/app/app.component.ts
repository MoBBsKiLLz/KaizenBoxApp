import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor'; // Ensure this path is correct
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HttpClientModule, useClass: HttpClientModule },
    { provide: AuthService, useClass: AuthService},
    { provide: AuthGuard, useClass: AuthGuard }
  ]
})
export class AppComponent {
  title = 'KaizenBoxApp';
  isLoggedIn = false;
  private authStatusSub: Subscription | null = null;;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.authStatusSub = this.authService.isAuthenticated$.subscribe(
      (status: boolean) => {
        this.isLoggedIn = status;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }
}
