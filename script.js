// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button');

// Set active navigation item based on current page
const setActiveNavItem = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    navLinks.forEach(link => {
        // Get the href value
        const href = link.getAttribute('href');
        
        // Check if the current path ends with the href value
        if (currentPath.endsWith(href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add a slight delay to the follower for a smoother effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Change cursor style on hover over interactive elements
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '2px solid var(--accent-color)';
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'var(--accent-color)';
        cursor.style.border = 'none';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// Mobile navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Scroll animations with reduced impact (now throttled)
const scrollTrigger = () => {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card');
    let scrollTimeout;
    
    const revealElement = () => {
        // Clear the timeout if it exists
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Set a new timeout to run after 10ms
        scrollTimeout = setTimeout(() => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }, 10);
    };
    
    // Use passive listener for better performance
    window.addEventListener('scroll', revealElement, { passive: true });
    
    // Trigger once on load
    revealElement();
};

// Header scroll effect with throttling
let scrollTimeout;
const headerScrollEffect = () => {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            // Clear the timeout if it exists
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Set a new timeout to run after 10ms
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }, 10);
        }, { passive: true });
    }
};

// Simplified function that uses the browser's native scrolling
function initSmoothScroll() {
    // Clean up any existing wheel event listeners that might interfere
    if (window._wheelCleanup) {
        window._wheelCleanup();
    }
    
    // Handle anchor links using browser's native smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').split('#')[1];
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;
            
            // Use native scrolling
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Store cleanup function
    window._wheelCleanup = function() {
        // Nothing to clean up with native scrolling
    };
}

// Scroll Guide Visibility
function handleScrollGuideVisibility() {
    const scrollGuide = document.querySelector('.scroll-guide');
    if (!scrollGuide) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Start fading out after 100px of scroll
        if (scrollPosition > 100) {
            const opacity = Math.max(0, 1 - (scrollPosition - 100) / 300);
            scrollGuide.style.opacity = opacity;
            
            // Hide completely when opacity is very low
            if (opacity < 0.05) {
                scrollGuide.style.visibility = 'hidden';
            } else {
                scrollGuide.style.visibility = 'visible';
            }
        } else {
            scrollGuide.style.opacity = 1;
            scrollGuide.style.visibility = 'visible';
        }
    });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Clean up any existing scroll event listeners
    const oldWheelListeners = window._wheelListeners || [];
    oldWheelListeners.forEach(listener => {
        window.removeEventListener('wheel', listener);
    });
    
    // Store our new listeners for potential future cleanup
    window._wheelListeners = [];
    
    // Initialize all components
    setActiveNavItem();
    navSlide();
    scrollTrigger();
    headerScrollEffect();
    initSmoothScroll();
    
    // Initialize scroll guide visibility
    handleScrollGuideVisibility();
    
    // Other initialization can go here
    
    // Initialize testimonial slider if it exists
    if (document.querySelector('.testimonial-slider')) {
        testimonialSlider();
    }
    
    // Add GSAP animations if available
    if (typeof gsap !== 'undefined') {
        // Hero section animations
        gsap.from('.hero-content h1, .page-hero h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-content p, .page-hero p', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.4,
            ease: 'power3.out'
        });
        
        gsap.from('.cta-button', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.6,
            ease: 'power3.out'
        });
        
        gsap.from('.scroll-indicator', {
            duration: 1,
            opacity: 0,
            delay: 1,
            ease: 'power3.out'
        });
    }
    
    console.log("Slow premium scroll initialized successfully");
    
    animateTimeline();

    // Mobile menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle navigation
            nav.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Toggle body scroll
            document.body.classList.toggle('menu-open');
            
            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
});

// Testimonial slider
const testimonialSlider = () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let interval;
    
    // Initialize the slider
    const initSlider = () => {
        slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
            if (index === 0) {
                slide.classList.add('active');
            }
        });
    };
    
    // Next slide function
    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        setTimeout(() => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.display = 'block';
            
            // Force reflow before adding active class for animation
            slides[currentSlide].offsetWidth;
            
            slides[currentSlide].classList.add('active');
        }, 300);
        
        resetInterval();
    };
    
    // Previous slide function
    const prevSlide = () => {
        slides[currentSlide].classList.remove('active');
        setTimeout(() => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].style.display = 'block';
            
            // Force reflow before adding active class for animation
            slides[currentSlide].offsetWidth;
            
            slides[currentSlide].classList.add('active');
        }, 300);
        
        resetInterval();
    };
    
    // Auto-rotate slides
    const startInterval = () => {
        interval = setInterval(nextSlide, 6000);
    };
    
    // Reset interval when user interacts with slider
    const resetInterval = () => {
        clearInterval(interval);
        startInterval();
    };
    
    // Event listeners for buttons
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Initialize slider and start auto-rotation
    initSlider();
    startInterval();
};

// Add animation class for nav links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach((link, index) => {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        link.style.opacity = 1;
    });
});

// Add keyframe animation for nav links
const style = document.createElement('style');
style.innerHTML = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Form submission handling
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Sent!';
                form.reset();
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Add page transition effect
window.addEventListener('beforeunload', () => {
    document.body.classList.add('page-transition');
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 500);
});

// Add loader styles
const loaderStyle = document.createElement('style');
loaderStyle.innerHTML = `
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s;
    }
    
    .loader::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.1);
        border-top-color: var(--accent-color);
        border-radius: 50%;
        animation: loader-spin 1s linear infinite;
    }
    
    @keyframes loader-spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    .page-transition {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(loaderStyle);

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            // Lower inc to slow and higher to speed up
            const inc = target / speed;
            
            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.ceil(count + inc);
                // Call function every ms
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
};

// Start counter animation when the section is in view
const accomplishmentsSection = document.querySelector('.accomplishments');
if (accomplishmentsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(accomplishmentsSection);
}

// Add this function to initialize the landscape picture scroller
function initLandscapeScroller() {
    // Create the landscape scroller HTML structure if it doesn't exist
    if (!document.querySelector('.landscape-scroller') && document.querySelector('.intro')) {
        const scrollerHTML = `
            <section class="landscape-scroller">
                <div class="container">
                    <h2 class="section-title reveal-text">Our Journey in Pictures</h2>
                    <div class="landscape-gallery">
                        <div class="landscape-container">
                            <div class="landscape-slides">
                                <div class="landscape-slide active">
                                    <img src="https://source.unsplash.com/1600x900/?courtroom,legal" alt="Legal Environment">
                                    <div class="slide-caption">Excellence in Advocacy</div>
                                </div>
                                <div class="landscape-slide">
                                    <img src="https://source.unsplash.com/1600x900/?moot,court" alt="Moot Court">
                                    <div class="slide-caption">Championship Competitions</div>
                                </div>
                                <div class="landscape-slide">
                                    <img src="https://source.unsplash.com/1600x900/?legal,library" alt="Legal Studies">
                                    <div class="slide-caption">Dedicated Research</div>
                                </div>
                                <div class="landscape-slide">
                                    <img src="https://source.unsplash.com/1600x900/?debate,team" alt="Team Debate">
                                    <div class="slide-caption">Collaborative Excellence</div>
                                </div>
                                <div class="landscape-slide">
                                    <img src="https://source.unsplash.com/1600x900/?award,trophy" alt="Award Ceremony">
                                    <div class="slide-caption">Celebrating Success</div>
                                </div>
                            </div>
                        </div>
                        <div class="landscape-controls">
                            <button class="landscape-prev"><i class="fas fa-chevron-left"></i></button>
                            <div class="landscape-dots"></div>
                            <button class="landscape-next"><i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        // Insert the scroller after the intro section
        const introSection = document.querySelector('.intro');
        introSection.insertAdjacentHTML('afterend', scrollerHTML);
        
        // Generate dots based on number of slides
        const slides = document.querySelectorAll('.landscape-slide');
        const dotsContainer = document.querySelector('.landscape-dots');
        
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('landscape-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }
    
    // Once the HTML is inserted, initialize the slider functionality
    const slides = document.querySelectorAll('.landscape-slide');
    if (!slides.length) return;
    
    const dots = document.querySelectorAll('.landscape-dot');
    const prevBtn = document.querySelector('.landscape-prev');
    const nextBtn = document.querySelector('.landscape-next');
    let currentSlide = 0;
    let interval;
    
    // Function to go to a specific slide
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Function for next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    // Function for previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    
    // Add event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }
    
    // Function to reset the interval
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }
    
    // Function to start the interval
    function startInterval() {
        interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    // Start the interval
    startInterval();
}

// Add these animations to your CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes headerShrink {
            from { padding: 1rem 5%; }
            to { padding: 0.8rem 5%; }
        }
        
        @keyframes headerExpand {
            from { padding: 0.8rem 5%; }
            to { padding: 1rem 5%; }
        }
    </style>
`);

// Timeline animation
const animateTimeline = () => {
    const milestones = document.querySelectorAll('.milestone');
    
    if (milestones.length === 0) return;
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered animation delay for each milestone
                const index = Array.from(milestones).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    milestones.forEach(milestone => {
        timelineObserver.observe(milestone);
        
        // Set data-year attribute from the milestone content
        if (milestone.getAttribute('data-year')) {
            const year = milestone.getAttribute('data-year');
            milestone.querySelector('.milestone-content').setAttribute('data-year', year);
        }
    });
};

// Enhanced Custom Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownSelected = document.querySelector('.dropdown-selected');
    const dropdownOptions = document.querySelector('.dropdown-options');
    const dropdownSpan = dropdownSelected.querySelector('span');
    const options = document.querySelectorAll('.dropdown-option');

    if (!dropdownSelected || !dropdownOptions || !options.length) return;

    // Toggle dropdown
    dropdownSelected.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownSelected.classList.toggle('active');
        dropdownOptions.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const text = this.textContent;
            dropdownSpan.textContent = text;
            dropdownSpan.style.color = 'rgba(255, 255, 255, 0.9)'; // Make selected text more visible
            dropdownSelected.classList.remove('active');
            dropdownOptions.classList.remove('active');

            // Add a subtle animation to show selection
            dropdownSelected.style.transform = 'scale(1.02)';
            setTimeout(() => {
                dropdownSelected.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdownSelected.contains(e.target)) {
            dropdownSelected.classList.remove('active');
            dropdownOptions.classList.remove('active');
        }
    });

    // Keyboard navigation
    dropdownSelected.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdownSelected.click();
        }
    });

    options.forEach((option, index) => {
        option.addEventListener('keydown', function(e) {
            e.preventDefault();
            if (e.key === 'Enter' || e.key === ' ') {
                option.click();
            } else if (e.key === 'ArrowDown' && index < options.length - 1) {
                options[index + 1].focus();
            } else if (e.key === 'ArrowUp' && index > 0) {
                options[index - 1].focus();
            } else if (e.key === 'Escape') {
                dropdownSelected.classList.remove('active');
                dropdownOptions.classList.remove('active');
                dropdownSelected.focus();
            }
        });
    });
});

// Store the scroll position
let scrollPosition = 0;

// Function to handle popup opening
function openPopup(memberId) {
    const popup = document.getElementById(`popup-${memberId}`);
    if (!popup) return;

    // Store current scroll position
    scrollPosition = window.scrollY;
    
    // Show popup
    popup.style.display = 'flex';
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Force reflow
    popup.offsetHeight;
    
    // Add active class for animation
    requestAnimationFrame(() => {
        popup.classList.add('active');
    });
}

// Function to handle popup closing
function closePopup(memberId) {
    const popup = document.getElementById(`popup-${memberId}`);
    if (!popup) return;
    
    // Remove active class first (triggers fade out animation)
    popup.classList.remove('active');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        popup.style.display = 'none';
        // Restore background scrolling
        document.body.style.overflow = '';
        // Restore scroll position
        window.scrollTo(0, scrollPosition);
    }, 300);
}

// Initialize popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            openPopup(memberId);
        });
    });

    // Add click event listeners to all close buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            closePopup(memberId);
        });
    });

    // Close popup when clicking overlay
    const popups = document.querySelectorAll('.member-popup');
    popups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === popup || e.target.classList.contains('popup-overlay')) {
                const memberId = popup.id.replace('popup-', '');
                closePopup(memberId);
            }
        });
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activePopup = document.querySelector('.member-popup.active');
            if (activePopup) {
                const memberId = activePopup.id.replace('popup-', '');
                closePopup(memberId);
            }
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success state
                    submitBtn.classList.remove('loading');
                    submitBtn.classList.add('success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button state after 3 seconds
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                alert('There was an error sending your message. Please try again.');
            }
        });
    }
});

// Donation page custom amount functionality
document.addEventListener('DOMContentLoaded', function() {
    const customRadio = document.getElementById('amount-custom');
    const customAmountField = document.querySelector('.custom-amount');
    
    if (customRadio && customAmountField) {
        // Initially hide custom amount field
        customAmountField.style.display = 'none';
        
        // Show/hide custom amount field based on radio selection
        document.querySelectorAll('input[name="donationAmount"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.id === 'amount-custom') {
                    customAmountField.style.display = 'block';
                } else {
                    customAmountField.style.display = 'none';
                }
            });
        });
        
        // Donation form submission animation
        const donateBtn = document.querySelector('.donate-btn');
        if (donateBtn) {
            donateBtn.addEventListener('click', function(e) {
                // This is for demo - in a real implementation, you'd handle actual payment processing
                e.preventDefault();
                
                // Add loading state
                this.classList.add('loading');
                
                // Simulate processing delay
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.classList.add('success');
                    
                    // Reset after success
                    setTimeout(() => {
                        this.classList.remove('success');
                    }, 3000);
                }, 2000);
            });
        }
    }
});