import { Component, OnInit } from '@angular/core';
import { BuildingService } from './building.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  buildings: any[] = [];

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
  }

  createBuilding() {
  }

  editBuilding() {
  }

  showAllBuildings() {
    this.buildingService.getBuildings().subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }
}
