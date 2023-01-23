import * as THREE from 'three';


function kutikunjan(l=10,b=10,h=10){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(l,h,b),
        new THREE.MeshStandardMaterial({
            color:0xffffff
        })
    )

    return cube;
}

export{kutikunjan};