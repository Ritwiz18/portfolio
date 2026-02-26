// script.js - Three.js 3D Background

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Colors
const COLOR_ACCENT = 0xFFD700; // Yellow
const COLOR_PARTICLE = 0xFFFFFF; // White

// 1. Create a Geometric Torus (Donut)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// Wireframe material for tech look
const material = new THREE.MeshBasicMaterial({
    color: COLOR_ACCENT,
    wireframe: true,
    transparent: true,
    opacity: 0.2
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// 2. Create Floating Particles (Stars/Data Nodes)
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: COLOR_PARTICLE });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

// Add 200 stars
Array(200).fill().forEach(addStar);

// 3. Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// 4. Mouse Interaction Variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate Torus constantly
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // React to Mouse
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Smooth camera movement
    torus.rotation.y += 0.5 * (targetX - torus.rotation.y);
    torus.rotation.x += 0.05 * (targetY - torus.rotation.x);

    // Move camera slightly
    camera.position.x += (mouseX * 0.01 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.01 - camera.position.y) * 0.05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
