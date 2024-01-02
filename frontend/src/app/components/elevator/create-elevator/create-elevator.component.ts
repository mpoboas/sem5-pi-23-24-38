import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ElevatorService } from '../../../services/elevator.service';
import { BuildingService } from '../../../services/building.service';
import { FloorService } from '../../../services/floor.service';

export interface ElevatorData {
  name: string;
  buildingCode: string;
  cordx: number;
  cordy: number;
}

@Component({
  selector: 'app-create-elevator',
  templateUrl: './create-elevator.component.html',
  styleUrls: ['./create-elevator.component.scss']
})
export class CreateElevatorComponent implements OnInit {
  form: FormGroup;
  buildingOptions: any[] = [];
  floorOptions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ElevatorData,
    public dialogRef: MatDialogRef<CreateElevatorComponent>,
    private fb: FormBuilder,
    private elevatorService: ElevatorService,
    private buildingService: BuildingService,
    private floorService: FloorService,
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      buildingCode: [data.buildingCode, Validators.required],
      cordx: [data.cordx, Validators.required],
      cordy: [data.cordy, Validators.required],
      floors: this.fb.array([]), // Use FormArray for floors
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
    const selectedBuilding = this.form.value.buildingCode;

    this.floorService.getBuildingFloors(selectedBuilding.id).subscribe(
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
    floorsFormArray.clear(); // Clear existing floor controls

    this.floorOptions.forEach(floor => {
      floorsFormArray.push(this.fb.control(false)); // Add checkboxes dynamically
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
      const selectedFloors = this.floorOptions
        .filter((floor, index) => this.form?.get(`floors.${index}`)?.value)
        .map(floor => floor.id);

      const building = this.form?.value.buildingCode;
      const elevatorData = {
        name: this.form?.value.name,
        cordx: this.form?.value.cordx,
        cordy: this.form?.value.cordy,
        floors: selectedFloors,
        buildingId: building.id,
      };
      console.log('Elevator data:', elevatorData);
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
    }
  }
}
