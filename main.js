// main.js - Using browser's native smooth scrolling

// We're removing the conflicting scroll code and keeping only UI-related functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('main.js initialized - using browser native smooth scrolling');
    
    // Initialize any UI elements not handled by script.js here
    
    // Scroll guide click - using native smooth scrolling
    const scrollGuide = document.querySelector('.scroll-guide');
    if (scrollGuide) {
        scrollGuide.addEventListener('click', () => {
            const introSection = document.querySelector('.intro');
            if (introSection) {
                // Use the browser's native smooth scrolling
                introSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Ensure browser's smooth scrolling is enabled
    const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;
    if (supportsScrollBehavior) {
        // Ensure HTML scroll-behavior is set to smooth in CSS
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}); 