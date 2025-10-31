# Quickstart Guide: FormTheField.io Podcast Website

**Purpose**: Fast-track setup and development guide for implementing the podcast website  
**Audience**: Developers implementing the feature  
**Time Estimate**: 2-4 hours for basic setup, 1-2 weeks for full implementation

## Prerequisites

### Required Tools
- **Node.js** 18+ (for build tools and testing)
- **Ruby** 2.7+ (for Jekyll/GitHub Pages)
- **Git** (version control)
- **VS Code** or similar editor with Jekyll/HTML support

### Required Accounts
- **GitHub** account with Pages enabled
- **Formspree** account (free tier) for contact forms
- **Spotify** for Podcasters account (for embed URLs)

## Quick Setup (15 minutes)

### 1. Repository Setup
```bash
# Clone or initialize repository
git clone https://github.com/your-username/fromthefield.io.git
cd fromthefield.io

# Install Jekyll and dependencies
bundle install

# Install Node.js dependencies (for build tools)
npm install
```

### 2. Basic Configuration
```bash
# Create basic Jekyll config
cat > _config.yml << 'EOF'
title: FormTheField.io
description: Life as a Consultant in Tech
url: https://your-username.github.io
baseurl: /fromthefield.io

plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

collections:
  episodes:
    output: true
    permalink: /episodes/:name/

defaults:
  - scope:
      path: ""
      type: "episodes"
    values:
      layout: "episode"
EOF
```

### 3. Create Essential Directories
```bash
mkdir -p _layouts _includes _data assets/{css,js,images} assets/images/{episodes,hosts,guests}
```

### 4. Test Local Setup
```bash
# Start local development server
bundle exec jekyll serve --livereload

# Open http://localhost:4000 to verify setup
```

## Core Implementation Steps

### Phase 1: Basic Structure (2-3 hours)

#### 1.1 Create Base Layout
```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
  <meta name="description" content="{{ page.description | default: site.description }}">
  
  <!-- SEO Meta Tags -->
  <link rel="canonical" href="{{ page.url | absolute_url }}">
  <meta property="og:title" content="{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}">
  <meta property="og:description" content="{{ page.description | default: site.description }}">
  <meta property="og:url" content="{{ page.url | absolute_url }}">
  <meta property="og:type" content="website">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
  
  <!-- Favicon -->
  <link rel="icon" href="{{ '/favicon.ico' | relative_url }}">
</head>
<body>
  {% include header.html %}
  
  <main id="main-content">
    {{ content }}
  </main>
  
  {% include footer.html %}
  
  <!-- Scripts -->
  <script src="{{ '/assets/js/main.js' | relative_url }}"></script>
</body>
</html>
```

#### 1.2 Create Header Component
```html
<!-- _includes/header.html -->
<header class="site-header">
  <nav class="main-nav" role="navigation" aria-label="Main navigation">
    <div class="nav-container">
      <a href="{{ '/' | relative_url }}" class="logo">
        <img src="{{ '/assets/images/logo.svg' | relative_url }}" alt="FormTheField.io">
        <span>FormTheField.io</span>
      </a>
      
      <div class="nav-links">
        <a href="{{ '/' | relative_url }}" {% if page.url == "/" %}aria-current="page"{% endif %}>Home</a>
        <a href="{{ '/episodes.html' | relative_url }}" {% if page.url contains "/episodes" %}aria-current="page"{% endif %}>Episodes</a>
        <a href="{{ '/about.html' | relative_url }}" {% if page.url == "/about.html" %}aria-current="page"{% endif %}>About</a>
        <a href="{{ '/contact.html' | relative_url }}" {% if page.url == "/contact.html" %}aria-current="page"{% endif %}>Contact</a>
        
        <button class="theme-toggle" aria-label="Toggle dark mode">
          <span class="theme-icon">🌙</span>
        </button>
      </div>
      
      <!-- Mobile menu button -->
      <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</header>
```

#### 1.3 Create Critical CSS
```css
/* assets/css/main.css */
:root {
  /* Light theme colors */
  --color-primary: #10B981;
  --color-accent: #2DD4BF;
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text: #1F2937;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  
  /* Typography */
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* Layout */
  --container-max-width: 1200px;
  --border-radius: 0.5rem;
  --transition: all 0.2s ease;
}

/* Dark theme colors */
[data-theme="dark"] {
  --color-background: #0F172A;
  --color-surface: #1E293B;
  --color-text: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-border: #334155;
}

/* Theme transition */
.theme-transitioning * {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
}

/* Base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
  margin: 0;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Header styles */
.site-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-nav .nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-links a {
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: var(--transition);
}

.nav-links a:hover,
.nav-links a[aria-current="page"] {
  color: var(--color-primary);
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
}
```

### Phase 2: Data Layer (1-2 hours)

#### 2.1 Create Sample Episode Data
```json
// _data/episodes.json
[
  {
    "id": "001-welcome-to-fromthefield",
    "season": 1,
    "episodeNumber": 1,
    "title": "Welcome to FormTheField.io",
    "description": "In our inaugural episode, we introduce FormTheField.io and discuss what it's like being a consultant in the tech industry.",
    "shortDescription": "Introducing FormTheField.io and the consulting lifestyle in tech.",
    "publishDate": "2025-10-31",
    "duration": "28:45",
    "thumbnail": "/assets/images/episodes/ep001.webp",
    "spotifyUrl": "https://open.spotify.com/episode/your-episode-id",
    "audioUrl": "/assets/audio/ep001.mp3",
    "topics": ["consulting-life", "career-development"],
    "hosts": ["host-1", "host-2"],
    "guests": [],
    "showNotes": "Welcome to our first episode! We discuss our backgrounds in tech consulting and what listeners can expect from the show.",
    "status": "published",
    "featured": true
  }
]
```

#### 2.2 Create Host Data
```json
// _data/hosts.json
[
  {
    "id": "host-1",
    "name": "John Smith",
    "title": "Senior Cloud Architect",
    "company": "CloudTech Consulting",
    "bio": "John has over 10 years of experience in cloud architecture and platform engineering. He specializes in Kubernetes, AWS, and helping organizations modernize their infrastructure.",
    "photo": "/assets/images/hosts/john-smith.webp",
    "social": {
      "linkedin": "https://linkedin.com/in/johnsmith",
      "twitter": "https://twitter.com/johnsmith",
      "github": "https://github.com/johnsmith",
      "website": "https://johnsmith.dev"
    },
    "episodeCount": 15,
    "joinDate": "2025-01-01",
    "active": true
  }
]
```

#### 2.3 Create Topics Configuration
```json
// _data/topics.json
[
  {
    "id": "cloud-native",
    "name": "Cloud Native",
    "description": "Cloud native technologies and practices",
    "color": "#2DD4BF"
  },
  {
    "id": "kubernetes",
    "name": "Kubernetes",
    "description": "Container orchestration with Kubernetes",
    "color": "#10B981"
  },
  {
    "id": "consulting-life",
    "name": "Consulting Life",
    "description": "The consulting lifestyle and career",
    "color": "#8B5CF6"
  }
]
```

### Phase 3: Core Pages (3-4 hours)

#### 3.1 Homepage
```html
<!-- index.html -->
---
layout: default
title: Home
description: Life as a Consultant in Tech - A technical podcast for developers, architects, and tech consultants
---

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>FormTheField.io</h1>
      <p class="tagline">Life as a Consultant in Tech</p>
      <p class="description">A technical podcast exploring the challenges and opportunities of consulting in the technology industry.</p>
      
      <div class="subscribe-buttons">
        <a href="https://open.spotify.com/show/your-show-id" class="btn btn-primary">
          <span>🎵</span> Spotify
        </a>
        <a href="https://podcasts.apple.com/podcast/your-show-id" class="btn btn-secondary">
          <span>🎙️</span> Apple Podcasts
        </a>
        <a href="/feed.xml" class="btn btn-secondary">
          <span>📡</span> RSS
        </a>
      </div>
    </div>
  </div>
</section>

<section class="latest-episode">
  <div class="container">
    <h2>Latest Episode</h2>
    <div id="latest-episode-container">
      <!-- Populated by JavaScript -->
    </div>
  </div>
</section>

<script>
// Load latest episode
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/_data/episodes.json');
    const episodes = await response.json();
    const latest = episodes
      .filter(ep => ep.status === 'published')
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))[0];
    
    if (latest) {
      document.getElementById('latest-episode-container').innerHTML = `
        <div class="episode-featured">
          <img src="${latest.thumbnail}" alt="${latest.title} thumbnail">
          <div class="episode-info">
            <h3>${latest.title}</h3>
            <p>${latest.description}</p>
            <div class="episode-meta">
              <span>${new Date(latest.publishDate).toLocaleDateString()}</span>
              <span>${latest.duration}</span>
            </div>
            <div class="episode-player">
              <iframe src="https://open.spotify.com/embed/episode/${latest.spotifyUrl.split('/').pop()}" 
                      width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media">
              </iframe>
            </div>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Failed to load latest episode:', error);
  }
});
</script>
```

#### 3.2 Episodes Page
```html
<!-- episodes.html -->
---
layout: default
title: Episodes
description: Browse all FormTheField.io podcast episodes about consulting in tech
---

<section class="episodes-page">
  <div class="container">
    <header class="page-header">
      <h1>Episodes</h1>
      <p>Explore our library of conversations about consulting in tech</p>
    </header>
    
    <div class="episodes-controls">
      <div class="search-bar">
        <input type="search" id="episode-search" placeholder="Search episodes..." aria-label="Search episodes">
      </div>
      
      <div class="topic-filters" id="topic-filters">
        <!-- Populated by JavaScript -->
      </div>
    </div>
    
    <div class="episodes-grid" id="episodes-grid">
      <!-- Populated by JavaScript -->
    </div>
    
    <div class="load-more-container">
      <button class="btn btn-secondary" id="load-more" style="display: none;">Load More Episodes</button>
    </div>
  </div>
</section>

<script src="/assets/js/episodes.js"></script>
```

### Phase 4: JavaScript Functionality (2-3 hours)

#### 4.1 Main JavaScript
```javascript
// assets/js/main.js
class PodcastApp {
  constructor() {
    this.initTheme();
    this.initNavigation();
  }
  
  initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    this.updateThemeIcon(currentTheme);
    
    themeToggle?.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.updateThemeIcon(newTheme);
    });
  }
  
  updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
  
  initNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle?.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PodcastApp();
});
```

#### 4.2 Episodes JavaScript
```javascript
// assets/js/episodes.js
class EpisodesManager {
  constructor() {
    this.episodes = [];
    this.filteredEpisodes = [];
    this.topics = [];
    this.currentPage = 1;
    this.episodesPerPage = 12;
    this.selectedTopics = new Set();
    
    this.init();
  }
  
  async init() {
    await this.loadData();
    this.renderTopicFilters();
    this.renderEpisodes();
    this.bindEvents();
  }
  
  async loadData() {
    try {
      const [episodesResponse, topicsResponse] = await Promise.all([
        fetch('/_data/episodes.json'),
        fetch('/_data/topics.json')
      ]);
      
      this.episodes = await episodesResponse.json();
      this.topics = await topicsResponse.json();
      this.filteredEpisodes = this.episodes.filter(ep => ep.status === 'published');
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }
  
  renderTopicFilters() {
    const container = document.getElementById('topic-filters');
    if (!container) return;
    
    container.innerHTML = `
      <h3>Filter by Topic</h3>
      <div class="filter-options">
        ${this.topics.map(topic => `
          <label class="topic-filter">
            <input type="checkbox" value="${topic.id}">
            <span>${topic.name}</span>
          </label>
        `).join('')}
      </div>
      <button class="clear-filters">Clear All</button>
    `;
  }
  
  renderEpisodes() {
    const container = document.getElementById('episodes-grid');
    if (!container) return;
    
    const startIndex = (this.currentPage - 1) * this.episodesPerPage;
    const endIndex = startIndex + this.episodesPerPage;
    const episodesToShow = this.filteredEpisodes.slice(0, endIndex);
    
    container.innerHTML = episodesToShow.map(episode => `
      <article class="episode-card" data-episode-id="${episode.id}">
        <img src="${episode.thumbnail}" alt="${episode.title} thumbnail" loading="lazy">
        <div class="episode-info">
          <h3>${episode.title}</h3>
          <p>${episode.shortDescription}</p>
          <div class="episode-meta">
            <time datetime="${episode.publishDate}">
              ${new Date(episode.publishDate).toLocaleDateString()}
            </time>
            <span>${episode.duration}</span>
          </div>
          <div class="episode-topics">
            ${episode.topics.map(topicId => {
              const topic = this.topics.find(t => t.id === topicId);
              return topic ? `<span class="topic-tag">${topic.name}</span>` : '';
            }).join('')}
          </div>
        </div>
      </article>
    `).join('');
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = endIndex < this.filteredEpisodes.length ? 'block' : 'none';
    }
  }
  
  bindEvents() {
    // Topic filter changes
    document.getElementById('topic-filters')?.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        if (e.target.checked) {
          this.selectedTopics.add(e.target.value);
        } else {
          this.selectedTopics.delete(e.target.value);
        }
        this.filterEpisodes();
      }
    });
    
    // Clear filters
    document.querySelector('.clear-filters')?.addEventListener('click', () => {
      this.selectedTopics.clear();
      document.querySelectorAll('#topic-filters input[type="checkbox"]').forEach(cb => cb.checked = false);
      this.filterEpisodes();
    });
    
    // Search
    document.getElementById('episode-search')?.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.filterEpisodes();
    });
    
    // Load more
    document.getElementById('load-more')?.addEventListener('click', () => {
      this.currentPage++;
      this.renderEpisodes();
    });
    
    // Episode clicks
    document.getElementById('episodes-grid')?.addEventListener('click', (e) => {
      const card = e.target.closest('.episode-card');
      if (card) {
        const episodeId = card.dataset.episodeId;
        window.location.href = `/episode.html?id=${episodeId}`;
      }
    });
  }
  
  filterEpisodes() {
    this.filteredEpisodes = this.episodes.filter(episode => {
      if (episode.status !== 'published') return false;
      
      // Topic filter
      if (this.selectedTopics.size > 0) {
        const hasMatchingTopic = episode.topics.some(topic => this.selectedTopics.has(topic));
        if (!hasMatchingTopic) return false;
      }
      
      // Search filter
      if (this.searchTerm) {
        const searchableText = `${episode.title} ${episode.shortDescription} ${episode.topics.join(' ')}`.toLowerCase();
        if (!searchableText.includes(this.searchTerm)) return false;
      }
      
      return true;
    });
    
    this.currentPage = 1;
    this.renderEpisodes();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new EpisodesManager();
});
```

## Development Workflow

### Local Development
```bash
# Start Jekyll with live reload
bundle exec jekyll serve --livereload --drafts

# In separate terminal, watch for CSS/JS changes
npm run watch

# Run accessibility tests
npm run test:a11y

# Run performance tests
npm run test:lighthouse
```

### Content Management
```bash
# Add new episode
cp _data/episode-template.json _data/episodes/episode-new.json
# Edit episode-new.json with episode details

# Add episode images
cp episode-thumbnail.webp assets/images/episodes/
cp guest-photo.webp assets/images/guests/

# Test locally before committing
bundle exec jekyll serve
```

### Deployment
```bash
# Commit changes
git add .
git commit -m "Add new episode: Episode Title"

# Push to GitHub (triggers GitHub Pages build)
git push origin main

# Monitor build status in GitHub Actions
```

## Performance Checklist

- [ ] Images optimized (WebP format, <50KB per thumbnail)
- [ ] Critical CSS inlined (<50KB)
- [ ] JavaScript files minified
- [ ] Lazy loading implemented for images
- [ ] Service worker for caching (optional)
- [ ] Lighthouse score >90 for Performance, Accessibility, SEO

## Accessibility Checklist

- [ ] Semantic HTML5 landmarks used
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader testing completed
- [ ] Focus indicators visible

## Go-Live Checklist

- [ ] Domain configured (if custom domain)
- [ ] SSL certificate active
- [ ] Analytics installed
- [ ] Search console configured
- [ ] RSS feed validated
- [ ] Social media cards tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed

## Next Steps

After basic implementation:

1. **Content Migration**: Import existing episodes and host information
2. **Advanced Features**: Implement transcript support, episode comments
3. **Analytics**: Set up detailed podcast analytics
4. **Performance**: Implement service worker for offline capability
5. **SEO**: Submit sitemap to search engines

## Support Resources

- **Jekyll Documentation**: https://jekyllrb.com/docs/
- **GitHub Pages**: https://docs.github.com/en/pages
- **Formspree**: https://formspree.io/docs
- **Web Accessibility**: https://webaim.org/
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse