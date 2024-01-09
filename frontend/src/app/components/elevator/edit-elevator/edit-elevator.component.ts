import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ElevatorService } from '../../../services/elevator.service';
import { BuildingService } from '../../../services/building.service';
import { FloorService } from '../../../services/floor.service';

export interface ElevatorData {
  id: string;
  name: string;
  buildingId: string;
  cordx: number;
  cordy: number;
}

@Component({
  selector: 'app-edit-elevator',
  templateUrl: './edit-elevator.component.html',
  styleUrls: ['./edit-elevator.component.scss'],
})
export class EditElevatorComponent implements OnInit {
  form: FormGroup;
  buildingOptions: any[] = [];
  floorOptions: any[] = [];
  errorMessage: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ElevatorData,
    public dialogRef: MatDialogRef<EditElevatorComponent>,
    private fb: FormBuilder,
    private elevatorService: ElevatorService,
    private buildingService: BuildingService,
    private floorService: FloorService
  ) {
    this.form = this.fb.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      cordx: [data.cordx],
      cordy: [data.cordy],
      buildingId: [data.buildingId],

      floors: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadBuildingOptions();
    this.loadElevatorFloors();
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

  loadElevatorFloors(): void {
    // You may need to replace this logic based on how you retrieve floors for the elevator
    this.elevatorService.getElevatorFloors(this.data.id).subscribe(
      (floors: any[]) => {
        this.floorOptions = floors;
        this.setupFloorCheckboxes();
      },
      (error: any) => {
        console.error('Error fetching elevator floors', error);
      }
    );
  }

  onBuildingChange(): void {
    const building = this.buildingOptions.find((b) => b.code === this.form.value.buildingId);
    
    this.floorService.getBuildingFloors(building.id).subscribe(
      (floors: any[]) => {
        console.log('Selected building floors:', floors);
        this.floorOptions = floors;
        console.log('Floor options:', this.floorOptions);
        this.setupFloorCheckboxes();
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  setupFloorCheckboxes(): void {
    const floorsFormArray = this.form.get('floors') as FormArray;
    floorsFormArray.clear();

    this.floorOptions.forEach((floor) => {
      floorsFormArray.push(this.fb.control(false));
    });
  }

  getFloorControl(index: number): FormControl {
    const floorsFormArray = this.form.get('floors') as FormArray;
    return floorsFormArray.controls[index] as FormControl;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const elevatorData = this.form.value;
      // Update elevator data with building information if needed
      const building = this.buildingOptions.find((b) => b.code === elevatorData.buildingId);
      if (building) {
        elevatorData.buildingId = building.id;
      }

      // Extract selected floors
      const selectedFloors = this.floorOptions
        .filter((floor, index) => this.form?.get(`floors.${index}`)?.value)
        .map((floor) => floor.id);

      // Update elevator with new data
      elevatorData.floors = selectedFloors;

      // Call the updateElevator method from your ElevatorService
      this.elevatorService.updateElevator(elevatorData).subscribe(
        (response: any) => {
          console.log('Elevator updated successfully', response);
          this.dialogRef.close(elevatorData);
          window.location.reload(); // Note: Reloading the entire page might not be the best UX, consider alternative approaches
        },
        (error: any) => {
          console.error('Error updating elevator', error);
          this.errorMessage = error.error;
        }
      );
    }
  }
}
