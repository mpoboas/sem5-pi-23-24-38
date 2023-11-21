import { Component, OnInit } from '@angular/core';
import { ClassroomData, CreateClassroomComponent } from '../create-classroom/create-classroom.component';
import { ClassroomService } from './classroom.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit{
 
  classrooms: any[] = [];

  constructor(private classroomService: ClassroomService, private dialog: MatDialog) {}

  ngOnInit() {
    this.classroomService.getClassrooms().subscribe(
      (data: any) => {
        this.classrooms = data;
      },
      (error: any) => {
        console.error('Error fetching classrooms', error);
      }
    );
  }

  createClassroom() {
  }

  editClassroom() {
  }

  showAllClassrooms() {
    this.classroomService.getClassrooms().subscribe(
      (data: any) => {
        this.classrooms = data;
      },
      (error: any) => {
        console.error('Error fetching classrooms', error);
      }
    );
  }

  openCreateClassroomDialog(): void {
    const dialogRef = this.dialog.open(CreateClassroomComponent, {
      data: { },
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result: ClassroomData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Classroom created:', result);
      }
    });
  }

  
}
