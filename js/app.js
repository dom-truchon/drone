import * as THREE from 'three';
import { ThreeEnvironment } from './ThreeEnvironment.js';
import { VoxelWorld } from './VoxelWorld.js';

const env = new ThreeEnvironment();
window.env = env; // Expose the environment for debugging

// Test setup
// env.testEnvironment();
env.scene.background = new THREE.Color('skyblue');

let vw = new VoxelWorld(256, env); // Example cell size

// Lighting
env.addDirectionalLight(0xffffff, 2, 1, 2, 1);
env.addDirectionalLight(0xffffff, 1, -1, 1, -1);
env.addAmbientLight(0xffffff, 0.5);

vw.test();
