import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../../../services/building.service';


export interface BuildingData {
  id: string;
  letter: string;
  description: string;
  length: number;
  width: number;
  code: string;
}

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.scss']
})
export class EditBuildingComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BuildingData,
    public dialogRef: MatDialogRef<EditBuildingComponent>,
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      id: [data.id, Validators.required],
      letter: [data.letter],
      description: [data.description],
      length: [data.length],
      width: [data.width],
      code: [data.code],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const buildingData = this.form.value;

      // Call the updateBuilding method from your BuildingService
      this.buildingService.updateBuilding(buildingData).subscribe(
        (response: any) => {
          console.log('Building updated successfully', response);
          this.dialogRef.close(buildingData);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error updating building', error);
        }
      );
    }
  }
}
