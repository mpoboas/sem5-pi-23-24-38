import { Component, OnInit, ViewChild } from '@angular/core';
import { FloorService } from '../floor/floor.service';
import { MatTableDataSource } from '@angular/material/table';
import { floor } from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-get-floors',
  templateUrl: './get-floors.component.html',
  styleUrls: ['./get-floors.component.scss']
})
export class GetFloorsComponent implements OnInit {
  displayedColumns: string[] = ['floorNumber', 'description', 'length', 'width', 'buildingId'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private floorService: FloorService) {}

  ngOnInit() {
    this.floorService.getFloors().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      },
      (error: any) => {
        console.error('Error fetching floors', error);
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
