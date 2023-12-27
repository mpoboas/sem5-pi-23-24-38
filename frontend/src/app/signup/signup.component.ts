import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    nif: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('User:', this.user);
    this.authService.signup(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/signin']);
      },
      (error) => {
        console.error('Error during user registration:', error);
        // Handle error, display error message, etc.
      }
    );
  }
}