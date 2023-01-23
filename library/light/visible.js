import * as THREE from 'three'

function visible(color=0xffffff){
    const ambient = new THREE.AmbientLight(color,0.3);
    return ambient
}

export {visible}