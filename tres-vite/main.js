// import * as THREE from 'three';
// import "./style.css"
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// let camera, scene, renderer;

// init();

// function init() {

//   const container = document.createElement('div');
//   document.body.appendChild(container);

//   camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
//   camera.position.set(- 1.8, 0.6, 2.7);

//   scene = new THREE.Scene();

//   // model

//   const loader = new GLTFLoader().setPath('./commodore_64__computer_full_pack/');
//   loader.load('scene.gltf', async function (gltf) {

//     const model = gltf.scene;

//     // wait until the model can be added to the scene without blocking due to shader compilation

//     await renderer.compileAsync(model, camera, scene);

//     scene.add(model);

//     render();

//   });
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.toneMapping = THREE.ACESFilmicToneMapping;
//   renderer.toneMappingExposure = 1;
//   container.appendChild(renderer.domElement);

//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.addEventListener('change', render); // use if there is no animation loop
//   controls.minDistance = 2;
//   controls.maxDistance = 10;
//   controls.target.set(0, 0, - 0.2);
//   controls.update();

//   window.addEventListener('resize', onWindowResize);

// }

// function onWindowResize() {

//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);

//   render();

// }

// //

// function render() {

//   renderer.render(scene, camera);

// }

import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let camera, scene, renderer;

init();

function init() {

  const container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
  camera.position.set(- 1.8, 0.6, 2.7);

  scene = new THREE.Scene();

  // insert box 
  // const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  // const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // cube.position.set(0, 5, 0)
  // scene.add(cube);

  const video = document.createElement('video');
  video.src = 'public/dune/dune.mp4';
  video.load();
  video.play();
  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;
  const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
  const videoGeometry = new THREE.PlaneGeometry(16, 9);
  const videoPlane = new THREE.Mesh(videoGeometry, videoMaterial);
  videoPlane.scale.set(0.22, 0.34, 0);
  videoPlane.position.set(0.05, 2, -0.19);
  scene.add(videoPlane);

  new RGBELoader()
    .setPath('public/textures/equirectangular/')
    .load('royal_esplanade_1k.hdr', function (texture) {

      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.environment = texture;

      render();

      // model

      const loader = new GLTFLoader().setPath('public/commodore_64__computer_full_pack/');
      loader.load('scene.gltf', async function (gltf) {

        const model = gltf.scene;

        // wait until the model can be added to the scene without blocking due to shader compilation

        await renderer.compileAsync(model, camera, scene);

        scene.add(model);

        render();

      });

    });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, - 0.2);
  controls.update();

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}

//

function render() {

  renderer.render(scene, camera);

}