// import { useEffect } from 'react';

import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

import {land} from '../library/buildings/land'

import { createStructure } from '../library/buildings/normal';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import {helicam} from '../library/camera/Coc'
import GUI from 'dat.gui'

import { Vec3 } from 'cannon-es';

import {createCar} from '../library/utils/Car.js'
import { getRenderer } from '../library/utils/renderer';
import { load } from '../library/utils/loader';
import { naturalEffect } from '../library/light/natural';
import { mapControl } from '../library/control/map';




var drivingMode = false


const map = new Map();
const map2 = new Map();
var originalColors = new Map();

const loader = new GLTFLoader();


var a = load('carUpdated.glb')
a.scale.set(0.9,0.9,0.9)
var bridge = load('/bridge/bridge2.glb')
var tree = load('/tree.glb')
var hostelEntrance = load('/hostel.glb')
var pedestal = load('/pedestal1.glb')
var arc = load('/archblend.glb')



const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayDirection = new THREE.Vector3(10,0,0)
rayDirection.normalize();

const currentPanel = []
const panel = new GUI.GUI();

    const scene = new THREE.Scene();


    scene.add(bridge) 
    bridge.scale.set(0.5,0.5,0.5)

    scene.add(arc)
    arc.rotation.y = Math.PI

    panel.add(arc.position,'x').min(-20).max(20).step(0.001)
    panel.add(arc.position,'y').min(-20).max(20).step(0.001)
    panel.add(arc.position,'z').min(-20).max(20).step(0.001)

    arc.position.set(7.661,0.725,-17.917)

    scene.add(hostelEntrance)
    hostelEntrance.scale.set(0.1,0.1,0.1)
    scene.add(pedestal)

    hostelEntrance.position.set(-241.99,0,28.959)
    
    hostelEntrance.scale.set(0.23,0.23,0.23)

    bridge.position.set(-22.815,3.614,-0.071)
    bridge.rotation.y = Math.PI * 0.5
    scene.add(a)
    // scene.travers
    a.position.set(10,10,10)
 
    // whe.scale.set(0.1,0.1,0.1)
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    const floor = land(2000,2000)
    // floor.receiveShadow = true;
    scene.add(floor)

    const visiblity = new THREE.AmbientLight(0xffffff,0.7);
    scene.add(visiblity)
    // visiblity.castShadow = true
    const light = naturalEffect()

    scene.add(light)
    // const helper = new THREE.CameraHelper(light.shadow.camera)
    


    // scene.add(helper)
    light.castShadow = true
  
    panel.add(visiblity,'intensity').min(0).max(10).step(0.001).name("Ambient Light")
    panel.add(light,'intensity').min(0).max(10).step(0.001).name("Directional Light")
    
    const physicsWorld = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0),
    });

    const cmaterial = new CANNON.Material('default');
const Cmaterial = new CANNON.ContactMaterial(
    cmaterial,
    cmaterial,
    {
        friction:0.5,
        restitution:0.2
    }
)
physicsWorld.addContactMaterial = Cmaterial
physicsWorld.defaultContactMaterial = Cmaterial

    
  

    const canvas = document.querySelector('canvas');


   
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
     
      shape: new CANNON.Plane(),
    });

    
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    
    
    physicsWorld.addBody(groundBody);


    const temp = {}

    const cannonDebugger = new CannonDebugger(scene, physicsWorld);
    
    
  
    const objArr = [];


    
    const construct = (l,h,b,name,color)=>{
     
      let building = createStructure(l,h,b,name,obj.params.color)
    
      scene.add(building.mesh)
      physicsWorld.addBody(building.body)
      currentPanel.push( panel.add(building.body.position,'x').min(-50).max(50).name(building.name + "-x-Coordinate"))
      currentPanel.push(panel.add(building.body.position,'y').min(-50).max(50).name(building.name + "-y-Coordinate"))
      currentPanel.push(panel.add(building.body.position,'z').min(-50).max(50).name(building.name + "-z-Coordinate"))
      map.set(building.mesh,building.name)
      map2.set(building.mesh,building.body)
      
      objArr.push(building)
      colorUpdate(building.mesh,building.color)
    }



   
    const vehicle = createCar(physicsWorld,cmaterial)
   
    const obj = {}
    
    obj.build = ()=>{
      construct(obj.params.l,obj.params.h,obj.params.b,obj.params.name)
      
    }

    

    obj.params = {}
    obj.params.l = 1
    obj.params.b = 1
    obj.params.h = 1
    obj.params.color = 0xffffff
    currentPanel.push(panel.addColor(obj.params,'color'))

    

    obj.params.name = ""
    obj.params.roomName = ""
    obj.params.querry = ""
    
    panel.add(obj.params,'l').min(1).max(20).step(1)
    panel.add(obj.params,'b').min(1).max(20).step(1)
    panel.add(obj.params,'h').min(1).max(20).step(1)
    panel.add(obj.params,'name').name("Building Name")
    panel.add(obj,'build').name("Construct")
    panel.add(obj.params,'querry').name("Search Place")
    
    obj.search = ()=>{
      searchRoom()
    }

    const searchRoom = ()=>{
      for(const buildings of objArr){
        for(const rooms of buildings.roomName){
          if(rooms === obj.params.roomName){
            buildings.mesh.material.color.set(0xff0000)
          }
        }
      }
    }
    panel.add(obj,'search')

    
    


    const config = {}
    config.canvas = canvas
    config.sizes = sizes
    
    
   const renderer = getRenderer(config)

    
    
    const camera = new helicam()
    scene.add(camera)
    camera.position.set(-10,20,-30)

    
    
    
    window.addEventListener('resize', () =>
    {
      
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      
      
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    
    let volume = 0
    var offset = 0.5
   
    document.addEventListener('keydown', (event) => {
      
      const maxSteerVal = Math.PI / 4;
      const maxForce = 110;
      let boost = 2;
      var movingF = false
      
      switch (event.key) {
    
        case 'w':
          if(event.shiftKey == true && drivingMode)
          {
            if(offset < 6)
              offset += 0.1
            
             break;
          }
          else if(drivingMode)
          {
           
            vehicle.vehicle.setWheelForce(maxForce, 2);
            vehicle.vehicle.setWheelForce(maxForce, 3);
            
            movingF = true
            
            
            break;
          }
          break;

        case 's':

            if(event.shiftKey == true && drivingMode)
            {
              if(offset > 0.5)
              offset -= 0.1
            
             break;
            }
            else if(drivingMode)
            {
              vehicle.vehicle.setWheelForce(-maxForce, 2);
              vehicle.vehicle.setWheelForce(-maxForce, 3);
              if(volume < 1){
                volume  = volume + 0.1
              }
            
              break;
            }
            break;

        case 'a':

          if(drivingMode){
          vehicle.vehicle.setSteeringValue(maxSteerVal, 0);
          vehicle.vehicle.setSteeringValue(maxSteerVal, 1);
          break;
          }
          break;

        case 'd':

          if(drivingMode){
          vehicle.vehicle.setSteeringValue(-maxSteerVal, 0);
          vehicle.vehicle.setSteeringValue(-maxSteerVal, 1);
          break;
          }
          break;
          

        case ',':
          {
            if(drivingMode)
            {
              drivingMode = false
              shut.play()
          
              break;
            }
            drivingMode = true
            ignition.play()
            sound.play()
            
            break;
          }break;

          case 'g':
            {if(drivingMode)
                horn.play();
            }
        
      }
      
      
      
      
    });

   
    document.addEventListener('keyup', (event) => {
      
      switch (event.key) {
        case 'w':

          vehicle.vehicle.setWheelForce(0, 2);
          vehicle.vehicle.setWheelForce(0, 3);
          break;

        case 's':

          vehicle.vehicle.setWheelForce(0, 2);
          vehicle.vehicle.setWheelForce(0, 3);
          
          break;

        case 'a':

          vehicle.vehicle.setSteeringValue(0, 0);
          vehicle.vehicle.setSteeringValue(0, 1);
          break;

        case 'd':

          vehicle.vehicle.setSteeringValue(0, 0);
          vehicle.vehicle.setSteeringValue(0, 1);
          break;
      }
    });

    window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
    

    const control = new mapControl(camera)
    control.enableZoom = true
    control.panSpeed = 1
    
    control.maxPolarAngle = Math.PI * 0.4

    const eblock = createStructure(16,8,9,'eblock')
    eblock.mesh.position.set(-0.558,4,11.641)
    eblock.body.position.set(-0.558,4,11.641)

    const iblock = createStructure(7, 28, 8, 'iblock');
  iblock.body.position.set(40, 10, -20)
objArr.push(iblock)


const dblock = createStructure(3, 7.5, 3, 'dblock');
dblock.body.position.set(10, 10, -25.9)
objArr.push(dblock)

const d2block = createStructure(3, 6.5, 3, 'd2block');
d2block.body.position.set(10, 10, -14.7)
objArr.push(d2block)

const ablock = createStructure(10, 14, 8, 'ablock');
ablock.body.position.set(15, 10, -55)
objArr.push(ablock)

const bblock = createStructure(10, 14, 8, 'bblock');
bblock.body.position.set(45, 10, -55)
objArr.push(bblock)

const rroom = createStructure(5, 5, 5, 'rroom');
rroom.body.position.set(35, 10, -51)
objArr.push(rroom)

    

    objArr.push(eblock);
    

    
    const fblock = createStructure(7,14,8,'fblock');
    fblock.body.position.set(16.066,10,3)
    objArr.push(fblock)
    
    const behindg = createStructure(9,6,4,'behindg');
    behindg.body.position.set(20.093,1.0,16.651)
    objArr.push(behindg)
    // behindg.body.position.set()

    const jblock = createStructure(9,6,9,'jblock')
    jblock.body.position.set(18.372,10,25.256)
    objArr.push(jblock)

    const eblockext = createStructure(16,8,9,'eblockext');
    eblockext.body.position.set(-0.558,20,21)
    objArr.push(eblockext)

    // const gblockb = createStructure(7,8,4);
    const gblock = createStructure(14,7,8.8,'gblock')
    gblock.body.position.set(14.936,10,-7.434)
    objArr.push(gblock)

    const yblock = createStructure(20,7,8,'yblock')
    yblock.body.position.set(18.377,20,-33.246)
    objArr.push(yblock);

    for(const obj of objArr){
      originalColors.set(obj.mesh,obj.color)
    }
    
  
    const listener = new THREE.AudioListener();
  camera.add( listener );

const sound = new THREE.Audio( listener );


    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'idle.wav', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( true );
      sound.setVolume( 0.1);
      
    });
    const ignition = new THREE.Audio(listener)
    audioLoader.load('startup.mp3',function(buffer){
      ignition.setBuffer(buffer)
      ignition.setLoop(false);
      ignition.setVolume(0.1)
    })

    const shut = new THREE.Audio(listener)
    audioLoader.load('reveal-1.wav',function(buffer){
      shut.setBuffer(buffer)
      shut.setLoop(false)
      shut.setVolume(0.2)
    })

    const horn = new THREE.Audio(listener)
    audioLoader.load('horn.mp3',(buffer)=>{
      horn.setBuffer(buffer)
      horn.setPlaybackRate(1.25)
      horn.setVolume(0.6)
    })

    const hitSound = new Audio('car-hit-1.mp3')



    const playHitSound = (collision) =>
  {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()


        if(impactStrength > 0.5){        
          hitSound.volume = Math.random()
        hitSound.currentTime = 0
        hitSound.play()
        }
    
  }

  vehicle.carBody.addEventListener('collide',playHitSound)


    for(let i = 0;i<objArr.length;i++){
      scene.add(objArr[i].mesh);
      physicsWorld.addBody(objArr[i].body)
    }
    var prevTime = 0;
    const clock = new THREE.Clock();
    

    const mouse = new THREE.Vector2()
let prevIntersect = null;
window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

    renderer.setPixelRatio(Math.min(2,window.devicePixelRatio))
    renderer.render(scene,camera);

    window.addEventListener('click', () =>
{
  
    if(currentIntersect)
    {
   
        prevIntersect = currentIntersect.object
        panelReset(currentIntersect.object)
    }
})

var onFocus = null;


panel.add(obj.params,'roomName')
obj.add = ()=>{
  addNames()
}
panel.add(obj,'add').name("Add Room")

const addNames = ()=>{

    if(prevIntersect != null){
       for(const obje of objArr){
          if(obje.mesh === prevIntersect){
              if(!present(obje.roomName,obj.params.roomName)){
                obje.roomName.push(obj.params.roomName)
                
              }else{
                continue;
              }
          }
          }
       }
    }

const staticObjects = [];

const present = (arr,name)=>{
  for(const names of arr){
    if(names === name){
      return true;
    }
  }

  return false;
}


obj.clearSearch = ()=>{
  clear();
}

const clear = ()=>{
  for(const obj of objArr){
   
    obj.mesh.material.color.set(originalColors.get(obj.mesh))
    
  }
}

panel.add(obj,'clearSearch')

  const panelReset = (object)=>{
    
      for(let i = 0;i<currentPanel.length;i++)
        panel.remove(currentPanel[i])

      currentPanel.length = 0
     
      onFocus = object
      currentPanel.push(panel.add(map2.get(object).position,'x').min(-500).max(500).step(0.1).name(map.get(object) + "-xc"))

      currentPanel.push(panel.add(map2.get(object).position,'y').min(-500).max(500).step(0.1).name(map.get(object) + "-yc"))
      
      currentPanel.push(panel.add(map2.get(object).position,'z').min(-500).max(500).step(0.1).name(map.get(object) + "-zc"))
     
      currentPanel.push(panel.addColor(obj.params,'color').onChange(()=>{
      object.material.color.set(obj.params.color)
      
      colorUpdate(object,obj.params.color)
     
      }))
    

    }


    obj.delete = ()=>{
      removeBuildings()
    }

    obj.deleteTree = ()=>{
      deleteTrees();
    }
    const staticPanel = []

    const deleteTrees = ()=>{
      var x = -1;
        for(let i = 0;i<staticObjects.length;i++){
          const obje = staticObjects[i];
          if(obje.name === obj.params.name){
            x = i
            scene.remove(obje.mesh)
            physicsWorld.removeBody(obje.body)
          }

        }
        if(x >= 0){
          staticObjects.splice(x,1)
          for(let i = 0;i<staticPanel.length;i++){
            panel.remove(staticPanel[i])
          }
          staticPanel.length = 0;
          for(let i = 0;i<staticObjects.length;i++){
            staticPanel.push(panel.add(staticObjects[i].body.position,'x').min(-100).max(100).name(staticObjects[i].name + '-x'))
            staticPanel.push(panel.add(staticObjects[i].body.position,'x').min(-100).max(100).name(staticObjects[i].name+'-y'))
            staticPanel.push(panel.add(staticObjects[i].body.position,'x').min(-100).max(100).name(staticObjects[i].name+'-z'))
          }
        }
      
    }

    panel.add(obj,'deleteTree').name("Delete Tree")
    const removeBuildings = ()=>{
      if(onFocus != null){
        var x = -1;
        for(let i = 0;i<objArr.length;i++){
          const obj = objArr[i]
         
          if(obj.mesh === onFocus){
              x = i
              scene.remove(obj.mesh)
              physicsWorld.removeBody(obj.body)
              console.log(objArr.length)
              originalColors.delete(obj.mesh)
              map.delete(obj.mesh)
              map2.delete(obj.mesh)
              currentIntersect = null
              for(let i = 0;i<currentPanel.length;i++){
              panel.remove(currentPanel[i])
              }
              currentPanel.length = 0
              
          }
        
      }
      if(x >=  0)
        objArr.splice(x,1)
      
       
      }
    }

    panel.add(obj,'delete').name("Delete Building")
   

    const colorUpdate = (object,color)=>{
      originalColors.set(object,color)
    }


    obj.addTree = ()=>{
      addTrees();
    }

    const addTrees = ()=>{
      var Tree1 = tree.clone(true)
      Tree1.scale.set(0.5,0.5,0.5)
      scene.add(Tree1)
      var name = ""
      const treeBody = new CANNON.Body({
        shape:new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5)),
        mass:0,
        position:new CANNON.Vec3(0,2,0)
      })
      physicsWorld.addBody(treeBody)
      treeBody.position.copy(Tree1.position)
     
      name = obj.params.name
      treeBody.allowSleep = true
      staticPanel.push(panel.add(treeBody.position,'x').min(-10).max(10).step(0.001).name(obj.params.name + '-x'))
      staticPanel.push(panel.add(treeBody.position,'y').min(-10).max(10).step(0.001).name(obj.params.name + '-x'))
      staticPanel.push(panel.add(treeBody.position,'z').min(-10).max(10).step(0.001).name(obj.params.name + '-x'))
      staticObjects.push({mesh:Tree1,body:treeBody,name:name})
      
    }
    
    panel.add(obj,'addTree').name("Add Tree")
    const bridgeShape = new CANNON.Box(new CANNON.Vec3(17.5,3,4))
    const bridgeBody = new CANNON.Body({
      shape:bridgeShape,
      mass:0,
      position: new CANNON.Vec3(-22.5,0,0)
    })

    physicsWorld.addBody(bridgeBody)


    
    pedestal.rotation.z = Math.PI
    
    pedestal.position.set(-11.914,0.728,-23.116)


    const pedestalBody = new CANNON.Body({
      shape:new CANNON.Box(new CANNON.Vec3(3,3,3)),
      mass:0,
      position:new Vec3(0,0,0)
    })

    console.log(pedestal.position)
   
    pedestalBody.position.x = pedestal.position.x + 5
    pedestalBody.position.y = pedestal.position.y
    pedestalBody.position.z = pedestal.position.z
    
    physicsWorld.addBody(pedestalBody)

  

   
    

    const animate = () => {
      raycaster.setFromCamera(mouse,camera);
      const objectsToTest = []
      for(const objects of objArr){
        objectsToTest.push(objects.mesh)
      }
      // cannonDebugger.update()
      

      const intersects = raycaster.intersectObjects(objectsToTest)
      if(intersects.length)
      {
          currentIntersect = intersects[0]
      }
      else
      {
          currentIntersect = null
      }

      
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - prevTime;
      prevTime = elapsedTime;

      physicsWorld.step(1/60,deltaTime,3)
      eblock.mesh.position.copy(eblock.body.position)
   
      for( const obj of objArr){
        obj.mesh.position.copy(obj.body.position);
        obj.mesh.quaternion.copy(obj.body.quaternion)
        map.set(obj.mesh,obj.name)
        map2.set(obj.mesh,obj.body)
       
      }
      for(const obj of staticObjects){
        obj.mesh.position.copy(obj.body.position)
      }
     
      a.position.x = vehicle.carBody.position.x
      a.position.z = vehicle.carBody.position.z
      a.position.y = offset+Math.abs(Math.sin(elapsedTime))
      a.quaternion.copy(vehicle.carBody.quaternion)

      
      
      if(drivingMode)
      {
      
      control.enabled = false
      camera.rotation.set(-2.553,-0.2705,-2.96)
      camera.position.y = 20
      camera.position.x = vehicle.carBody.position.x - 10
      camera.position.z = vehicle.carBody.position.z - 30
      
      }else{
        control.enabled = true
        sound.pause()
      }
      
      renderer.render(scene,camera);
     
      window.requestAnimationFrame(animate);

    };
    animate();