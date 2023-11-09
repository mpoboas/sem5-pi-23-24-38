import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public dialogRef: MatDialogRef<CreateBuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuildingData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [data.letter, Validators.required],
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
      this.dialogRef.close(this.form.value);
    }
  }
}
