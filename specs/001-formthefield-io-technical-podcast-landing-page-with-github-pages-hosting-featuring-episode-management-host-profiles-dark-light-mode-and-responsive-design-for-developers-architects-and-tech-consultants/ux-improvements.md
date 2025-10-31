# UX Requirements Improvements

This document identifies gaps found during the UX checklist validation and provides specific requirements to add to spec.md.

## 1. Requirement Completeness Gaps

### CHK001: Visual Hierarchy Specifications
**Current:** FR-001, FR-002 exist but lack hierarchy details
**Add to spec.md:**
```
FR-015: Visual Hierarchy
- Hero section: Full viewport height on desktop, 60vh on tablet/mobile
- Section order: Hero → Latest Episodes (max 3) → All Episodes → Hosts → Contact
- Typography scale: H1 (48px desktop/32px mobile), H2 (36px/24px), Body (18px/16px)
- Visual weight: Hero background with 0.6 opacity overlay, episode cards with subtle shadows
- Spacing: 80px desktop/40px mobile between major sections
- Z-index layers: Header (100), modals (200), dropdowns (150)
```

### CHK002: Loading States
**Current:** Not specified
**Add to spec.md:**
```
FR-016: Loading States
- Initial page load: Skeleton screens for episode cards (3 visible placeholders)
- Spotify embed: Loading spinner with "Loading player..." text
- Filter operations: Disable filter controls + spinner overlay on episode grid
- Host images: Low-quality placeholder (LQIP) with blur-up effect
- Minimum loading display: 300ms to prevent flashing
- Loading text: "Loading episodes..." / "Loading hosts..." / "Loading player..."
```

### CHK003: Empty States
**Current:** Mentioned in edge cases but not specified
**Add to spec.md:**
```
FR-017: Empty States
- No episodes: Display message "No episodes found. Check back soon!" with illustration
- Filter with zero results: "No episodes match your filters. Try different options." with reset button
- Failed data load: "Unable to load episodes. Please refresh the page." with retry button
- No hosts: "Host information coming soon!"
- Empty show notes: Display "Show notes will be added soon."
```

### CHK006: Keyboard Navigation
**Current:** Not specified
**Add to spec.md:**
```
FR-018: Keyboard Navigation
- Tab order: Skip link → Header nav → Filter controls → Episode cards → Host cards → Contact form → Footer
- Skip navigation: "Skip to main content" link (visible on focus)
- Focus indicators: 2px solid outline with 2px offset, theme-aware color (blue-600 light / blue-400 dark)
- Interactive elements: All buttons, links, form inputs, Spotify embeds keyboard accessible
- Escape key: Close modals, clear search/filters
- Enter/Space: Activate buttons and links
- Arrow keys: Navigate through filter options in dropdowns
- Focus trap: Modal dialogs trap focus until closed
```

## 2. Requirement Clarity Gaps

### CHK007: "Prominently Display" Quantification
**Update FR-002:**
```
FR-002: Latest Episodes Display (Updated)
- Display exactly 3 most recent episodes on landing page
- Location: Immediately below hero section, above fold on desktop (visible without scrolling)
- Card size: Minimum 300px width, 400px height on desktop
- Visual prominence: Larger cards than "All Episodes" section (1.2x scale)
- Featured badge: "Latest" label on most recent episode
- Spacing: 24px gap between cards
```

### CHK008: "Clearly Visible" Subscription Buttons
**Update FR-003:**
```
FR-003: Subscription Links (Updated)
- Button size: Minimum 44px height (touch target), 140px minimum width
- Location: Header (compact icons) + Hero section (full buttons) + Footer (full buttons)
- Visibility: High contrast ratio 4.5:1 minimum, distinct brand colors
- Spotify: #1DB954 green, Apple Podcasts: #9933CC purple, RSS: theme-aware orange
- Hover state: 10% darker, 0.2s transition, subtle scale (1.05x)
- Icons: 24px size, always paired with text label in hero/footer
- Hierarchy: Equal visual weight, horizontal arrangement, 16px gap between buttons
```

### CHK009: "Filterable Grid Layout" Specifications
**Update FR-004:**
```
FR-004: Episodes Browsing (Updated)
- Grid layout: CSS Grid with auto-fit minmax(320px, 1fr)
- Columns: 3 desktop (>1200px), 2 tablet (768-1199px), 1 mobile (<768px)
- Gap: 32px desktop, 24px tablet, 16px mobile
- Card composition: 16:9 thumbnail top, metadata middle, action buttons bottom
- Filter controls position: Fixed bar below header on scroll, sticky behavior
- Filter options layout: Horizontal row desktop, collapsible accordion mobile
- Animation: 0.3s ease-in-out transition on filter changes, stagger 50ms per card
- Accessibility: Announce "X episodes found" to screen readers after filtering
```

### CHK010: "Touch-Friendly" Specifications
**Update FR-010:**
```
FR-010: Responsive Design (Updated)
- Touch targets: Minimum 44x44px per WCAG AAA (SC-005)
- Touch spacing: Minimum 8px gap between interactive elements
- Tap response: Visual feedback within 100ms (ripple/color change)
- Gesture support: Swipe gestures disabled to prevent conflicts with browser navigation
- Input types: type="email" for email fields, type="tel" for phone (mobile keyboard optimization)
- Viewport zoom: User zoom enabled (no maximum-scale restriction)
- Orientation: Support both portrait and landscape, reflow without horizontal scroll
```

### CHK011: "Complete Show Notes" Format
**Update FR-006:**
```
FR-006: Episode Details (Updated)
- Show notes structure: Markdown-formatted with sections (Summary, Topics, Links, Timestamps)
- Summary: 2-3 sentence overview at top
- Topics covered: Bulleted list of key discussion points
- Links: All URLs mentioned in episode with descriptive text
- Timestamps: Optional clickable timestamps (MM:SS format) linking to Spotify timecode if supported
- Formatting: Preserve headings, lists, code blocks, blockquotes from Markdown
- Maximum length: No limit, implement "Read more" expansion at 500 characters
- No content fallback: "Show notes will be added soon."
```

### CHK012: Dark/Light Mode Color Schemes
**Update FR-009:**
```
FR-009: Theme Toggle (Updated)
Light Mode Colors:
- Background: #FFFFFF (surfaces), #F7F9FC (sections)
- Text: #1A202C (primary), #4A5568 (secondary)
- Accent: #3182CE (blue), #E53E3E (red for errors)
- Borders: #E2E8F0
- Card backgrounds: #FFFFFF with #00000010 shadow

Dark Mode Colors:
- Background: #1A202C (surfaces), #2D3748 (sections)
- Text: #F7FAFC (primary), #E2E8F0 (secondary)
- Accent: #63B3ED (blue), #FC8181 (red for errors)
- Borders: #4A5568
- Card backgrounds: #2D3748 with #00000040 shadow

Implementation:
- CSS custom properties (--color-bg-primary, --color-text-primary, etc.)
- Transition: 0.2s ease-in-out on theme change
- System preference: Respect prefers-color-scheme media query
- Persistence: Save preference to localStorage
- No flash: Inline script before body to apply saved theme immediately
```

## 3. Scenario Coverage Gaps

### CHK021: Concurrent User Interactions
**Add to spec.md:**
```
FR-019: Concurrent Interaction Handling
- Filter while loading: Queue filter action until current load completes
- Multiple filter changes: Debounce 300ms, only apply final state
- Theme toggle during transitions: Cancel animation, apply new theme immediately
- Form submission + navigation: Prevent navigation until submission completes
- Spotify playback + navigation: Maintain playback state across page navigation (not applicable for static site)
```

### CHK022: Multi-Device Scenarios
**Add to spec.md:**
```
FR-020: Cross-Device Consistency
- Theme preference: Sync via localStorage on each device independently (no server sync)
- Responsive images: Serve appropriate sizes via srcset (320w, 640w, 960w, 1280w)
- Touch vs mouse: Auto-detect, provide hover states only on pointer: fine devices
- Bandwidth considerations: Lazy load images, defer non-critical CSS/JS
- Device-specific optimizations: No special handling needed for static site
```

### CHK023: Accessibility Testing Scenarios
**Add to spec.md:**
```
FR-021: Accessibility Requirements
- Screen reader support: Semantic HTML5 landmarks (header, nav, main, aside, footer)
- ARIA labels: All interactive elements have accessible names
- Alt text: Descriptive alt text for all images, empty alt for decorative images
- Color contrast: WCAG AA minimum (4.5:1 text, 3:1 UI components)
- Focus management: Logical tab order, visible focus indicators
- Error identification: Form errors announced to screen readers with role="alert"
- Headings: Proper hierarchy (H1→H2→H3), no skipped levels
- Testing requirement: Pass WAVE and axe DevTools audits with zero critical issues
```

### CHK024: JavaScript Disabled Scenario
**Add to spec.md:**
```
FR-022: Progressive Enhancement
- Core content: All episode listings, host profiles, contact form visible without JS
- Jekyll generation: Static HTML includes all episode data, no client-side rendering required
- Form functionality: Use Formspree action attribute for no-JS submission
- Theme: Default to light mode, no toggle available without JS
- Graceful degradation: Display message "Enable JavaScript for interactive features" for Spotify embeds
- Filter fallback: Show all episodes without filter controls
- Navigation: Standard HTML links work without JS
```

### CHK025: Offline/Connection Scenarios
**Add to spec.md:**
```
FR-023: Offline Handling
- Static assets: Cached by browser, no special service worker required for MVP
- Spotify embeds: Show placeholder with "Internet connection required" message
- Form submission: Browser native "No internet connection" error
- External images: Use alt text when images fail to load
- Future enhancement: Service worker for offline page caching (post-MVP)
```

## 4. Edge Case Coverage Gaps

### CHK026-030: Specific Edge Cases
**Add to Edge Cases section in spec.md:**
```
EC-006: Missing Episode Metadata
- Missing thumbnail: Use default podcast logo with "No image available" alt text
- Missing description: Display "Description coming soon."
- Missing duration: Display "Duration not available"
- Missing publish date: Display "Date TBA"
- Missing Spotify URL: Hide Spotify embed, show text "Listen on your preferred platform"

EC-007: Zero Search/Filter Results
- Display message: "No episodes match your filters."
- Provide reset button: "Clear all filters" button below message
- Suggestion: "Try different keywords or date range"
- Accessibility: Announce result count to screen readers

EC-008: Long Content Handling
- Long episode titles: Truncate at 80 characters with ellipsis, full title in title attribute
- Long show notes: Expand/collapse with "Read more" at 500 characters
- Long host bios: Truncate at 300 characters on card, full bio on dedicated host page (post-MVP)
- Long URLs in show notes: Word-break: break-word to prevent overflow

EC-009: Failed Image Loading
- Episode thumbnails: Show placeholder with podcast logo + alt text
- Host photos: Show default avatar SVG with initials
- Background images: Fallback to solid color from theme
- Retry mechanism: None (rely on browser cache + reload)

EC-010: High Contrast Mode
- Windows High Contrast: Respect system-colors, ensure all borders visible
- Override theme: System high contrast takes precedence over dark/light mode
- Focus indicators: Use system highlight color
- Icons: Ensure sufficient contrast with forced-colors media query
```

## 5. Non-Functional Requirements Gaps

### CHK031-034: NFR Quantification
**Add to spec.md:**
```
NFR-001: Performance Requirements (Detailed)
- Page load: <3s on 3G connection (SC-002 existing)
- Time to Interactive (TTI): <5s
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1
- First Input Delay (FID): <100ms
- Bundle sizes: HTML+critical CSS <50KB, total page weight <2MB without images
- Image optimization: WebP with JPEG fallback, lazy loading for below-fold images
- Lighthouse score: >90 performance, >90 accessibility, >90 best practices, >90 SEO

NFR-002: Image Specifications
- Episode thumbnails: 640x360px (16:9), WebP + JPEG fallback, max 100KB
- Host photos: 400x400px (1:1), WebP + JPEG fallback, max 80KB
- Hero background: 1920x1080px, WebP + JPEG fallback, max 200KB, 0.6 opacity overlay
- Responsive srcset: 320w, 640w, 960w, 1280w variants
- Alt text: Required for all images, descriptive (not "image" or filename)
- Lazy loading: loading="lazy" for all below-fold images

NFR-003: SEO Requirements
- Meta tags: Open Graph and Twitter Card tags for social sharing
- Structured data: Schema.org PodcastSeries and PodcastEpisode JSON-LD
- Sitemap: XML sitemap generated by Jekyll, submitted to Google Search Console
- Robots.txt: Allow all, include sitemap URL
- Canonical URLs: Set for all pages to prevent duplicate content
- Page titles: Format "Episode Title | From The Field" (max 60 characters)
- Meta descriptions: Unique per page, 150-160 characters, include target keywords

NFR-004: Animation Specifications
- Theme toggle: 0.2s ease-in-out color transition
- Filter operations: 0.3s ease-in-out, stagger 50ms per card (max 10 cards)
- Hover effects: 0.2s ease-in-out, scale/color changes
- Page transitions: None (static site, instant navigation)
- Respect prefers-reduced-motion: Disable all non-essential animations
- GPU acceleration: Use transform and opacity for animated properties
```

## 6. Dependencies & Assumptions

### CHK035-038: Explicit Documentation
**Add to Assumptions section in spec.md:**
```
DEP-001: Spotify Web Playback SDK
- Version: Latest stable (v1.x)
- Authentication: Not required for embed playback (public episodes)
- Fallback: Link to Spotify web player if embed fails
- Limitations: Requires Spotify Premium for full playback in SDK (embeds work for all users)
- Documentation: https://developer.spotify.com/documentation/embeds/

DEP-002: GitHub Pages Constraints
- Jekyll version: 4.x (latest supported by GitHub Pages)
- Build time: <10 minutes for site generation
- Repository: Public repository required for free hosting
- Custom domain: Supported via CNAME file + DNS configuration
- SSL: Automatic HTTPS via Let's Encrypt
- No server-side processing: All dynamic behavior via client-side JavaScript
- Storage limit: 1GB repository size, recommend <500MB
- Bandwidth: 100GB/month soft limit

DEP-003: Data Structure (JSON files in _data/)
- episodes.json: Array of episode objects (id, title, description, date, duration, spotifyUrl, thumbnailUrl)
- hosts.json: Array of host objects (id, name, bio, role, photoUrl, socialLinks)
- Required fields: id, title (episodes); id, name (hosts)
- Optional fields: All others
- Date format: ISO 8601 (YYYY-MM-DD)
- URL format: Absolute URLs including protocol

DEP-004: Browser Support
- Minimum versions: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile browsers: Chrome Mobile 90+, Safari iOS 14+
- Feature detection: Provide fallbacks for CSS Grid (Flexbox), CSS custom properties (inline styles)
- Polyfills: None required for target browsers
- Testing: BrowserStack for cross-browser validation
- No IE11 support: Display upgrade message for IE users
```

## 7. Implementation Notes

### Integration into spec.md
1. Add FR-015 through FR-023 to the Functional Requirements section
2. Add NFR-001 through NFR-004 to a new Non-Functional Requirements section
3. Add EC-006 through EC-010 to the existing Edge Cases section
4. Add DEP-001 through DEP-004 to the Assumptions section
5. Update existing FR-002, FR-003, FR-004, FR-006, FR-009, FR-010 with enhanced details

### Validation Strategy
After integrating these requirements:
- All 41 UX checklist items should be marked as complete [x]
- Run through checklist again to verify each item is addressed
- Ensure no conflicts introduced between new and existing requirements
- Validate all requirements are testable and measurable

### Next Steps
1. Integrate these improvements into spec.md
2. Re-run UX checklist validation
3. Proceed with implementation once checklist passes 41/41
