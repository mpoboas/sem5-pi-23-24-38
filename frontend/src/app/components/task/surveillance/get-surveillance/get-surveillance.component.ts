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
        this.getBuildingCode(data);
      },
      (error: any) => {
        console.error('Error fetching tasks', error);
      }
    );
    console.log("1");
    console.log(this.dataSource.data);
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

  /* getBuildingCode(task: any) {
    console.log("2");
    console.log(task);
    task.forEach((element: any) => {
      this.buildingService.getBuildingCode(element.building).subscribe(
        (building: any) => {
          element.building = building;
          this.dataSource = new MatTableDataSource(element);
          setTimeout(() => {
            this.paginator.pageSize = 10;
          });
        },
        (error: any) => {
          console.error('Error fetching building', error);
        }
      );
    });

  } */

  getBuildingCode(tasks: any[]) {
    console.log("2");
    console.log(tasks);
  
    const observables: any[] = [];
  
    tasks.forEach((element: any) => {
      const observable = this.buildingService.getBuildingCode(element.building);
      observables.push(observable);
    });
  
    forkJoin(observables).subscribe(
      (buildingCodes: any[]) => {
        console.log("Building Codes:", buildingCodes);
  
        tasks.forEach((element, index) => {
          element.building = buildingCodes[index];
        });
  
        console.log("Modified Tasks:", tasks);
  
        this.dataSource = new MatTableDataSource(tasks);
  
        setTimeout(() => {
          this.paginator.pageSize = 10;
        });
      },
      (error: any) => {
        console.error('Error fetching building codes', error);
      }
    );
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
          this.getBuildingCode(data);

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error: any) => {
          console.error('Error fetching pickup and delivery tasks', error);
        }
      );
    } else if (filter === 'approved') {
      this.displayedColumns = ['building', 'floors', 'emergencyContact'];
      this.taskService.getApprovedSurveillanceTasks().subscribe(
        (data: any[]) => {
          this.getBuildingCode(data);

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error: any) => {
          console.error('Error fetching approved pickup and delivery tasks', error);
        }
      );
    } else if (filter === 'pending') {
      this.displayedColumns = ['building', 'floors', 'emergencyContact', 'actions'];
      this.taskService.getPendingSurveillanceTasks().subscribe(
        (data: any[]) => {
          this.getBuildingCode(data);

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error: any) => {
          console.error('Error fetching pending pickup and delivery tasks', error);
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
