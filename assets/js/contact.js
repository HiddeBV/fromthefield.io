/**
 * Contact Form JavaScript
 * Handles form validation, submission, and Formspree integration
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    initFormValidation(form);
    initFormSubmission(form);
    checkSuccessParameter();
  }

  /**
   * Initialize form validation
   */
  function initFormValidation(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', function() {
        validateField(this);
      });

      // Clear error on input
      input.addEventListener('input', function() {
        clearFieldError(this);
      });
    });

    // Prevent submission if invalid
    form.addEventListener('submit', function(e) {
      if (!validateForm(form)) {
        e.preventDefault();
        
        // Focus first invalid field
        const firstInvalid = form.querySelector('.form-input.invalid, .form-select.invalid, .form-textarea.invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  /**
   * Validate individual field
   */
  function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    const errorSpan = document.getElementById(fieldId.replace('contact-', '') + '-error');
    let errorMessage = '';
    let isValid = true;

    // Check required
    if (field.hasAttribute('required') && !value) {
      errorMessage = 'This field is required';
      isValid = false;
    }
    // Check email format
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      }
    }
    // Check message length
    else if (fieldId === 'contact-message' && value) {
      if (value.length < 20) {
        errorMessage = 'Message must be at least 20 characters';
        isValid = false;
      }
    }
    // Check name length
    else if (fieldId === 'contact-name' && value) {
      if (value.length < 2) {
        errorMessage = 'Please enter your full name';
        isValid = false;
      }
    }

    // Update UI
    if (isValid) {
      field.classList.remove('invalid');
      field.classList.add('valid');
      field.setAttribute('aria-invalid', 'false');
      if (errorSpan) {
        errorSpan.textContent = '';
      }
    } else {
      field.classList.remove('valid');
      field.classList.add('invalid');
      field.setAttribute('aria-invalid', 'true');
      if (errorSpan) {
        errorSpan.textContent = errorMessage;
      }
    }

    return isValid;
  }

  /**
   * Clear field error
   */
  function clearFieldError(field) {
    const fieldId = field.id;
    const errorSpan = document.getElementById(fieldId.replace('contact-', '') + '-error');
    
    field.classList.remove('invalid');
    field.setAttribute('aria-invalid', 'false');
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  }

  /**
   * Validate entire form
   */
  function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Initialize form submission
   */
  function initFormSubmission(form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate form
      if (!validateForm(form)) {
        showFormStatus('Please fix the errors above', 'error');
        return;
      }

      const submitBtn = document.getElementById('submit-btn');
      const formStatus = document.getElementById('form-status');
      const formData = new FormData(form);

      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      try {
        // Submit to Formspree
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success
          showFormStatus(
            '✓ Thank you! Your message has been sent. We\'ll get back to you soon.',
            'success'
          );
          form.reset();
          
          // Clear validation states
          const fields = form.querySelectorAll('.form-input, .form-select, .form-textarea');
          fields.forEach(field => {
            field.classList.remove('valid', 'invalid');
            field.removeAttribute('aria-invalid');
          });

          // Track success (placeholder for analytics)
          console.log('Form submitted successfully');
        } else {
          // Error from server
          const data = await response.json();
          showFormStatus(
            data.error || 'There was a problem submitting your form. Please try again.',
            'error'
          );
        }
      } catch (error) {
        // Network error
        showFormStatus(
          'Network error. Please check your connection and try again.',
          'error'
        );
        console.error('Form submission error:', error);
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    });

    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        // Clear all validation states and errors
        const fields = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        fields.forEach(field => {
          field.classList.remove('valid', 'invalid');
          field.removeAttribute('aria-invalid');
        });

        const errorSpans = form.querySelectorAll('.form-error');
        errorSpans.forEach(span => {
          span.textContent = '';
        });

        // Clear status message
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }
      });
    }
  }

  /**
   * Show form status message
   */
  function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = 'form-status form-status-' + type;
    
    // Scroll status into view
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide success messages after 10 seconds
    if (type === 'success') {
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 10000);
    }
  }

  /**
   * Check for success parameter in URL (after Formspree redirect)
   */
  function checkSuccessParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      showFormStatus(
        '✓ Thank you! Your message has been sent. We\'ll get back to you soon.',
        'success'
      );
      
      // Remove success parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }

  /**
   * Character counter for message field (optional enhancement)
   */
  function initCharacterCounter() {
    const messageField = document.getElementById('contact-message');
    const hint = messageField?.nextElementSibling?.nextElementSibling;
    
    if (messageField && hint) {
      messageField.addEventListener('input', function() {
        const length = this.value.trim().length;
        const minLength = 20;
        
        if (length < minLength) {
          hint.textContent = `${minLength - length} more characters needed`;
        } else {
          hint.textContent = `${length} characters`;
        }
      });
    }
  }

})();
