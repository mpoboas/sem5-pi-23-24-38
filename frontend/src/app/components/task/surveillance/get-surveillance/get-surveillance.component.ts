import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TaskService } from '../../../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { BuildingService } from '../../../../services/building.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-get-surveillance',
  templateUrl: './get-surveillance.component.html',
  styleUrls: ['./get-surveillance.component.scss']
})
export class GetSurveillanceComponent {
  displayedColumns: string[] = ['building', 'floors', 'emergencyContact'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService, private buildingService: BuildingService, private dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.getSurveillanceTasks().subscribe(
      (data: any[]) => {
        this.getBuilding(data);
      },
      (error: any) => {
        console.error('Error fetching tasks', error);
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

  getBuilding(task: any) {
    task.forEach((element: any) => {
      this.buildingService.findBuildingById(element.building).subscribe(
        (building: any) => {
          element.building = building.code+" - "+building.description;
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
      this.displayedColumns = ['building', 'floors', 'emergencyContact'];
      this.taskService.getSurveillanceTasks().subscribe(
        (data: any[]) => {
          if (data.length > 0){
            this.getBuilding(data);
          } else {
            this.dataSource = new MatTableDataSource(data);
            setTimeout(() => {
              this.paginator.pageSize = 10;
            });
          }
        },
        (error: any) => {
          console.error('Error fetching surveillance tasks', error);
        }
      );
    } else if (filter === 'approved') {
      this.displayedColumns = ['building', 'floors', 'emergencyContact'];
      this.taskService.getApprovedSurveillanceTasks().subscribe(
        (data: any[]) => {
          if (data.length > 0){
            this.getBuilding(data);
          } else {
            this.dataSource = new MatTableDataSource(data);
            setTimeout(() => {
              this.paginator.pageSize = 10;
            });
          }
        },
        (error: any) => {
          console.error('Error fetching approved surveillance tasks', error);
        }
      );
    } else if (filter === 'pending') {
      this.displayedColumns = ['building', 'floors', 'emergencyContact', 'actions'];
      this.taskService.getPendingSurveillanceTasks().subscribe(
        (data: any[]) => {
          if (data.length > 0){
            this.getBuilding(data);
          } else {
            this.dataSource = new MatTableDataSource(data);
            setTimeout(() => {
              this.paginator.pageSize = 10;
            });
          }
        },
        (error: any) => {
          console.error('Error fetching pending surveillance tasks', error);
        }
      );
    }
    this.selectedFilter = filter;
  }

  approveTask(task: any): void {
    this.taskService.approveSurveillanceTask(task).subscribe(
      (data: any) => {
        console.log('Task approved', data);
      },
      (error: any) => {
        console.error('Error approving task', error);
      }
    );
  }

  denyTask(task: any): void {
    this.taskService.denySurveillanceTask(task).subscribe(
      (data: any) => {
        console.log('Task denied', data);
      },
      (error: any) => {
        console.error('Error denying task', error);
      }
    );
  }
}
