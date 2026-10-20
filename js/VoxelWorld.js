import * as THREE from 'three';

export class VoxelWorld {
    constructor(cellSize, env) {
        this.cellSize = cellSize;
        this.cell = new Uint8Array(cellSize * cellSize * cellSize);
        this.env = env;
    }

    test() {
        for (let y = 0; y < this.cellSize; ++y) {
            for (let z = 0; z < this.cellSize; ++z) {
                for (let x = 0; x < this.cellSize; ++x) {
                    const height = (Math.sin(x / this.cellSize * Math.PI * 4) + Math.sin(z / this.cellSize * Math.PI * 6)) * 20 + this.cellSize / 2;
                    if (height > y && height < y + 1) {
                        const offset = y * this.cellSize * this.cellSize +
                            z * this.cellSize +
                            x;
                        this.cell[offset] = 1;
                    }
                }
            }
        }

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 'green' });

        for (let y = 0; y < this.cellSize; ++y) {
            for (let z = 0; z < this.cellSize; ++z) {
                for (let x = 0; x < this.cellSize; ++x) {
                    const offset = y * this.cellSize * this.cellSize +
                        z * this.cellSize +
                        x;
                    const block = this.cell[offset];
                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.position.set(x, y, z);
                    this.env.scene.add(mesh);
                }
            }
        }
    }
}