import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloorService } from '../floor/floor.service';
import { BuildingService } from '../building/building.service';

export interface FloorData {
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingCode: string;
}

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.scss']
})
export class CreateFloorComponent implements OnInit {
  form: FormGroup;
  buildingOptions: any[] = [];
  selectedBuildingId: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FloorData,
    public dialogRef: MatDialogRef<CreateFloorComponent>,
    private fb: FormBuilder,
    private floorService: FloorService,
    private buildingService: BuildingService,
  ) {
    this.form = this.fb.group({
      floorNumber: [data.floorNumber, Validators.required],
      description: [data.description],
      length: [data.length, Validators.required],
      width: [data.width, Validators.required],
      buildingCode: [data.buildingCode, Validators.required],
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
      const floorData = {
        floorNumber: this.form.value.floorNumber,
        description: this.form.value.description,
        length: this.form.value.length,
        width: this.form.value.width,
        buildingId: null,
      };
  
      const buildingCode = this.form.value.buildingCode;
  
      this.buildingService.findBuildingByCode(buildingCode).subscribe(
        (building: any) => {
          floorData.buildingId = building ? building.id : null;
          console.log('Floor data:', floorData);
  
          // Call the createFloor method from your FloorService
          this.floorService.createFloor(floorData).subscribe(
            (response: any) => {
              console.log('Floor created successfully', response);
              this.dialogRef.close(floorData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error creating floor', error);
            }
          );
        },
        (error: any) => {
          console.error('Error finding building by code', error);
        }
      );
    }
  }
  
}
