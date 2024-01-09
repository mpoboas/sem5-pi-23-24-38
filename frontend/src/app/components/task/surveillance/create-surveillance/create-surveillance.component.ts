import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { FloorService } from '../../../../services/floor.service';
import { BuildingService } from '../../../../services/building.service';

export interface Floors {
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingId: string;
  map: string;
  json: string;
}

export interface SurveillanceTaskData {
  building: string;
  emergencyContact: string;
  isPending: boolean;
  isApproved: boolean;
  active: boolean;
  floors: Floors[];
}

@Component({
  selector: 'app-create-surveillance',
  templateUrl: './create-surveillance.component.html',
  styleUrls: ['./create-surveillance.component.scss']
})
export class CreateSurveillanceComponent implements OnInit {
  form: FormGroup;
  buildingOptions: any[] = [];
  floorOptions: any[] = [];
  selectedBuilding: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SurveillanceTaskData,
    public dialogRef: MatDialogRef<CreateSurveillanceComponent>,
    private fb: FormBuilder,
    private surveillanceTaskService: TaskService,
    private buildingService: BuildingService,
    private floorService: FloorService,
  ) {
    this.form = this.fb.group({
      emergencyContact: [data.emergencyContact, Validators.required],
      building: [data.building, Validators.required],
      floors: [[]], // Array to store selected floors
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

  onBuildingChange(): void {
    this.buildingService.findBuildingByCode(this.form.value.building).subscribe(
      (building: any) => {
        this.selectedBuilding = building.id;
        this.floorService.getBuildingFloors(building.id).subscribe(
          (floors: any[]) => {
            this.floorOptions = floors;
          },
          (error: any) => {
            console.error('Error fetching floors', error);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching building', error);
      }
    )
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const selectedFloors = this.form.value.floors;

      const surveillanceTaskData = {
        building: this.selectedBuilding,
        emergencyContact: this.form.value.emergencyContact,
        floors: selectedFloors,
        isPending: true,
        isApproved: false,
      };

      this.surveillanceTaskService.createSurveillanceTask(surveillanceTaskData).subscribe(
        (response: any) => {
          console.log('Surveillance task created successfully', response);
          this.dialogRef.close(surveillanceTaskData);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error creating surveillance task', error);
        }
        );
      }
    }
}