import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuildingService } from '../building/building.service'; // Import your building service

@Component({
  selector: 'app-get-buildings',
  templateUrl: './get-buildings.component.html',
  styleUrls: ['./get-buildings.component.scss']
})
export class GetBuildingsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['letter', 'description', 'code', 'length', 'width' ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
    // Fetch the list of buildings from your service
    this.buildingService.getBuildings().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
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
}

