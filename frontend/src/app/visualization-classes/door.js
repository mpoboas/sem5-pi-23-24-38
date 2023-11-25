import * as THREE from "three";
import { merge } from "./merge.js";
import MultiTexturedMaterial from "./material.js";
import { Tween } from "../three.js-master/examples/jsm/libs/tween.module.js";

export default class Door extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        const halfGroundHeight = this.groundHeight / 2.0;
        const frameSize = { width: this.segments.frameWidth, height: this.segments.frameHeight, depth: this.segments.frameDepth };
        const doorSize = { width: this.segments.doorWidth, height: this.segments.doorHeight, depth: this.segments.doorDepth, gap: this.segments.doorGap };

        // Create the materials
        const sideMaterial = new THREE.MeshBasicMaterial({ color: this.materialParameters.secondaryColor });


        // Create a frame (box)

        let geometry = new THREE.BoxGeometry(frameSize.width, frameSize.height, frameSize.depth);
        
        let texture = new THREE.TextureLoader().load(this.materialParameters.frontFrameUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        let frontMaterial = new THREE.MeshBasicMaterial({ color: this.materialParameters.primaryColor.clone(), map: texture });
        frontMaterial.transparent = true;

        texture = new THREE.TextureLoader().load(this.materialParameters.backFrameUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        let backMaterial = new THREE.MeshBasicMaterial({ color: this.materialParameters.primaryColor.clone(), map: texture });
        backMaterial.transparent = true;

        // Create a mesh with the specified geometry and materials
        let mesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);
    
        mesh.position.set(0.0, -(0.28) + frameSize.height / 2.0);
        console.log("construtor " + this.materialParameters.direction);
        switch (this.materialParameters.direction) {
            case "North":
                mesh.position.set(0.0, -(0.30) + frameSize.height / 2.0, 0.0);
                break;
            case "West":
                mesh.position.set(0.0, -(0.30) + frameSize.height / 2.0, 0.5);
                break;
        }

        this.add(mesh);

        // Create a door (box)

        geometry = new THREE.BoxGeometry(doorSize.width, doorSize.height, doorSize.depth);

        texture = new THREE.TextureLoader().load(this.materialParameters.frontDoorUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        frontMaterial = new THREE.MeshBasicMaterial({ color: this.materialParameters.primaryColor.clone(), map: texture });

        texture = new THREE.TextureLoader().load(this.materialParameters.backDoorUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        backMaterial = new THREE.MeshBasicMaterial({ color: this.materialParameters.primaryColor.clone(), map: texture });

        mesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);
        mesh.position.set(0.0, -(0.26) + doorSize.height / 2.0);

        // Create a group
        const door = new THREE.Group();

        switch (this.materialParameters.direction) {
            case "North":
                mesh.position.set(0.0, -(0.20) + doorSize.height / 2.0, 0.0);
                break;
            case "West":
                mesh.position.set(0.0, -(0.20) + doorSize.height / 2.0, 0.5);
                break;
        }

        mesh.translateX(doorSize.width / 2.0);
        mesh.translateY(-doorSize.gap);

        door.add(mesh);
        door.translateX(-doorSize.width / 2.0);

        this.add(door);
        this.state = "close";
        let tween = new Tween(door.rotation);
        this.actions = {
            open: () => {
                this.state = "open";
                tween.stop();
                tween.to({ y: -Math.PI / 2.0 },0);
                tween.start();
            },
            stop: () => {
                this.state = "stop";
                tween.stop();
            },
            close: () => {
                this.state = "close";
                tween.stop();
                tween.to({ y: 0.0 }, 2000 * door.rotation.y / (Math.PI / 2.0));
                tween.start();
            },
            getState: () => {
                return this.state;
            }   
        };
    }

    clone(direction) {
        
        const door = new Door({
            groundHeight: this.groundHeight,
            segments: {
                frameWidth: this.segments.frameWidth,
                frameHeight: this.segments.frameHeight,
                frameDepth: this.segments.frameDepth,
                doorWidth: this.segments.doorWidth,
                doorHeight: this.segments.doorHeight,
                doorDepth: this.segments.doorDepth,
                doorGap: this.segments.doorGap
            },
            materialParameters: {
                direction: direction,
                primaryColor: this.materialParameters.primaryColor.clone(),
                frontFrameUrl: this.materialParameters.frontFrameUrl,
                backFrameUrl: this.materialParameters.backFrameUrl,
                frontDoorUrl: this.materialParameters.frontDoorUrl,
                backDoorUrl: this.materialParameters.backDoorUrl,
                secondaryColor: this.materialParameters.secondaryColor.clone()
            },
         });
        return door;
    }
}