/**
 * Main JavaScript for Gerard Rovira Book Landing Page
 * Minimal JS - Smooth scroll functionality only
 */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  
  // Select all anchor links that start with #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Basic email validation for newsletter form (optional enhancement)
  const emailInput = document.querySelector('.newsletter__input');
  const submitButton = document.querySelector('.newsletter__submit');
  
  if (emailInput && submitButton) {
    emailInput.addEventListener('input', function() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailPattern.test(emailInput.value);
      
      // Enable/disable submit button based on validation
      submitButton.disabled = !isValid;
    });
  }
  
});
