import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../building/building.service';



@Component({
  selector: 'app-get-building-by-minmax-floors-dialog',
  templateUrl: './get-building-by-minmax-floors-dialog.component.html',
  styleUrls: ['./get-building-by-minmax-floors-dialog.component.scss']
})
export class GetBuildingByMinmaxFloorsDialogComponent {
  form: FormGroup;
  buildings: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GetBuildingByMinmaxFloorsDialogComponent>,
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      minFloor: [null, Validators.required],
      maxFloor: [null, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getBuildings() {
    this.buildingService.getBuildings().subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }

  getBuildingsByMinMaxFloors(): void {
    if (this.form.valid) {
      const { minFloor, maxFloor } = this.form.value;
      const range = `${minFloor}-${maxFloor}`;
      
      // Call the createBuilding method from your BuildingService
      this.buildingService.findBuildingByMinMaxFloors(range).subscribe(
        (response: any) => {
          console.log('Search was successful:', response);
          this.getBuildings();
        },
        (error: any) => {
          console.error('Error finding building', error);
        }
      );
    }
  }

}
