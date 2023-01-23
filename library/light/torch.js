import * as THREE from 'three'

function torch(color = 0xffffff, intensity = 0.5){
  
    const light = new THREE.PointLight(color,intensity,100,1)

    return light;
}

export {torch};