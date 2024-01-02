import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../../../services/building.service';

export interface Range {
  min: number;
  max: number;
}

@Component({
  selector: 'app-get-buildings-by-range',
  templateUrl: './get-buildings-by-range.component.html',
  styleUrls: ['./get-buildings-by-range.component.scss']
})
export class GetBuildingsByRangeComponent {
  form: FormGroup;
  buildings: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Range,
    public dialogRef: MatDialogRef<GetBuildingsByRangeComponent>,
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      minFloor: [data.min, Validators.required],
      maxFloor: [data.max, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }



  getBuildingsByMinMaxFloors(): void {
    console.log(this.form);
    if (this.form.valid) {
      const { minFloor, maxFloor } = this.form.value;
      const range = `${minFloor}-${maxFloor}`;

      // Call the createBuilding method from your BuildingService
      this.buildingService.findBuildingByMinMaxFloors(range).subscribe(
        (response: any) => {
          this.buildings = response;
          console.log('Search was successful:', this.buildings);

        },
        (error: any) => {
          console.error('Error finding building', error);
        }
      );
    }
  }

}
