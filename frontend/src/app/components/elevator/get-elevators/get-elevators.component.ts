import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ElevatorService } from '../../../services/elevator.service';
import { MatDialog } from '@angular/material/dialog';
import { EditElevatorComponent } from '../edit-elevator/edit-elevator.component';
import { BuildingService } from '../../../services/building.service';
import { FloorService } from '../../../services/floor.service';

@Component({
  selector: 'app-get-elevators',
  templateUrl: './get-elevators.component.html',
  styleUrls: ['./get-elevators.component.scss']
})
export class GetElevatorsComponent implements OnInit {
  displayedColumns: string[] = ['buildingId','name','coordinates', 'floors', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private elevatorService: ElevatorService,
    private buildingService: BuildingService,
    private dialog: MatDialog,
    private floorService: FloorService) {}

  ngOnInit() {
    this.elevatorService.getElevators().subscribe(
      (elevator: any) => {
        this.getBuildingCode(elevator);

      },
      (error: any) => {
        console.error('Error fetching elevators', error);
      }
    );
  }


  getBuildingCode(elevator: any) {
    elevator.forEach((element: any) => {
      this.buildingService.getBuildingCode(element.buildingId).subscribe(
        (building: any) => {
          element.buildingId = building;


          this.dataSource = new MatTableDataSource(elevator);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;


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

  editElevator(elevator: any) {
    // Open the edit elevator dialog
     const dialogRef = this.dialog.open(EditElevatorComponent, {
       width: '500px',
       data: elevator
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         // If the user clicked save, update the elevator
         this.elevatorService.updateElevator(result).subscribe(
           (data: any) => {
             console.log('elevator updated', data);
             this.ngOnInit();
           },
           (error: any) => {
             console.error('Error updating elevator', error);
           }
         );
       }
     });
  }




}
