import * as THREE from 'three'
import { MeshMatcapMaterial, RectAreaLight } from 'three';

function coil(height = 10){

    const loader = new THREE.TextureLoader();
    const metal = loader.load("/textures/5.png");

    const group = new THREE.Group();

    for(let i = 0;i<height;i++){
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2, 1, 16, 100),
            new THREE.MeshMatcapMaterial(
                {
                    matcap:metal
                }
            )
        )
        
        ring.position.y = i;
        ring.rotation.x = Math.PI * 0.5
        group.add(ring);
    }

    return group;
}

export { coil }