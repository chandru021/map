import * as THREE from 'three';

function psgbc() {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 11.5, 8, 28, false, 0, 6.2);
    const material = new THREE.MeshBasicMaterial({ color: "gold" });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.z = Math.PI / 2;
    return (cylinder)
}
export { psgbc };