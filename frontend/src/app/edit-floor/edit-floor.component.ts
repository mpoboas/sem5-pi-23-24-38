import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloorService } from '../floor/floor.service';
import { Location } from '@angular/common';
import { BuildingService } from '../building/building.service';

export interface FloorData {
  id: string;
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingId: string;
  map: string;
}

@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.scss']
})
export class EditFloorComponent {
  form: FormGroup;
  buildingOptions: any[] = [];
  selectedBuildingId: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FloorData,
    public dialogRef: MatDialogRef<EditFloorComponent>,
    private fb: FormBuilder,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      id: [data.id, Validators.required],
      floorNumber: [data.floorNumber],
      description: [data.description],
      length: [data.length],
      width: [data.width],
      buildingId: [data.buildingId],
      map: [data.map],
    });

    this.form.get('map')?.setValue(this.parseFloorMap(data.map));
  }

  onBuildingCodeSelect(): void {
    const selectedBuilding = this.buildingOptions.find(building => building.code === this.form.value.buildingId);

    if (selectedBuilding) {
      this.form.get('width')?.setValue(selectedBuilding.width);
      this.form.get('length')?.setValue(selectedBuilding.length);
    }
  }

  parseFloorMap(floorMap: string): number[][] {
    const rows = floorMap.split('],').map(row => row.replace(/\[|\]/g, '').split(',').map(Number));
    return rows.map(row => row.map(Number));
  }

  convertToFloorMapString(floorMap: number[][]): string {
    return floorMap.map(row => `[${row.join(',')}]`).join(',');
  }

  updateCellValue(i: number, j: number, event: any): void {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      this.form.value.map[i][j] = newValue;
    }
  }

  getCellBorderStyle(cellValue: number): any {
    let borderStyle = {};
  
    if (cellValue === 1) {
      // Wall on the west side
      borderStyle = {
        'border-left': '1px solid black',
      };
    } else if (cellValue === 2) {
      // Wall on the north side
      borderStyle = {
        'border-top': '1px solid black',
      };
    } else if (cellValue === 3) {
      // Walls on both north and west sides
      borderStyle = {
        'border-top': '1px solid black',
        'border-left': '1px solid black',
      };
    } else if (cellValue === 4) {
      // Door on north side
      borderStyle = {
        'border-top': '1px dashed black',
      };
    } else if (cellValue === 5) {
      // Door on west side
      borderStyle = {
        'border-left': '1px dashed black',
      };
    }
    return borderStyle;
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
      const floorData = this.form.value;

      this.buildingService.findBuildingByCode(floorData.buildingId).subscribe(
        (building: any) => {
          floorData.buildingId = building.id;
          console.log(floorData);

          // Convert the edited floorMap back to a string before saving to the database
          floorData.map = this.convertToFloorMapString(floorData.map);

          this.floorService.updateFloor(floorData).subscribe(
            (response: any) => {
              console.log('Floor updated successfully', response);
              this.dialogRef.close(floorData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error updating floor', error);
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
