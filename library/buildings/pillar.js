import * as THREE from 'three';

function pillar() {
    const geometry = new THREE.BoxGeometry(3.625, 3, 3);
    const material = new THREE.MeshBasicMaterial({ color: "gray" });
    const cube = new THREE.Mesh(geometry, material);
    return (cube);
}

export { pillar };