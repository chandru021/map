import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import {MapControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {helicam} from '../camera/Coc.js';

class mapControl{
    constructor(camera = new helicam()){
        this.camera = camera
        this.canvas = document.querySelector('.webgl');
        return this.build(this.camera,this.canvas);
    }

    build(){
        return new MapControls(this.camera,this.canvas);
    }
}

export{mapControl}