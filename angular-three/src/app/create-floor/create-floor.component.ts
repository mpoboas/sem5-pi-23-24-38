import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloorService } from '../floor/floor.service';


export interface FloorData {
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingId: string;
}


@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.scss']
})
export class CreateFloorComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FloorData,
    public dialogRef: MatDialogRef<CreateFloorComponent>,
    private fb: FormBuilder,
    private floorService: FloorService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      floorNumber: [data.floorNumber, Validators.required],
      description: [data.description],
      length: [data.length, Validators.required],
      width: [data.width, Validators.required],
      buildingId: [data.buildingId, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const floorData = this.form.value;
      
      // Call the createBuilding method from your BuildingService
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
    }
  }
}
