import * as THREE from "three";
import { merge } from "./merge.js";

export default class Elevator extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        const elevatorSize = { width: this.segments.elevatorWidth, height: this.segments.elevatorHeight, depth: this.segments.elevatorDepth };

        // Create the materials
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x646265 });

        //label
        const canvas = this.makeLabelCanvas(100, 24, this.materialParameters.name);
        const labelTexture = new THREE.CanvasTexture(canvas);
        labelTexture.minFilter = THREE.LinearFilter;
        labelTexture.wrapS = THREE.ClampToEdgeWrapping;
        labelTexture.wrapT = THREE.ClampToEdgeWrapping;

        const labelMaterial = new THREE.SpriteMaterial({
            map: labelTexture,
            transparent: true,
            //visible: false,
            
        });

        const label = new THREE.Sprite(labelMaterial);


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
        this.add(label);

        label.position.y = 1.1;
        label.position.z = 0.0;
        const labelBaseScale = 0.01;
        label.scale.x = canvas.width * labelBaseScale;
        label.scale.y = canvas.height * labelBaseScale;
        label.visible = false;


        console.log("construtor 8383838" + this.direction);
    }

    clone(direction, name) {
        const elevator = new Elevator({
            groundHeight: this.groundHeight,
            segments: {
                elevatorWidth: this.segments.elevatorWidth,
                elevatorHeight: this.segments.elevatorHeight,
                elevatorDepth: this.segments.elevatorDepth
            },
            materialParameters: {
                name: name,
                color: this.materialParameters.color,
                elevatorClosed: this.materialParameters.elevatorClosed,
                elevatorOpen: this.materialParameters.elevatorOpen,
            },
            direction: direction
            
        });

        return elevator;
    }



    makeLabelCanvas(baseWidth, size, name) {
        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');
        const font = `${size}px bold sans-serif`;
        ctx.font = font;
        // measure how long the name will be
        const textWidth = ctx.measureText(name).width;

        const doubleBorderSize = borderSize * 2;
        const width = baseWidth + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, width, height);

        // scale to fit but don't stretch
        const scaleFactor = Math.min(1, baseWidth / textWidth);
        ctx.translate(width / 2, height / 2);
        ctx.scale(scaleFactor, 1);
        ctx.fillStyle = 'white';
        ctx.fillText(name, 0, 0);

        return ctx.canvas;
    }      

    makeLabelvisable(tipvalue){
        if(tipvalue){
            this.children[1].visible = true;
        }else{
            this.children[1].visible = false;
        }
    }
}