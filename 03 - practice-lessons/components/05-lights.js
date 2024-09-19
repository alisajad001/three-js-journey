import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function lights() {
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
    50
  );

  camera.position.z = 2;
  camera.position.y = 2;
  camera.position.x = 2;

  /**
   * Controls
   */
  const controls = new OrbitControls(camera, document.querySelector('#bg'));
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

  /**
   * Objects
   */
  // Material
  const material = new THREE.MeshStandardMaterial();
  material.roughness = 0.4;

  // Objects
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
  );
  sphere.position.x = -1.5;

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
  );

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
  );
  torus.position.x = 1.5;

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.65;

  scene.add(sphere, cube, torus, plane);

  /**
   * Lights
   */
  const ambLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambLight);

  const dirLight = new THREE.DirectionalLight(0x00fffc, 1);
  dirLight.position.set(2, 0, 1);
  scene.add(dirLight);

  const hemLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
  hemLight.position.set(0, 2, 0);
  scene.add(hemLight);

  const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 3);
  pointLight.position.set(1, 0, 1);
  scene.add(pointLight);

  const rectLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
  rectLight.position.set(-1.5, 0, 1);
  rectLight.lookAt(new THREE.Vector3());
  scene.add(rectLight);

  const spotLight = new THREE.SpotLight(
    0x78ff00,
    4.5,
    10,
    Math.PI * 0.1,
    0.25,
    1
  );
  spotLight.position.set(2, 0, 1);
  scene.add(spotLight);

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

    // Update objects
    cube.rotation.y = 0.4 * elapsedTime;
    torus.rotation.y = 0.4 * elapsedTime;

    cube.rotation.x = 0.9 * elapsedTime;
    torus.rotation.x = 0.8 * elapsedTime;

    controls.update();

    renderer.render(scene, camera);
  };

  tick();
}

export default lights;
