import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

export interface UserData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  nif: string;
  role: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: UserData;
  editMode: boolean = false;
  form: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData();

    this.form = this.fb.group({
      name: [this.userData.name],
      email: [this.userData.email],
      password: [this.userData.password],
      phoneNumber: [this.userData.phoneNumber],
      nif: [this.userData.nif],
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onSave(): void {
    if (this.form.valid) {
      const userData = this.form.value;
      userData.role = this.authService.getUserData().role;

      this.authService.editUser(userData).subscribe(
        (response: any) => {
          this.userData = userData;
          this.toggleEditMode();
        },
        (error: any) => {
          console.error('Error updating user profile', error);
        }
      );
    }
  }

  confirmDelete(): void{
    const result = window.confirm('This option is nuclear, are you sure you want to continue?');
      if (result) {
        this.authService.deleteAccount().subscribe(
          (response) => {
            console.log('Delete successful:', response);
          },
          (error) => {
            console.error('Error during delete:', error);
            // Handle error, display error message, etc.
          }
        );
      }
  }
}
