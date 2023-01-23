import * as THREE from 'three'
import { Scene } from 'three'

function tower(){

    const group = new THREE.Group()
    //Scene.add(group)


    const towerbase= new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.75,6,),
        new THREE.MeshBasicMaterial({color:"grey"})
    )
    towerbase.position.x=0
    towerbase.position.y=0
    group.add(towerbase)

    const towermid= new THREE.Mesh(
        new THREE.SphereGeometry(0.6,32,16,0,6.28318,0,2.5),
        new THREE.MeshBasicMaterial({color:"grey"})
    )
    towermid.position.x=0
    towermid.position.y=3.45
    group.add(towermid)

    const towertop= new THREE.Mesh(
        new THREE.ConeGeometry(0.3,1,21,1),
        new THREE.MeshBasicMaterial({color:"grey"})
    )
    towertop.position.x=0
    towertop.position.y=4
    group.add(towertop)

    return group
}

export {tower}