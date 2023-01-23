import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {helicam} from '../library/camera/Coc.js'

function land(x = 50,y = 50){
    const material = new THREE.MeshStandardMaterial({
        color:0x867c6d
    })
    const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(x,y),
        material
    );
        
    plane.rotation.x = -(Math.PI*0.5);
    plane.receiveShadow = true;
    // plane.rotation.x = - Math.PI * 0.5
    plane.position.y = - 0.5
    return plane
}

export {land}