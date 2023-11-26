import { Component, Inject, OnInit } from '@angular/core';
import { ElevatorService } from '../elevator/elevator.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BuildingService } from '../building/building.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FloorService } from '../floor/floor.service';
import { FormControl } from '@angular/forms';
export interface ElevatorData {
    name: string;
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
  floorOptions: string[] = [];
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
      floors: this.fb.array([]), // Use FormArray for floors
    });
    this.floorOptions.forEach(floor => {
      this.form.addControl(floor, new FormControl(false)); // Add checkboxes dynamically
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
    const buildingCode = this.form.value.buildingCode;
    const selectedBuilding = this.buildingOptions.find(building => building === buildingCode);
    console.log(selectedBuilding);
    this.floorService.getBuildingFloors(selectedBuilding.id).subscribe(
      (floors: any[]) => {
        console.log('Floors for building', floors);
        this.floorOptions = [];
        floors.forEach(floor => {
          this.floorOptions.push(floor.floorNumber);
        }
        );
        console.log(this.floorOptions);
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
      floorsFormArray.push(this.fb.control(true)); // Add checkboxes dynamically
    });
  }


  getFloorControl(floor: any): FormControl {
    return this.form.get(floor.floorNumber) as FormControl;
  }



  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      
      console.log(this.floorOptions);
      console.log(this.form.value);
      const selectedFloors = this.floorOptions.filter(floor => this.form.get(floor)?.value);
      console.log(selectedFloors);
      const building = this.form.value.buildingCode;
      const elevatorData = {
        name: this.form.value.name,
        floors: selectedFloors,
        buildingId: null,
      };
      this.buildingService.findBuildingByCode(building.code).subscribe(
        (building: any) => {
          elevatorData.buildingId = building ? building.id : null;
          console.log('Elevator data:', elevatorData);
  
          // Call the createFloor method from your FloorService
          this.elevatorService.createElevator(elevatorData).subscribe(
            (response: any) => {
              console.log('Elevator created successfully', response);
              this.dialogRef.close(elevatorData);
              //window.location.reload();
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
