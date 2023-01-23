import * as THREE from 'three'
function psgb() {
    const geometry = new THREE.TorusGeometry(5.132, 0.5861, 4, 100, Math.PI);
    /*const geometry = new THREE.RingGeometry(8.265, 14.326, 8, 1, 0, Math.PI);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);*/
    const material = new THREE.MeshBasicMaterial({ color: "gold", wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    return torus;
}

export { psgb }