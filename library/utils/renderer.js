import * as THREE from 'three'

function getRenderer(config){
    const renderer = new THREE.WebGLRenderer({
        canvas: config.canvas
      })
    renderer.setSize(config.sizes.width, config.sizes.height)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setClearColor(0x000000)
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 3
    return renderer;
}

export { 
    getRenderer
}