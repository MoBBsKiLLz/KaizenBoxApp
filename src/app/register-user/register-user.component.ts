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
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  user: User = {
    userId: 0, // You don't need this on registration
    username: '',
    password: '',
    facilities: []
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Calling the AuthService to handle the registration process
    this.authService.handleRegister({
      userId: 0,
      username: this.user.username,
      password: this.user.password
    }).pipe(
      catchError(err => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error(err);
        throw err; // Rethrow the error to keep the observable chain intact
      })
    ).subscribe(() => {
      this.router.navigate(['/auth/login']); // Navigate to login after successful registration
    });
  }
}
