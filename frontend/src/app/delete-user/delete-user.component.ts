import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  constructor(private authService: AuthService) {}

  onDelete(){
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
