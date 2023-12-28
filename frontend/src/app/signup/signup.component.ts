import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

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
    role: 'user',
    phoneNumber: '',
    nif: '',
  };

  errorMessage: string | null = null;
  
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      this.authService.signup(this.user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/signin']);
        },
        (error) => {
          console.error('Error during user registration:', error);
          this.errorMessage = error.error;
        }
      );
    }
  }
}