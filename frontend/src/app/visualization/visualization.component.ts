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

  ngAfterViewInit(): void {
    console.log("[ngAfterViewInit()]");
    this.floorService.getFloors().subscribe(
      (data: any) => {
        console.log("The floors are: ", data);
        this.floors = data;
        this.selectedFloor = this.floors[0].floorNumber;
        this.getFloorMaze();
        this.createScene();
        this.render();
      },
      (error: any) => console.log(error)
    );
  }

  onFloorSelected(floorNumber: string): Promise<void> {
    console.log("[onFloorSelected()]");
    return new Promise<void>((resolve) => {
      this.selectedFloor = floorNumber;
      setTimeout(() => {
        this.showFloor();
        resolve();
      }, 200); // Adjust the delay as needed
    });
  }
  
  showFloor(): void {
    console.log("[showFloor()]");
    this.getFloorMaze();
    this.updateScene();
    this.render();
  }


  // Obter o mapa do piso
  private getFloorMaze(): void {
    console.log("[getFloorMaze()]");
    const floor = this.getFloor();
    this.maze = JSON.parse(floor?.json);
    this.floorMaze = {
      size: {
        width: (floor?.width ?? 0) - 1,
        height: (floor?.length ?? 0) - 1
        // TODO: There's a chance these might be swapped
      },
      "map": floor?.map ? JSON.parse(floor.map) : [[]],
      initialPosition: [0, 4],
      initialDirection: 0.0,
    };

    console.log("[getFloorMaze()] The maze aka the json is: ", this.maze);
    console.log("[getFloorMaze()] The floor maze is: ", this.floorMaze);
    console.log("[getFloorMaze()] The floor maze map is: ", this.floorMaze.map);
  }
  private getFloor() {
    console.log("[getFloor()]");
    // find selectedFloor in this.floors
    return this.floors.find((floor) => floor.floorNumber === this.selectedFloor);
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

  // Attualizar a cena
  updateScene() {
    console.log("[updateScene()]");
    this.thumbRaiser.updateScene({ url: this.maze, maze: this.floorMaze,scale: new THREE.Vector3(1.0, 0.5, 1.0) });
    console.log("[updateScene()] The scene has been updated!");
  }

  /*ngAfterViewInit(): void {
    this.createOrUpdateScene();
    this.render();
  }*/

  private render(): void {
    requestAnimationFrame(() => this.render());
    if (this.thumbRaiser) {
      if (this.thumbRaiser.gameRunning) {
        console.log("[render()] The game is running!");
        this.thumbRaiser.update();  // Ensure that update is called when the game is running
      } else {
        console.log("[render()] The game is not running!");
      }
      console.log("[render()] The scene has been rendered!");
    } else {
      console.log("[render()] The thumbRaiser is undefined!");
    }
  }

}