import * as THREE from "three";
import { merge } from "./merge.js";

export default class Elevator extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        const elevatorSize = { width: this.segments.elevatorWidth, height: this.segments.elevatorHeight, depth: this.segments.elevatorDepth };

        // Create the materials
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x646265 });

        // Create a frame (box)
        let geometry = new THREE.BoxGeometry(elevatorSize.width, elevatorSize.height-1, elevatorSize.depth);

        // Create a texture
        console.log("elevator closed estamos aqui");
        console.log(this.materialParameters.elevatorClosed);
        console.log(this.materialParameters.elevatorOpen);
        console.log(this.materialParameters.color);
        let texture = new THREE.TextureLoader().load(this.materialParameters.elevatorOpen);
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        let frontMaterial = new THREE.MeshBasicMaterial({ color: 0x95949a, map: texture });
        //frontMaterial.transparent = true;

        // Create a mesh
        let mesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, sideMaterial]);
        
        mesh.position.set(0.0, -(0.28) + elevatorSize.height / 2.0);
        console.log("construtor elevador" + this.direction);

        const elevator = new THREE.Group();
        switch (this.direction) {
            case "North":
                mesh.position.set(0, -(0.30) + elevatorSize.height / 2.0, 0);
                mesh.rotation.set(0, -Math.PI, 0)
                break;
            case "West":
                mesh.position.set(0, -(0.30) + elevatorSize.height / 2.0, 0);
                mesh.rotation.set(0, -Math.PI / 2, 0);
                break;
            case "East":
                console.log("estamos aqui");
                mesh.rotation.set(0, Math.PI / 2, 0);
                console.log("estamos aqui1");
                mesh.position.set(0, -(0.30) + elevatorSize.height / 2.0, 0);
                console.log("estamos aqui2");
                break;
            case "South":
                mesh.position.set(0, -(0.30) + elevatorSize.height / 2.0, 0);

                break;
        }
        console.log("construtor elevador53435523" + this.direction);
        elevator.add(mesh);
        this.add(elevator);
        console.log("construtor 8383838" + this.direction);
    }

    clone(direction) {
        const elevator = new Elevator({
            groundHeight: this.groundHeight,
            segments: {
                elevatorWidth: this.segments.elevatorWidth,
                elevatorHeight: this.segments.elevatorHeight,
                elevatorDepth: this.segments.elevatorDepth
            },
            materialParameters: {
                color: this.materialParameters.color,
                elevatorClosed: this.materialParameters.elevatorClosed,
                elevatorOpen: this.materialParameters.elevatorOpen,
            },
            direction: direction
        });

        return elevator;
    }
}