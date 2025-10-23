// Application State
const state = {
  isMobileMenuOpen: false,
  openDropdowns: new Set(),
  currentSection: 'home',
  currentFilter: 'all',
  products: [
    { 
      id: 1,
      name: 'Vessel Series I - Terra', 
      price: '€485.00', 
      category: 'ceramics', 
      subcategory: 'vases',
      creator: 'elena',
      emoji: '🏺' 
    },
    { 
      id: 2,
      name: 'Artisan Collection Bowl', 
      price: '€320.00', 
      category: 'ceramics', 
      subcategory: 'bowls',
      creator: 'elena',
      emoji: '🥣' 
    },
    { 
      id: 3,
      name: 'Light Sculpture', 
      price: '€750.00', 
      category: 'accessories', 
      subcategory: 'glassware',
      creator: 'marcus',
      emoji: '🗿' 
    },
    { 
      id: 4,
      name: 'Organic Planter Series', 
      price: '€380.00', 
      category: 'ceramics', 
      subcategory: 'decorative',
      creator: 'elena',
      emoji: '🪴' 
    },
    { 
      id: 5,
      name: 'Meditation Candleholder', 
      price: '€185.00', 
      category: 'accessories', 
      subcategory: 'homedecor',
      creator: 'james',
      emoji: '🕯️' 
    },
    {
      id: 6,
      name: 'Heritage Basket Trio',
      price: '€295.00',
      category: 'accessories',
      subcategory: 'textiles',
      creator: 'james',
      emoji: '🧺'
    },
    {
      id: 7,
      name: 'Handforged Silver Earrings',
      price: '€125.00',
      category: 'jewelry',
      subcategory: 'earrings',
      creator: 'sofia',
      emoji: '💎'
    },
    {
      id: 8,
      name: 'Hammered Copper Bracelet',
      price: '€98.00',
      category: 'jewelry',
      subcategory: 'bracelets',
      creator: 'sofia',
      emoji: '📿'
    },
    {
      id: 9,
      name: 'Artisan Gold Necklace',
      price: '€265.00',
      category: 'jewelry',
      subcategory: 'necklaces',
      creator: 'sofia',
      emoji: '📿'
    },
    {
      id: 10,
      name: 'Hand-blown Glass Vase',
      price: '€320.00',
      category: 'accessories',
      subcategory: 'glassware',
      creator: 'marcus',
      emoji: '🏺'
    },
    {
      id: 11,
      name: 'Woven Basket Collection',
      price: '€145.00',
      category: 'accessories',
      subcategory: 'textiles',
      creator: 'james',
      emoji: '🧺'
    },
    {
      id: 12,
      name: 'Handcrafted Wood Bowl',
      price: '€89.00',
      category: 'accessories',
      subcategory: 'homedecor',
      creator: 'james',
      emoji: '🥥'
    },
    {
      id: 13,
      name: 'Sterling Silver Ring',
      price: '€156.00',
      category: 'jewelry',
      subcategory: 'rings',
      creator: 'sofia',
      emoji: '💍'
    },
    {
      id: 14,
      name: 'Turned Wooden Vase',
      price: '€110.00',
      category: 'accessories',
      subcategory: 'homedecor',
      creator: 'james',
      emoji: '🏺'
    }
  ],
  creators: {
    elena: {
      name: 'Elena Torres',
      specialty: 'Master Ceramicist',
      bio: 'Celebrated for her organic architectural forms',
      fullBio: 'Elena\'s work has been featured in prestigious galleries worldwide. Her pieces embody the perfect balance between functionality and sculptural beauty, each one a meditation on form and space.'
    },
    marcus: {
      name: 'Marcus Weber',
      specialty: 'Glass Sculptor',
      bio: 'Third-generation master of Bohemian glasswork',
      fullBio: "Marcus continues a family legacy of exceptional glasswork, creating contemporary pieces that honor traditional techniques while pushing artistic boundaries."
    },
    sofia: {
      name: 'Sofia Marino',
      specialty: 'Fine Jewelry Artisan',
      bio: 'Contemporary precious metal sculptor',
      fullBio: "Sofia's jewelry transcends mere adornment, creating wearable art that speaks to the soul. Each piece is meticulously crafted using ancient goldsmithing techniques."
    },
    james: {
      name: 'James Chen',
      specialty: 'Wood & Fiber Artist',
      bio: 'Sustainable luxury craftsman',
      fullBio: "James creates functional art from ethically sourced materials, proving that sustainability and luxury can coexist beautifully."
    }
  }
};

// Utility Functions
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Check if device is mobile/tablet
function isMobileDevice() {
  return window.innerWidth < 768;
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Mobile Navigation Functions
function toggleMobileMenu() {
  const nav = $('.nav');
  const toggle = $('.mobile-menu-toggle');
  const body = document.body;
  
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  
  if (state.isMobileMenuOpen) {
    nav.classList.add('active');
    toggle.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent background scroll
  } else {
    nav.classList.remove('active');
    toggle.classList.remove('active');
    body.style.overflow = '';
    // Close all dropdowns when closing menu
    closeAllDropdowns();
  }
}

function closeMobileMenu() {
  if (state.isMobileMenuOpen) {
    toggleMobileMenu();
  }
}

function toggleMobileDropdown(dropdownElement) {
  const menu = dropdownElement.querySelector('.dropdown__menu');
  const toggle = dropdownElement.querySelector('.dropdown__toggle');
  const isOpen = state.openDropdowns.has(dropdownElement);
  
  if (isOpen) {
    menu.classList.remove('active');
    toggle.classList.remove('active');
    toggle.textContent = '+';
    state.openDropdowns.delete(dropdownElement);
  } else {
    menu.classList.add('active');
    toggle.classList.add('active');
    toggle.textContent = '−';
    state.openDropdowns.add(dropdownElement);
  }
}

function closeAllDropdowns() {
  state.openDropdowns.forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown__menu');
    const toggle = dropdown.querySelector('.dropdown__toggle');
    menu.classList.remove('active');
    toggle.classList.remove('active');
    toggle.textContent = '+';
  });
  state.openDropdowns.clear();
}

// Navigation Functions
function showSection(sectionId) {
  // Hide all sections
  $$('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = $(`#${sectionId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update navigation
  $$('.nav__link').forEach(link => {
    link.classList.remove('active');
  });
  
  const activeLink = $(`.nav__link[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  state.currentSection = sectionId;
  
  // Close mobile menu when navigating
  if (isMobileDevice()) {
    closeMobileMenu();
  }
  
  // Smooth scroll to top on mobile
  if (isMobileDevice()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Load section-specific content
  loadSectionContent(sectionId);
}

function loadSectionContent(sectionId) {
  switch(sectionId) {
    case 'home':
      loadFeaturedProducts();
      break;
    case 'ceramics':
    case 'jewelry':
    case 'accessories':
      loadCategoryProducts(sectionId);
      break;
    case 'creator-elena':
    case 'creator-marcus':
    case 'creator-sofia':
    case 'creator-james':
      const creatorId = sectionId.replace('creator-', '');
      loadCreatorProducts(creatorId);
      break;
  }
}

// Product Loading Functions
function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-card__image">${product.emoji}</div>
      <div class="product-card__content">
        <h4 class="product-card__title">${product.name}</h4>
        <p class="product-card__price">${product.price}</p>
        <button class="btn btn--primary product-card__cta" onclick="handleAddToCollection(${product.id})">
          Add to Collection
        </button>
      </div>
    </div>
  `;
}

function loadFeaturedProducts() {
  const grid = $('#featured-products-grid');
  if (grid) {
    const featuredProducts = state.products.slice(0, 6);
    grid.innerHTML = featuredProducts.map(createProductCard).join('');
  }
}

function loadCategoryProducts(category) {
  const grid = $(`#${category}-grid`);
  if (grid) {
    let products = state.products.filter(p => p.category === category);
    
    if (state.currentFilter !== 'all') {
      products = products.filter(p => p.subcategory === state.currentFilter);
    }
    
    grid.innerHTML = products.map(createProductCard).join('');
  }
}

function loadCreatorProducts(creatorId) {
  const container = $(`#${creatorId}-products`);
  if (container) {
    const creatorProducts = state.products.filter(p => p.creator === creatorId);
    const creatorInfo = state.creators[creatorId];
    container.innerHTML = `
      <h3 style="margin-bottom: var(--space-24);">${creatorInfo ? creatorInfo.name + '\'s Collection' : 'Collection'}</h3>
      <div class="product-grid">
        ${creatorProducts.map(createProductCard).join('')}
      </div>
    `;
  }
}

// Filter Functions
function setFilter(category, filter) {
  state.currentFilter = filter;
  
  // Update filter buttons
  $$(`.category-filters .filter-btn`).forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = $(`.category-filters .filter-btn[data-filter="${filter}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Reload products
  loadCategoryProducts(category);
}

// Event Handlers
function handleAddToCollection(productId) {
  const product = state.products.find(p => p.id === productId);
  if (product) {
    // Premium haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
    
    // Elegant notification
    const notification = document.createElement('div');
    notification.textContent = `"${product.name}" added to your collection`;
    notification.style.cssText = `
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, var(--luxury-gold) 0%, #E5C547 100%);
      color: var(--luxury-charcoal);
      padding: var(--space-20) var(--space-32);
      border-radius: var(--radius-lg);
      z-index: 10000;
      font-size: var(--font-size-base);
      font-weight: 600;
      box-shadow: 0 16px 48px rgba(212, 175, 55, 0.3), 0 8px 16px rgba(44, 44, 44, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.2);
      font-family: var(--font-family-base);
      letter-spacing: 0.01em;
      animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        0% { 
          opacity: 0; 
          transform: translate(-50%, -70%) scale(0.9); 
        }
        100% { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1); 
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse';
      setTimeout(() => {
        notification.remove();
        style.remove();
      }, 300);
    }, 2500);
  }
}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  if (email) {
    // Mobile-friendly success message
    if (isMobileDevice()) {
      const button = event.target.querySelector('.newsletter__button');
      const originalText = button.textContent;
      button.textContent = 'Subscribed!';
      button.style.background = 'var(--color-success)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    } else {
      alert(`Thank you for subscribing with email: ${email}`);
    }
    event.target.reset();
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = event.target.querySelector('#name').value;
  const email = event.target.querySelector('#email').value;
  const subject = event.target.querySelector('#subject').value;
  const message = event.target.querySelector('#message').value;
  
  if (name && email && subject && message) {
    // Mobile-friendly success feedback
    if (isMobileDevice()) {
      const button = event.target.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = 'Message Sent!';
      button.style.background = 'var(--color-success)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 3000);
    } else {
      alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
    }
    event.target.reset();
  }
}

// Touch and Interaction Handlers
function handleTouchStart(e) {
  // Add visual feedback for touch
  if (e.target.classList.contains('btn') || e.target.classList.contains('product-card') || e.target.classList.contains('category-card')) {
    e.target.style.transform = 'scale(0.98)';
  }
}

function handleTouchEnd(e) {
  // Remove visual feedback
  if (e.target.classList.contains('btn') || e.target.classList.contains('product-card') || e.target.classList.contains('category-card')) {
    setTimeout(() => {
      e.target.style.transform = '';
    }, 100);
  }
}

// Handle window resize for responsive behavior
function handleWindowResize() {
  // Close mobile menu if switching to desktop
  if (!isMobileDevice() && state.isMobileMenuOpen) {
    closeMobileMenu();
  }
  
  // Close mobile dropdowns on desktop
  if (!isMobileDevice()) {
    closeAllDropdowns();
  }
}

// Initialize Application
function init() {
  // Mobile menu toggle listeners
  const mobileToggle = $('.mobile-menu-toggle');
  const mobileClose = $('.nav__mobile-close');
  const navOverlay = $('.nav__overlay');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }
  
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }
  
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }
  
  // Mobile dropdown toggles
  $$('.dropdown__toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = toggle.closest('.dropdown');
      toggleMobileDropdown(dropdown);
    });
  });
  
  // Navigation event listeners
  $$('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      const filter = link.getAttribute('data-filter');
      
      if (filter) {
        setFilter(section, filter);
      }
      
      showSection(section);
    });
  });
  
  // Category card navigation
  $$('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const section = card.getAttribute('data-section');
      showSection(section);
    });
  });
  
  // Creator card navigation
  $$('.creator-card').forEach(card => {
    const cta = card.querySelector('.creator-card__cta');
    if (cta) {
      cta.addEventListener('click', () => {
        const creatorId = card.getAttribute('data-creator');
        showSection(`creator-${creatorId}`);
      });
    }
  });
  
  // Back buttons
  $$('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.getAttribute('data-section');
      showSection(section);
    });
  });
  
  // Filter buttons
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      const section = state.currentSection;
      setFilter(section, filter);
    });
  });
  
  // Hero CTA
  const heroCta = $('.hero__cta');
  if (heroCta) {
    heroCta.addEventListener('click', () => {
      showSection('ceramics');
    });
  }
  
  // Newsletter form
  const newsletterForm = $('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  // Contact form
  const contactForm = $('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  
  // Touch event listeners for mobile feedback
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
  }
  
  // Window resize listener
  window.addEventListener('resize', throttle(handleWindowResize, 250));
  
  // Prevent zoom on double tap for better UX
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Focus trap for mobile menu accessibility
  const nav = $('.nav');
  if (nav) {
    nav.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && state.isMobileMenuOpen) {
        const focusableElements = nav.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
  
  // Load initial content
  loadSectionContent('home');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}