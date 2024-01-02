// app/building-upload.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BuildingService } from '../services/building.service';

@Injectable({
  providedIn: 'root'
})
export class UploadBuildingService {
  constructor(private buildingService: BuildingService, private dialog: MatDialog) {}

  processBuildingData(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const jsonData = JSON.parse(e.target.result);
      this.confirmBuildingData(jsonData);
    };

    reader.readAsText(file);
  }

  private confirmBuildingData(buildings: any[]): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { buildings: buildings },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.processConfirmedBuildings(buildings);
      }
    });
  }

  private processConfirmedBuildings(buildings: any[]): void {
    buildings.forEach((building: any) => {
      if (building.id) {
        // Existing building with ID, update
        this.buildingService.updateBuilding(building).subscribe(
          (data: any) => {
            console.log(`Building updated: ${building.id}`);
          },
          (error: any) => {
            console.error(`Error updating building ${building.id}`, error);
          }
        );
      } else {
        // New building, check if building with the same code exists
        this.buildingService.findBuildingByCode(building.code).subscribe(
          (existingBuilding: any) => {
            if (existingBuilding) {
              // Building with the same code exists, update with the same ID
              building.id = existingBuilding.id;
              this.buildingService.updateBuilding(building).subscribe(
                (data: any) => {
                  console.log(`Building updated (existing with same code): ${building.id}`);
                },
                (error: any) => {
                  console.error(`Error updating existing building with same code ${building.code}`, error);
                }
              );
            } else {
              // Building with the code doesn't exist, create new building
              this.buildingService.createBuilding(building).subscribe(
                (data: any) => {
                  console.log(`Building created: ${data.id}`);
                },
                (error: any) => {
                  console.error('Error creating building', error);
                }
              );
            }
          },
          (error: any) => {
            console.error('Error checking for existing building', error);
          }
        );
      }
    });
  }
}
