// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const languageSelector = document.getElementById('languageSelector');

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Language switcher
  if (languageSelector) {
    languageSelector.addEventListener('change', function() {
      const selectedLanguage = this.value;
      changeLanguage(selectedLanguage);
      localStorage.setItem('selectedLanguage', selectedLanguage);
    });

    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'id';
    languageSelector.value = savedLanguage;
    changeLanguage(savedLanguage);
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'var(--background-white)';
      navbar.style.backdropFilter = 'none';
    }
  });

  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});