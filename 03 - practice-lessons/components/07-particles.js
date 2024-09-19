import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function particles() {
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

  camera.position.x = Math.PI;

  /**
   * Controls
   */
  const controls = new OrbitControls(camera, document.querySelector('#bg'));
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

  /**
   * Particles
   */
  const particlesGeo = new THREE.BufferGeometry();
  const particlesCnt = 5000;

  const particlesArr = new Float32Array(particlesCnt * 3);
  const colors = new Float32Array(particlesCnt * 3);

  for (let i = 0; i < particlesCnt * 3; i++) {
    const i3 = i * 3;

    particlesArr[i3 + 0] = (Math.random() - 0.5) * 10;
    particlesArr[i3 + 1] = (Math.random() - 0.5) * 10;
    particlesArr[i3 + 2] = (Math.random() - 0.5) * 10;

    colors[i] = Math.random();
  }

  particlesGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(particlesArr, 3)
  );

  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.01,
    sizeAttenuation: true,
  });
  particlesMat.vertexColors = true;

  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

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

    // Update particles

    // for (let i = 0; i < particlesCnt; i++) {
    //   const i3 = i * 3;

    //   const x = particlesGeo.attributes.position.array[i3 + 0];
    //   const y = particlesGeo.attributes.position.array[i3 + 1];

    //   particlesGeo.attributes.position.array[i3 + 0] =
    //     x + Math.sin(elapsedTime + y);
    // }

    // particlesGeo.attributes.position.needsUpdate = true;

    controls.update();

    renderer.render(scene, camera);
  };

  tick();
}

export default particles;
