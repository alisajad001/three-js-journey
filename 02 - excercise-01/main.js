import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Initalize the scene
const scene = new THREE.Scene();

// Initalize the camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);
camera.position.z = 5;

// Initalize the geometry
const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});

// Initialize the hedron wires
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const wireHedron = new THREE.Mesh(geometry, wireMat);

// Initialize the hedron
const hedron = new THREE.Mesh(geometry, material);
scene.add(hedron);
hedron.add(wireHedron);

// Initialize the light
const light = new THREE.HemisphereLight("blue", "pink");
scene.add(light);

// Initalize the renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// Initialize the orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.autoRotate = true;

// Animate
function animate() {
  requestAnimationFrame(animate);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  controls.update();
}

animate();
