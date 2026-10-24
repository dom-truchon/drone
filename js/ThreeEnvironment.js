import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class ThreeEnvironment {

    lights = {};
    rendering = true;

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
        if(!this.rendering) return;

        time *= 0.001; // convert time to seconds

        // Update camera aspect ratio and projection matrix (screen resize handling)
        if (this.resizeRendererToDisplaySize()) {
            this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render);
    }

    // Resize the renderer to match the display size of the canvas
    resizeRendererToDisplaySize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const needResize = this.canvas.width !== width || this.canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
        }
        return needResize;
    }

    addDirectionalLight(color, intensity, x=0, y=0, z=0) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        this.scene.add(light);
        this.lights[light.uuid] = light;
        return light.uuid;
    }

    addAmbientLight(color, intensity) {
        const light = new THREE.AmbientLight(color, intensity);
        this.scene.add(light);
        this.lights[light.uuid] = light;
        return light.uuid;
    }

    testEnvironment() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        env.scene.add(cube);
        env.addDirectionalLight(0xFFFFFF, 3, -1, 2, 4);
        env.addDirectionalLight(0xFFFFFF, 3, 1, -2, -4);
    }
}