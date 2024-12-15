// Original script with some mobile-specific additions
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
    });

    // Mobile Navigation Link Handlers
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
        });
    });

    // Mobile Login/Signup Switches
    document.getElementById('mobileSwitchToLogin').addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        toggleModal('loginModal');
    });

    document.getElementById('mobileSwitchToSignup').addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        toggleModal('signupModal');
    });
});


// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.length >= 8;
}

// Modal Toggle Function
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('div');
    
    modal.classList.toggle('active');
    
    if(modal.classList.contains('active')) {
        gsap.to(modalContent, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
        });
    } else {
        gsap.to(modalContent, {
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in"
        });
    }
}

// Modal Event Listeners
document.getElementById('loginBtn').addEventListener('click', () => toggleModal('loginModal'));
document.getElementById('signupBtn').addEventListener('click', () => toggleModal('signupModal'));

// Form Validation
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');

    let isValid = true;

    if (!validateEmail(email.value)) {
        email.classList.add('input-error');
        emailError.classList.remove('hidden');
        isValid = false;
    } else {
        email.classList.remove('input-error');
        emailError.classList.add('hidden');
    }

    if (!validatePassword(password.value)) {
        password.classList.add('input-error');
        passwordError.classList.remove('hidden');
        isValid = false;
    } else {
        password.classList.remove('input-error');
        passwordError.classList.add('hidden');
    }

    if (isValid) {
        // Perform login logic here
        alert('Login Successful!');
        toggleModal('loginModal');
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const nameError = document.getElementById('signupNameError');
    const emailError = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');

    let isValid = true;

    if (name.value.trim() === '') {
        name.classList.add('input-error');
        nameError.classList.remove('hidden');
        isValid = false;
    } else {
        name.classList.remove('input-error');
        nameError.classList.add('hidden');
    }

    if (!validateEmail(email.value)) {
        email.classList.add('input-error');
        emailError.classList.remove('hidden');
        isValid = false;
    } else {
        email.classList.remove('input-error');
        emailError.classList.add('hidden');
    }

    if (!validatePassword(password.value)) {
        password.classList.add('input-error');
        passwordError.classList.remove('hidden');
        isValid = false;
    } else {
        password.classList.remove('input-error');
        passwordError.classList.add('hidden');
    }

    if (isValid) {
        // Perform signup logic here
        alert('Signup Successful!');
        toggleModal('signupModal');
    }
});

// Switch between Login and Signup
function switchToSignup() {
    toggleModal('loginModal');
    setTimeout(() => toggleModal('signupModal'), 300);
}

 // ... previous script remains the same ...

 function switchToLogin() {
    toggleModal('signupModal');
    setTimeout(() => toggleModal('loginModal'), 300);
}

// Password Toggle Visibility
document.querySelectorAll('.togglePassword').forEach(button => {
    button.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon (you can replace this with your preferred method)
        this.innerHTML = type === 'password' 
            ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.781-1.78zM12.12 8.233a3 3 0 013.707 3.707l-1.862-1.862a1 1 0 00-1.885-.516l-1.96-1.96z" clip-rule="evenodd" />
                <path d="M5.697 4.575A7.965 7.965 0 0110 3c4.478 0 8.268 2.943 9.542 7a8.362 8.362 0 01-1.506 2.683l-1.512-1.512a4 4 0 00-5.513-5.513L5.697 4.575z" />
            </svg>`;
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.getElementsByClassName('modal');
    Array.from(modals).forEach(modal => {
        if (event.target === modal) {
            toggleModal(modal.id);
        }
    });
});



// GSAP Animations
gsap.from("nav", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});


gsap.from(".hero-text", {
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

gsap.from(".hero-desc", {
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from(".hero-cta", {
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.7,
    ease: "power3.out"
});

gsap.from(".hero-image", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});


// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Title Animation
gsap.from('.about-title', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Description Animation
gsap.from('.about-description', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

// Features Animation
gsap.from('.feature-card', {
    scrollTrigger: {
        trigger: '.about-features',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: 'power3.out'
});

// Image Animation
gsap.from('.about-image-container', {
    scrollTrigger: {
        trigger: '.about-visualization',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Blob Animations
gsap.to('.blob-animation', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    scale: 1.1,
    rotation: 360,
    ease: 'none'
});

// GSAP Animations for Features Section
gsap.from('.features-title', {
scrollTrigger: {
    trigger: '#features',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
},
y: 50,
opacity: 0,
duration: 1,
ease: 'power3.out'
});

gsap.from('.features-description', {
scrollTrigger: {
    trigger: '#features',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
},
y: 30,
opacity: 0,
duration: 1,
delay: 0.2,
ease: 'power3.out'
});



gsap.from('.showcase-container', {
scrollTrigger: {
    trigger: '.showcase-container',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
},
scale: 0.9,
opacity: 0,
duration: 1,
ease: 'power3.out'
});

// Interactive Feature Items
document.querySelectorAll('.feature-item').forEach(item => {
item.addEventListener('mouseenter', () => {
    gsap.to(item, {
        backgroundColor: '#F3E8FF',
        borderRadius: '1rem',
        padding: '1rem',
        duration: 0.3
    });
});

item.addEventListener('mouseleave', () => {
    gsap.to(item, {
        backgroundColor: 'transparent',
        borderRadius: '0',
        padding: '0',
        duration: 0.3
    });
});
});


document.addEventListener('DOMContentLoaded', () => {
const progressBar = document.querySelector('.scroll-progress-bar');
const progressPercentage = document.querySelector('.scroll-percentage');
let isScrolling;

// Calculate scroll progress
function calculateScrollProgress() {
const windowHeight = window.innerHeight;
const documentHeight = document.documentElement.scrollHeight - windowHeight;
const scrollTop = window.scrollY;
const progress = (scrollTop / documentHeight) * 100;

// Update progress bar
progressBar.style.width = `${progress}%`;

// Update percentage text
progressPercentage.textContent = `${Math.round(progress)}%`;

// Show percentage indicator when scrolling
progressPercentage.classList.add('visible');

// Hide percentage indicator after scrolling stops
clearTimeout(isScrolling);
isScrolling = setTimeout(() => {
    progressPercentage.classList.remove('visible');
}, 1500);

// Add gradient effect based on scroll position
const hue = Math.round((progress / 100) * 60); // Adjust color range
progressBar.style.background = `linear-gradient(90deg, 
    #581C87 0%, 
    #7E3AF2 ${progress}%, 
    #8B5CF6 100%
)`;
}

// Smooth scroll to top function
function scrollToTop() {
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
}

// Add click event to progress bar for scroll to top
progressBar.parentElement.addEventListener('click', scrollToTop);

// Add scroll event listener with throttling
let ticking = false;
document.addEventListener('scroll', () => {
if (!ticking) {
    window.requestAnimationFrame(() => {
        calculateScrollProgress();
        ticking = false;
    });
    ticking = true;
}
});

// Initial calculation
calculateScrollProgress();

// Recalculate on window resize
window.addEventListener('resize', () => {
calculateScrollProgress();
});

// Add scroll to top button animation
const scrollButton = document.createElement('button');
scrollButton.className = 'scroll-to-top';
scrollButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
</svg>
`;
document.body.appendChild(scrollButton);

// Add these styles for the scroll to top button
const style = document.createElement('style');
style.textContent = `
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 80px;
    background: rgba(88, 28, 135, 0.9);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.scroll-to-top:hover {
    background: rgba(88, 28, 135, 1);
    transform: translateY(-2px);
}

.scroll-to-top.visible {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 768px) {
    .scroll-to-top {
        bottom: 10px;
        right: 60px;
        width: 35px;
        height: 35px;
    }
}
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
if (window.scrollY > window.innerHeight / 2) {
    scrollButton.classList.add('visible');
} else {
    scrollButton.classList.remove('visible');
}
});

// Add click event to scroll to top button
scrollButton.addEventListener('click', scrollToTop);
});

document.addEventListener('DOMContentLoaded', () => {
// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Title Animation
gsap.from('.success-title', {
    scrollTrigger: {
        trigger: '#success-stories',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Subtitle Animation
gsap.from('.success-subtitle', {
    scrollTrigger: {
        trigger: '#success-stories',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
});

// Success Cards Animation
gsap.from('.success-card', {
    scrollTrigger: {
        trigger: '.success-cards-container',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Metrics Animation
gsap.from('.metrics-container', {
    scrollTrigger: {
        trigger: '.metrics-container',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => startCounters()
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Counter Animation
function startCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });

    // Animate progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.classList.add('animate');
    });
}

// Floating Elements Animation
document.querySelectorAll('.floating-icon').forEach((icon, index) => {
    const speed = icon.dataset.speed;
    gsap.to(icon, {
        y: -50,
        rotation: 10,
        duration: 2 + index,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to('.floating-elements', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power3.out'
    });
});
});

class EnhancedGlobe {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('globeCanvas'),
            antialias: true,
            alpha: true
        });
        
        this.controls = null;
        this.globe = null;
        this.points = [];
        this.init();
    }

    init() {
        // Renderer settings
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);

        // Camera position
        this.camera.position.z = 250;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(100, 100, 100);
        this.scene.add(directionalLight);

        this.createGlobe();
        this.setupControls();
        this.setupEventListeners();
        this.animate();
    }

    createGlobe() {
        const geometry = new THREE.SphereGeometry(100, 64, 64);
        const textureLoader = new THREE.TextureLoader();

        // textures
        const earthTexture = textureLoader.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
        const bumpMap = textureLoader.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png');
        const specularMap = textureLoader.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-water.png');

        const material = new THREE.MeshPhongMaterial({
            map: earthTexture,
            bumpMap: bumpMap,
            bumpScale: 0.8,
            specularMap: specularMap,
            specular: new THREE.Color(0x444444),
            shininess: 15,
            transparent: true,
            opacity: 1
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);

        // Add subtle atmosphere
        const atmosphereGeometry = new THREE.SphereGeometry(102, 64, 64);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    gl_FragColor = vec4(0.3, 0.6, 1.0, 0.3) * intensity;
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });

        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        this.scene.add(atmosphere);
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;
        this.controls.minDistance = 150;
        this.controls.maxDistance = 400;
        this.controls.enablePan = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.5;
    }

    addPoint(lat, lon) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const radius = 102;

        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x4f46e5,
            transparent: true,
            opacity: 0.9
        });

        const point = new THREE.Mesh(geometry, material);
        point.position.set(x, y, z);

        // Enhanced glow effect
        const glowGeometry = new THREE.SphereGeometry(1.6, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x4f46e5,
            transparent: true,
            opacity: 0.15
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        point.add(glow);

        this.scene.add(point);
        this.points.push(point);

        // Animate point appearance
        point.scale.set(0, 0, 0);
        gsap.to(point.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        this.onWindowResize();
    }

    onWindowResize() {
        const container = this.renderer.domElement.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.controls.update();
        
        // Animate points
        this.points.forEach(point => {
            point.children[0].rotation.y += 0.01;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initializing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const globe = new EnhancedGlobe();

    const locations = [
        { lat: 40.7128, lon: -74.0060 }, // New York
        { lat: 51.5074, lon: -0.1278 },  // London
        { lat: 35.6762, lon: 139.6503 }, // Tokyo
        { lat: -33.8688, lon: 151.2093 }, // Sydney
        { lat: 22.3964, lon: 114.1095 },  // Hong Kong
        { lat: 48.8566, lon: 2.3522 },    // Paris
        { lat: -22.9068, lon: -43.1729 }  // Rio de Janeiro
    ];

    locations.forEach((loc, index) => {
        setTimeout(() => {
            globe.addPoint(loc.lat, loc.lon);
        }, index * 300);
    });
});
