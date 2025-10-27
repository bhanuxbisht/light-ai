// Dashboard JavaScript
console.log('%c⚡ Light AI Dashboard', 'font-size: 28px; font-weight: 600; color: #0071E3; font-family: -apple-system;');

// Global user data
let userData = null;

// Fetch user progress from API
async function loadUserProgress() {
    try {
        window.LightAI.showLoading('Loading your progress...');
        
        const response = await window.LightAI.fetchWithAuth('/api/progress/me');

        if (!response.ok) {
            throw new Error('Failed to fetch progress');
        }

        const data = await response.json();
        userData = data;
        updateDashboard(data);
        
        window.LightAI.hideLoading();
    } catch (error) {
        console.error('Error loading progress:', error);
        window.LightAI.hideLoading();
        window.LightAI.toast('Failed to load your progress. Please refresh the page.', 'error');
    }
}

// Update dashboard with real data
function updateDashboard(data) {
    const { progress, recentSubmissions, achievements } = data;

    // Update XP display
    const xpCurrent = document.querySelector('.xp-current');
    const xpTarget = document.querySelector('.xp-target');
    const xpProgressFill = document.querySelector('.xp-progress-fill');
    
    if (xpCurrent && xpTarget && xpProgressFill) {
        const currentXP = progress.total_xp;
        const targetXP = Math.ceil((currentXP + 1) / 1000) * 1000; // Next 1000 XP milestone
        
        xpCurrent.textContent = currentXP;
        xpTarget.textContent = targetXP;
        
        const percentage = (currentXP / targetXP) * 100;
        xpProgressFill.style.width = `${percentage}%`;
    }

    // Update streak display
    updateStreakDisplay(progress.current_streak);

    // Update stats
    const levelStat = document.querySelector('.stat-value[data-stat="level"]');
    const problemsStat = document.querySelector('.stat-value[data-stat="problems"]');
    const timeStat = document.querySelector('.stat-value[data-stat="time"]');
    const streakStat = document.querySelector('.stat-value[data-stat="streak"]');
    
    // Calculate level from XP (1000 XP per level)
    const level = Math.floor(progress.total_xp / 1000) + 1;
    
    if (levelStat) {
        levelStat.textContent = `Level ${level}`;
    }
    
    if (problemsStat) {
        animateValue(problemsStat, 0, progress.problems_solved, 1000);
    }
    
    if (timeStat) {
        const hours = Math.floor(progress.total_time_spent / 3600);
        timeStat.textContent = hours;
    }
    
    if (streakStat) {
        streakStat.textContent = `${progress.current_streak} Days`;
    }

    // Update achievements display
    updateAchievements(achievements);

    // Update recent activity
    updateRecentActivity(recentSubmissions);
}

// Update streak visualization
function updateStreakDisplay(currentStreak) {
    const streakDays = document.querySelectorAll('.streak-day');
    streakDays.forEach((day, index) => {
        if (index < currentStreak) {
            day.classList.add('active');
        } else {
            day.classList.remove('active');
        }
    });
}

// Update achievements
function updateAchievements(achievements) {
    const achievementsContainer = document.querySelector('.achievements-list');
    if (!achievementsContainer) return;

    if (achievements.length === 0) {
        achievementsContainer.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center;">No achievements yet. Keep solving problems!</p>';
        return;
    }

    achievementsContainer.innerHTML = achievements.map(achievement => `
        <div class="achievement-card unlocked">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
            </div>
        </div>
    `).join('');
}

// Update recent activity
function updateRecentActivity(submissions) {
    const activityContainer = document.querySelector('.recent-activity');
    if (!activityContainer) return;

    if (submissions.length === 0) {
        activityContainer.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center;">No recent submissions. Start solving!</p>';
        return;
    }

    activityContainer.innerHTML = submissions.slice(0, 5).map(submission => {
        const date = new Date(submission.submitted_at);
        const timeAgo = getTimeAgo(date);
        const statusIcon = submission.passed ? '✅' : '❌';
        const statusClass = submission.passed ? 'success' : 'failed';
        
        return `
            <div class="activity-item ${statusClass}">
                <span class="activity-icon">${statusIcon}</span>
                <div class="activity-details">
                    <strong>${submission.problem_title}</strong>
                    <span class="activity-time">${timeAgo}</span>
                </div>
                <span class="activity-language">${submission.language}</span>
            </div>
        `;
    }).join('');
}

// Helper function to get time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-toast';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255,69,58,0.9);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

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
    // Load user progress when page loads
    loadUserProgress();
    
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
