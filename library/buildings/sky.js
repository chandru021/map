import * as THREE from 'three'



function cloudy(y = 10){
    const ring = new THREE.Group();
    const radius = 10;

    const cloud = new THREE.Mesh(
        new THREE.TorusGeometry( 5, 2, 16, 100 ),
        new THREE.MeshBasicMaterial()
    );

    cloud.rotation.x = Math.PI/2;
    cloud.position.y = y



    // for(let i = 0;i<20;i++){
    //     const cloud = new THREE.Mesh(
    //         new THREE.SphereGeometry(2,32,32),
    //         new THREE.MeshStandardMaterial({
    //             color:"yellow"
    //         }
    //         )
    //     )
    //     cloud.position.set(radius*Math.sin(i),20,radius*Math.cos(i));
    //     ring.add(cloud);
    // }

    return cloud;
}

export { cloudy }