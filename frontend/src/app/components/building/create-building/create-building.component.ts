import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../../../services/building.service';

export interface BuildingData {
  letter: string;
  description: string;
  length: number;
  width: number;
  code: string;
}

@Component({
  selector: 'create-building',
  templateUrl: 'create-building.component.html',
})
export class CreateBuildingComponent {
  form: FormGroup;

  errorMessage: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BuildingData,
    public dialogRef: MatDialogRef<CreateBuildingComponent>,
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
          this.errorMessage = error.error;
        }
      );
    }
  }
}
