// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.animation = 'fadeInUp 0.6s ease-out';
      }
    });
  }, observerOptions);

  // Observe elements for animations
  const animatedElements = document.querySelectorAll(`
    .feature-card, 
    .product-card, 
    .brand-item, 
    .gallery-item, 
    .stat-item, 
    .quality-item, 
    .standard-item,
    .vm-card,
    .value-item,
    .cert-item,
    .process-step,
    .contact-item
  `);
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Image lazy loading
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Add loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.onload = function() {
          this.style.opacity = '1';
          this.classList.add('loaded');
        };
        
        // If image is already cached
        if (img.complete) {
          img.style.opacity = '1';
          img.classList.add('loaded');
        }
        
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button
  createBackToTopButton();

  // Performance optimization: Debounced scroll handler
  let ticking = false;
  
  function updateOnScroll() {
    // Update navbar background
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.style.background = 'var(--background-white)';
        navbar.style.backdropFilter = 'none';
      }
    }
    
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });
});

// Create back to top button
function createBackToTopButton() {
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.className = 'back-to-top';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: var(--transition);
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
  `;
  
  document.body.appendChild(backToTop);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top functionality
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  backToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.background = 'var(--primary-dark)';
  });
  
  backToTop.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.background = 'var(--primary-color)';
  });
}

// Utility function for smooth animations
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
  }, 16);
}

// Initialize counter animations when elements come into view
const counterElements = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.textContent);
      if (!isNaN(target)) {
        animateCounter(entry.target, target);
      }
      counterObserver.unobserve(entry.target);
    }
  });
});

counterElements.forEach(el => {
  counterObserver.observe(el);
});