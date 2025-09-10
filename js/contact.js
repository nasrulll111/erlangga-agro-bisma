// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const company = formData.get('company');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Get current language
      const currentLang = localStorage.getItem('selectedLanguage') || 'id';
      
      // Create WhatsApp message
      let whatsappMessage;
      if (currentLang === 'id') {
        whatsappMessage = `Halo, saya ${name}.\n\n` +
          `Email: ${email}\n` +
          `Telepon: ${phone}\n` +
          (company ? `Perusahaan: ${company}\n` : '') +
          `Topik: ${getSubjectText(subject, 'id')}\n\n` +
          `Pesan: ${message}`;
      } else {
        whatsappMessage = `Hello, I am ${name}.\n\n` +
          `Email: ${email}\n` +
          `Phone: ${phone}\n` +
          (company ? `Company: ${company}\n` : '') +
          `Subject: ${getSubjectText(subject, 'en')}\n\n` +
          `Message: ${message}`;
      }
      
      const whatsappUrl = `https://wa.me/6285840179349?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      this.reset();
      
      // Show success message
      const successMessage = currentLang === 'id' 
        ? 'Terima kasih! Anda akan diarahkan ke WhatsApp.' 
        : 'Thank you! You will be redirected to WhatsApp.';
      
      showNotification(successMessage, 'success');
    });
  }

  // Form validation and styling
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  
  formInputs.forEach(input => {
    // Add focus and blur effects
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      if (this.value.trim() !== '') {
        this.parentElement.classList.add('filled');
      } else {
        this.parentElement.classList.remove('filled');
      }
    });
    
    // Check if already filled on page load
    if (input.value.trim() !== '') {
      input.parentElement.classList.add('filled');
    }
  });

  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      if (value.startsWith('0')) {
        value = '62' + value.substring(1);
      } else if (!value.startsWith('62')) {
        value = '62' + value;
      }
      
      // Format: +62 858-4017-9349
      if (value.length > 2) {
        value = value.substring(0, 2) + ' ' + value.substring(2);
      }
      if (value.length > 6) {
        value = value.substring(0, 6) + '-' + value.substring(6);
      }
      if (value.length > 11) {
        value = value.substring(0, 11) + '-' + value.substring(11);
      }
      
      this.value = '+' + value;
    });
  }
});

// Get subject text based on language
function getSubjectText(value, language) {
  const subjects = {
    'product-inquiry': {
      'id': 'Pertanyaan Produk',
      'en': 'Product Inquiry'
    },
    'export-inquiry': {
      'id': 'Inquiry Ekspor',
      'en': 'Export Inquiry'
    },
    'partnership': {
      'id': 'Kemitraan',
      'en': 'Partnership'
    },
    'other': {
      'id': 'Lainnya',
      'en': 'Other'
    }
  };
  
  return subjects[value] ? subjects[value][language] : value;
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'var(--primary-color)' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}