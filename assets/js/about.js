/**
 * About Page JavaScript
 * Handles interactions on the about page
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
    initSmoothScroll();
    initTopicCards();
    initHostProfiles();
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without scrolling
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  /**
   * Add hover effects and analytics to topic cards
   */
  function initTopicCards() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
      // Add keyboard navigation
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      // Track topic interest (placeholder for future analytics)
      card.addEventListener('click', function() {
        const topicName = this.querySelector('.topic-name')?.textContent;
        console.log('Topic clicked:', topicName);
        // Future: Send to analytics service
      });
    });
  }

  /**
   * Enhance host profile social links
   */
  function initHostProfiles() {
    const socialLinks = document.querySelectorAll('.host-social-links a');
    
    socialLinks.forEach(link => {
      // Track social link clicks (placeholder for future analytics)
      link.addEventListener('click', function() {
        const platform = this.querySelector('.social-label')?.textContent;
        const hostName = this.closest('.host-profile')?.querySelector('.host-name')?.textContent;
        console.log('Social link clicked:', { host: hostName, platform: platform });
        // Future: Send to analytics service
      });

      // Add visual feedback
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });

      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  /**
   * Scroll-based animations (for future enhancement)
   * Placeholder for intersection observer animations
   */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements (to be styled with CSS)
    const animatedElements = document.querySelectorAll('.feature-card, .host-profile, .topic-card');
    animatedElements.forEach(el => observer.observe(el));
  }

})();
