import * as THREE from 'three'
import * as CANNON from 'cannon-es'


function createCar(physicsWorld,cmaterial){



const carBody = new CANNON.Body({
    mass: 100,
    position: new CANNON.Vec3(0, 3, -10),
    shape: new CANNON.Box(new CANNON.Vec3(1, 0.5, 2.55)),
  });

  carBody.quaternion.setFromEuler(0, Math.PI, 0);
  const vehicle = new CANNON.RigidVehicle({
    chassisBody: carBody,
  });


    const mass = 1;
    const axisWidth = 5;
    const wheelShape = new CANNON.Sphere(0.5);
    const wheelMaterial = new CANNON.Material('wheel');
    const wmaterial = new CANNON.ContactMaterial(
      wheelMaterial,
      cmaterial,
      {
          friction:1,
          restitution:0
      }
    )
    physicsWorld.addContactMaterial = wmaterial

    const down = new CANNON.Vec3(0, -1, 0);

    const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody1.addShape(wheelShape);
    wheelBody1.angularDamping = 0.5;
    wheelBody1.linearDamping = 0.5;
    vehicle.addWheel({
      body: wheelBody1,
      position: new CANNON.Vec3(-1, -0.4, -axisWidth / 4),
      axis: new CANNON.Vec3(1, 0, 0),
      direction: down,
    });   

    const wheelBody2 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody2.addShape(wheelShape);
    wheelBody2.angularDamping = 0.5;
    wheelBody2.linearDamping = 0.5;
    vehicle.addWheel({
      body: wheelBody2,
      position: new CANNON.Vec3(1, -0.4,-axisWidth / 4),
      axis: new CANNON.Vec3(1, 0, 0),
      direction: down,
    });
    
    const wheelBody3 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody3.addShape(wheelShape);
    wheelBody3.linearDamping = 0.5;
    wheelBody3.angularDamping = 0.5;
    vehicle.addWheel({
      body: wheelBody3,
      position: new CANNON.Vec3(-1, -0.4, axisWidth / 4),
      axis: new CANNON.Vec3(1, 0, 0),
      direction: down,
    });
    
    const wheelBody4 = new CANNON.Body({ mass, material: wheelMaterial });
    wheelBody4.addShape(wheelShape);
    wheelBody4.linearDamping = 0.5;
    wheelBody4.angularDamping = 0.5;
    vehicle.addWheel({
      body: wheelBody4,
      position: new CANNON.Vec3(1, -0.4, axisWidth / 4),
      axis: new CANNON.Vec3(1, 0, 0),
      direction: down,
    });
    vehicle.addToWorld(physicsWorld)
    
    return {vehicle,carBody,wheelBody1,wheelBody2,wheelBody3,wheelBody4}
}




export {createCar}