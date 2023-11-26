import * as THREE from "three";
import Orientation from "./orientation.js";

export const generalData = {
    setDevicePixelRatio: false
}

export const audioData = {
    enabled: false,
    volume: 1.0,
    volumeMin: 0.0,
    volumeMax: 2.0,
    volumeStep: 0.1,
    introductionClips: [
        {
            url: "../../assets/3d/clips/el-gringo-12613.mp3",
            position: "initial", // Global (non-positional) audio object: ""; positional audio object: "scene x y z" (scene specific position in cartesian coordinates), "maze line column" (maze specific position in cell coordinates), "exit" (maze exit location), "initial" (player initial position), "player" (player current position), "spotlight" (spotlight current position)
            referenceDistance: 1.0,
            loop: false,
            volume: 0.5
        }
    ],
    idleClips: [
        {
            url: "../../assets/3d/clips/Clearing-Throat-Moderate-Speed-www.fesliyanstudios.com.mp3",
            position: "player",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        },
        {
            url: "../../assets/3d/clips/Small-Double-Cough-1-www.fesliyanstudios.com.mp3",
            position: "player",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        },
        {
            url: "../../assets/3d/clips/Yawn-A2-www.fesliyanstudios.com.mp3",
            position: "player",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        }
    ],
    jumpClips: [
        {
            url: "../../assets/3d/clips/Cheering-A6-www.fesliyanstudios.com.mp3",
            position: "player",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        },
        {
            url: "../../assets/3d/clips/Cheering-A7-www.fesliyanstudios.com.mp3",
            position: "player",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        }
    ],
    deathClips: [
        {
            url: "../../assets/3d/clips/176653326.mp3",
            position: "player",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        },
        {
            url: "../../assets/3d/clips/Horn+Squeeze+Clown.mp3",
            position: "player",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        }
    ],
    danceClips: [
        {
            url: "../../assets/3d/clips/best-buddies-12609.mp3",
            position: "exit",
            referenceDistance: 1.0,
            loop: true,
            volume: 0.5
        }
    ],
    endClips: [
        {
            url: "../../assets/3d/clips/Ba-Bum-Tss-Joke-Drum-A1-www.fesliyanstudios.com.mp3",
            position: "exit",
            referenceDistance: 1.0,
            loop: false,
            volume: 2.0
        },
        {
            url: "../../assets/3d/clips/yay-6326.mp3",
            position: "exit",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        },
        {
            url: "../../assets/3d/clips/crowd-cheer-ii-6263.mp3",
            position: "exit",
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75
        }
    ],
    credits: "Sound clips downloaded from <a href='https://www.dreamstime.com/' target='_blank' rel='noopener'>Dreamstime</a>, <a href='https://www.fesliyanstudios.com/' target='_blank' rel='noopener'>Fesliyan Studios</a> and <a href='https://pixabay.com/' target='_blank' rel='noopener'>Pixabay</a>."
}

export const cubeTextureData = {
    skyboxes: [
        { // Stormy days
            name: "Stormy days",
            texturePath: "../../assets/3d/cube_textures/envmap_stormydays/",
            texturePositiveXUrl: "stormydays_ft.jpg",
            textureNegativeXUrl: "stormydays_bk.jpg",
            texturePositiveYUrl: "stormydays_up.jpg",
            textureNegativeYUrl: "stormydays_dn.jpg",
            texturePositiveZUrl: "stormydays_rt.jpg",
            textureNegativeZUrl: "stormydays_lf.jpg",
            credits: "Skybox created by <a href='https://opengameart.org/content/stormy-days-skybox' target='_blank' rel='noopener'>Jockum Skoglund (hipshot)</a>."
        },
        { // Miramar
            name: "Miramar",
            texturePath: "../../assets/3d/cube_textures/red-eclipse-skyboxes/skyboxes/",
            texturePositiveXUrl: "miramar_ft.jpg",
            textureNegativeXUrl: "miramar_bk.jpg",
            texturePositiveYUrl: "miramar_up.jpg",
            textureNegativeYUrl: "miramar_dn.jpg",
            texturePositiveZUrl: "miramar_rt.jpg",
            textureNegativeZUrl: "miramar_lf.jpg",
            credits: "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>."
        },
        { // Flat sunset
            name: "Flat sunset",
            texturePath: "../../assets/3d/cube_textures/red-eclipse-skyboxes/skyboxes/",
            texturePositiveXUrl: "sunsetflat_ft.jpg",
            textureNegativeXUrl: "sunsetflat_bk.jpg",
            texturePositiveYUrl: "sunsetflat_up.jpg",
            textureNegativeYUrl: "sunsetflat_dn.jpg",
            texturePositiveZUrl: "sunsetflat_rt.jpg",
            textureNegativeZUrl: "sunsetflat_lf.jpg",
            credits: "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>."
        },
        { // Calm sea
            name: "Calm sea",
            texturePath: "../../assets/3d/cube_textures/xonotic-skyboxes/skyboxes/calm_sea/",
            texturePositiveXUrl: "calm_sea_ft.jpg",
            textureNegativeXUrl: "calm_sea_bk.jpg",
            texturePositiveYUrl: "calm_sea_up.jpg",
            textureNegativeYUrl: "calm_sea_dn.jpg",
            texturePositiveZUrl: "calm_sea_rt.jpg",
            textureNegativeZUrl: "calm_sea_lf.jpg",
            credits: "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>."
        },
        { // Distant sunset
            name: "Distant sunset",
            texturePath: "../../assets/3d/cube_textures/xonotic-skyboxes/skyboxes/distant_sunset/",
            texturePositiveXUrl: "distant_sunset_ft.jpg",
            textureNegativeXUrl: "distant_sunset_bk.jpg",
            texturePositiveYUrl: "distant_sunset_up.jpg",
            textureNegativeYUrl: "distant_sunset_dn.jpg",
            texturePositiveZUrl: "distant_sunset_rt.jpg",
            textureNegativeZUrl: "distant_sunset_lf.jpg",
            credits: "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>."
        },
        { // Exosystem
            name: "Exosystem",
            texturePath: "../../assets/3d/cube_textures/xonotic-skyboxes/skyboxes/exosystem/",
            texturePositiveXUrl: "exosystem_ft.jpg",
            textureNegativeXUrl: "exosystem_bk.jpg",
            texturePositiveYUrl: "exosystem_up.jpg",
            textureNegativeYUrl: "exosystem_dn.jpg",
            texturePositiveZUrl: "exosystem_rt.jpg",
            textureNegativeZUrl: "exosystem_lf.jpg",
            credits: "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>."
        },
        { // Heaven
            name: "Heaven",
            texturePath: "../../assets/3d/cube_textures/xonotic-skyboxes/skyboxes/heaven/",
            texturePositiveXUrl: "heaven_ft.jpg",
            textureNegativeXUrl: "heaven_bk.jpg",
            texturePositiveYUrl: "heaven_up.jpg",
            textureNegativeYUrl: "heaven_dn.jpg",
            texturePositiveZUrl: "heaven_rt.jpg",
            textureNegativeZUrl: "heaven_lf.jpg",
            credits: "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>."
        }
    ],
    selected: 3
}

export const mazeData = {
    url: "../../assets/3d/mazes/edificioApiso2.json",
    designCredits: "Maze designed by Cecília Fernandes and Nikita.",
    texturesCredits: "Maze textures downloaded from <a href='https://www.texturecan.com/' target='_blank' rel='noopener'>TextureCan</a>.",
    scale: new THREE.Vector3(1.0, 1.0, 1.0),
    helpersColor: new THREE.Color(0xff0077)
}

export const playerData = {
    url: "../../assets/3d/models/gltf/RobotExpressive/RobotExpressive.glb",
    credits: "Model and related code snippets created by <a href='https://www.patreon.com/quaternius' target='_blank' rel='noopener'>Tomás Laulhé</a>. CC0 1.0. Modified by <a href='https://donmccurdy.com/' target='_blank' rel='noopener'>Don McCurdy</a>.",
    scale: new THREE.Vector3(0.1, 0.1, 0.1),
    helpersColor: new THREE.Color(0x0055ff),
    walkingSpeed: 0.75,
    defaultDirection: 0.0, // Expressed in degrees
    turningSpeed: 75.0, // Expressed in degrees / second
    runningFactor: 2.0, // Affects walking speed and turning speed
    keyCodes: { realisticViewMode: "KeyR", fixedView: "Digit1", firstPersonView: "Digit2", thirdPersonView: "Digit3", topView: "Digit4", miniMap: "KeyM", statistics: "KeyZ", userInterface: "KeyU", help: "KeyH", boundingVolumes: "KeyB", ambientLight: "KeyA", directionalLight: "KeyD", spotLight: "KeyS", flashLight: "KeyF", shadows: "KeyX", fog: "KeyG", left: "ArrowLeft", right: "ArrowRight", backward: "ArrowDown", forward: "ArrowUp", jump: "KeyJ", yes: "KeyY", no: "KeyN", wave: "KeyW", punch: "KeyP", thumbsUp: "KeyT" }
}

export const ambientLightData = {
    visible: true,
    color: new THREE.Color(0xffffff),
    intensity: 0.1,
    intensityMin: 0.0,
    intensityMax: 1.0,
    intensityStep: 0.01
}

export const directionalLightData = {
    visible: true,
    color: new THREE.Color(0xffffff),
    intensity: 1.0,
    intensityMin: 0.0,
    intensityMax: 1.0,
    intensityStep: 0.01,
    distance: 20.0,
    orientation: new Orientation(0.0, 90.0),
    orientationMin: new Orientation(-180.0, 0.0),
    orientationMax: new Orientation(180.0, 90.0),
    orientationStep: new Orientation(1.0, 1.0),
    castShadow: true,
    shadow: {
        mapSize: new THREE.Vector2(2048, 2048),
        camera: {
            left: -20.0,
            right: 20.0,
            top: 20.0,
            bottom: -20.0,
            near: 0.0,
            far: 40.0
        }
    }
}

export const spotLightData = {
    visible: false,
    color: new THREE.Color(0xffffff),
    intensity: 1.0,
    intensityMin: 0.0,
    intensityMax: 100.0,
    intensityStep: 1.0,
    distance: 0.0,
    distanceMin: 0.1,
    distanceMax: 40.0,
    distanceStep: 0.1,
    angle: 45.0,
    angleMin: 0.0,
    angleMax: 90.0,
    angleStep: 1.0,
    penumbra: 0.25,
    penumbraMin: 0.0,
    penumbraMax: 1.0,
    penumbraStep: 0.01,
    position: new THREE.Vector3(0.0, 0.0, 0.0),
    positionMin: new THREE.Vector3(-20.0, 0.0, -20.0),
    positionMax: new THREE.Vector3(20.0, 40.0, 20.0),
    positionStep: new THREE.Vector3(0.1, 0.1, 0.1),
    castShadow: false,
    shadow: {
        mapSize: new THREE.Vector2(512, 512), // Shadow map size
        camera: { // The light's view of the world
            near: 0.5,
            far: 500.0
        },
        focus: 1.0
    }
}

export const flashLightData = {
    visible: false,
    color: new THREE.Color(0xffffff),
    intensity: 1.0,
    intensityMin: 0.0,
    intensityMax: 10.0,
    intensityStep: 0.1,
    distance: 0.0,
    distanceMin: 0.1,
    distanceMax: 20.0,
    distanceStep: 0.1,
    angle: 45.0,
    angleMin: 0.0,
    angleMax: 90.0,
    angleStep: 1.0,
    penumbra: 0.25,
    penumbraMin: 0.0,
    penumbraMax: 1.0,
    penumbraStep: 0.01,
    orientation: new Orientation(0.0, 0.0),
    orientationMin: new Orientation(-45.0, -30.0),
    orientationMax: new Orientation(45.0, 30.0),
    orientationStep: new Orientation(1.0, 1.0),
    castShadow: false,
    shadow: {
        mapSize: new THREE.Vector2(512, 512), // Shadow map size
        camera: { // The light's view of the world
            near: 0.5,
            far: 500.0
        },
        focus: 1.0
    }
}

export const shadowsData = {
    enabled: true,
    type: THREE.PCFShadowMap // THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap or THREE.VSMShadowMap
}

export const fogData = {
    enabled: false,
    color: new THREE.Color(0xe0e0e0),
    // The initial fog density varies depending on the camera; so, it is defined in cameraData
    densityMin: 0.01,
    densityMax: 1.0,
    densityStep: 0.01
}

export const collisionDetectionData = {
    method: "bc-aabb", // Bounding cylinder / axis-aligned bounding box: "bc-aabb"; oriented bounding box / axis-aligned bounding box: "obb-aabb"
    boundingVolumes: { visible: false }
}

export const cameraData = {
    view: "fixed", // Fixed view: "fixed"; first-person view: "first-person"; third-person view: "third-person"; top view: "top"; mini-map: "mini-map"
    backgroundColor: new THREE.Color(0x222222),
    frameColor: new THREE.Color(0xffffff),
    initialViewport: new THREE.Vector4(0.0, 0.0, 1.0, 1.0), // Viewport position and size: fraction of window width and window height; MUST BE REDEFINED when creating an instance of ThumbRaiser() so that each view is assigned a different viewport
    viewportSizeMin: 0.125, // Expressed in fraction of window width and window height
    dragOrResizeThreshold: 0.015, // Expressed in fraction of window width and window height
    snapThreshold: 0.015, // Expressed in fraction of window width and window height
    snapPositions: [0.0, 0.25, 0.3333333, 0.5, 0.6666667, 0.75, 1.0], // Expressed in fraction of window width and window height
    initialTarget: new THREE.Vector3(0.0, 0.0, 0.0), // Target position
    initialOrientation: new Orientation(135.0, -45.0), // Horizontal and vertical orientation and associated limits (expressed in degrees)
    orientationMin: new Orientation(-180.0, -90.0),
    orientationMax: new Orientation(180.0, 0.0),
    orientationStep: new Orientation(1.0, 1.0),
    initialDistance: 8.0, // Distance to the target and associated limits
    distanceMin: 4.0,
    distanceMax: 16.0,
    distanceStep: 0.1,
    initialZoom: 1.0, // Zoom factor and associated limits
    zoomMin: 0.5,
    zoomMax: 2.0,
    zoomStep: 0.1,
    initialFov: 45.0, // Field-of-view (expressed in degrees)
    near: 0.01, // Front clipping plane
    far: 100.0, // Back clipping plane
    initialFogDensity: 0.00025 // Doesn't apply to mini-map camera
}