// Product page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Product image gallery functionality
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const sizeImages = card.querySelectorAll('.size-img');
    const mainImage = card.querySelector('.main-image');
    
    if (sizeImages.length > 0 && mainImage) {
      sizeImages.forEach(img => {
        img.addEventListener('click', function() {
          // Store current main image src
          const tempSrc = mainImage.src;
          const tempAlt = mainImage.alt;
          
          // Swap images
          mainImage.src = this.src;
          mainImage.alt = this.alt;
          this.src = tempSrc;
          this.alt = tempAlt;
          
          // Add click effect
          this.style.transform = 'scale(1.2)';
          setTimeout(() => {
            this.style.transform = '';
          }, 200);
        });
      });
    }
  });

  // Product card hover effects
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe product cards and quality items
  document.querySelectorAll('.product-card, .quality-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});