import { Component, OnInit } from '@angular/core';
import { BuildingService } from './building.service';

import { MatDialog } from '@angular/material/dialog';
import { BuildingData, CreateBuildingDialogComponent } from '../create-building-dialog/create-building-dialog.component';


@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  buildings: any[] = [];

  constructor(private buildingService: BuildingService, private dialog: MatDialog) {}

  ngOnInit() {
    this.buildingService.getBuildings().subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }

  createBuilding() {
  }

  editBuilding() {
  }

  showAllBuildings() {
    this.buildingService.getBuildings().subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }

  openCreateBuildingDialog(): void {
    const dialogRef = this.dialog.open(CreateBuildingDialogComponent, {
      data: { name: '', description: '' },
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result: BuildingData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Building created:', result);
      }
    });
  }
  
}
