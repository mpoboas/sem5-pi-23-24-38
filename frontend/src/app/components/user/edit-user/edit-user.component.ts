import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

export interface UserData {
  name: string;
  email: string;
  role: string;
  password: string;
  phoneNumber: string;
  nif: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  form: FormGroup;
  roleOptions: any[] = [];
  errorMessage: string | null = null;
  hide = true;
  userData: UserData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      name: [data.name],
      email: [data.email],
      password: [data.password],
      role: [data.role],
      phoneNumber: [data.phoneNumber],
      nif: [data.nif],
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.authService.getRoles().subscribe(
      (roles: []) => {
          this.roleOptions = roles;
      },
      (error: any) => {
        console.error('Error fetching roles', error);
      }
    );

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const userData = this.form.value;
      this.authService.getUsers().subscribe(
        (data: any[]) => {
          const user = data.find(user => user.email === userData.email);
          if (user) {
            const userId = user.id.toString();
            // Call the signup method from your AuthService
            this.authService.editUserByAdmin(userData,userId).subscribe(
              (response: any) => {
                console.log('User edited successfully', response);
                this.dialogRef.close(userData);
                window.location.reload();
              },
              (error: any) => {
                console.error('Error editing user', error);
                this.errorMessage = error.error;
              }
            );
          } else {
            console.error('User not found');
          }
        },
        (error: any) => {
          console.error('Error fetching users', error);
        }
      );
      console.log('User:', userData);
      // Call the signup method from your AuthService
      /*this.authService.editUserByAdmin(userData).subscribe(
        (response: any) => {
          console.log('User edited successfully', response);
          this.dialogRef.close(userData);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error editing user', error);
          this.errorMessage = error.error;
        }
      );*/
    }
  }
}


