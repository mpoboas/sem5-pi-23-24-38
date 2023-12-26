// signup.component.ts
import { Component } from '@angular/core';
import { SignupService } from './signup.service';

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
    // Add more fields if needed
  };
  

  constructor(private signupService: SignupService) {}

  onSubmit() {
    console.log('User:', this.user);
    this.signupService.signup(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // Redirect to login page or perform other actions
      },
      (error) => {
        console.error('Error during user registration:', error);
        // Handle error, display error message, etc.
      }
    );
  }
}
