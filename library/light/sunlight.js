import * as THREE from 'three'

function sunlight(){
    const directionalLight = new THREE.DirectionalLight(0xfcd27f,0.5);
    directionalLight.shadow.mapSize.width = 1024*2
    directionalLight.shadow.mapSize.height = 1024*2
    directionalLight.shadow.camera.far = 5
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.top = 10
    directionalLight.shadow.camera.bottom = -10
    directionalLight.shadow.camera.right = 10
    directionalLight.shadow.camera.left = -10
    directionalLight.shadow.radius = 10
    return directionalLight;
}

export { sunlight }