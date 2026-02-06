/**
 * Main JavaScript for Gerard Rovira Book Landing Page
 * Minimal JS - Smooth scroll functionality only
 */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function () {

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

  // Newsletter form validation with custom Spanish messages
  const emailInput = document.querySelector('#mce-EMAIL');
  const newsletterForm = document.querySelector('#mc-embedded-subscribe-form');
  const submitButton = document.querySelector('#mc-embedded-subscribe');

  if (emailInput && newsletterForm && submitButton) {
    // Helper to set custom messages based on validity state
    const updateValidityMessage = () => {
      // Reset first to get the native validity state
      emailInput.setCustomValidity('');

      if (!emailInput.validity.valid) {
        if (emailInput.validity.valueMissing) {
          emailInput.setCustomValidity('Por favor, rellena este campo.');
        } else if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
          emailInput.setCustomValidity('Por favor, introduce un email válido. Ejemplo: nombre@ejemplo.com');
        }
      }
    };

    // Clear error on input
    emailInput.addEventListener('input', function () {
      emailInput.setCustomValidity('');
    });

    // Intercept submit button click (capture phase) to force validation
    // This runs BEFORE Mailchimp's script
    submitButton.addEventListener('click', function (e) {
      // Ensure novalidate is removed so browser validation works
      newsletterForm.removeAttribute('novalidate');

      // Update message based on current state
      updateValidityMessage();

      // Check if form is valid
      if (!newsletterForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation(); // Stop Mailchimp from processing
        newsletterForm.reportValidity(); // Show the browser validation bubble
      }
    }, true);

    // Auto-hide success message after 2 seconds using MutationObserver
    // Using vanilla JS to avoid dependency issues with Mailchimp's jQuery
    const successResponse = document.querySelector('#mce-success-response');
    let hideTimeout;

    if (successResponse) {
      const observer = new MutationObserver(function (mutations) {
        // Check if element is visible and has content
        if (successResponse.style.display !== 'none' && successResponse.innerHTML.trim() !== '') {

          // Clear existing timeout to avoid multiple triggers
          if (hideTimeout) clearTimeout(hideTimeout);

          // Set new timeout to hide after 2 seconds
          hideTimeout = setTimeout(function () {
            // Smooth fade out using CSS transition
            successResponse.style.transition = 'opacity 0.5s ease';
            successResponse.style.opacity = '0';

            // Actually hide the element after transition completes
            setTimeout(function () {
              successResponse.style.display = 'none';
              successResponse.style.opacity = '1'; // Reset opacity for next time
              successResponse.style.transition = ''; // Clean up
            }, 500);
          }, 2000);
        }
      });

      observer.observe(successResponse, { attributes: true, childList: true, subtree: true });
    }
  }

});
