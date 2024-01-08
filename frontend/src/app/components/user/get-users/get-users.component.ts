import { Component, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss']
})
export class GetUsersComponent {
  displayedColumns: string[] = ['name', 'email', 'role', 'phoneNumber', 'nif', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    // Fetch the list of users from your service
    this.authService.getUsers().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  ngAfterViewInit() {
    // Set up sorting and pagination after data is loaded
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageSize = 10;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(user: any) {
    // Open the edit user dialog
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the user in the database
        this.authService.editUser(result).subscribe(
          (data: any) => {
            // Update the user in the table
            const index = this.dataSource.data.findIndex(b => b.id === data.id);
            this.dataSource.data[index] = data;
            this.dataSource._updateChangeSubscription();
          },
          (error: any) => {
            console.error('Error updating user', error);
          }
        );
      }
    });
  }

  deleteUser(userData: any) {
    if (userData.id === this.authService.getUserId()) {
      const selfDestructModalElement = document.getElementById('selfDestructModal');
      const selfDestructModal = new Modal(selfDestructModalElement);
      selfDestructModal.show();
      return;
    }
  
    // Show the custom confirmation modal
    const confirmationModalElement = document.getElementById('confirmationModal');
    if (!confirmationModalElement) {
      console.error('Confirmation modal element not found.');
      return;
    }
  
    const confirmationModal = new Modal(confirmationModalElement);
    const confirmButton = document.getElementById('confirmButton');
  
    if (!confirmButton) {
      console.error('Confirm button not found.');
      return;
    }
  
    confirmButton.addEventListener('click', () => {
      confirmationModal.hide();
  
      // Proceed with the deletion logic
      this.authService.getUsers().subscribe(
        (data: any[]) => {
          const user = data.find((user) => user.email === userData.email);
          if (user) {
            const userId = user.id.toString();
            // Call the deleteAccountByAdmin method from your AuthService
            this.authService.deleteAccountByAdmin(userId).subscribe(
              (response) => {
                console.log('Delete successful:', response);
                window.location.reload();
              },
              (error) => {
                console.error('Error during delete:', error);
                // Handle error, display error message, etc.
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
    });
  
    // Show the confirmation modal
    confirmationModal.show();
  }
  

}
