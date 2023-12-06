import { AfterViewInit, Component, Input } from '@angular/core';
import ThumbRaiser from '../visualization-classes/thumb_raiser';
import Orientation from '../visualization-classes/orientation';
import * as THREE from 'three';
import * as _ from 'lodash';

import { FloorService } from '../floor/floor.service';
import Maze from '../domain/maze';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements AfterViewInit {
  constructor(private floorService: FloorService) { }
  @Input() public maze: string='../../assets/3d/mazes/demonstration.json';
  private thumbRaiser: ThumbRaiser;
  floors: any[] = [];
  selectedFloor: string = '';
  floorMaze: Maze = {
    size: {
      width: 0,
      height: 0
    },
    "map": [[]],
    initialPosition: [0, 0],
    initialDirection: 0.0,
  };

  ngOnInit(): void {
    this.fetchFloors();
  }

  private fetchFloors(): void {
    this.floorService.getFloors().subscribe(
      (floors) => {
        this.floors = floors;
        console.log("the floors are: ", this.floors);
        
        if (this.floors.length > 0) {
          // Load the default floor or the first floor initially
          const defaultFloorNumber = _.get(this.floors, '[12].floorNumber', 'defaultFloorNumber');
          console.log("the default floor number is: ", defaultFloorNumber);
          this.loadFloor(defaultFloorNumber);
        } else {
          console.warn("No floors found.");
        }
      },
      (error) => {
        console.error('Error fetching floors:', error);
      }
    );
  }

  private loadFloor(floorNumber: string): void {
    this.floorService.findFloorByNumber(floorNumber).subscribe(
      (floorData) => {
        console.log("Fetched floor data: ", floorData);
        this.maze = floorData.json;
        this.createOrUpdateScene();
        this.render();
      },
      (error) => {
        console.error('Error loading floor:', error);
      }
    );
  }

  onFloorSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)?.value;
    if (selectedValue !== undefined && selectedValue !== null) {
      this.loadFloor(selectedValue);
    }
  }

  private createOrUpdateScene(): void {
    if (!this.thumbRaiser) {
      this.createScene();
    } else {
      console.log("Updating scene...");
      // Update existing instance with new parameters
      this.thumbRaiser.updateScene({ url: this.maze, scale: new THREE.Vector3(1.0, 1.0, 1.0) });
    }
  }

  // Criar a cena
  private createScene(): void {
    console.log("[createScene()]");
    this.thumbRaiser = new ThumbRaiser(
      {}, // General Parameters
      {}, // Audio parameters
      {}, // Cube texture parameters
      { url: this.maze, maze: this.floorMaze, scale: new THREE.Vector3(1.0, 1.0, 1.0) }, // Maze parameters
      { scale: new THREE.Vector3(0.1, 0.1, 0.1) }, // Player parameters
      {}, // Ambient Light parameters
      {}, // Directional Light parameters
      {}, // Spot Light parameters
      {}, // Flash Light parameters
      {}, // Shadows parameters
      {}, // Fog parameters
      {}, // Collision Detection parameters
      { view: "fixed", initialViewport: new THREE.Vector4(0.0, 1.0, 0.0, 0.0), initialFogDensity: 0.1 }, // Fixed view camera parameters
      { view: "first-person", initialViewport: new THREE.Vector4(1.0, 1.0, 0.0, 0.0), initialOrientation: new Orientation(0.0, -10.0), orientationMax: new Orientation(180.0, 90.0), initialFogDensity: 0.7 }, // First-person view camera parameters
      { view: "third-person", initialViewport: new THREE.Vector4(0.0, 0.0, 1, 1), initialOrientation: new Orientation(0.0, -20.0), initialZoom: 0.6, initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0, initialFogDensity: 0.3 }, // Third-person view camera parameters
      { view: "top", initialViewport: new THREE.Vector4(1.0, 0.0, 0.0, 0.0), initialOrientation: new Orientation(0.0, -90.0), initialDistance: 4.0, distanceMin: 1.0, distanceMax: 16.0, initialFogDensity: 0.2 }, // Top view camera parameters
      { view: "mini-map", initialViewport: new THREE.Vector4(0.025, 0.95, 0.3, 0.3), initialOrientation: new Orientation(180.0, -90.0), initialZoom: 0.3, zoomMin: 0.64, zoomMax: 5.12 } // Mini-map view camera parameters
  );
  }

  ngAfterViewInit(): void {
    this.createOrUpdateScene();
    this.render();
  }

  private render(): void {
    requestAnimationFrame(() => this.render());
    if (this.thumbRaiser) {
      this.thumbRaiser.update();
    }
  }
}
