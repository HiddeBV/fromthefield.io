# Cross-Browser Testing Guide

## Overview

This document provides a comprehensive checklist for testing the From The Field podcast website across different browsers, devices, and screen sizes to ensure consistent functionality and appearance.

## Browser Support Matrix

### Desktop Browsers (Required)
- ✅ **Chrome** (latest 2 versions) - Primary development browser
- ✅ **Firefox** (latest 2 versions) - Secondary browser
- ✅ **Safari** (latest 2 versions) - macOS/iOS primary browser
- ✅ **Edge** (Chromium, latest 2 versions) - Windows primary browser

### Mobile Browsers (Required)
- ✅ **Safari iOS** (latest 2 versions) - iPhone/iPad
- ✅ **Chrome Android** (latest 2 versions) - Android devices
- ✅ **Samsung Internet** (latest version) - Samsung devices

### Legacy Support (Optional)
- ⚠️ IE11 - Not supported (end of life)
- ⚠️ Opera - Chromium-based, should work if Chrome works

## Testing Checklist

### 1. Visual Layout Testing

#### Homepage (`/index.html`)
- [ ] Hero section displays correctly with title and tagline
- [ ] Latest episode card renders with image and content
- [ ] Subscribe buttons are visible and properly styled
- [ ] Theme colors match design system
- [ ] Dark mode toggle works (theme persistence)

#### Episodes Page (`/episodes.html`)
- [ ] Episode grid displays in correct columns (1/2/3 based on screen size)
- [ ] Episode cards have consistent height and spacing
- [ ] Topic filters sidebar is visible (desktop) or toggleable (mobile)
- [ ] Search input is functional
- [ ] Load more button appears when needed
- [ ] Empty state displays when no results found

#### Episode Detail (`/episode.html`)
- [ ] Episode header with image displays correctly
- [ ] Spotify player embeds properly
- [ ] Show notes render with proper formatting
- [ ] Host/guest cards display in sidebar
- [ ] Related episodes show with correct images
- [ ] Previous/next navigation works
- [ ] Breadcrumb navigation is visible

#### About Page (`/about.html`)
- [ ] Hero section with gradient background
- [ ] Mission statement is readable
- [ ] Feature cards display in grid
- [ ] Host profiles show with images and social links
- [ ] Topic cards with color indicators
- [ ] CTA section is prominent

#### Contact Page (`/contact.html`)
- [ ] Contact form renders correctly
- [ ] All form fields are accessible
- [ ] Validation messages display properly
- [ ] Form submission works (test with valid/invalid data)
- [ ] Sidebar contact information is visible
- [ ] FAQ grid displays correctly

#### 404 Error Page (`/404.html`)
- [ ] Error icon and animation work
- [ ] Action buttons are visible
- [ ] Suggestion list displays
- [ ] Search form redirects correctly

### 2. Responsive Design Testing

#### Mobile (320px - 767px)
- [ ] Navigation collapses to hamburger menu
- [ ] Menu opens/closes correctly
- [ ] Episode cards stack vertically
- [ ] Filter sidebar becomes drawer
- [ ] Text is readable without zoom
- [ ] Touch targets are at least 44x44px
- [ ] Forms are easy to fill on mobile
- [ ] Images scale properly

#### Tablet (768px - 1023px)
- [ ] Episode grid shows 2 columns
- [ ] Navigation is horizontal
- [ ] Sidebar layouts adapt appropriately
- [ ] Touch interactions work smoothly

#### Desktop (1024px+)
- [ ] Episode grid shows 3 columns
- [ ] Hover states work on interactive elements
- [ ] Sticky elements (header, sidebar) function correctly
- [ ] Content doesn't exceed max-width (1200px)

### 3. Functionality Testing

#### Navigation
- [ ] All navigation links work
- [ ] Active page is highlighted
- [ ] Logo link returns to homepage
- [ ] Hamburger menu toggles on mobile

#### Theme Switching
- [ ] Theme toggle button switches between light/dark
- [ ] Theme preference is saved to localStorage
- [ ] Theme persists across page navigation
- [ ] System preference is respected on first visit
- [ ] No flash of unstyled content (FOUC)

#### Episode Filtering
- [ ] Search filters episodes by title and description
- [ ] Topic filters work individually and combined
- [ ] Clear filters button resets all filters
- [ ] URL parameters sync with filter state
- [ ] Filtered results update without page reload

#### Audio/Video Embeds
- [ ] Spotify embeds load correctly
- [ ] Player controls work (play, pause, seek)
- [ ] Fallback message shows if embed fails
- [ ] Embeds are responsive

#### Forms
- [ ] Contact form validates required fields
- [ ] Email validation works correctly
- [ ] Character count displays for textarea
- [ ] Form submission shows success/error messages
- [ ] Reset button clears form
- [ ] Validation errors are accessible

#### Image Loading
- [ ] Images load with lazy loading
- [ ] Loading placeholders appear
- [ ] Fade-in effect works on load
- [ ] Error state displays for broken images
- [ ] Alt text is present for accessibility

### 4. Performance Testing

#### Page Load
- [ ] First Contentful Paint (FCP) < 2.0s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] Critical CSS is inlined
- [ ] Main CSS loads asynchronously

#### JavaScript
- [ ] No console errors in browser dev tools
- [ ] JavaScript gracefully degrades if disabled
- [ ] Event listeners work without memory leaks
- [ ] Debounced functions (search) work correctly

#### Network
- [ ] CSS is minified (compressed)
- [ ] Images are optimized
- [ ] No 404 errors for resources
- [ ] Fonts load correctly

### 5. Accessibility Testing

#### Keyboard Navigation
- [ ] All interactive elements are focusable
- [ ] Tab order is logical
- [ ] Skip link appears on focus
- [ ] Focus indicators are visible
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals/drawers

#### Screen Reader Testing
- [ ] Page landmarks are properly defined
- [ ] Headings follow hierarchical order (h1 → h6)
- [ ] Form labels are associated with inputs
- [ ] ARIA labels are present where needed
- [ ] Alt text describes images meaningfully
- [ ] Focus is announced when moved

#### Color Contrast
- [ ] Text meets WCAG AA contrast ratio (4.5:1)
- [ ] Interactive elements meet AA ratio
- [ ] Dark mode maintains sufficient contrast
- [ ] Color is not the only indicator of state

#### Assistive Technologies
Test with:
- [ ] NVDA (Windows)
- [ ] JAWS (Windows)
- [ ] VoiceOver (macOS/iOS)
- [ ] TalkBack (Android)

### 6. Browser-Specific Issues

#### Safari (macOS/iOS)
- [ ] CSS Grid layouts render correctly
- [ ] Flexbox works as expected
- [ ] Date inputs work (or fallback gracefully)
- [ ] Smooth scroll behavior works
- [ ] Video embeds play correctly
- [ ] LocalStorage works for theme

#### Firefox
- [ ] CSS custom properties (variables) work
- [ ] Flexbox gap property works
- [ ] Grid layouts match Chrome
- [ ] Form validation styling consistent
- [ ] Intersection Observer works (lazy loading)

#### Edge (Chromium)
- [ ] Should match Chrome behavior
- [ ] No Edge-specific issues
- [ ] Legacy Edge compatibility not required

#### Chrome Android
- [ ] Touch events work correctly
- [ ] Viewport meta tag respected
- [ ] No unwanted zoom on input focus
- [ ] Pull-to-refresh doesn't conflict

#### Safari iOS
- [ ] Fixed positioning works correctly
- [ ] 100vh doesn't get cut off by browser UI
- [ ] Touch gestures work smoothly
- [ ] No horizontal scrolling issues
- [ ] Date pickers work natively

### 7. Testing Tools

#### Automated Tools
- **Lighthouse** (in Chrome DevTools)
  - Performance score > 90
  - Accessibility score > 95
  - Best Practices score > 90
  - SEO score > 95

- **axe DevTools** (Browser Extension)
  - Run on all pages
  - Fix all critical/serious issues
  - Document minor issues

- **WAVE** (Web Accessibility Evaluation Tool)
  - Check for accessibility errors
  - Verify ARIA usage
  - Check color contrast

- **BrowserStack** or **LambdaTest**
  - Test on real devices
  - Cross-browser screenshots
  - Automated testing

#### Manual Testing
- **Browser DevTools**
  - Check console for errors
  - Test responsive design mode
  - Monitor network requests
  - Profile performance

- **Physical Devices**
  - Test on actual phones/tablets
  - Check touch interactions
  - Verify gestures work
  - Test different screen sizes

### 8. Common Issues Checklist

#### CSS Issues
- [ ] No horizontal scrolling on mobile
- [ ] Z-index stacking context correct
- [ ] Transitions/animations smooth
- [ ] Hover states don't stick on touch devices
- [ ] Print styles work correctly

#### JavaScript Issues
- [ ] No race conditions
- [ ] Event listeners cleaned up properly
- [ ] Async operations handled correctly
- [ ] Error boundaries in place
- [ ] Graceful degradation for old browsers

#### Content Issues
- [ ] All images have alt text
- [ ] Links have descriptive text
- [ ] No broken internal/external links
- [ ] Dates/times formatted correctly
- [ ] Typography is consistent

### 9. Testing Workflow

#### Pre-Deployment Testing
1. Test locally on your primary browser
2. Run Lighthouse audit
3. Test on at least 2 other desktop browsers
4. Test on at least 2 mobile devices
5. Run automated accessibility tests
6. Fix all critical issues

#### Post-Deployment Testing
1. Test all pages on production URL
2. Verify SSL certificate works
3. Check analytics tracking
4. Test forms with real submissions
5. Monitor for errors in production

#### Ongoing Testing
- Test after every major feature addition
- Test when updating dependencies
- Quarterly full browser compatibility sweep
- User-reported issues investigation

## Test Results Template

```
Date: YYYY-MM-DD
Tester: [Name]
Environment: [Production/Staging/Local]

Browser: [Name + Version]
OS: [Operating System]
Device: [Desktop/Mobile/Tablet - Model]
Screen Size: [Dimensions]

Page Tested: [URL]
Test Category: [Visual/Functionality/Performance/Accessibility]

Results:
✅ PASS - [Description]
❌ FAIL - [Description]
⚠️ MINOR - [Description]

Issues Found:
1. [Issue description]
   - Severity: [Critical/Major/Minor]
   - Steps to reproduce: [...]
   - Expected behavior: [...]
   - Actual behavior: [...]
   - Screenshot: [Link if available]

Notes:
[Any additional observations]
```

## Priority Levels

### P0 - Critical (Must Fix Before Launch)
- Broken core functionality
- Accessibility blockers
- Major visual issues
- Security vulnerabilities

### P1 - High (Should Fix Soon)
- Minor functionality issues
- Inconsistent styling
- Performance issues
- Minor accessibility issues

### P2 - Medium (Fix When Possible)
- Edge case bugs
- Visual polish
- Nice-to-have features
- Minor performance optimizations

### P3 - Low (Backlog)
- Very rare edge cases
- Cosmetic issues
- Future enhancements

## Browser Testing Resources

- **Can I Use**: https://caniuse.com/ - Check feature support
- **MDN Web Docs**: https://developer.mozilla.org/ - Browser compatibility data
- **BrowserStack**: https://www.browserstack.com/ - Real device testing
- **Sauce Labs**: https://saucelabs.com/ - Automated browser testing
- **LambdaTest**: https://www.lambdatest.com/ - Cross-browser testing
- **WebPageTest**: https://www.webpagetest.org/ - Performance testing

## Sign-Off

Once all tests pass:

- [ ] All P0 issues resolved
- [ ] All P1 issues resolved or documented
- [ ] Test results documented
- [ ] Screenshots captured for reference
- [ ] Sign-off from QA/Product Owner

**Tested By**: _______________
**Date**: _______________
**Approved By**: _______________
**Date**: _______________
