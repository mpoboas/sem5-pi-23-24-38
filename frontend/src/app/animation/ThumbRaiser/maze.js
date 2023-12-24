import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { OBB } from "three/addons/math/OBB.js";
import { merge } from "./merge.js";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Tunnel from "./tunnel.js";

/*
 * parameters = {
 *  url: String,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 */

export default class Maze extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        this.loaded = false;
        console.log("Maze",parameters);
       // console.log("Maze",description);
       //let description = JSON.parse(this.url);
       //this.description = description;
       
        this.onLoad = function (descriptionyhea) {
            let description = JSON.parse(this.url);
            this.description = description;
            const normalMapTypes = [THREE.TangentSpaceNormalMap, THREE.ObjectSpaceNormalMap];
            const wrappingModes = [THREE.ClampToEdgeWrapping, THREE.RepeatWrapping, THREE.MirroredRepeatWrapping];
            const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
            const minificationFilters = [THREE.NearestFilter, THREE.NearestMipmapNearestFilter, THREE.NearestMipmapLinearFilter, THREE.LinearFilter, THREE.LinearMipmapNearestFilter, THREE.LinearMipmapLinearFilter];

            // Store the maze's size, map and exit location
            this.size = description.maze.size;
            this.halfSize = { width: this.size.width / 2.0, depth: this.size.depth / 2.0 };
            this.map = description.maze.map;
            this.exitLocation = this.cellToCartesian(description.maze.exitLocation);
            this.tunnelTp = false;
            this.tunnelToGo = "";
            // Create the helpers
            this.helper = new THREE.Group();
            this.tunnelPortal = description.maze.tunnelexit;
            // Create the ground
            const ground = new Ground({
                size: new THREE.Vector3(description.ground.size.width, description.ground.size.height, description.ground.size.depth),
                segments: new THREE.Vector3(description.ground.segments.width, description.ground.segments.height, description.ground.segments.depth),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.ground.primaryColor, 16)),
                    mapUrl: description.ground.maps.color.url,
                    aoMapUrl: description.ground.maps.ao.url,
                    aoMapIntensity: description.ground.maps.ao.intensity,
                    displacementMapUrl: description.ground.maps.displacement.url,
                    displacementScale: description.ground.maps.displacement.scale,
                    displacementBias: description.ground.maps.displacement.bias,
                    normalMapUrl: description.ground.maps.normal.url,
                    normalMapType: normalMapTypes[description.ground.maps.normal.type],
                    normalScale: new THREE.Vector2(description.ground.maps.normal.scale.x, description.ground.maps.normal.scale.y),
                    bumpMapUrl: description.ground.maps.bump.url,
                    bumpScale: description.ground.maps.bump.scale,
                    roughnessMapUrl: description.ground.maps.roughness.url,
                    roughness: description.ground.maps.roughness.rough,
                    wrapS: wrappingModes[description.ground.wrapS],
                    wrapT: wrappingModes[description.ground.wrapT],
                    repeat: new THREE.Vector2(description.ground.repeat.u, description.ground.repeat.v),
                    magFilter: magnificationFilters[description.ground.magFilter],
                    minFilter: minificationFilters[description.ground.minFilter]
                },
                secondaryColor: new THREE.Color(parseInt(description.ground.secondaryColor, 16))
            });
            this.add(ground);

            // Create a wall
            const wall = new Wall({
                groundHeight: description.ground.size.height,
                segments: new THREE.Vector2(description.wall.segments.width, description.wall.segments.height),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.wall.primaryColor, 16)),
                    mapUrl: description.wall.maps.color.url,
                    aoMapUrl: description.wall.maps.ao.url,
                    aoMapIntensity: description.wall.maps.ao.intensity,
                    displacementMapUrl: description.wall.maps.displacement.url,
                    displacementScale: description.wall.maps.displacement.scale,
                    displacementBias: description.wall.maps.displacement.bias,
                    normalMapUrl: description.wall.maps.normal.url,
                    normalMapType: normalMapTypes[description.wall.maps.normal.type],
                    normalScale: new THREE.Vector2(description.wall.maps.normal.scale.x, description.wall.maps.normal.scale.y),
                    bumpMapUrl: description.wall.maps.bump.url,
                    bumpScale: description.wall.maps.bump.scale,
                    roughnessMapUrl: description.wall.maps.roughness.url,
                    roughness: description.wall.maps.roughness.rough,
                    wrapS: wrappingModes[description.wall.wrapS],
                    wrapT: wrappingModes[description.wall.wrapT],
                    repeat: new THREE.Vector2(description.wall.repeat.u, description.wall.repeat.v),
                    magFilter: magnificationFilters[description.wall.magFilter],
                    minFilter: minificationFilters[description.wall.minFilter]
                },
                secondaryColor: new THREE.Color(parseInt(description.wall.secondaryColor, 16))
            });

            const tunnel = new Tunnel({
                groundHeight: description.ground.size.height,
                segments: new THREE.Vector2(description.tunnel.segments.width, description.tunnel.segments.height),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.tunnel.primaryColor, 16)),
                    mapUrl: description.tunnel.maps.color.url,
                    aoMapUrl: description.tunnel.maps.ao.url,
                    aoMapIntensity: description.tunnel.maps.ao.intensity,
                    displacementMapUrl: description.tunnel.maps.displacement.url,
                    displacementScale: description.tunnel.maps.displacement.scale,
                    displacementBias: description.tunnel.maps.displacement.bias,
                    normalMapUrl: description.tunnel.maps.normal.url,
                    normalMapType: normalMapTypes[description.tunnel.maps.normal.type],
                    normalScale: new THREE.Vector2(description.tunnel.maps.normal.scale.x, description.tunnel.maps.normal.scale.y),
                    bumpMapUrl: description.tunnel.maps.bump.url,
                    bumpScale: description.tunnel.maps.bump.scale,
                    roughnessMapUrl: description.tunnel.maps.roughness.url,
                    roughness: description.tunnel.maps.roughness.rough,
                    wrapS: wrappingModes[description.tunnel.wrapS],
                    wrapT: wrappingModes[description.tunnel.wrapT],
                    repeat: new THREE.Vector2(description.tunnel.repeat.u, description.tunnel.repeat.v),
                    magFilter: magnificationFilters[description.tunnel.magFilter],
                    minFilter: minificationFilters[description.tunnel.minFilter]
                },
                secondaryColor: new THREE.Color(parseInt(description.tunnel.secondaryColor, 16))
            });


            // Create a door
            const door = new Door({
                groundHeight: description.ground.size.height,
                segments: {
                    doorWidth: description.door.segments.doorSize.width,
                    doorHeight: description.door.segments.doorSize.height,
                    doorDepth: description.door.segments.doorSize.depth,
                    doorGap: description.door.segments.doorSize.gap,
                    frameWidth: description.door.segments.frameSize.width,
                    frameHeight: description.door.segments.frameSize.height,
                    frameDepth: description.door.segments.frameSize.depth
                },
                materialParameters: {
                    primaryColor: new THREE.Color(parseInt(description.door.primaryColor, 16)),
                    frontDoorUrl: description.door.mapDoor.door_front.url,
                    backDoorUrl: description.door.mapDoor.door_back.url, 
                    frontFrameUrl: description.door.mapFrame.frame_front.url,
                    backFrameUrl: description.door.mapFrame.frame_back.url,
                    secondaryColor: new THREE.Color(parseInt(description.door.secondaryColor, 16))      
                }
            });


            //  // Create a tunnel
            //  const tunnel = new Tunnel({
            //     groundHeight: description.ground.size.height,
            //     segments: new THREE.Vector2(description.tunnel.segments.width, description.tunnel.segments.height),
            //     materialParameters: {
            //         color: new THREE.Color(parseInt(description.tunnel.primaryColor, 16)),
            //         mapUrl: description.tunnel.maps.color.url,
            //         aoMapUrl: description.tunnel.maps.ao.url,
            //         aoMapIntensity: description.tunnel.maps.ao.intensity,
            //         displacementMapUrl: description.tunnel.maps.displacement.url,
            //         displacementScale: description.tunnel.maps.displacement.scale,
            //         displacementBias: description.tunnel.maps.displacement.bias,
            //         normalMapUrl: description.tunnel.maps.normal.url,
            //         normalMapType: normalMapTypes[description.tunnel.maps.normal.type],
            //         normalScale: new THREE.Vector2(description.tunnel.maps.normal.scale.x, description.tunnel.maps.normal.scale.y),
            //         bumpMapUrl: description.tunnel.maps.bump.url,
            //         bumpScale: description.tunnel.maps.bump.scale,
            //         roughnessMapUrl: description.tunnel.maps.roughness.url,
            //         roughness: description.tunnel.maps.roughness.rough,
            //         wrapS: wrappingModes[description.tunnel.wrapS],
            //         wrapT: wrappingModes[description.tunnel.wrapT],
            //         repeat: new THREE.Vector2(description.tunnel.repeat.u, description.tunnel.repeat.v),
            //         magFilter: magnificationFilters[description.tunnel.magFilter],
            //         minFilter: minificationFilters[description.tunnel.minFilter]
            //     },
            //     secondaryColor: new THREE.Color(parseInt(description.tunnel.secondaryColor, 16))
            // });



            // Build the maze
            let clonedTunnel;
            this.tunnelClones = {};
            let geometry;
            let geometries = [];
            geometries[0] = [];
            geometries[1] = [];
            let clonedDoor;
            this.doorClones = {}; 
            //this.doorLocation = [];
            this.aabb = [];
            for (let i = 0; i <= this.size.depth; i++) { // In order to represent the southmost walls, the map depth is one row greater than the actual maze depth
                this.aabb[i] = [];
                for (let j = 0; j <= this.size.width; j++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                    this.aabb[i][j] = [];
                    /*
                     *  this.map[][] | North wall | West wall |    Door    |  Elevator  |   Tunnel   |
                     * --------------+------------+-----------+------------+------------+------------+
                     *       0       |     No     |     No    |     -      |     -      |     -      |
                     *       1       |     No     |    Yes    |     -      |     -      |     -      |
                     *       2       |    Yes     |     No    |     -      |     -      |     -      |
                     *       3       |    Yes     |    Yes    |     -      |     -      |     -      |
                     *       4       |     -      |     -     |    North   |     -      |     -      |
                     *       5       |     -      |     -     |    West    |     -      |     -      |
                     *       6       |     -      |     -     |     -      |    North   |     -      |
                     *       7       |     -      |     -     |     -      |    West    |     -      |
                     *       8       |     -      |     -     |     -      |    South   |     -      |
                     *       9       |     -      |     -     |     -      |    East    |     -      |
                     *       10      |     -      |     -     |     -      |     -      |    North   |
                     *       11      |     -      |     -     |     -      |     -      |    West    |
                     */
                    if (this.map[i][j] == 2 || this.map[i][j] == 3) {
                        this.aabb[i][j][0] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][0].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    }
                    if (this.map[i][j] == 1 || this.map[i][j] == 3) {
                        this.aabb[i][j][1] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][1].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    }
                    if (this.map[i][j] == 11) {
                        console.log("tunnel norte");
                        clonedTunnel = tunnel.clone("North");
                        clonedTunnel.position.set(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth);
                        this.add(clonedTunnel);
                        this.aabb[i][j][0] = new THREE.Box3().setFromObject(clonedTunnel).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                        this.tunnelClones[`${i}_${j}`] = clonedTunnel;
                    }
                    if (this.map[i][j] == 10) {
                        clonedTunnel = tunnel.clone("West");
                        clonedTunnel.rotateY(-Math.PI / 2.0);

                        clonedTunnel.position.set(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5);
                        this.add(clonedTunnel);

                        this.aabb[i][j][0] = new THREE.Box3().setFromObject(clonedTunnel).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                        
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                        this.tunnelClones[`${i}_${j}`] = clonedTunnel;
                    }
                    if (this.map[i][j] == 4) {
                        console.log("door norte");
                        clonedDoor = door.clone("North");
                        clonedDoor.position.set(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth);
                        this.add(clonedDoor);
                        this.aabb[i][j][0] = new THREE.Box3().setFromObject(clonedDoor).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                        this.doorClones[`${i}_${j}`] = clonedDoor;
                        //this.doorLocation.push( { x: j , z: i}); 
                    }
                    if (this.map[i][j] == 5) {
                        console.log("door oeste");
                        clonedDoor = door.clone("West");
                        clonedDoor.rotateY(-Math.PI / 2.0);
                        clonedDoor.position.set(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth + 0.5);
                        this.add(clonedDoor);
                        this.aabb[i][j][0] = new THREE.Box3().setFromObject(clonedDoor).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                        console.log("aquiiiiiiiiiiiiiiiiii");
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                        this.doorClones[`${i}_${j}`] = clonedDoor;
                        //this.doorLocation.push( { x: j , z: i}); 
                    }
                    // if (this.map[i][j] == 10 ) {
                    //     this.aabb[i][j][0] = new THREE.Box3();
                    //     for (let k = 0; k < 2; k++) {
                    //         geometry = tunnel.geometries[k].clone();
                    //         geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth));
                    //         geometry.computeBoundingBox();
                    //         geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                    //         geometries[k].push(geometry);
                    //         this.aabb[i][j][0].union(geometry.boundingBox);
                    //     }
                    //     this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    // }
                    // if (this.map[i][j] == 11) {
                    //     this.aabb[i][j][1] = new THREE.Box3();
                    //     for (let k = 0; k < 2; k++) {
                    //         geometry = tunnel.geometries[k].clone();
                    //         geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
                    //         geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5));
                    //         geometry.computeBoundingBox();
                    //         geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                    //         geometries[k].push(geometry);
                    //         this.aabb[i][j][1].union(geometry.boundingBox);
                    //     }
                    //     this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    // }
                    // if (this.map[i][j] == 10) {
                    //     console.log("tunnel norte");
                    //     clonedTunnel = tunnel.clone("North");
                    //     clonedTunnel.position.set(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth);
                    //     this.add(clonedTunnel);
                    //     this.aabb[i][j][0] = new THREE.Box3().setFromObject(clonedTunnel).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                    //     this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    // }
                    // if (this.map[i][j] == 11) {
                    //     console.log("tunnel oeste");
                    //     clonedTunnel = tunnel.clone("West");
                    //     clonedTunnel.rotateY(-Math.PI / 2.0);
                    //     clonedTunnel.position.set(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5);
                    //     this.add(clonedTunnel);
                    //     this.aabb[i][j][0] = new THREE.Box3().setFromObject(clonedWall).applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                    //     this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    // }
                }
            }

            let mergedGeometry, mesh;
            for (let i = 0; i < 2; i++) {
                mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries[i], false);
                mesh = new THREE.Mesh(mergedGeometry, wall.materials[i]);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.add(mesh);
            }

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.player.initialPosition);
            this.initialDirection = description.player.initialDirection;

            this.loaded = true;
        }

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ").");
        }

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            "../../assets/3d/mazes/demonstration.json",

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => onProgress(this.url, xhr),

            // onError callback
            error => onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.halfSize.width + 0.5) * this.scale.x, 0.0, (position[0] - this.halfSize.depth + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.halfSize.depth), Math.floor(position.x / this.scale.x + this.halfSize.width)];
    }

    // Detect collision with corners (method: BC/AABB)
    cornerCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
            const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
            if (x * x + z * z < radius * radius) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    // Detect collision with walls (method: BC/AABB)
    wallCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {


            if (orientation != 0) {
                if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
            else {
                if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
        }
        return false;
    }

    // Detect collision with walls and corners (method: OBB/AABB)
    wallAndCornerCollision(indices, offsets, orientation, obb, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    doorCollision(indices, offsets,direction, position, delta, radius, name) {
        let doorActionsEnabled = false;
        const row = indices[0]+offsets[0];
        const column = indices[1]+offsets[1];
        //TWEEN.update();


        if(this.map[row][column] == "4"){
            // Check if the current cell has a door
            
            if (this.map[row][column] == direction) {
                    const doorNS = this.doorClones[row + "_" + column];
                    const eventListener = (event) => {
                        // Handle door actions based on the pressed key
                        if (event.key === 'o') {
                            if(doorNS.actions.getState() === "close"){
                                doorNS.actions.open();
                            }
                        } else if (event.key === 'c') {
                            if(doorNS.actions.getState() === "open"){
                                doorNS.actions.close();
                            }   
                        }
                        // Remove the event listener after processing the key event
                        doorActionsEnabled = false;
                        document.removeEventListener("keydown", eventListener);
                    };
                
                    // Add the event listener
                    document.addEventListener("keydown", eventListener);
                
                    // Set a timeout to remove the event listener after a certain time (e.g., 5 seconds)
                    const timeoutDuration = 5000; // milliseconds
                    const timeoutId = setTimeout(() => {
                        doorActionsEnabled = false;
                        document.removeEventListener("keydown", eventListener);
                    }, timeoutDuration);
                    if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
                        if (doorNS.actions.getState() == "close") {
                            console.log("Collision with " + name + ".");
                            return true;
                        }else{
                            return false;
                        }
                    }
            }
       
        
        }else{
            if (this.map[row][column] == direction) {
                const doorNS = this.doorClones[row + "_" + column];
                const eventListener = (event) => {
                    // Handle door actions based on the pressed key
                    if (event.key === 'o') {
                        if(doorNS.actions.getState() === "close"){
                            doorNS.actions.open();
                        }
                    } else if (event.key === 'c') {
                        if(doorNS.actions.getState() === "open"){
                            doorNS.actions.close();
                        }   
                    }
                    // Remove the event listener after processing the key event
                    doorActionsEnabled = false;
                    document.removeEventListener("keydown", eventListener);
                };
            
                // Add the event listener
                document.addEventListener("keydown", eventListener);
            
                // Set a timeout to remove the event listener after a certain time (e.g., 5 seconds)
                const timeoutDuration = 5000; // milliseconds
                const timeoutId = setTimeout(() => {
                    doorActionsEnabled = false;
                    document.removeEventListener("keydown", eventListener);
                }, timeoutDuration);
                if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
                    if (doorNS.actions.getState() == "close") {
                        console.log("Collision with " + name + ".");
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
                
            
        
        return false;
    }

         // Detect collision with tunnels (method: BC/AABB)
         tunnelCollision(indices, offsets, orientation, position, delta, radius, name) {
             const row = indices[0] + offsets[0];
             const column = indices[1] + offsets[1];
        
             if (this.map[row][column] == 11 || this.map[row][column] == 10) {
                //console.log("tunnel collision",row,column);
                //this.tunnelTp = true;
                this.tunnelPortal.forEach(element => {
                    //console.log("element",element.x);
                    if(element.z == row && element.x == column){
                        this.tunnelToGo = element.portal;
                        console.log("tunnelToGo",this.tunnelToGo);
                        //console.log("tunnelToGo",this.tunnelToGo);
                    }
                });
                  if (orientation != 0) {
                      if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
                          console.log("Collision with " + name + ".");
                          this.tunnelTp = true;
                      }
                  }
                  else {
                      if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
                          console.log("Collision with " + name + ".");
                          this.tunnelTp = true;
                      }
                  }
             }
             return false;
         }
    



    // Detect collisions
    collision(method, position, halfSize, direction) {
        const indices = this.cartesianToCell(position);
        if (method != "obb-aabb") {
            if (
                this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north wall") || // Collision with north wall
                this.wallCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west wall") || // Collision with west wall
                this.wallCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south wall") || // Collision with south wall
                this.wallCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east wall") || // Collision with east wall
                this.cornerCollision(indices, [1, 0], 1, position, { x: -0.475, z: -0.5 }, halfSize, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.cornerCollision(indices, [1, 1], 0, position, { x: -0.5, z: -0.525 }, halfSize, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.cornerCollision(indices, [1, 1], 1, position, { x: -0.525, z: -0.5 }, halfSize, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.cornerCollision(indices, [0, 1], 0, position, { x: -0.5, z: -0.475 }, halfSize, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)
                this.doorCollision(indices, [0, 1], "5", position, { x: -0.5, z: -0.475 }, halfSize, "east door") || // Collision with northeast corner (WE-oriented wall)
                this.doorCollision(indices, [0, 0], "4", position, { x: 0.0, z: -0.475 }, halfSize, "north door",) || // Collision with north wall
                this.doorCollision(indices, [0, 0], "5", position, { x: -0.475, z: 0.0 }, halfSize, "west door") || // Collision with west wall
                this.doorCollision(indices, [1, 0], "4", position, { x: 0.0, z: -0.525 }, halfSize, "south door") || // Collision with south wall
                this.tunnelCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north tunnel") || // Collision with north wall
                this.tunnelCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west tunnel") || // Collision with west wall
                this.tunnelCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south tunnel") || // Collision with south wall
                this.tunnelCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east tunnel") || // Collision with east wall


                indices[0] > 0 && (
                    this.cornerCollision(indices, [-1, 1], 1, position, { x: -0.525, z: 0.5 }, halfSize, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.cornerCollision(indices, [-1, 0], 1, position, { x: -0.475, z: 0.5 }, halfSize, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.cornerCollision(indices, [0, -1], 0, position, { x: 0.5, z: -0.475 }, halfSize, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.cornerCollision(indices, [1, -1], 0, position, { x: 0.5, z: -0.525 }, halfSize, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
        else {
            // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
            const obb = new OBB(position, halfSize);
            obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
            if (
                this.wallAndCornerCollision(indices, [0, 0], 0, obb, "north wall") || // Collision with north wall
                this.wallAndCornerCollision(indices, [0, 0], 1, obb, "west wall") || // Collision with west wall
                this.wallAndCornerCollision(indices, [1, 0], 0, obb, "south wall") || // Collision with south wall
                this.wallAndCornerCollision(indices, [0, 1], 1, obb, "east wall") || // Collision with east wall

                this.wallAndCornerCollision(indices, [1, 0], 1, obb, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 0, obb, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 1, obb, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [0, 1], 0, obb, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

                indices[0] > 0 && (
                    this.wallAndCornerCollision(indices, [-1, 1], 1, obb, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.wallAndCornerCollision(indices, [-1, 0], 1, obb, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.wallAndCornerCollision(indices, [0, -1], 0, obb, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.wallAndCornerCollision(indices, [1, -1], 0, obb, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };
    //foundDoor(position) {
       // position = this.cartesianToCell(position);
       // this.doorLocation.forEach((door) => {
         //   const doorr = this.cellToCartesian([door.x, door.z]);
          //  console.log(doorr);
          //  console.log(position);
          //  console.log(0.5*this.scale.x);
          //  console.log(Math.abs(position.x-doorr.x));
          //  console.log(Math.abs(position.z-doorr.z));

        //    if (Math.abs(position.x - doorr.x) < 0.5 * this.scale.x && Math.abs(position.z - doorr.z) < 0.5 * this.scale.z) {
        //       console.log("found door");
        //        return true;
        //    }
        //});
        //return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    //};
}