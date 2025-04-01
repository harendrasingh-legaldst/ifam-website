// Advisor Version Control and Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get the version from the hidden input
    const versionInput = document.getElementById('advisorVersion');
    const currentVersion = versionInput ? versionInput.value : 'v1';
    
    // Show the appropriate version
    showVersionPage(currentVersion);
    
    // Initialize version-specific functionality
    if (currentVersion === 'v1') {
        initCarousel();
        initAdvisorDetails();
        initFloatingIcons(document.querySelector('.floating-icons-container.detailed-bg'));
    } else {
        // Initialize floating icons animation for coming soon page
        const comingSoonIcons = document.querySelector('.version-coming-soon .floating-icons-container');
        initFloatingIcons(comingSoonIcons);
    }
    
    // For easy testing - can be removed in production
    // Adding a hidden control in console to switch versions
    window.toggleAdvisorVersion = function(version) {
        if (version === 'v1' || version === 'v2') {
            localStorage.setItem('advisorVersion', version);
            location.reload();
        } else {
            console.error('Invalid version. Use "v1" or "v2".');
        }
    };
});

// Function to show the appropriate version
function showVersionPage(version) {
    const detailedVersion = document.querySelector('.version-detailed');
    const comingSoonVersion = document.querySelector('.version-coming-soon');
    
    if (version === 'v1') {
        detailedVersion.style.display = 'block';
        comingSoonVersion.style.display = 'none';
        
        // Add floating icons to the background dynamically
        addFloatingIcons();
        
        // Initialize the carousel and advisor details
        initializeAdvisors();
        
        // Keep dark theme for header/footer (don't add light-theme to body)
        document.body.classList.remove('light-theme');
        
        // Improved floating effect with more icons
        enhanceFloatingIcons();
    } else if (version === 'v2') {
        detailedVersion.style.display = 'none';
        comingSoonVersion.style.display = 'block';
        
        // Initialize floating icons for coming soon page
        const comingSoonIcons = document.querySelector('.version-coming-soon .floating-icons-container');
        if (comingSoonIcons) {
            initFloatingIcons(comingSoonIcons);
        }
        
        // Make sure no light theme is applied
        document.body.classList.remove('light-theme');
    }
}

// Function to initialize the carousel
function initCarousel() {
    const carousel = document.querySelector('.advisors-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const cardWidth = 280 + 30; // card width + gap
    const scrollAmount = cardWidth * 3; // Scroll by 3 cards at a time
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
}

// Function to initialize advisor details
function initAdvisorDetails() {
    const advisorCards = document.querySelectorAll('.advisor-card');
    const advisorDetails = document.querySelectorAll('.advisor-detail');
    const detailsContainer = document.querySelector('.advisor-details-container');
    const defaultMessage = document.querySelector('.advisor-detail.default-message');
    
    if (!advisorCards.length || !advisorDetails.length || !detailsContainer || !defaultMessage) return;
    
    // Show default message initially
    defaultMessage.style.display = 'block';
    
    // Add click event to each advisor card
    advisorCards.forEach(card => {
        card.addEventListener('click', () => {
            const advisorId = card.getAttribute('data-advisor');
            
            // Hide default message when an advisor is clicked
            defaultMessage.style.display = 'none';
            
            // Show the selected advisor's details
            showAdvisorDetails(advisorId);
            
            // Add active class to the clicked card and remove from others
            advisorCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Improved: Calculate scroll position to keep the advisor cards visible
            // and just show the details container in the lower part of the screen
            const windowHeight = window.innerHeight;
            const carouselContainer = document.querySelector('.advisors-carousel-container');
            const carouselBottom = carouselContainer.getBoundingClientRect().bottom;
            
            // Calculate how much to scroll so that the carousel remains visible
            // and the details appear just below it in the viewport
            let scrollPosition = window.pageYOffset;
            
            // If the carousel bottom is in the top half of the screen, 
            // scroll just enough to keep it visible
            if (carouselBottom < windowHeight * 0.4) {
                scrollPosition = window.pageYOffset + (carouselBottom - windowHeight * 0.4);
            }
            
            // Use window.scrollTo with the calculated position
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Show advisor details when a card is clicked
function showAdvisorDetails(advisorId) {
    // Hide all advisor details
    document.querySelectorAll('.advisor-detail').forEach(detail => {
        detail.classList.remove('active');
        detail.style.display = 'none';
    });
    
    // Remove active state from all cards
    document.querySelectorAll('.advisor-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Hide the default message if exists
    const defaultMessage = document.querySelector('.advisor-detail.default-message');
    if (defaultMessage) {
        defaultMessage.style.display = 'none';
    }
    
    // Show the selected advisor details
    const advisorDetail = document.querySelector(`.advisor-detail[data-advisor="${advisorId}"]`);
    if (advisorDetail) {
        advisorDetail.classList.add('active');
        advisorDetail.style.display = 'block';
        
        // Add active state to the corresponding card
        const advisorCard = document.querySelector(`.advisor-card[data-advisor="${advisorId}"]`);
        if (advisorCard) {
            advisorCard.classList.add('active');
        }
        
        // Improved scrolling behavior - only scroll slightly to keep advisor cards visible
        const detailsContainer = document.querySelector('.advisor-details-container');
        const cardContainer = document.querySelector('.advisors-carousel-container');
        
        if (detailsContainer && cardContainer) {
            // Calculate scroll position to show both cards and part of details container
            const offset = cardContainer.offsetTop + cardContainer.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollOffset = offset - (windowHeight * 0.3); // Show cards at top 30% of viewport
            
            window.scrollTo({
                top: scrollOffset,
                behavior: 'smooth'
            });
        }
    }
}

// Function to initialize floating icons animation
function initFloatingIcons(container) {
    if (!container) return;
    
    const floatingIcons = container.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach(icon => {
        // Randomize starting position slightly
        const randomDelay = Math.random() * 5;
        icon.style.animationDelay = `${randomDelay}s`;
    });
}

// Add more floating icons for enhanced background effect
function enhanceFloatingIcons() {
    const container = document.querySelector('.floating-icons-container.detailed-bg');
    if (!container) return;
    
    // Make existing icons more visible for light theme
    const existingIcons = container.querySelectorAll('.floating-icon');
    existingIcons.forEach(icon => {
        // Slightly increase opacity for better visibility on light background
        icon.style.opacity = '0.2';
        
        // Add subtle shadow for better visibility
        const iconElement = icon.querySelector('i');
        if (iconElement) {
            iconElement.style.filter = 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))';
            // Increase size slightly
            iconElement.style.fontSize = parseInt(getComputedStyle(iconElement).fontSize) * 1.2 + 'px';
        }
    });
    
    // Add additional icons (beyond the initial 6)
    for (let i = 7; i <= 10; i++) {
        const icon = document.createElement('div');
        icon.className = `floating-icon icon-${i}`;
        icon.style.opacity = '0.2'; // Slightly higher opacity for better visibility
        
        const iconElement = document.createElement('i');
        
        // Use a mix of legal and justice-related icons
        let iconClass;
        switch (i % 4) {
            case 0:
                iconClass = 'fas fa-balance-scale';
                break;
            case 1:
                iconClass = 'fas fa-gavel';
                break;
            case 2:
                iconClass = 'fas fa-book';
                break;
            case 3:
                iconClass = 'fas fa-landmark';
                break;
        }
        
        iconElement.className = iconClass;
        iconElement.style.filter = 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))';
        icon.appendChild(iconElement);
        container.appendChild(icon);
    }
}

// Function that combines carousel and advisor detail initialization
function initializeAdvisors() {
    initCarousel();
    initAdvisorDetails();
}

// Add floating icons container for the detailed page if it doesn't exist
function addFloatingIcons() {
    const detailedSection = document.querySelector('.version-detailed');
    if (!detailedSection) return;
    
    // Check if container already exists
    let container = detailedSection.querySelector('.floating-icons-container.detailed-bg');
    if (container) return; // Already exists
    
    // Create container
    container = document.createElement('div');
    container.className = 'floating-icons-container detailed-bg';
    
    // Add initial set of 6 icons
    const iconClasses = [
        'fas fa-gavel',
        'fas fa-balance-scale',
        'fas fa-book-open',
        'fas fa-university',
        'fas fa-landmark',
        'fas fa-scroll'
    ];
    
    for (let i = 0; i < 6; i++) {
        const icon = document.createElement('div');
        icon.className = `floating-icon icon-${i+1}`;
        
        const iconElement = document.createElement('i');
        iconElement.className = iconClasses[i];
        
        icon.appendChild(iconElement);
        container.appendChild(icon);
    }
    
    // Add container to the detailed section
    detailedSection.appendChild(container);
    
    // Initialize animation
    initFloatingIcons(container);
} 