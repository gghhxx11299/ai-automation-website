// Animation JavaScript file for AutoCallAI website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js for the hero section
    const typed = new Typed('.typing-text', {
        strings: ['Phone Calls', 'Emails', 'WhatsApp Messages', 'Customer Support'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Initialize ScrollReveal for animations
    const sr = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 2000,
        reset: true
    });

    sr.reveal('.hero-content', { delay: 200 });
    sr.reveal('.hero-animation', { delay: 400 });
    sr.reveal('.features-grid .feature-card', { interval: 200 });
    sr.reveal('.stats-grid .stat-item', { interval: 200 });
    sr.reveal('.testimonials-grid .testimonial-card', { interval: 200, delay: 300 });
    sr.reveal('.pricing-grid .pricing-card', { interval: 300, delay: 200 });
    sr.reveal('.support-grid .support-card', { interval: 200 });
    sr.reveal('.faq-item', { interval: 150 });
    sr.reveal('.contact-grid .contact-card', { interval: 200 });
    sr.reveal('.form-wrapper', { delay: 300 });

    // Add scroll animation to elements
    window.addEventListener('scroll', function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .support-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });

    // Parallax effect for hero background elements
    document.addEventListener('mousemove', (e) => {
        const heroAnimation = document.querySelector('.hero-animation');
        if (heroAnimation) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroAnimation.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            let ripples = document.createElement('span');
            ripples.classList.add('ripple');
            ripples.style.cssText = `top: ${y}px; left: ${x}px;`;
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });

    // Add dynamic background effect
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Create floating particles
        createFloatingParticles();
    }
});

// Function to create floating particles for background effect
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');

        // Random properties
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const hue = Math.floor(Math.random() * 360);

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.background = `hsla(${hue}, 70%, 60%, 0.3)`;

        hero.appendChild(particle);
    }
}

// Add more dynamic animations
function initDynamicAnimations() {
    // Add a subtle background animation to the entire page
    const body = document.body;
    body.style.position = 'relative';

    // Create a canvas for background animations
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];

    // Set canvas size to match window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Initialize canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `hsla(${Math.random() * 360}, 70%, 60%, 0.5)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize 3D Background
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Positions
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 20;

        // Colors
        colorArray[i] = Math.random() * 0.5 + 0.5; // R (lighter colors)
        colorArray[i + 1] = Math.random() * 0.3 + 0.5; // G
        colorArray[i + 2] = Math.random() * 0.5 + 0.7; // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    // Points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse move effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;

        // Add subtle movement based on mouse
        particlesMesh.rotation.x += (mouseY * 0.05 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouseX * 0.05 - particlesMesh.rotation.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init3DBackground();
    initDynamicAnimations();
});

// Add CSS for ripple effect dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
        z-index: 1;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 1s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-particle {
        position: absolute;
        border-radius: 50%;
        background: rgba(67, 97, 238, 0.1);
        z-index: 1;
        animation: floatParticle linear infinite;
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateY(0) rotate(360deg);
            opacity: 0.5;
        }
    }
    
    .feature-card, .testimonial-card, .pricing-card, .support-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animated, .testimonial-card.animated, .pricing-card.animated, .support-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(rippleStyle);