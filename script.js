// ===========================
// Dark/Light Mode Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const htmlElement = document.documentElement;

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        htmlElement.classList.add('light-mode');
        htmlElement.classList.remove('dark-mode');
        themeToggle.classList.add('light-mode');
        themeToggle.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        htmlElement.classList.add('dark-mode');
        htmlElement.classList.remove('light-mode');
        themeToggle.classList.add('dark-mode');
        themeToggle.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// ===========================
// Hamburger Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Back to Top Button
// ===========================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Intersection Observer for Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'slide-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .skill-item, .about-card, .achievement-card, .info-item').forEach(element => {
    observer.observe(element);
});

// ===========================
// Animated Counter for Achievements
// ===========================
const counters = document.querySelectorAll('.counter');
let hasRun = false;

function startCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 30;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCount, 50);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Trigger counter animation when achievements section is in view
const achievementsSection = document.getElementById('achievements');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasRun) {
            hasRun = true;
            startCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (achievementsSection) {
    counterObserver.observe(achievementsSection);
}

// ===========================
// Contact Form Submission
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        
        // Simple validation
        if (name && email && message) {
            // You can integrate with a backend service here
            console.log('Form Data:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}

// ===========================
// Download Resume Function
// ===========================
function downloadResume() {
    // Create a simple resume as a text file
    const resumeContent = `
GUNDAM VISHNU VARDHAN REDDY
Full Stack Developer | Python Developer | CSE Student

CONTACT INFORMATION
Email: gundam@example.com
Location: Andhra Pradesh, India
Phone: +91-XXXXXXXXXX

PROFESSIONAL SUMMARY
Passionate Full Stack Developer and CSE student with strong foundation in building scalable web applications. 
Proficient in HTML, CSS, JavaScript, Python, and modern frameworks. Dedicated to continuous learning and 
delivering exceptional digital solutions.

TECHNICAL SKILLS
- Frontend: HTML5, CSS3, JavaScript, React
- Backend: Python, Flask, Node.js
- Databases: MySQL, MongoDB
- Tools & Platforms: Git, GitHub, VS Code
- Other: Java, Data Structures, OOP

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science & Engineering
JNTUA (Jawaharlal Nehru Technological University Anantapur)
Current Year: 2nd Year (2024-2028)

PROJECTS
1. Calculator Website - HTML5, CSS3, JavaScript
2. Flask CRUD App - Python, Flask, MySQL
3. Premium Portfolio Website - HTML5, CSS3, JavaScript
4. Student Management System - Java, MySQL
5. Login/Register App - Python, Flask

ACHIEVEMENTS
- Built 15+ Real Projects
- Learned 25+ Technical Skills
- Career Goal: ₹24 LPA+
- 50+ Code Commits on GitHub

CAREER OBJECTIVES
Aspiring to reach a ₹24 LPA+ position as a Full Stack Developer. Committed to mastering advanced 
technologies, building portfolio-worthy projects, and establishing myself as a sought-after tech professional.
    `;
    
    // Create blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Gundam_Vishnu_Vardhan_Reddy_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// ===========================
// Smooth Scroll Behavior
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Keyboard Navigation
// ===========================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});

// ===========================
// Performance Optimization
// ===========================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Add Ripple Effect to Buttons
// ===========================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===========================
// Cursor Glow Effect (Optional Enhancement)
// ===========================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // You can add custom cursor effects here if needed
    // For example: update cursor position-based effects
});

// ===========================
// Initialize on Page Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    console.log('Portfolio website loaded successfully!');
});

// ===========================
// Mobile Viewport Height Fix
// ===========================
function updateVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

updateVH();
window.addEventListener('resize', updateVH);

// ===========================
// Service Worker Registration (Optional for PWA)
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker code can be added here for offline support
    });
}

// ===========================
// Custom Log Messages
// ===========================
console.log('%c🚀 Welcome to Gundam Vishnu Vardhan Reddy\'s Portfolio!', 'color: #4F46E5; font-size: 16px; font-weight: bold;');
console.log('%cFull Stack Developer | Python Developer | CSE Student', 'color: #8B5CF6; font-size: 12px;');
console.log('%cLet\'s build something amazing together! 💻', 'color: #EC4899; font-size: 12px;');
