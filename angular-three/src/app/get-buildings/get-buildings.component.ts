import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../building/building.service';

@Component({
  selector: 'app-get-buildings',
  templateUrl: './get-buildings.component.html',
  styleUrls: ['./get-buildings.component.scss']
})
export class GetBuildingsComponent implements OnInit {
  buildings: any[] = [];

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
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
