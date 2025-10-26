// Dashboard JavaScript
console.log('%c⚡ Light AI Dashboard', 'font-size: 28px; font-weight: 600; color: #0071E3; font-family: -apple-system;');

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animate XP progress bar on load
window.addEventListener('load', () => {
    const progressBar = document.querySelector('.xp-progress-fill');
    if (progressBar) {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 300);
    }
});

// Animate stats on scroll
const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Intersection Observer for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}, observerOptions);

// Animate sections
document.querySelectorAll('.card, .achievement-card, .problem-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(element);
});

// Filter tabs functionality
const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // TODO: Filter problems based on selected tab
        console.log(`Filter changed to: ${tab.textContent}`);
    });
});

// Sidebar pattern links
const patternLinks = document.querySelectorAll('.pattern-link');
patternLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.classList.contains('view-all')) {
            e.preventDefault();
            const patternName = link.querySelector('.pattern-name').textContent;
            console.log(`Navigating to pattern: ${patternName}`);
            // TODO: Load pattern-specific problems
        }
    });
});

// Problem item click
document.querySelectorAll('.problem-item').forEach(item => {
    const solveButton = item.querySelector('.btn-outline');
    solveButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const problemTitle = item.querySelector('.problem-title').textContent;
        console.log(`Starting problem: ${problemTitle}`);
        // TODO: Navigate to problem solving page
    });
});

// Daily challenge button
const challengeButton = document.querySelector('.challenge-card .btn-primary');
if (challengeButton) {
    challengeButton.addEventListener('click', () => {
        console.log('Starting daily challenge...');
        // TODO: Navigate to daily challenge
    });
}

// Start Daily Challenge (header button)
const headerChallengeBtn = document.querySelector('.dashboard-header .btn-primary');
if (headerChallengeBtn) {
    headerChallengeBtn.addEventListener('click', () => {
        console.log('Starting daily challenge from header...');
        // TODO: Navigate to daily challenge
    });
}

// User menu
const userMenu = document.querySelector('.user-menu');
if (userMenu) {
    userMenu.addEventListener('click', () => {
        console.log('User menu clicked');
        // TODO: Show dropdown menu
    });
}

// Notification button
const notificationBtn = document.querySelector('.btn-icon');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        console.log('Notifications clicked');
        // TODO: Show notifications panel
    });
}

// Achievement cards interaction
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('click', () => {
        const achievementName = card.querySelector('.achievement-name').textContent;
        console.log(`Achievement clicked: ${achievementName}`);
        // TODO: Show achievement details modal
    });
});

// Streak calendar interaction
const streakDays = document.querySelectorAll('.day');
streakDays.forEach(day => {
    day.addEventListener('mouseenter', () => {
        if (day.classList.contains('active')) {
            day.style.transform = 'scale(1.2)';
        }
    });
    
    day.addEventListener('mouseleave', () => {
        day.style.transform = 'scale(1)';
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search (TODO)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut triggered');
        // TODO: Open search modal
    }
    
    // Ctrl/Cmd + D for daily challenge
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        console.log('Daily challenge shortcut triggered');
        // TODO: Navigate to daily challenge
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
        console.log(`%c⚡ Dashboard loaded in ${loadTime}ms`, 'color: #30D158; font-weight: 600; font-family: -apple-system;');
    });
}

// Motivational messages
const motivationalMessages = [
    "You're doing great! Keep the momentum going! 🚀",
    "Every problem solved is a step closer to mastery! 💪",
    "Consistency is key. You've got this! 🔥",
    "Your streak is impressive! Don't break it now! ⚡",
    "Learning never stops. Keep pushing forward! 🎯"
];

// Show random motivational message (could be used in UI)
const getMotivationalMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

console.log(`%c${getMotivationalMessage()}`, 'color: #FBBF24; font-size: 14px; font-family: -apple-system;');
