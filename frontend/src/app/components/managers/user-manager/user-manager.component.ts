import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CreateUserComponent, UserData } from '../../user/create-user/create-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent {

  constructor(private authService: AuthService, private dialog: MatDialog) {}


  openCreateUserDialog() {
    console.log('Opening create user dialog...');
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { },
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result: UserData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Building created:', result);
      }
    });
  }

}
