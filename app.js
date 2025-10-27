// Light AI - Global Application JavaScript
// Handles authentication, navigation, and shared functionality
// Copyright © 2025 Bhanu Bisht. All rights reserved.

(function() {
  'use strict';

  console.log('%c⚡ Light AI', 'font-size: 28px; font-weight: 600; color: #0071E3; font-family: -apple-system;');
  console.log('%cCode Smarter. Land Faster.', 'font-size: 16px; color: #00D4FF; font-family: -apple-system;');

  // Global app state
  window.LightAI = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false
  };

  // Initialize app
  async function init() {
    // Check authentication on protected pages
    const protectedPages = ['dashboard.html', 'solve.html', 'visualize.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
      await checkAuth();
    } else if (currentPage === 'login.html' || currentPage === 'signup.html') {
      // Redirect to dashboard if already logged in
      if (window.LightAI.token) {
        const isValid = await validateToken();
        if (isValid) {
          window.location.href = '/dashboard.html';
          return;
        }
      }
    }

    // Update navbar for authenticated users
    updateNavbar();
    
    // Setup scroll effects
    setupScrollEffects();
    
    // Setup smooth scroll
    setupSmoothScroll();
  }

  // Check authentication
  async function checkAuth() {
    if (!window.LightAI.token) {
      redirectToLogin();
      return false;
    }

    const isValid = await validateToken();
    if (!isValid) {
      redirectToLogin();
      return false;
    }

    return true;
  }

  // Validate JWT token
  async function validateToken() {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${window.LightAI.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        window.LightAI.user = data.user;
        window.LightAI.isAuthenticated = true;
        return true;
      } else {
        localStorage.removeItem('token');
        window.LightAI.token = null;
        window.LightAI.isAuthenticated = false;
        return false;
      }
    } catch (error) {
      console.error('Auth validation error:', error);
      return false;
    }
  }

  // Redirect to login
  function redirectToLogin() {
    const currentPage = window.location.pathname;
    const returnUrl = encodeURIComponent(currentPage + window.location.search);
    window.location.href = `/login.html?returnUrl=${returnUrl}`;
  }

  // Update navbar based on auth status
  function updateNavbar() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    if (window.LightAI.isAuthenticated && window.LightAI.user) {
      // Show user menu
      navActions.innerHTML = `
        <div class="user-menu">
          <button class="user-menu-btn" id="userMenuBtn">
            <span class="user-avatar">${window.LightAI.user.username.charAt(0).toUpperCase()}</span>
            <span class="user-name">${window.LightAI.user.username}</span>
            <span class="dropdown-arrow">▼</span>
          </button>
          <div class="user-dropdown" id="userDropdown" style="display: none;">
            <div class="dropdown-header">
              <div class="user-avatar-large">${window.LightAI.user.username.charAt(0).toUpperCase()}</div>
              <div class="user-info">
                <div class="user-full-name">${window.LightAI.user.full_name || window.LightAI.user.username}</div>
                <div class="user-email">${window.LightAI.user.email}</div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <a href="/dashboard.html" class="dropdown-item">
              <span>📊</span> Dashboard
            </a>
            <a href="/profile.html" class="dropdown-item">
              <span>👤</span> Profile
            </a>
            <a href="/solve.html" class="dropdown-item">
              <span>💻</span> Practice
            </a>
            <a href="/visualize.html" class="dropdown-item">
              <span>🎨</span> Visualizer
            </a>
            <a href="/problems" class="dropdown-item">
              <span>📚</span> Problems
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item" id="logoutBtn">
              <span>🚪</span> Logout
            </a>
          </div>
        </div>
      `;

      // Setup dropdown toggle
      const menuBtn = document.getElementById('userMenuBtn');
      const dropdown = document.getElementById('userDropdown');
      const logoutBtn = document.getElementById('logoutBtn');

      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.style.display = 'none';
      });

      // Logout handler
      logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await logout();
      });
    }
  }

  // Logout function
  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${window.LightAI.token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    localStorage.removeItem('token');
    window.LightAI.token = null;
    window.LightAI.user = null;
    window.LightAI.isAuthenticated = false;
    window.location.href = '/index.html';
  }

  // Setup scroll effects
  function setupScrollEffects() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Setup smooth scroll
  function setupSmoothScroll() {
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
  }

  // Fetch with auth helper
  window.LightAI.fetchWithAuth = async function(url, options = {}) {
    if (!window.LightAI.token) {
      throw new Error('Not authenticated');
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${window.LightAI.token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      redirectToLogin();
      throw new Error('Session expired');
    }

    return response;
  };

  // Show loading spinner
  window.LightAI.showLoading = function(message = 'Loading...') {
    const existing = document.getElementById('global-loader');
    if (existing) existing.remove();

    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.innerHTML = `
      <div style="
        position: fixed;
        inset: 0;
        background: rgba(11, 11, 13, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      ">
        <div style="
          width: 60px;
          height: 60px;
          border: 4px solid rgba(0, 113, 227, 0.2);
          border-top-color: #0071E3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <p style="color: #fff; margin-top: 20px; font-size: 1.1rem;">${message}</p>
      </div>
    `;
    document.body.appendChild(loader);
  };

  // Hide loading spinner
  window.LightAI.hideLoading = function() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.remove();
  };

  // Show toast notification
  window.LightAI.toast = function(message, type = 'info') {
    const colors = {
      success: '#30D158',
      error: '#FF453A',
      warning: '#FFD60A',
      info: '#0071E3'
    };

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(20, 20, 22, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid ${colors[type]};
        border-left: 4px solid ${colors[type]};
        color: #fff;
        padding: 16px 20px;
        border-radius: 12px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        min-width: 280px;
      ">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.5rem;">
            ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <span>${message}</span>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // Add CSS animations
  if (!document.getElementById('lightai-styles')) {
    const style = document.createElement('style');
    style.id = 'lightai-styles';
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOutRight {
        to {
          opacity: 0;
          transform: translateX(100px);
        }
      }
      .user-menu {
        position: relative;
      }
      .user-menu-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 8px 16px;
        border-radius: 12px;
        color: #fff;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
      }
      .user-menu-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(0, 113, 227, 0.5);
      }
      .user-avatar {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, #0071E3, #00d4ff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .user-name {
        font-weight: 500;
      }
      .dropdown-arrow {
        font-size: 0.7rem;
        opacity: 0.6;
      }
      .user-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: rgba(20, 20, 22, 0.98);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        min-width: 200px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        z-index: 1000;
      }
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        color: #fff;
        text-decoration: none;
        transition: background 0.2s;
      }
      .dropdown-item:hover {
        background: rgba(0, 113, 227, 0.1);
      }
      .dropdown-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 4px 0;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

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
