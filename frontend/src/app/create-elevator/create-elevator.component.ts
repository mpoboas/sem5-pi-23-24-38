import { Component, Inject, OnInit } from '@angular/core';
import {ElevatorService } from '../elevator/elevator.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BuildingService } from '../building/building.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ElevatorData {
    x: number;
    y: number;
    buildingCode: string;
}

@Component({
  selector: 'app-create-elevator',
  templateUrl: './create-elevator.component.html',
  styleUrls: ['./create-elevator.component.scss']
})
export class CreateElevatorComponent implements OnInit{
  form: FormGroup;
  buildingOptions: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ElevatorData,
    public dialogRef: MatDialogRef<CreateElevatorComponent>,
    private fb: FormBuilder,
    private elevatorService: ElevatorService,
    private buildingService: BuildingService,
  ) {
    this.form = this.fb.group({
      x: [data.x, Validators.required],
      y: [data.y, Validators.required],
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
      const elevatorData = {
        x: this.form.value.x,
        y: this.form.value.y,
        buildingId: null,
      };
  
      const buildingCode = this.form.value.buildingCode;
  
      this.buildingService.findBuildingByCode(buildingCode).subscribe(
        (building: any) => {
          elevatorData.buildingId = building ? building.id : null;
          console.log('Elevator data:', elevatorData);
  
          // Call the createFloor method from your FloorService
          this.elevatorService.createElevator(elevatorData).subscribe(
            (response: any) => {
              console.log('Elevator created successfully', response);
              this.dialogRef.close(elevatorData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error creating elevator', error);
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
