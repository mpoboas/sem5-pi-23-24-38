import * as THREE from "three";
import { merge } from "./merge.js";

export default class Elevator extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        const elevatorSize = { width: this.segments.elevatorWidth, height: this.segments.elevatorHeight, depth: this.segments.elevatorDepth };

        // Create the materials
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x95949a });

        // Create a frame (box)
        let geometry = new THREE.BoxGeometry(elevatorSize.width, elevatorSize.height, elevatorSize.depth);

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
        switch (this.direction) {
            case "North":
                mesh.position.set(0.5, -(0.30) + elevatorSize.height / 2.0, 1.0);
                mesh.rotation.set(0, -Math.PI, 0)
                break;
            case "West":
                mesh.rotation.set(0, -Math.PI / 2, 0);
                mesh.position.set(0.5 , -(0.30) + elevatorSize.height / 2, 1);
                break;
            case "East":
                mesh.rotation.set(0, Math.PI / 2, 0);
                mesh.position.set(0.5 , -(0.30) + elevatorSize.height / 2, 1);
                break;
            case "South":
                mesh.position.set(0.5, -(0.30) + elevatorSize.height / 2.0, 1.0);
                break;
        }

        this.add(mesh);

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