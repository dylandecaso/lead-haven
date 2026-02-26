/**
 * Lead Haven Landing Page - Main JavaScript
 * Handles Calendly popup integration and user interactions
 */

// ===================================
// CALENDLY POPUP INTEGRATION
// ===================================

/**
 * Initialize Calendly popup for all CTA buttons
 * Waits for Calendly script to load before attaching event listeners
 */
function initCalendlyPopup() {
    // Check if Calendly is loaded
    if (typeof Calendly === 'undefined') {
        console.warn('Calendly not loaded yet, retrying...');
        setTimeout(initCalendlyPopup, 500);
        return;
    }

    // Get all elements with calendly-trigger class
    const calendlyTriggers = document.querySelectorAll('.calendly-trigger');
    
    calendlyTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Open Calendly popup
            Calendly.initPopupWidget({
                url: 'https://calendly.com/julian-leadhaven'
            });
            
            // Optional: Track conversion event (Google Analytics, Facebook Pixel, etc.)
            // Example: gtag('event', 'calendly_click', { event_category: 'engagement' });
            
            return false;
        });
    });
    
    console.log(`Calendly popup initialized for ${calendlyTriggers.length} triggers`);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendlyPopup);
} else {
    initCalendlyPopup();
}

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or if it's a calendly trigger
        if (href === '#' || this.classList.contains('calendly-trigger')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================

document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ===================================
// NAVBAR SCROLL EFFECTS
// ===================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const stickyCTA = document.getElementById('stickyCTA');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background to navbar after scrolling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show sticky CTA after scrolling past hero section
    if (stickyCTA) {
        if (currentScroll > 800) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
    }
    
    lastScroll = currentScroll;
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Track conversion events (placeholder for analytics)
 * @param {string} eventName - Name of the event to track
 * @param {object} eventData - Additional data to send with the event
 */
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, eventData);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Preload Calendly iframe on user interaction (hover/touch)
let calendlyPreloaded = false;

function preloadCalendly() {
    if (calendlyPreloaded || typeof Calendly === 'undefined') return;
    
    Calendly.initBadgeWidget({
        url: 'https://calendly.com/julian-leadhaven',
        text: '',
        color: '#00C2FF',
        textColor: '#ffffff',
        branding: false
    });
    
    calendlyPreloaded = true;
}

// Preload on first interaction with any CTA
document.querySelectorAll('.calendly-trigger').forEach(trigger => {
    trigger.addEventListener('mouseenter', preloadCalendly, { once: true });
    trigger.addEventListener('touchstart', preloadCalendly, { once: true });
});
