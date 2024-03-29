import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuildingService } from '../../../services/building.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditBuildingComponent } from '../edit-building/edit-building.component';

@Component({
  selector: 'app-get-buildings',
  templateUrl: './get-buildings.component.html',
  styleUrls: ['./get-buildings.component.scss']
})
export class GetBuildingsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['letter', 'description', 'code', 'dimensions', 'actions' ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private buildingService: BuildingService, private dialog: MatDialog) {}

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

  editBuilding(building: any) {
    // Open the edit building dialog
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
  }
}

