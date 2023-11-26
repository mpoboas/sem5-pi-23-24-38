import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloorService } from '../floor/floor.service';
import { BuildingService } from '../building/building.service';

export interface FloorData {
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingCode: string;
  map: string;
  json: string;
}

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.scss']
})
export class CreateFloorComponent implements OnInit {
  form: FormGroup;
  buildingOptions: any[] = [];
  selectedBuildingId: string | null = null;
  jsonFile: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FloorData,
    public dialogRef: MatDialogRef<CreateFloorComponent>,
    private fb: FormBuilder,
    private floorService: FloorService,
    private buildingService: BuildingService,
  ) {
    this.form = this.fb.group({
      floorNumber: [data.floorNumber, Validators.required],
      description: [data.description],
      length: [data.length, Validators.required],
      width: [data.width, Validators.required],
      buildingCode: [data.buildingCode, Validators.required],
      map: [data.map],
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

  onBuildingCodeSelect(): void {
    const selectedBuildingCode = this.form.value.buildingCode;
    const selectedBuilding = this.buildingOptions.find(building => building.code === selectedBuildingCode);
    console.log('Selected building:', selectedBuilding);
    if (selectedBuilding) {
      this.form.patchValue({
        width: selectedBuilding.width,
        length: selectedBuilding.length
      });
    }
  }

  onFileSelected(event: any): void {
    this.jsonFile = event.target.files[0];
    console.log('Selected JSON file this.jsonFile: ', this.jsonFile);
    if (this.jsonFile != null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = reader.result as string;
        this.setFloorMapFromFileContent(fileContent);
      };
      reader.readAsText(this.jsonFile);
    }
  }

  setFloorMapFromFileContent(fileContent: string): void {
    try {
      const jsonData = JSON.parse(fileContent);
      this.jsonFile = jsonData;
      const floorMap = jsonData.maze.map;
      console.log('Parsed JSON file floor map:', floorMap);

      this.form.get('map')?.setValue(floorMap);
    } catch (error) {
      console.error('Error parsing JSON file', error);
    }
  }
  
  // If no map is provided, create a default  empty map
  defaultFloor(): string {
    const width = this.form.value.width;
    const length = this.form.value.length;
    
    // Fill the map with 0's
    const newFloorMap: number[][] = [];
    for (let i = 0; i <= length; i++) {
      const row = Array(width + 1).fill(0);
      newFloorMap.push(row);
    }

    // Set surrounding walls
    for (let i = 1; i <= length - 1; i++) { newFloorMap[i][0] = 1; }      // Left wall
    for (let i = 0; i <= length - 1; i++) { newFloorMap[i][width] = 1; }  // Right wall
    for (let j = 1; j <= width - 1; j++) { newFloorMap[0][j] = 2; }       // Top wall
    for (let j = 0; j <= width - 1; j++) { newFloorMap[length][j] = 2; }  // Bottom wall
    newFloorMap[0][0] = 3;  // Set value at index [0][0] to 3
    newFloorMap[length][width] = 0;  // Set value at index [length][width] to 0

    // Convert the number[][] to a string
    const floorMapString = newFloorMap.map(row => `[${row.join(',')}]`).join(',');

    return floorMapString;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const floorData = {
        floorNumber: this.form.value.floorNumber,
        description: this.form.value.description,
        length: this.form.value.length,
        width: this.form.value.width,
        buildingId: null,
        map: this.jsonFile ? JSON.stringify(this.form.value.map) : this.defaultFloor(),
        json: this.jsonFile ? JSON.stringify(this.jsonFile) : "Ainda está por implementar caso não seja feito upload de um ficheiro ",
      };

      const buildingCode = this.form.value.buildingCode;

      this.buildingService.findBuildingByCode(buildingCode).subscribe(
        (building: any) => {
          floorData.buildingId = building ? building.id : null;

          console.log('Creating floor with data', floorData);

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
        },
        (error: any) => {
          console.error('Error finding building by code', error);
        }
      );
    }
  }
}
