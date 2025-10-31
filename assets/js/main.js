/**
 * From The Field - Main JavaScript
 * Handles theme toggle, mobile navigation, and core interactions
 */

(function() {
  'use strict';

  // Theme Management
  // ========================================================================
  
  const THEME_KEY = 'fromthefield-theme';
  const THEME_ATTR = 'data-theme';
  
  /**
   * Get user's preferred theme
   * Priority: localStorage > system preference > light (default)
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  /**
   * Apply theme to document with smooth transition
   */
  function setTheme(theme, skipTransition = false) {
    // Add transitioning class for smooth animations
    if (!skipTransition) {
      document.documentElement.classList.add('theme-transitioning');
    }
    
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // Update ARIA label on toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      const newLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', newLabel);
      
      // Update icon if it exists
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }
    
    // Remove transitioning class after animation completes
    if (!skipTransition) {
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 300);
    }
  }
  
  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTR) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Announce theme change to screen readers
    announceThemeChange(newTheme);
    
    setTheme(newTheme);
  }
  
  /**
   * Announce theme change to screen readers
   */
  function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = `Switched to ${theme} mode`;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  /**
   * Initialize theme on page load
   */
  function initTheme() {
    // Theme is already set by inline script in default.html
    // This just ensures the toggle button has correct ARIA label
    const currentTheme = document.documentElement.getAttribute(THEME_ATTR) || 'light';
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      const label = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', label);
      
      // Update icon if it exists
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
      }
      
      // Add click event listener
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Add listener for system theme changes
      mediaQuery.addEventListener('change', (e) => {
        // Only apply if user hasn't explicitly set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? 'dark' : 'light', true);
          announceThemeChange(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  // Mobile Navigation
  // ========================================================================
  
  /**
   * Toggle mobile navigation menu
   */
  function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (!navMenu || !navToggle) return;
    
    const isActive = navMenu.classList.contains('active');
    
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', !isActive);
    
    // Transform hamburger icon
    const lines = navToggle.querySelectorAll('.hamburger-line');
    if (lines.length === 3) {
      if (!isActive) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        lines[0].style.transform = '';
        lines[1].style.opacity = '';
        lines[2].style.transform = '';
      }
    }
  }
  
  /**
   * Close mobile nav when clicking outside
   */
  function closeMobileNavOnClickOutside(event) {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!navMenu || !navToggle) return;
    
    if (navMenu.classList.contains('active') && 
        !mainNav.contains(event.target)) {
      toggleMobileNav();
    }
  }
  
  /**
   * Close mobile nav when resizing to desktop
   */
  function handleResize() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (!navMenu || !navToggle) return;
    
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      
      // Reset hamburger icon
      const lines = navToggle.querySelectorAll('.hamburger-line');
      lines.forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    }
  }
  
  /**
   * Initialize mobile navigation
   */
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileNav);
      navToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Close nav when clicking outside
    document.addEventListener('click', closeMobileNavOnClickOutside);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Close nav when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
          toggleMobileNav();
        }
      }
    });
  }
  
  // Keyboard Navigation Enhancement
  // ========================================================================
  
  /**
   * Enhance keyboard navigation for interactive elements
   */
  function initKeyboardNav() {
    // Make theme toggle work with Enter and Space
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }
    
    // Make nav toggle work with Enter and Space
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMobileNav();
        }
      });
    }
  }
  
  // Smooth Scroll for Skip Link
  // ========================================================================
  
  /**
   * Enable smooth scrolling for skip link
   */
  function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  
  // Active Navigation State
  // ========================================================================
  
  /**
   * Update active navigation state based on current page
   */
  function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || 
          (currentPath === '/' && href === '/') ||
          (currentPath.startsWith(href) && href !== '/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Initialization
  // ========================================================================
  
  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    initTheme();
    initMobileNav();
    initKeyboardNav();
    initSkipLink();
    updateActiveNav();
    
    console.log('From The Field: JavaScript initialized');
  }
  
  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
