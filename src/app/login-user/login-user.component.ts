import { Component } from '@angular/core';
import { User } from '../models/users.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  user: User = {
    userId: 0, // Assuming you don't need this on login
    username: '',
    password: '',
    facilities: []
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log("Submit button pressed.");
    this.authService.handleLogin({ username: this.user.username, password: this.user.password }).pipe(
      catchError(err => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error(err);
        throw err; // Rethrow the error to keep the observable chain intact
      })
    ).subscribe(() => {
      this.router.navigate(['/facilities']); // Navigate to the facilities page after login
    });
  }
}
