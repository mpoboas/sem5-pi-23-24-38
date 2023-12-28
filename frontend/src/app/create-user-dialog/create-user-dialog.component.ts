import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

export interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  nif: string;
}

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})

export class CreateUserDialogComponent {
  form: FormGroup;
  roleOptions: any[] = [];
  errorMessage: string | null = null;
  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, Validators.required],
      password: [data.password, Validators.required],
      role: [data.role, Validators.required],
      phoneNumber: [data.phoneNumber, Validators.required],
      nif: [data.nif, Validators.required],
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
    console.log('User:', this.form.value);
    if (this.form.valid) {
      const userData = this.form.value;
      
      // Call the createBuilding method from your BuildingService
      this.authService.signup(userData).subscribe(
        (response: any) => {
          console.log('User created successfully', response);
          this.dialogRef.close(userData);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error creating user', error);
          this.errorMessage = error.error;
        }
      );
    }
  }
}
