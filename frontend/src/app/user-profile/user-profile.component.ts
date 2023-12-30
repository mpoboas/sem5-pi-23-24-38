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
  copyMessage: string | null = null;

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

  copyProfile(): void {
    const name = this.authService.getUserData().name ;
    const email = this.authService.getUserData().email ;
    const phoneNumber = this.authService.getUserData().phoneNumber ;
    const nif = this.authService.getUserData().nif ;
    const role = this.authService.getUserData().role ;
    const userData = `Name: ${name} \nEmail: ${email} \nPhone Number: ${phoneNumber} \nNIF: ${nif} \nRole: ${role}`;

    const blob = new Blob([userData], { type: 'text/plain' });
    const anchor = document.createElement('a');

    anchor.download = 'user-profile_'+name+'.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    if (document){
      this.copyMessage = 'User data copied';
    } else {
      this.copyMessage = 'Error during copy';
    }
  }
    
}

