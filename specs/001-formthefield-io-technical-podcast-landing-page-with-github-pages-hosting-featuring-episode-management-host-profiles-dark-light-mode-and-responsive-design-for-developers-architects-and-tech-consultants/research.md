# Research: FormTheField.io Podcast Website

**Phase 0 Research Output** | **Date**: October 31, 2025  
**Purpose**: Resolve technical clarifications and establish best practices for podcast website implementation

## Research Tasks

### 1. Form Service Selection for GitHub Pages

**Decision**: Formspree (free tier)

**Rationale**: 
- GitHub Pages compatible (static sites only)
- Free tier supports 50 submissions/month (adequate for podcast contact forms)
- No client-side API keys required (security advantage)  
- Built-in spam protection
- Simple HTML form integration without JavaScript dependencies
- JSON response format for confirmation handling

**Alternatives considered**:
- **EmailJS**: Requires client-side API keys (security concern for public repos)
- **Netlify Forms**: Not available on GitHub Pages (Netlify-specific)
- **Custom backend**: Violates GitHub Pages static-only constraint

### 2. Browser Testing Strategy

**Decision**: Manual testing with Lighthouse automation

**Rationale**:
- GitHub Pages projects typically have limited CI/CD budget
- Manual cross-browser testing sufficient for static sites
- Lighthouse CLI can be automated via GitHub Actions for performance monitoring
- Focus on real device testing for mobile responsiveness
- BrowserStack or similar tools for broader compatibility testing if needed

**Alternatives considered**:
- **Playwright**: Overkill for static site, adds complexity
- **Selenium**: Maintenance overhead too high for simple site
- **Pure manual**: Risk of regression without performance monitoring

### 3. Expected Concurrent Users Baseline

**Decision**: 500 concurrent users peak capacity

**Rationale**:
- Podcast websites typically see traffic spikes during new episode releases
- GitHub Pages CDN handles static content efficiently at this scale
- Technical podcast audience likely smaller than general entertainment
- Conservative estimate allows for growth without infrastructure changes

**Alternatives considered**:
- **100 users**: Too conservative for podcast growth goals
- **1000+ users**: Over-engineering for initial launch phase

### 4. Image Hosting Strategy

**Decision**: Repository-based with optimization pipeline

**Rationale**:
- GitHub repository storage (1GB limit) sufficient for optimized images
- WebP format with JPEG fallbacks reduces file sizes significantly
- Image optimization via automated tools (GitHub Actions) during build
- Lazy loading implementation reduces initial page weight
- CDN benefits from GitHub Pages global distribution

**Alternatives considered**:
- **External CDN**: Adds complexity and external dependencies
- **Cloudinary/ImageKit**: Additional service to manage and potential costs

## Best Practices Research

### Static Site Performance for Podcasts

**Key findings**:
- Critical CSS should be inlined for above-the-fold content
- Episode thumbnails must be optimized (max 50KB each)
- Spotify embeds add ~200KB overhead per embed
- JSON data files should be split by page to avoid loading unused content
- Service Worker caching can improve repeat visit performance

**Implementation approach**:
- Separate CSS files for critical (inlined) and non-critical (deferred)
- Image compression workflow with multiple format outputs
- Lazy loading for episode grids
- Minimal JavaScript bundling

### Podcast Website SEO Best Practices

**Key findings**:
- JSON-LD structured data for Podcast schema improves discoverability
- Episode pages need individual canonical URLs for search indexing
- RSS feed should validate against podcast standards (iTunes, Spotify)
- Open Graph tags critical for social media sharing
- Meta descriptions should include episode keywords and guest names

**Implementation approach**:
- Automated sitemap generation including episode detail pages
- Template-based meta tag generation from episode data
- RSS feed generation from episode JSON data
- Social media card previews for each episode

### Accessibility for Media Sites

**Key findings**:
- Audio players require full keyboard navigation support
- Episode transcripts improve accessibility (future consideration)
- High contrast mode compatibility essential for developer audience
- Screen reader compatibility for episode metadata
- Focus management for modal dialogs (if used)

**Implementation approach**:
- Custom audio player with ARIA labels
- Skip links for navigation
- Color contrast testing for both light and dark modes
- Semantic HTML for episode information structure

### Dark Mode Implementation Patterns

**Key findings**:
- CSS custom properties (variables) provide cleanest theme switching
- prefers-color-scheme media query for system preference detection
- localStorage persistence prevents flash of wrong theme
- Smooth transitions enhance user experience without performance impact

**Implementation approach**:
- CSS custom properties for theme colors
- JavaScript toggle with localStorage persistence
- Transition animations for theme switching
- System preference detection and respect

## Technical Decisions Summary

| Component | Choice | Justification |
|-----------|--------|---------------|
| Form Handling | Formspree | GitHub Pages compatible, secure, adequate free tier |
| Testing Strategy | Manual + Lighthouse | Cost-effective, appropriate for static site complexity |
| Performance Target | 500 concurrent users | Realistic growth target for podcast audience |
| Image Storage | Repository + optimization | Leverages GitHub Pages CDN, manageable within limits |
| CSS Architecture | Critical inlined + deferred | Optimal loading performance for podcast site |
| Theme Implementation | CSS custom properties | Modern, performant, accessible theme switching |

## Implementation Readiness

All technical clarifications resolved. Ready to proceed to Phase 1: Design & Contracts.