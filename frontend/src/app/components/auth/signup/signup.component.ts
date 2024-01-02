import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { MatDialog } from '@angular/material/dialog';
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
    terms: false,
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router,public dialog:MatDialog) {}

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      const userData = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
        phoneNumber: this.user.phoneNumber,
        nif: this.user.nif,
      };
      this.authService.signup(userData).subscribe(
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

  openTermsConditions() {
    const dialogRef = this.dialog.open(TermsConditionsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
