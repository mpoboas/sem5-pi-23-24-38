import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloorService } from '../floor/floor.service';
import { Location } from '@angular/common';
import { BuildingService } from '../building/building.service';

export interface FloorData {
  id: string;
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingId: string;
  map: string;
}


@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.scss']
})
export class EditFloorComponent {
  form: FormGroup;
  buildingOptions: any[] = [];
  selectedBuildingId: string | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FloorData,
    public dialogRef: MatDialogRef<EditFloorComponent>,
    private fb: FormBuilder,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private location: Location,) {
      this.form = this.fb.group({
        id: [data.id, Validators.required],
        floorNumber: [data.floorNumber],
        description: [data.description],
        length: [data.length],
        width: [data.width],
        buildingId: [data.buildingId],
        map: [data.map],
      });

  }

  ngOnInit(): void {
    this.loadBuildingOptions();
  }

  loadBuildingOptions(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: any[]) => {
        this.buildingOptions = buildings;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const floorData = this.form.value;
      this.buildingService.findBuildingByCode(floorData.buildingId).subscribe(
        (building: any) => {
          floorData.buildingId = building.id;
          console.log(floorData);
          this.floorService.updateFloor(floorData).subscribe(
            (response: any) => {
              console.log('Floor updated successfully', response);
              this.dialogRef.close(floorData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error updating floor', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching building', error);
        }
      );
     
    }
  }

}
