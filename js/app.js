import * as THREE from 'three';
import { ThreeEnvironment } from './ThreeEnvironment.js';
import { VoxelWorld } from './VoxelWorld.js';

const env = new ThreeEnvironment();
window.env = env; // Expose the environment for debugging

// Test setup
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
env.scene.add(cube);

env.renderer.render(env.scene, env.camera);

// let vw = new VoxelWorld(16, env); // Example cell size
// vw.test();