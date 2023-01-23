import * as THREE from 'three'

function show(){
    const group = new THREE.Group();
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(3.6,3.6,0.2,36),
        new THREE.MeshStandardMaterial({
            color:"grey",
        })
    )

    const group2 = new THREE.Group();


    pedestal.position.set(0,0,0);
    group.add(pedestal)

    const pedestalTop = new THREE.Mesh(
        new THREE.CylinderGeometry(3,3,0.2,36),
        new THREE.MeshStandardMaterial({
            color:"grey",
        })
    )

    pedestalTop.position.y = pedestal.position.y + 0.2

    
    
    group.add(pedestalTop);

    const Cube = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshBasicMaterial({
            color:0xffffff,
            wireframe:true,
            // wireframeLinewidth:
        })
    )

    Cube.position.y = pedestalTop.position.y + 1.1;
    // Cube.rotation.x = Math.PI / 4;
    // Cube.rotation.y = Math.PI / 4;
    
    const ballbottom = ball()

    ballbottom.position.y = pedestalTop.position.y+0.2;
    // group.add(ballbottom)

    const ballmiddle = ball()

    ballmiddle.position.y = Cube.position.y;
    group2.add(ballmiddle)

    const balltop = ball()

    balltop.position.y = Cube.position.y * 1.7;
    // group.add(balltop)

    const ballbottom1 = ball()
    ballbottom1.position.y = ballbottom.position.y;
    ballbottom1.position.x = ballbottom.position.x + 0.86;
    ballbottom1.position.z = ballbottom.position.x + 0.86

    const balltop1 = ball()
    balltop1.position.y = balltop.position.y;
    balltop1.position.x = balltop.position.x + 0.86;
    balltop1.position.z = balltop.position.x + 0.86

    group2.add(ballbottom1,balltop1) 


    const ballbottom2 = ball()
    ballbottom2.position.y = ballbottom.position.y;
    ballbottom2.position.x = ballbottom.position.x - 0.86;
    ballbottom2.position.z = ballbottom.position.x - 0.86
    

    const balltop2 = ball()
    balltop2.position.y = balltop.position.y;
    balltop2.position.x = balltop.position.x - 0.86;
    balltop2.position.z = balltop.position.x - 0.86

    group2.add(ballbottom2,balltop2);

    
    const ballbottom3 = ball()
    ballbottom3.position.y = ballbottom.position.y;
    ballbottom3.position.x = ballbottom.position.x - 0.86;
    ballbottom3.position.z = ballbottom.position.x + 0.86
    


    const balltop3 = ball()
    balltop3.position.y = balltop.position.y;
    balltop3.position.x = balltop.position.x - 0.86;
    balltop3.position.z = balltop.position.x + 0.86

    group2.add(ballbottom3,balltop3)
    // group.add(ballbottom3);
    // ballbottom2.
    const ballbottom4 = ball()
    ballbottom4.position.y = ballbottom.position.y;
    ballbottom4.position.x = ballbottom.position.x + 0.86;
    ballbottom4.position.z = ballbottom.position.x - 0.86
    

    const balltop4 = ball()
    balltop4.position.y = balltop.position.y;
    balltop4.position.x = balltop.position.x + 0.86;
    balltop4.position.z = balltop.position.x - 0.86

    group2.add(ballbottom4,balltop4)
    // group2.rotation.z = Math.PI *
    
    group2.add(Cube);

    group2.position.y = 1.3
    
    group2.rotation.x = Math.PI * 0.25
    group2.rotation.z = Math.PI * 0.25
    group2.position.x = pedestalTop.position.x + 1
    group2.position.z = pedestalTop.position.z -0.6
    
    group.add(group2);
    
    
    // const balltop = ball()
    // const balltop = ball()
    // const balltop = ball()
    // const balltop = ball()
    // const balltop = ball()
    // const balltop = ball()
    // const balltop = ball()

    


    // const ballbottom = new THREE.Mesh(
    //     new THREE.SphereGeometry(0.3,32,16),
    //     new THREE.MeshBasicMaterial({
    //         color:'black'
    //     })
    // )

    // ballbottom.position.y = Cube.position.y;
    // group.add(ballbottom)

    // const geometry = new THREE.SphereGeometry( 15, 32, 16 );


    // Cube.rotation.

   

    return group;
}


function ball(){
    return new THREE.Mesh(
        new THREE.SphereGeometry(0.2,32,16),
        new THREE.MeshBasicMaterial({
            color:'black'
        })
    )
}

export { show }