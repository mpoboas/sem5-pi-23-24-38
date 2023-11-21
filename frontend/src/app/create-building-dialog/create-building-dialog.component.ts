import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../building/building.service';

export interface BuildingData {
  letter: string;
  description: string;
  length: number;
  width: number;
  code: string;
}

@Component({
  selector: 'create-building-dialog',
  templateUrl: 'create-building-dialog.component.html',
})
export class CreateBuildingDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BuildingData,
    public dialogRef: MatDialogRef<CreateBuildingDialogComponent>,
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      letter: [data.letter, Validators.required],
      description: [data.description],
      length: [data.length, Validators.required],
      width: [data.width, Validators.required],
      code: [data.code, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const buildingData = this.form.value;
      
      // Call the createBuilding method from your BuildingService
      this.buildingService.createBuilding(buildingData).subscribe(
        (response: any) => {
          console.log('Building created successfully', response);
          this.dialogRef.close(buildingData);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error creating building', error);
        }
      );
    }
  }
}
