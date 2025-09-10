// Gallery page functionality
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Gallery filter functionality
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.classList.add('show');
        } else {
          item.classList.add('hidden');
          item.classList.remove('show');
        }
      });
    });
  });

  // Gallery item hover effects
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.transform = 'translateY(0)';
      }
    });

    item.addEventListener('mouseleave', function() {
      const overlay = this.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.style.transform = 'translateY(100%)';
      }
    });
  });

  // Video controls
  const video = document.querySelector('.main-video');
  if (video) {
    video.addEventListener('loadstart', function() {
      console.log('Video loading started');
    });

    video.addEventListener('error', function() {
      console.log('Video failed to load');
      // You can add fallback content here
    });
  }

  // Lightbox functionality for gallery images
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const overlay = this.querySelector('.gallery-overlay h4');
      
      if (img) {
        openLightbox(img.src, overlay ? overlay.textContent : '');
      }
    });
  });
});

// Simple lightbox function
function openLightbox(imageSrc, caption) {
  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${imageSrc}" alt="${caption}">
      <div class="lightbox-caption">${caption}</div>
      <button class="lightbox-close">&times;</button>
    </div>
  `;
  
  // Add styles
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  const content = lightbox.querySelector('.lightbox-content');
  content.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90%;
    text-align: center;
  `;
  
  const img = lightbox.querySelector('img');
  img.style.cssText = `
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
  `;
  
  const caption = lightbox.querySelector('.lightbox-caption');
  caption.style.cssText = `
    color: white;
    margin-top: 1rem;
    font-size: 1.125rem;
    font-weight: 500;
  `;
  
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.style.cssText = `
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // Add to document
  document.body.appendChild(lightbox);
  
  // Animate in
  setTimeout(() => {
    lightbox.style.opacity = '1';
  }, 10);
  
  // Close functionality
  function closeLightbox() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(lightbox);
    }, 300);
  }
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}