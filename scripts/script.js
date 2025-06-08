let currentSlide = 1;

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTestimonialSlider();
    initializeScrollAnimations();
    initializeButtons();
});

function initializeNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    window.currentSlide = function(n) {
        showSlide(currentSlide = n);
    }
    
    function showSlide(n) {
        if (n > slides.length) currentSlide = 1;
        if (n < 1) currentSlide = slides.length;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[currentSlide - 1]) {
            slides[currentSlide - 1].classList.add('active');
        }
        if (dots[currentSlide - 1]) {
            dots[currentSlide - 1].classList.add('active');
        }
    }
    
    setInterval(function() {
        currentSlide++;
        if (currentSlide > slides.length) currentSlide = 1;
        showSlide(currentSlide);
    }, 5000);
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.process-card, .benefit-item, .user-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

function createParticleEffect() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
        `;
        hero.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createParticleEffect();
    }, 1000);
});

const utils = {
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    scrollToElement: function(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

};


document.addEventListener('DOMContentLoaded', function() {
    
    const typeTabs = document.querySelectorAll('.type-tab');
    const emprendedorFields = document.querySelector('.emprendedor-fields');
    const colaboradorFields = document.querySelector('.colaborador-fields');

    if (typeTabs.length > 0) {
        typeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                typeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const userType = tab.getAttribute('data-type');
                if (userType === 'emprendedor') {
                    if (emprendedorFields) emprendedorFields.style.display = 'block';
                    if (colaboradorFields) colaboradorFields.style.display = 'none';
                } else {
                    if (emprendedorFields) emprendedorFields.style.display = 'none';
                    if (colaboradorFields) colaboradorFields.style.display = 'block';
                }
            });
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            
            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    alert('Las contraseñas no coinciden');
                    return;
                }
            }
            
            const requiredFields = registerForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Por favor, completa todos los campos requeridos');
                return;
            }
        });
    }
});