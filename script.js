/**
 * TravelDiscover JavaScript
 * Main script file for interactive functionality
 */

// Global variables following camelCase convention with 'ac' prefix
const acElements = {
    hamburger: null,
    navMenu: null,
    contactForm: null,
    successMessage: null,
    scrollTopButton: null
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    acInitializeElements();
    acSetupEventListeners();
    acInitializeAnimations();
    acCreateScrollTopButton();
});

/**
 * Initialize DOM elements
 */
function acInitializeElements() {
    acElements.hamburger = document.getElementById('acHamburger');
    acElements.navMenu = document.getElementById('acNavMenu');
    acElements.contactForm = document.getElementById('acContactForm');
    acElements.successMessage = document.getElementById('acSuccessMessage');
}

/**
 * Set up all event listeners
 */
function acSetupEventListeners() {
    // Mobile navigation toggle
    if (acElements.hamburger && acElements.navMenu) {
        acElements.hamburger.addEventListener('click', acToggleMobileNav);
    }

    // Contact form submission
    if (acElements.contactForm) {
        acElements.contactForm.addEventListener('submit', acHandleFormSubmission);
    }

    // Smooth scrolling for anchor links
    acSetupSmoothScrolling();

    // Window scroll events
    window.addEventListener('scroll', acHandleScroll);

    // Dropdown navigation for mobile
    acSetupDropdownNavigation();

    // Recommendation card interactions
    acSetupRecommendationCards();
}

/**
 * Toggle mobile navigation menu
 */
function acToggleMobileNav() {
    if (acElements.hamburger && acElements.navMenu) {
        acElements.hamburger.classList.toggle('ac-active');
        acElements.navMenu.classList.toggle('ac-active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = acElements.navMenu.classList.contains('ac-active') ? 'hidden' : '';
    }
}

/**
 * Handle contact form submission
 * @param {Event} event - Form submission event
 */
function acHandleFormSubmission(event) {
    event.preventDefault();
    
    // Get form data
    const formData = acGetFormData();
    
    // Validate form
    if (!acValidateForm(formData)) {
        return;
    }
    
    // Simulate form submission
    acSubmitForm(formData);
}

/**
 * Get form data from contact form
 * @returns {Object} Form data object
 */
function acGetFormData() {
    return {
        firstName: document.getElementById('acFirstName')?.value || '',
        lastName: document.getElementById('acLastName')?.value || '',
        email: document.getElementById('acEmail')?.value || '',
        subject: document.getElementById('acSubject')?.value || '',
        message: document.getElementById('acMessage')?.value || '',
        newsletter: document.getElementById('acNewsletter')?.checked || false
    };
}

/**
 * Validate contact form data
 * @param {Object} formData - Form data to validate
 * @returns {boolean} Validation result
 */
function acValidateForm(formData) {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            acShowErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        acShowErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

/**
 * Submit form data (simulated)
 * @param {Object} formData - Form data to submit
 */
function acSubmitForm(formData) {
    // Show loading state
    const submitButton = acElements.contactForm.querySelector('.ac-submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        acShowSuccessMessage();
        
        // Reset form
        acElements.contactForm.reset();
        
        // Log form data (in real app, this would be sent to server)
        console.log('Form submitted:', formData);
    }, 2000);
}

/**
 * Show success message
 */
function acShowSuccessMessage() {
    if (acElements.successMessage && acElements.contactForm) {
        acElements.contactForm.style.display = 'none';
        acElements.successMessage.classList.add('ac-show');
        
        // Scroll to success message
        acElements.successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Hide success message and show form again after 5 seconds
        setTimeout(() => {
            acElements.successMessage.classList.remove('ac-show');
            acElements.contactForm.style.display = 'block';
        }, 5000);
    }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function acShowErrorMessage(message) {
    // Create or update error message element
    let errorElement = document.querySelector('.ac-error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'ac-error-message';
        errorElement.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #f5c6cb;
        `;
        acElements.contactForm.insertBefore(errorElement, acElements.contactForm.firstChild);
    }
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorElement && errorElement.parentNode) {
            errorElement.parentNode.removeChild(errorElement);
        }
    }, 5000);
}

/**
 * Set up smooth scrolling for anchor links
 */
function acSetupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Close mobile menu if open
                if (acElements.navMenu && acElements.navMenu.classList.contains('ac-active')) {
                    acToggleMobileNav();
                }
                
                // Smooth scroll to target
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
function acHandleScroll() {
    const scrollPosition = window.pageYOffset;
    
    // Update navigation background opacity
    const navbar = document.querySelector('.ac-navbar');
    if (navbar) {
        if (scrollPosition > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    }
    
    // Show/hide scroll to top button
    if (acElements.scrollTopButton) {
        if (scrollPosition > 300) {
            acElements.scrollTopButton.classList.add('ac-visible');
        } else {
            acElements.scrollTopButton.classList.remove('ac-visible');
        }
    }
    
    // Trigger fade-in animations
    acTriggerFadeInAnimations();
}

/**
 * Set up dropdown navigation for mobile
 */
function acSetupDropdownNavigation() {
    const dropdownToggles = document.querySelectorAll('.ac-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                event.preventDefault();
                const dropdown = this.parentElement;
                const menu = dropdown.querySelector('.ac-dropdown-menu');
                
                if (menu) {
                    menu.style.position = 'static';
                    menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                    menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
                    menu.style.transform = 'none';
                }
            }
        });
    });
}

/**
 * Set up recommendation card interactions
 */
function acSetupRecommendationCards() {
    const cards = document.querySelectorAll('.ac-recommendation-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click interaction for mobile
        card.addEventListener('click', function() {
            acShowRecommendationDetails(this);
        });
    });
}

/**
 * Show recommendation details (placeholder functionality)
 * @param {HTMLElement} card - The clicked recommendation card
 */
function acShowRecommendationDetails(card) {
    const title = card.querySelector('h4')?.textContent || 'Destination';
    const description = card.querySelector('p')?.textContent || 'Amazing destination';
    
    // Create modal or alert (simplified for demo)
    const modal = acCreateModal(title, description);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('ac-visible');
    }, 10);
}

/**
 * Create a simple modal
 * @param {string} title - Modal title
 * @param {string} content - Modal content
 * @returns {HTMLElement} Modal element
 */
function acCreateModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'ac-modal';
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
            <button class="ac-close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6C757D;">
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
    const closeButton = modalContent.querySelector('.ac-close-modal');
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
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
        if (modal.classList.contains('ac-visible')) {
            modalContent.style.transform = 'scale(1)';
        }
    });
    
    return modal;
}

/**
 * Initialize fade-in animations
 */
function acInitializeAnimations() {
    const elementsToAnimate = document.querySelectorAll('.ac-recommendation-card, .ac-team-member, .ac-value-card, .ac-faq-item');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('ac-fade-in');
    });
    
    // Trigger initial check
    acTriggerFadeInAnimations();
}

/**
 * Trigger fade-in animations for visible elements
 */
function acTriggerFadeInAnimations() {
    const elements = document.querySelectorAll('.ac-fade-in');
    
    elements.forEach(element => {
        if (acIsElementInViewport(element)) {
            element.classList.add('ac-visible');
        }
    });
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function acIsElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top >= 0 &&
        rect.top <= windowHeight * 0.8 // Trigger when 80% visible
    );
}

/**
 * Create and add scroll to top button
 */
function acCreateScrollTopButton() {
    const button = document.createElement('button');
    button.className = 'ac-scroll-top';
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    acElements.scrollTopButton = button;
}

/**
 * Handle recommendation filtering (for future enhancement)
 * @param {string} category - Category to filter by
 */
function acFilterRecommendations(category) {
    const cards = document.querySelectorAll('.ac-recommendation-card');
    const categories = document.querySelectorAll('.ac-recommendation-category');
    
    if (category === 'all') {
        categories.forEach(cat => cat.style.display = 'block');
    } else {
        categories.forEach(cat => {
            const categoryId = cat.id;
            cat.style.display = categoryId === category ? 'block' : 'none';
        });
    }
}

/**
 * Search functionality (for future enhancement)
 * @param {string} query - Search query
 */
function acSearchDestinations(query) {
    const cards = document.querySelectorAll('.ac-recommendation-card');
    const lowerQuery = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        
        if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Load more recommendations (for future enhancement)
 */
function acLoadMoreRecommendations() {
    // Placeholder for loading more recommendations
    console.log('Loading more recommendations...');
}

/**
 * Initialize theme switching (for future enhancement)
 */
function acInitializeTheme() {
    const savedTheme = localStorage.getItem('acTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

/**
 * Toggle theme (for future enhancement)
 */
function acToggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('acTheme', newTheme);
}

// Export functions for potential use in other scripts
window.TravelDiscover = {
    toggleMobileNav: acToggleMobileNav,
    filterRecommendations: acFilterRecommendations,
    searchDestinations: acSearchDestinations,
    loadMoreRecommendations: acLoadMoreRecommendations,
    toggleTheme: acToggleTheme
};

// Handle page resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && acElements.navMenu && acElements.navMenu.classList.contains('ac-active')) {
        acToggleMobileNav();
    }
});

// Add loading state management
window.addEventListener('load', function() {
    // Hide loading spinner if present
    const loader = document.querySelector('.ac-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 300);
    }
    
    // Trigger initial animations
    setTimeout(acTriggerFadeInAnimations, 100);
});

console.log('TravelDiscover JavaScript initialized successfully!');
