# Research: Episode Content Management Workflow

**Date**: October 31, 2025  
**Feature**: 002-add-episode-workflow  
**Purpose**: Research technical decisions and best practices for episode management

## Overview

This feature requires minimal research since it leverages existing Jekyll/GitHub Pages infrastructure. The primary research areas focus on:
1. Jekyll data file best practices
2. JSON schema validation approaches
3. Spotify embed integration patterns
4. Episode metadata standards for podcasts

---

## Research Area 1: Jekyll Data Files Best Practices

### Decision
Use Jekyll's native `_data/` directory with JSON format for episode storage.

### Rationale
- **Native Jekyll Support**: Jekyll automatically loads JSON/YAML files from `_data/` and makes them available in templates via `site.data.episodes`
- **Simple Schema**: JSON provides clear structure with minimal learning curve for content managers
- **Version Control Friendly**: Text-based format works well with Git diffs and conflict resolution
- **No Build Tools Required**: No preprocessors or build steps beyond Jekyll itself
- **GitHub Pages Compatible**: Native Jekyll feature, no special permissions or plugins needed

### Alternatives Considered

**Alternative 1: YAML format**
- ✅ More human-readable for simple data
- ❌ Indentation-sensitive (error-prone for non-technical users)
- ❌ Harder to validate programmatically
- ❌ Multiline strings (show notes) can be confusing

**Alternative 2: Jekyll Collections (_episodes directory with front matter)**
- ✅ Each episode is a separate markdown file
- ✅ Content and metadata in same file
- ❌ More files to manage (100+ episodes = 100+ files)
- ❌ Harder to programmatically validate all episodes at once
- ❌ More complex Git history with many small files
- **Rejected because**: Single JSON file is easier to validate and maintain

**Alternative 3: External CMS (Netlify CMS, Forestry, etc.)**
- ✅ User-friendly GUI interface
- ❌ Additional dependency and complexity
- ❌ Violates constitution principle of simplicity
- ❌ Requires authentication setup
- ❌ Content managers already comfortable with Git workflow
- **Rejected because**: Unnecessary complexity for 3-5 technical users

### Implementation Notes
- Keep existing `_data/episodes.json` structure
- Episodes array ordered chronologically (manual ordering)
- Each episode object contains all metadata in one place
- Jekyll templates iterate over array with `for episode in site.data.episodes`

---

## Research Area 2: JSON Schema Validation

### Decision
Implement validation through Jekyll build-time checks using Liquid templates with helpful error messages.

### Rationale
- **Zero External Dependencies**: Uses Jekyll's native Liquid template logic
- **Fast Feedback**: Errors appear immediately in Jekyll build output
- **Simple to Maintain**: Validation logic lives in template includes
- **GitHub Pages Compatible**: No build plugins or external tools required

### Alternatives Considered

**Alternative 1: JSON Schema + pre-commit hook**
- ✅ Industry-standard validation format
- ✅ Catches errors before commit
- ❌ Requires Node.js tooling (ajv or similar)
- ❌ Adds complexity to local development setup
- ❌ Not all contributors may have pre-commit hooks configured
- **Rejected because**: Violates simplicity principle, adds tooling dependency

**Alternative 2: GitHub Actions validation**
- ✅ Centralized validation
- ✅ Catches errors before merge
- ❌ Slower feedback (must push to see errors)
- ❌ Extra CI configuration
- **Rejected because**: Slower than build-time validation, adds CI complexity

**Alternative 3: Manual validation only**
- ✅ Simplest approach
- ❌ Error-prone
- ❌ Broken episodes could reach production
- **Rejected because**: Some automated validation is needed for good UX

### Implementation Notes
Validation checks to implement in Liquid:
```liquid
{% for episode in site.data.episodes %}
  {% unless episode.id and episode.title and episode.date %}
    {% error "Episode missing required field: id, title, or date" %}
  {% endunless %}
  
  {% assign date_parts = episode.date | split: "-" %}
  {% if date_parts.size != 3 %}
    {% error "Invalid date format in episode {{ episode.id }}" %}
  {% endif %}
{% endfor %}
```

Place validation in `_includes/validate-episodes.html` and include at top of layouts.

---

## Research Area 3: Spotify Embed Integration

### Decision
Use Spotify's iframe embed format with episode URLs extracted from provided Spotify links.

### Rationale
- **Official Spotify Solution**: Supported and maintained by Spotify
- **No API Keys Required**: Embeds are public and work via iframe
- **Mobile Responsive**: Spotify embeds adapt to screen size
- **Lazy Loading**: Modern browsers lazy-load iframes automatically
- **No JavaScript Required**: Pure HTML embed

### Alternatives Considered

**Alternative 1: Spotify Web Playback SDK**
- ✅ Full programmatic control
- ✅ Custom UI possible
- ❌ Requires JavaScript SDK and initialization
- ❌ Requires Spotify developer account and API keys
- ❌ More complex implementation
- **Rejected because**: Overkill for simple playback needs

**Alternative 2: Custom audio player with self-hosted files**
- ✅ Full control over player appearance
- ✅ No external dependencies
- ❌ Must host large audio files (storage costs)
- ❌ Bandwidth costs for streaming
- ❌ No Spotify integration (users can't add to playlists)
- **Rejected because**: Spotify hosting is free and provides better UX

**Alternative 3: Link to Spotify only (no embed)**
- ✅ Simplest implementation
- ❌ Users must leave site to listen
- ❌ Worse user experience
- **Rejected because**: Embedded player is standard for podcast sites

### Implementation Notes
Spotify embed URL format:
```html
<iframe 
  src="https://open.spotify.com/embed/episode/{{ episode.spotifyId }}" 
  width="100%" 
  height="232" 
  frameborder="0" 
  allowtransparency="true" 
  allow="encrypted-media">
</iframe>
```

Extract episode ID from full Spotify URL in data file:
- Input: `https://open.spotify.com/episode/3abc123xyz`
- Extract: `3abc123xyz`
- Use in: `https://open.spotify.com/embed/episode/3abc123xyz`

---

## Research Area 4: Podcast Metadata Standards

### Decision
Follow Schema.org PodcastEpisode structured data format for SEO.

### Rationale
- **SEO Best Practice**: Google and other search engines understand Schema.org
- **Podcast Discovery**: Helps episodes appear in podcast search results
- **Rich Snippets**: Enables enhanced search result display
- **Jekyll SEO Tag Support**: The jekyll-seo-tag plugin supports custom structured data

### Alternatives Considered

**Alternative 1: RSS/Atom feed only**
- ✅ Standard podcast distribution format
- ❌ Not optimal for SEO in web search
- ❌ Doesn't help with Google search result appearance
- **Note**: We'll do BOTH RSS (via jekyll-feed) AND structured data

**Alternative 2: No structured data**
- ✅ Simplest approach
- ❌ Misses SEO opportunities
- ❌ Worse search result appearance
- **Rejected because**: Easy to add, significant SEO benefit

### Implementation Notes

JSON-LD structured data for episode pages:
```json
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "url": "{{ page.url | absolute_url }}",
  "name": "{{ episode.title }}",
  "datePublished": "{{ episode.date }}",
  "description": "{{ episode.description }}",
  "duration": "{{ episode.duration }}",
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "{{ site.title }}",
    "url": "{{ site.url }}"
  },
  "author": {
    "@type": "Organization",
    "name": "{{ site.podcast.author }}"
  }
}
```

Add to episode layout template in `<head>` section.

---

## Research Area 5: Episode Thumbnail Optimization

### Decision
Use responsive image techniques with WebP format (fallback to JPEG/PNG) and explicit width/height attributes.

### Rationale
- **Performance**: WebP provides 25-35% better compression than JPEG
- **Core Web Vitals**: Explicit dimensions prevent layout shift (CLS)
- **Browser Support**: WebP supported in all modern browsers; fallback for older browsers
- **Constitution Compliance**: Meets performance budget requirements

### Implementation Notes

HTML picture element with fallback:
```html
<picture>
  <source srcset="{{ episode.thumbnailUrl | replace: '.jpg', '.webp' }}" type="image/webp">
  <img 
    src="{{ episode.thumbnailUrl }}" 
    alt="{{ episode.title }} episode artwork"
    width="800" 
    height="800"
    loading="lazy">
</picture>
```

Image specifications:
- **Format**: WebP preferred, JPEG/PNG fallback
- **Dimensions**: 800×800px (square format, standard podcast artwork)
- **File size**: Target <150KB per image
- **Naming convention**: `ep001.jpg`, `ep002.jpg` (matches episode ID)

---

## Summary of Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Data Storage | JSON in `_data/episodes.json` | Simple, Git-friendly, native Jekyll support |
| Validation | Jekyll build-time Liquid checks | Zero dependencies, fast feedback |
| Audio Embed | Spotify iframe embeds | Official, free, no API keys needed |
| SEO Metadata | Schema.org PodcastEpisode JSON-LD | Better search visibility and rich snippets |
| Images | WebP with JPEG fallback, lazy loading | Performance + browser compatibility |

All decisions align with constitution principles:
- ✅ No new frameworks or heavy dependencies
- ✅ Static-first approach
- ✅ Performance-focused
- ✅ SEO-optimized
- ✅ Simple to maintain

---

## Open Questions

**None remaining** - all technical decisions made with clear rationale.

## Next Steps

Proceed to Phase 1:
1. Create `data-model.md` documenting episode JSON schema
2. Create `contracts/episode-data-contract.md` defining the episode object structure
3. Create `quickstart.md` with step-by-step guide for adding episodes
4. Update `.github/copilot-instructions.md` with episode management context
