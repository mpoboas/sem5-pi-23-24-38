import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElevatorService } from '../elevator/elevator.service';
import { BuildingService } from '../building/building.service';
import { Location } from '@angular/common';


export interface ElevatorData {
  id: string;
  x: number;
  y: number;
  buildingId: string;
}


@Component({
  selector: 'app-edit-elevator',
  templateUrl: './edit-elevator.component.html',
  styleUrls: ['./edit-elevator.component.scss']
})
export class EditElevatorComponent {
  form: FormGroup;
  buildingOptions: any[] = [];
  selectedBuildingId: string | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ElevatorData,
    public dialogRef: MatDialogRef<EditElevatorComponent>,
    private fb: FormBuilder,
    private elevatorService: ElevatorService,
    private buildingService: BuildingService,
    private location: Location,) {
      this.form = this.fb.group({
        id: [data.id, Validators.required],
        x: [data.x],
        y: [data.y],
        buildingId: [data.buildingId],
      }
    );
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
      const elevatorData = this.form.value;
      this.buildingService.findBuildingByCode(elevatorData.buildingId).subscribe(
        (building: any) => {
          elevatorData.buildingId = building.id;
          console.log(elevatorData);
          this.elevatorService.updateElevator(elevatorData).subscribe(
            (response: any) => {
              console.log('Elevator updated successfully', response);
              this.dialogRef.close(elevatorData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error updating elevator', error);
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
