import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class ThreeEnvironment {

    lights = {};
    meshes = {};

    constructor() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 5);

        this.canvas = $('#c')[0];
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);

        requestAnimationFrame(this.render);
    }

    render = (time) => {
        time *= 0.001; // convert time to seconds

        // Update camera aspect ratio and projection matrix (screen resize handling)
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.render(this.scene, this.camera);
        this.controls.update();

        requestAnimationFrame(this.render);
    }

    addDirectionalLight(color, intensity, x=0, y=0, z=0) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        this.scene.add(light);
        let id = `directional_${Object.keys(this.lights).length}`;
        this.lights[id] = light;
        return id;
    }

}