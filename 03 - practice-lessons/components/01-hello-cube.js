import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';

function basic() {
  /**
   * Scene
   */
  const scene = new THREE.Scene();

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.z = 5;

  /**
   * Cube
   */
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
  );
  scene.add(cube);

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  /**
   * Resize
   */
  window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Animation
   */
  const timer = new Timer();
  const tick = () => {
    requestAnimationFrame(tick);

    timer.update();

    const elapsedTime = timer.getElapsed();

    // Cube rotate
    cube.rotation.y = elapsedTime;
    cube.rotation.x = elapsedTime;

    renderer.render(scene, camera);
  };

  tick();
}

export default basic;
