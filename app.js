// Light AI - Apple-Style Interactions
console.log('%c⚡ Light AI', 'font-size: 28px; font-weight: 600; color: #0071E3; font-family: -apple-system;');
console.log('%cCode Smarter. Land Faster.', 'font-size: 16px; color: #00D4FF; font-family: -apple-system;');

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 48;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer with stagger animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, observerOptions);

// Animate cards
document.querySelectorAll('.card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// Stats counter animation
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
};

// Trigger counters when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const counters = entry.target.querySelectorAll('strong');
            counters.forEach(counter => {
                const text = counter.textContent;
                const num = parseInt(text.replace(/\D/g, ''));
                if (num) {
                    counter.textContent = '0';
                    setTimeout(() => animateCounter(counter, num), 200);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Button ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.left = e.clientX - this.offsetLeft + 'px';
        ripple.style.top = e.clientY - this.offsetTop + 'px';
        ripple.style.animation = 'ripple-effect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < 600) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Magnetic effect for large buttons
document.querySelectorAll('.btn-large').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
        console.log(`%c⚡ Loaded in ${loadTime}ms`, 'color: #30D158; font-weight: 600; font-family: -apple-system;');
    });
}
