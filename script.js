/**
 * TravelDiscover JavaScript
 * Main script file for interactive functionality
 */

// Global variables following camelCase convention
const elements = {
    hamburger: null,
    navMenu: null,
    contactForm: null,
    successMessage: null,
    scrollTopButton: null
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    initializeAnimations();
    createScrollTopButton();
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    elements.hamburger = document.getElementById('hamburger');
    elements.navMenu = document.getElementById('navMenu');
    elements.contactForm = document.getElementById('contactForm');
    elements.successMessage = document.getElementById('successMessage');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Mobile navigation toggle
    if (elements.hamburger && elements.navMenu) {
        elements.hamburger.addEventListener('click', toggleMobileNav);
    }

    // Contact form submission
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleFormSubmission);
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling();

    // Window scroll events
    window.addEventListener('scroll', handleScroll);

    // Dropdown navigation for mobile
    setupDropdownNavigation();

    // Recommendation card interactions
    setupRecommendationCards();
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileNav() {
    if (elements.hamburger && elements.navMenu) {
        elements.hamburger.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
    }
}

/**
 * Handle contact form submission
 * @param {Event} event - Form submission event
 */
function handleFormSubmission(event) {
    event.preventDefault();
    
    // Get form data
    const formData = getFormData();
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Simulate form submission
    submitForm(formData);
}

/**
 * Get form data from contact form
 * @returns {Object} Form data object
 */
function getFormData() {
    return {
        firstName: document.getElementById('firstName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        email: document.getElementById('email')?.value || '',
        subject: document.getElementById('subject')?.value || '',
        message: document.getElementById('message')?.value || '',
        newsletter: document.getElementById('newsletter')?.checked || false
    };
}

/**
 * Validate contact form data
 * @param {Object} formData - Form data to validate
 * @returns {boolean} Validation result
 */
function validateForm(formData) {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            showErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

/**
 * Submit form data (simulated)
 * @param {Object} formData - Form data to submit
 */
function submitForm(formData) {
    // Show loading state
    const submitButton = elements.contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Reset form
        elements.contactForm.reset();
        
        // Show success message
        showSuccessMessage();
        
        console.log('Form submitted:', formData);
    }, 2000);
}

/**
 * Show success message
 */
function showSuccessMessage() {
    if (elements.successMessage && elements.contactForm) {
        elements.contactForm.style.display = 'none';
        elements.successMessage.classList.add('show');
        elements.successMessage.style.display = 'block';
    }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    // Create or update error message element
    let errorElement = document.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 1rem;
            border-radius: var(--border-radius);
            margin-bottom: 1rem;
            border: 1px solid #f5c6cb;
        `;
        elements.contactForm.insertBefore(errorElement, elements.contactForm.firstChild);
    }
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorElement && errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

/**
 * Set up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Handle window scroll events
 */
function handleScroll() {
    const scrollPosition = window.pageYOffset;
    
    // Update navigation background opacity
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollPosition > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
        }
    }
    
    // Show/hide scroll to top button
    if (elements.scrollTopButton) {
        if (scrollPosition > 300) {
            elements.scrollTopButton.classList.add('visible');
        } else {
            elements.scrollTopButton.classList.remove('visible');
        }
    }
    
    // Trigger fade-in animations
    triggerFadeInAnimations();
}

/**
 * Set up dropdown navigation for mobile
 */
function setupDropdownNavigation() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentNode;
            dropdown.classList.toggle('active');
        });
    });
}

/**
 * Set up recommendation card interactions
 */
function setupRecommendationCards() {
    const cards = document.querySelectorAll('.recommendation-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            showRecommendationDetails(this);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

/**
 * Show recommendation details (placeholder functionality)
 * @param {HTMLElement} card - The clicked recommendation card
 */
function showRecommendationDetails(card) {
    const title = card.querySelector('h4')?.textContent || 'Destination';
    const description = card.querySelector('p')?.textContent || 'Amazing destination';
    
    // Create modal or alert (simplified for demo)
    const modal = createModal(title, description);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'scale(1)';
    }, 10);
}

/**
 * Create a simple modal
 * @param {string} title - Modal title
 * @param {string} content - Modal content
 * @returns {HTMLElement} Modal element
 */
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="color: #2C5F7C; margin: 0;">${title}</h2>
            <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6C757D;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <p style="color: #6C757D; line-height: 1.6; margin-bottom: 1.5rem;">${content}</p>
        <div style="text-align: center;">
            <button style="background: linear-gradient(135deg, #2C5F7C, #4A90A4); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                Learn More
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    
    // Close modal functionality
    const closeButton = modalContent.querySelector('.close-modal');
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    };
    
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Add animation class when visible
    modal.addEventListener('transitionend', function() {
        if (modal.style.opacity === '1') {
            modalContent.style.transform = 'scale(1)';
        }
    });
    
    return modal;
}

/**
 * Initialize fade-in animations
 */
function initializeAnimations() {
    const elementsToAnimate = document.querySelectorAll('.recommendation-card, .team-member, .value-card, .faq-item');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Trigger initial check
    triggerFadeInAnimations();
}

/**
 * Trigger fade-in animations for visible elements
 */
function triggerFadeInAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Create and add scroll to top button
 */
function createScrollTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollButton);
    elements.scrollTopButton = scrollButton;
}

/**
 * Handle recommendation filtering (for future enhancement)
 * @param {string} category - Category to filter by
 */
function filterRecommendations(category) {
    console.log('Filtering by category:', category);
    // Future implementation
}

/**
 * Search functionality (for future enhancement)
 * @param {string} query - Search query
 */
function searchDestinations(query) {
    console.log('Searching for:', query);
    // Future implementation
}

/**
 * Load more recommendations (for future enhancement)
 */
function loadMoreRecommendations() {
    console.log('Loading more recommendations...');
    // Future implementation
}

/**
 * Initialize theme switching (for future enhancement)
 */
function initializeTheme() {
    // Future implementation
}

/**
 * Toggle theme (for future enhancement)
 */
function toggleTheme() {
    console.log('Toggling theme...');
    // Future implementation
}

// Export functions for potential use in other scripts
window.TravelDiscover = {
    toggleMobileNav: toggleMobileNav,
    filterRecommendations: filterRecommendations,
    searchDestinations: searchDestinations,
    loadMoreRecommendations: loadMoreRecommendations,
    toggleTheme: toggleTheme
};

// Handle page resize
window.addEventListener('resize', function() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth > 768) {
        if (elements.navMenu && elements.navMenu.classList.contains('active')) {
            toggleMobileNav();
        }
    }
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

console.log('TravelDiscover JavaScript initialized successfully!');
