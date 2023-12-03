import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClassroomService } from '../classroom/classroom.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FloorService } from '../floor/floor.service';
import { EditClassroomComponent } from '../edit-classroom/edit-classroom.component';

@Component({
  selector: 'app-get-classrooms',
  templateUrl: './get-classroom.component.html',
  styleUrls: ['./get-classroom.component.scss']
})
export class GetClassroomComponent {
    displayedColumns: string[] = ['name', 'description', 'category', 'length', 'width','cordx','cordy', 'floorId','actions' ];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private classroomService: ClassroomService, private floorService: FloorService, private dialog: MatDialog) {}

    ngOnInit() {
      // Fetch the list of classrooms from your service
      this.classroomService.getClassrooms().subscribe(
        (classroom: any) => {
          this.getFloorNumber(classroom);
            
        },
        (error: any) => {
          console.error('Error fetching floors', error);
        }
      );
    }

    getFloorNumber(classroom: any) {
      classroom.forEach((element: any) => {
        this.floorService.getFloorNum(element.floorId).subscribe(
          (floor: any) => {
            element.floorId = floor;      
            this.dataSource = new MatTableDataSource(classroom);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          (error: any) => {
            console.error('Error fetching floor', error);
          }
        );
      });
    }

    ngAfterViewInit() {
      // Set up sorting and pagination after data is loaded
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator.pageSize = 10;
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    editClassroom(classroom: any) {
      
      // Open the edit classroom dialog
      const dialogRef = this.dialog.open(EditClassroomComponent, {
        width: '500px',
        data: classroom
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Update the classroom in the database
          this.classroomService.updateClassroom(result).subscribe(
            (data: any) => {
              // Update the classroom in the table
              const index = this.dataSource.data.findIndex(c => c.id === data.id);
              this.dataSource.data[index] = data;
              this.dataSource._updateChangeSubscription();
            },
            (error: any) => {
              console.error('Error updating classroom', error);
            }
          );
        }
      });
    }
  }
