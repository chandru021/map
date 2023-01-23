import * as THREE from 'three';
import { Vec3 } from 'cannon-es';
import * as CANNON from 'cannon-es'

//creating sturcture
function createStructure(l=1,b=1,h=3,name,colors = 0xffffff){
    
    const texture = new THREE.TextureLoader();
    var roomName = [];
    var color = colors
    // var color = this.color
    // const ambientWall = texture.load('/textures/bricks/ambientOcclusion.jpg');
    // const wallcolor = texture.load("/textures/bricks/color.jpg");
    // const wallnormal = texture.load("/textures/bricks/normal.jpg");
    // const wallroughness = texture.load("/textures/bricks/roughness.jpg");
    const env = new THREE.CubeTextureLoader([
        '/textures/0/px.png',
        '/textures/0/nx.png',
        '/textures/0/py.png',
        '/textures/0/ny.png',
        '/textures/0/pz.png',
        '/textures/0/nz.png',
    ])

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(l,h,b,5,5,5),
         new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4,
            color:color
            // envMap: env,
            // envMapIntensity: 0.5
        })
    )
    mesh.position.y = 20
    mesh.position.x = 10
    mesh.position.z = 50
    
    const shape = new CANNON.Box(new CANNON.Vec3(l*0.5,h*0.5,b*0.5));
    const body = new CANNON.Body({
        shape:shape,
        position:new Vec3(0,20,0),
        mass:1000
    })
    
    body.position.copy(mesh.position);
    


    // mesh.geometry.setAttribute('uv2',
    //     new THREE.BufferAttribute(mesh.geometry.attributes.uv.array,2));
    


    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.y = h*0.4
   

    return {mesh,body,name,color,roomName};
}
export{createStructure};