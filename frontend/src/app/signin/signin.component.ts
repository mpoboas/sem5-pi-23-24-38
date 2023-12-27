import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signin(this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error during login:', error);
        // Handle error, display error message, etc.
      }
    );
  }
}