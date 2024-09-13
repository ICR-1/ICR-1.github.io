document.addEventListener('DOMContentLoaded', () => {
  // Initialize Three.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1); // Set background color to black
  document.getElementById('container').appendChild(renderer.domElement);

  // Add OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true; // Allow zooming in and out
  controls.enablePan = true; // Allow panning
  controls.enableRotate = true; // Allow rotation

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  // Load GLTF model
  const loader = new THREE.GLTFLoader();
  loader.load('Assets/furina.glb', function (gltf) {
      scene.add(gltf.scene);
      gltf.scene.scale.set(1, 1, 1); // Adjust the scale as needed
      gltf.scene.position.set(0, 0, 0); // Adjust the position as needed
  }, function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Display loading percentage
  }, function (error) {
      console.error('An error occurred while loading the model', error);
  });

  // Set camera position
  camera.position.set(0, 2, 5);

  function animate() {
      requestAnimationFrame(animate);
      controls.update(); // Update controls
      renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // CAPTCHA Modal Logic
  const captchaModal = document.getElementById('captcha-modal');
  const verifyYesButton = document.getElementById('verify-yes');
  const verifyNoButton = document.getElementById('verify-no');

  function showCaptchaModal() {
      captchaModal.style.display = 'block';
  }

  function hideCaptchaModal() {
      captchaModal.style.display = 'none';
  }

  verifyYesButton.addEventListener('click', () => {
      hideCaptchaModal();
      const audio = new Audio('Assets/rave.mp3');
      audio.loop = true;
      audio.play();
  });

  verifyNoButton.addEventListener('click', () => {
      window.open('no.html', '_blank');
  });

  // Detect scroll to show/hide sections
  const sections = document.querySelectorAll('#aboutme, #projects, #contactme');
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
          } else {
              entry.target.classList.remove('in-view');
          }
      });
  }, observerOptions);

  sections.forEach(section => {
      observer.observe(section);
  });

  // Show CAPTCHA modal on page load (for demonstration purposes)
  showCaptchaModal();
});
