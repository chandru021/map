import * as THREE from 'three';


class helicam{
    constructor(fov = 30,height = window.innerHeight,width = window.innerWidth){
            return this.coc(fov,width/height);
    }

    coc(fov,ratio){
        const camera = new THREE.PerspectiveCamera(fov,ratio);
        camera.position.set(6,6,6)
        return camera;
    }
}

export {helicam};


    


