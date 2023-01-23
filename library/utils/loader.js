import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

function load(path){
    const loader = new GLTFLoader();
    var a = new THREE.Group();
    loader.load(path,(gltf)=>{
    while(gltf.scene.children.length != 0){
    let x = gltf.scene.children[0];
    x.castShadow = true
    a.add(x)    
    }
    })
    return a;
}

export {load}