import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TaskService } from '../../../../services/task.service';
import { ClassroomService } from '../../../../services/classroom.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-get-pickup-and-delivery',
  templateUrl: './get-pickup-and-delivery.component.html',
  styleUrls: ['./get-pickup-and-delivery.component.scss'],
})
export class GetPickupAndDeliveryComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['pickupClassroom', 'deliveryClassroom', 'pickupContact', 'deliveryContact', 'confirmationCode', 'deliveryDescription'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService, private classroomService: ClassroomService, private dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.getPickupAndDeliveryTasks().subscribe(
      (data: any[]) => {
        this.getClassroom(data);
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageSize = 10;
      });
    }
  }

  getClassroom(task: any) {
    task.forEach((element: any) => {
      this.classroomService.getClassrooms().subscribe(
        (classrooms: any[]) => {
          console.log(classrooms);
          const pickup = classrooms.find((classroom: any) => classroom.id === element.pickupClassroom);
          const delivery = classrooms.find((classroom: any) => classroom.id === element.deliveryClassroom);
          console.log(pickup);
          element.pickupClassroom = pickup.name;
          element.deliveryClassroom = delivery.name;
          this.dataSource = new MatTableDataSource(task);
          setTimeout(() => {
            this.paginator.pageSize = 10;
          });
        },
        (error: any) => {
          console.error('Error fetching building', error);
        }
      );
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedFilter: string = 'all';

  setFilter(filter: string): void {
    if (filter === 'all') {
      this.displayedColumns = ['pickupClassroom', 'deliveryClassroom', 'pickupContact', 'deliveryContact', 'confirmationCode', 'deliveryDescription'];
      this.taskService.getPickupAndDeliveryTasks().subscribe(
        (data: any[]) => {
          if (data.length > 0){
            this.getClassroom(data);
          } else {
            this.dataSource = new MatTableDataSource(data);
            setTimeout(() => {
              this.paginator.pageSize = 10;
            });
          }
        },
        (error: any) => {
          console.error('Error fetching pickup and delivery tasks', error);
        }
      );
    } else if (filter === 'approved') {
      this.displayedColumns = ['pickupClassroom', 'deliveryClassroom', 'pickupContact', 'deliveryContact', 'confirmationCode', 'deliveryDescription'];
      this.taskService.getApprovedPickupAndDeliveryTasks().subscribe(
        (data: any[]) => {
          if (data.length > 0){
            this.getClassroom(data);
          } else {
            this.dataSource = new MatTableDataSource(data);
            setTimeout(() => {
              this.paginator.pageSize = 10;
            });
          }
        },
        (error: any) => {
          console.error('Error fetching approved pickup and delivery tasks', error);
        }
      );
    } else if (filter === 'pending') {
      this.displayedColumns = ['pickupClassroom', 'deliveryClassroom', 'pickupContact', 'deliveryContact', 'confirmationCode', 'deliveryDescription', 'actions'];
      this.taskService.getPendingPickupAndDeliveryTasks().subscribe(
        (data: any[]) => {
          if (data.length > 0){
            this.getClassroom(data);
          } else {
            this.dataSource = new MatTableDataSource(data);
            setTimeout(() => {
              this.paginator.pageSize = 10;
            });
          }
        },
        (error: any) => {
          console.error('Error fetching pending pickup and delivery tasks', error);
        }
      );
    }
    this.selectedFilter = filter;
  }

  approveTask(task: any): void {
    this.taskService.approvePickupAndDeliveryTask(task).subscribe(
      (data: any) => {
        console.log('Task approved', data);
      },
      (error: any) => {
        console.error('Error approving task', error);
      }
    );
  }

  denyTask(task: any): void {
    this.taskService.denyPickupAndDeliveryTask(task).subscribe(
      (data: any) => {
        console.log('Task denied', data);
      },
      (error: any) => {
        console.error('Error denying task', error);
      }
    );
  }

  /*editBuilding(building: any) {
    const dialogRef = this.dialog.open(EditBuildingComponent, {
      width: '500px',
      data: building
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the building in the database
        this.buildingService.updateBuilding(result).subscribe(
          (data: any) => {
            // Update the building in the table
            const index = this.dataSource.data.findIndex(b => b.id === data.id);
            this.dataSource.data[index] = data;
            this.dataSource._updateChangeSubscription();
          },
          (error: any) => {
            console.error('Error updating building', error);
          }
        );
      }
    });
  }*/
}

