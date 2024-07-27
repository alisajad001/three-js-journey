import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Initialize the scene
const scene = new THREE.Scene();

// Initialize the cube
const cubeGeometery = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(cubeGeometery, cubeMaterial);

const axesHelper = new THREE.AxesHelper(2);

cube.add(axesHelper);
scene.add(cube);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  35,
);
camera.position.z = 5;

// Initialize the renderer
const canvas = document.querySelector(".three");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Initalize the orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Initialize the Clock
const clock = new THREE.Clock();
let previousTime = 0;

// Animate the scene
function animate() {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  cube.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
