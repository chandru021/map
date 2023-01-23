import * as THREE from 'three'

function bridge(length = 1, width = 1) {
    const bri = new THREE.Mesh(
        new THREE.BoxGeometry(length, 0.3, width),
        new THREE.MeshBasicMaterial({ color: "grey" })
    )

    return bri
}

export { bridge }