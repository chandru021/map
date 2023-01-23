import * as THREE from 'three';

function naturalEffect(){
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(20,20,20)
    light.shadow.camera.right = 100
    light.shadow.camera.left = -100
    light.shadow.camera.top = 100
    light.shadow.camera.bottom = -100
    light.shadow.mapSize.set(1024,1024)
    return light
}

export {naturalEffect}