import { Component, OnInit, ViewChild } from '@angular/core';
import { FloorService } from '../floor/floor.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BuildingService } from '../building/building.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFloorComponent } from '../edit-floor/edit-floor.component';
@Component({
  selector: 'app-get-floors',
  templateUrl: './get-floors.component.html',
  styleUrls: ['./get-floors.component.scss']
})
export class GetFloorsComponent implements OnInit {
  displayedColumns: string[] = ['floorNumber', 'description', 'dimensions', 'building', 'map',  'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private floorService: FloorService,private buildingService: BuildingService,private dialog:  MatDialog) {}

  ngOnInit() {
    this.floorService.getFloors().subscribe(
      (floor: any) => {
        this.getBuildingCode(floor);
          
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  getBuildingCode(floor: any) {
    floor.forEach((element: any) => {
      this.buildingService.getBuildingCode(element.buildingId).subscribe(
        (building: any) => {
          element.buildingId = building;      
          this.dataSource = new MatTableDataSource(floor);
          this.dataSource.paginator = this.paginator;
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

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageSize = 10;
      });
    }
  }

  editFloor(floor: any) {
    // Open the edit floor dialog
    const dialogRef = this.dialog.open(EditFloorComponent, {
      width: '800px',
      data: floor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the floor in the database
        this.floorService.updateFloor(result).subscribe(
          (data: any) => {
            // Update the floor in the table
            const index = this.dataSource.data.findIndex(b => b.id === data.id);
            this.dataSource.data[index] = data;
            this.dataSource._updateChangeSubscription();
          },
          (error: any) => {
            console.error('Error updating floor', error);
          }
        );
      }
    });
  }


}
