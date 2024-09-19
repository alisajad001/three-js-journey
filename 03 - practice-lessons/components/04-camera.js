import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function camera() {
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

  // Orthographic Camera
  // const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);

  camera.position.z = 4;

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
   * Cursor
   */
  let cursor = {
    x: 0,
    y: 0,
  };

  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / window.innerWidth - 0.5;
    cursor.y = -(e.clientY / window.innerHeight - 0.5);
  });

  /**
   * Controls
   */
  const controls = new OrbitControls(
    camera,
    document.querySelector('canvas#bg')
  );

  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

  /**
   * Animation
   */
  const timer = new Timer();
  const tick = () => {
    requestAnimationFrame(tick);

    timer.update();

    const elapsedTime = timer.getElapsed();

    // Update camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.y * 5;
    camera.lookAt(new THREE.Vector3());

    controls.update();

    renderer.render(scene, camera);
  };

  tick();
}

export default camera;
