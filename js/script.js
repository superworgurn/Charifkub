// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or respect OS setting
if (localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && 
    window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    document.documentElement.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', function() {
    // Toggle icon
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
    
    // Toggle theme
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// Add delay to animations for staggered effect
document.querySelectorAll('.fade-in').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.15}s`;
});

// Add floating animation to profile
const profileSection = document.querySelector('header');
profileSection.classList.add('floating');

// Add hover effect to all cards 
const cards = document.querySelectorAll('.article-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('glow');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('glow');
    });
});

// Create background particles
const particlesContainer = document.getElementById('particles');
const particleCount = 80; // Increased particle count

const colors = ['rgba(59, 130, 246, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(52, 211, 153, 0.6)', 'rgba(251, 191, 36, 0.6)'];

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const size = Math.random() * 10 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    // Random animation duration
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    
    // Random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = randomColor;
    
    // Random blur effect
    particle.style.filter = `blur(${Math.random() * 2}px)`;
    
    particlesContainer.appendChild(particle);
}

// Add scroll animation to elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-pulse');
            setTimeout(() => {
                entry.target.classList.remove('animate-pulse');
            }, 2000);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-header').forEach(header => {
    observer.observe(header);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to particles
window.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach(particle => {
        const speed = parseFloat(particle.getAttribute('data-speed') || 0.5);
        const x = (mouseX - 0.5) * 30 * speed;
        const y = (mouseY - 0.5) * 30 * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

