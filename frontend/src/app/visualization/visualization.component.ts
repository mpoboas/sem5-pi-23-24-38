import { AfterViewInit, Component, Input } from '@angular/core';
import ThumbRaiser from '../visualization-classes/thumb_raiser';
import Orientation from '../visualization-classes/orientation';
import * as THREE from 'three';
import * as _ from 'lodash';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements AfterViewInit {
  constructor() { }
  ngAfterViewInit(): void {
      this.createScene();
      this.render();
  }
  
  @Input() public maze: string="../../assets/3d/mazes/edificioApiso1.json";
  private thumbRaiser: ThumbRaiser;

  private createScene(): void {
    this.thumbRaiser = new ThumbRaiser(
      {}, // General Parameters
      {}, // Audio parameters
      {}, // Cube texture parameters
      { url: this.maze, scale: new THREE.Vector3(1.0, 1.0, 1.0) }, // Maze parameters
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

  private render(): void {
    requestAnimationFrame(() => this.render());
    this.thumbRaiser.update();
  }
}