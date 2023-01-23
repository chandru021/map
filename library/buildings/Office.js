import * as THREE from 'three';
import * as CANNON from 'cannon-es'
//creating sturcture
const texture = new THREE.TextureLoader();
const ao = texture.load("/textures/metal/ao.jpg");
const col = texture.load("/textures/metal/base.jpg");
const norm= texture.load("/textures/metal/normal.jpg");
const rough = texture.load("/textures/metal/roughness.jpg");
const height = texture.load("/textures/metal/height.png")
const metal = texture.load("/textures/metal/metal.jpg")


function createStructures(l=1,b=1,h=1,color=0xffffff){
    const bottom = new THREE.Mesh(
        new THREE.BoxGeometry(l,2,b,5,5,5),
        new THREE.MeshStandardMaterial({
            aoMap:ao,
            map:col,
            normalMap:norm,
            roughnessMap:rough,
            metalnessMap:metal,
            displacementMap:height,
            displacementScale:0.001,
            metalness:0.6,
            roughness:0
        })
    )
        
    bottom.geometry.setAttribute('uv2',
        new THREE.BufferAttribute(bottom.geometry.attributes.uv.array,2));
    


    bottom.castShadow = true;
    bottom.receiveShadow = true;

    bottom.position.y = 0.5
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(l-0.3,1.7,b-0.3,5,5,5),
        new THREE.MeshStandardMaterial({
            aoMap:ao,
            map:col,
            normalMap:norm,
            roughnessMap:rough,
            metalnessMap:metal,
            displacementMap:height,
            displacementScale:0.001,
            metalness:0.6,
            roughness:0
        })
    )

    top.castShadow = true;
    top.receiveShadow = true;
    
    
    top.position.y = 1.8;
    top.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(top.geometry.attributes.uv.array,2));
    
    const toptop = new THREE.Mesh(
        new THREE.BoxGeometry(l-0.5,0.6,b-0.5,5,5,5),
        new THREE.MeshStandardMaterial({
            aoMap:ao,
            map:col,
            normalMap:norm,
            roughnessMap:rough,
            metalnessMap:metal,
            displacementMap:height,
            displacementScale:0.001,
            metalness:0.6,
            roughness:0
        })
    )

    toptop.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(toptop.geometry.attributes.uv.array,2));
    toptop.castShadow = true
    toptop.receiveShadow = true;
    
    toptop.position.y =2.8;
    const group = new THREE.Group();
    group.add(bottom);
    group.add(top);
    group.add(toptop);
    // group.position.y =
    return group;
}

export{createStructures};