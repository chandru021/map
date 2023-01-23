import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {helicam} from '../camera/Coc.js';

class mycontrol{
    constructor(camera = new helicam()){
        this.camera = camera
        this.canvas = document.querySelector('.webgl');
        return this.build(this.camera,this.canvas);
    }

    build(){
        return new OrbitControls(this.camera,this.canvas);
    }
}

export{mycontrol}