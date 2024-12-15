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