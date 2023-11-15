import { Component, ViewChild } from '@angular/core';
import { RobotService } from '../robot/robot.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-get-robots',
  templateUrl: './get-robots.component.html',
  styleUrls: ['./get-robots.component.scss']
})
export class GetRobotsComponent {
  displayedColumns: string[] = ['nickname','serialNr','description','isActive','robotTypeId'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private robotService: RobotService) {}

  ngOnInit() {
    this.robotService.getRobots().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      },
      (error: any) => {
        console.error('Error fetching robots', error);
      }
    );
  }

  getRobotType(robot: any) {
    return robot.robotType.brand + ' ' + robot.robotType.model;
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.pageSize = 10;
    }
  }

  onToggle(robot: any) {
    // Toggle the robot's active status
    this.robotService.toggleRobot(robot).subscribe(
      (data: any) => {
        console.log('Robot toggled', data);
        robot.isActive = !robot.isActive;
      },
      (error: any) => {
        console.error('Error toggling robot', error);
      }
    );


  }
  
}
