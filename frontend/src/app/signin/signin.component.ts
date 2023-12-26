import { Component } from '@angular/core';
import { SigninService } from '../signin/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  user = {
    email: '',
    password: '',
  };

  constructor(private signinService: SigninService) {}

  onSubmit() {
    this.signinService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Store the token, redirect, or perform other actions
      },
      (error) => {
        console.error('Error during login:', error);
        // Handle error, display error message, etc.
      }
    );
  }
}