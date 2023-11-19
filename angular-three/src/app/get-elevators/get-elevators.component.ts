import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ElevatorService } from '../elevator/elevator.service';

@Component({
  selector: 'app-get-elevators',
  templateUrl: './get-elevators.component.html',
  styleUrls: ['./get-elevators.component.scss']
})
export class GetElevatorsComponent implements OnInit {
  displayedColumns: string[] = ['buildingId','x', 'y'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private elevatorService: ElevatorService) {}

  ngOnInit() {
    this.elevatorService.getElevators().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      },
      (error: any) => {
        console.error('Error fetching elevators', error);
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

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.pageSize = 10;
    }
  }
}
