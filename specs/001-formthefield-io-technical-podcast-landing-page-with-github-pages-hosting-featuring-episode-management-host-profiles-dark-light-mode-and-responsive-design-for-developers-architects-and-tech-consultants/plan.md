# Implementation Plan: FormTheField.io Podcast Website

**Branch**: `001-formthefield-io-technical-podcast-landing-page-with-github-pages-hosting-featuring-episode-management-host-profiles-dark-light-mode-and-responsive-design-for-developers-architects-and-tech-consultants` | **Date**: October 31, 2025 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-formthefield-io-technical-podcast-landing-page-with-github-pages-hosting-featuring-episode-management-host-profiles-dark-light-mode-and-responsive-design-for-developers-architects-and-tech-consultants/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Primary requirement: Build a static podcast website for FormTheField.io hosted on GitHub Pages, featuring episode discovery and playback, host profiles, responsive design with dark/light mode, and JSON-based content management. Technical approach: Vanilla HTML/CSS/JavaScript static site with Spotify embeds, client-side filtering, localStorage theme persistence, and third-party form handling compatible with GitHub Pages constraints.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES2020+), Jekyll 4.x for GitHub Pages  
**Primary Dependencies**: GitHub Pages (Jekyll), Spotify Web Playback SDK/Embeds, Formspree (contact forms)  
**Storage**: Static JSON files for episode/host data, localStorage for user preferences  
**Testing**: Manual cross-browser testing with automated Lighthouse performance monitoring  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions), mobile-responsive  
**Project Type**: Static web application (GitHub Pages hosted)  
**Performance Goals**: <3s page load, Lighthouse score >90, <50KB critical CSS, 500 concurrent users peak capacity  
**Constraints**: GitHub Pages limitations (no server-side processing), static file hosting only, repository-based image storage with optimization  
**Scale/Scope**: ~5-10 pages, 50-100 episodes expected, 2 hosts, responsive design (mobile/tablet/desktop)

*All technical clarifications resolved in Phase 0 research - see [research.md](research.md) for detailed decisions and rationale.*

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The following MUST all be satisfied (derived from Constitution v1.0.0):

1. ✅ **Accessibility**: Planned pages include semantic landmarks (header/nav/main/footer) & heading hierarchy.
   - All pages will use semantic HTML5 landmarks as specified in FR-015
   - Responsive design ensures touch-friendly interactions (44px minimum as per SC-005)

2. ✅ **Metadata**: Each page defines unique `<title>` + meta description (50–160 chars) + canonical URL strategy.
   - SEO optimization specified in FR-015 includes Open Graph and Twitter Card meta tags
   - Each page (Home, Episodes, About, Contact, Episode Details) will have unique metadata

3. ✅ **Performance Budget**: Estimated critical CSS <50KB & no client-side framework hydration proposed.
   - Vanilla JavaScript approach with no frameworks, CSS utilities only
   - Performance target SC-004: <3s load time, SC-007: Lighthouse score >90

4. ✅ **SEO Assets**: `sitemap.xml`, `robots.txt`, `_config.yml (url, baseurl)` presence/plan confirmed.
   - Jekyll configuration for GitHub Pages will include all required SEO assets
   - RSS feed generation planned for podcast syndication

5. ✅ **Structured Data**: JSON-LD Site + Organization planned for `index.html`.
   - Podcast-specific structured data will be implemented for better discoverability
   - Site and Organization schema on homepage

6. ✅ **Review Discipline**: PR workflow includes reviewer for SEO-critical files.
   - Standard GitHub PR workflow will be followed for all changes
   - SEO-critical files identified and will require review

7. ✅ **Simplicity**: No unnecessary JS/CSS libraries beyond documented minimal set.
   - Minimal dependencies: Only Spotify embeds and form handling service
   - Vanilla JavaScript for filtering, theme toggle, and interactions

8. ✅ **Orphan Avoidage**: Each new page has at least one inbound link identified.
   - Clear navigation structure: Home → Episodes → Individual Episode Details
   - About and Contact pages linked from main navigation
   - All pages interconnected through main navigation menu

**Status**: ✅ ALL GATES PASSED - No violations, proceeding to Phase 0

**Post-Phase 1 Re-evaluation**: ✅ CONFIRMED ALL GATES STILL PASSED
- Design maintains semantic HTML5 structure with proper landmarks
- No client-side framework hydration added (vanilla JavaScript only)
- Performance budget maintained with critical CSS strategy
- All required SEO assets planned and documented
- Component architecture follows simplicity principles
- No new complexity or dependencies introduced

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Static Jekyll Site Structure for GitHub Pages
/
├── _config.yml              # Jekyll configuration
├── index.html               # Homepage
├── episodes.html            # Episode library page
├── about.html              # About page with host profiles
├── contact.html            # Contact form page
├── episode.html            # Episode detail template
├── 404.html                # Error page
├── robots.txt              # SEO crawler instructions
├── sitemap.xml             # Site map for SEO
├── favicon.ico             # Site icon
├── _layouts/               # Jekyll layouts
│   ├── default.html        # Base layout template
│   └── episode.html        # Episode page layout
├── _includes/              # Reusable components
│   ├── header.html         # Site header with navigation
│   ├── footer.html         # Site footer
│   ├── episode-card.html   # Episode card component
│   └── audio-player.html   # Custom audio player
├── assets/
│   ├── css/
│   │   ├── main.css        # Primary stylesheet
│   │   └── dark-mode.css   # Dark theme overrides
│   ├── js/
│   │   ├── main.js         # Core functionality
│   │   ├── episodes.js     # Episode filtering logic
│   │   ├── theme-toggle.js # Dark/light mode toggle
│   │   └── player.js       # Audio player controls
│   └── images/
│       ├── logo.svg        # Podcast logo
│       ├── episodes/       # Episode thumbnails
│       ├── hosts/          # Host profile photos
│       └── guests/         # Guest photos
├── _data/                  # Jekyll data files
│   ├── episodes.json       # Episode metadata
│   ├── hosts.json          # Host information
│   └── config.json         # Site configuration
└── tests/                  # Testing scripts
    ├── lighthouse.js       # Performance testing
    └── accessibility.js    # A11y validation
```

**Structure Decision**: Selected static Jekyll site structure optimized for GitHub Pages hosting. This provides built-in templating, data management through Jekyll's `_data` directory, and follows Jekyll conventions for maintainability. The structure separates concerns with dedicated directories for layouts, includes, assets, and data while maintaining GitHub Pages compatibility.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations identified - all Constitution gates passed. Project adheres to simplicity principles with minimal dependencies and static site architecture.
