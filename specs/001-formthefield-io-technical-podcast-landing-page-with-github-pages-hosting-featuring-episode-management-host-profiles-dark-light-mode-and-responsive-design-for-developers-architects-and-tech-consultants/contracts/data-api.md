# Data Access Contracts

**Purpose**: Define how the static site accesses and manipulates data through JavaScript APIs

## Client-Side Data API

### Episode Data Access

#### Get Latest Episodes
```javascript
// GET /api/episodes/latest
async function getLatestEpisodes(count = 3) {
  const response = await fetch('/_data/episodes-index.json');
  const episodes = await response.json();
  return episodes
    .filter(ep => ep.status === 'published')
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, count);
}
```

#### Get Episodes by Topic
```javascript
// GET /api/episodes/by-topic/:topic
async function getEpisodesByTopic(topicSlug) {
  const response = await fetch('/_data/episodes-index.json');
  const episodes = await response.json();
  return episodes.filter(ep => 
    ep.status === 'published' && 
    ep.topics.includes(topicSlug)
  );
}
```

#### Get Episode Detail
```javascript
// GET /api/episodes/:id
async function getEpisodeDetail(episodeId) {
  const year = episodeId.substring(0, 4); // Extract year from ID
  const response = await fetch(`/_data/episodes/${year}/${episodeId}.json`);
  return await response.json();
}
```

#### Search Episodes
```javascript
// GET /api/episodes/search?q=:query
async function searchEpisodes(query) {
  const response = await fetch('/_data/episodes-index.json');
  const episodes = await response.json();
  const searchTerm = query.toLowerCase();
  
  return episodes.filter(ep => 
    ep.status === 'published' && (
      ep.title.toLowerCase().includes(searchTerm) ||
      ep.shortDescription.toLowerCase().includes(searchTerm) ||
      ep.topics.some(topic => topic.includes(searchTerm))
    )
  );
}
```

### Host Data Access

#### Get All Hosts
```javascript
// GET /api/hosts
async function getAllHosts() {
  const response = await fetch('/_data/hosts.json');
  const hosts = await response.json();
  return hosts.filter(host => host.active);
}
```

#### Get Host by ID
```javascript
// GET /api/hosts/:id
async function getHostById(hostId) {
  const response = await fetch('/_data/hosts.json');
  const hosts = await response.json();
  return hosts.find(host => host.id === hostId);
}
```

### Topic Data Access

#### Get All Topics with Counts
```javascript
// GET /api/topics
async function getTopicsWithCounts() {
  const [topicsResponse, episodesResponse] = await Promise.all([
    fetch('/_data/topics.json'),
    fetch('/_data/episodes-index.json')
  ]);
  
  const topics = await topicsResponse.json();
  const episodes = await episodesResponse.json();
  
  return topics.map(topic => ({
    ...topic,
    episodeCount: episodes.filter(ep => 
      ep.status === 'published' && ep.topics.includes(topic.id)
    ).length
  }));
}
```

### Contact Form API

#### Submit Contact Form
```javascript
// POST /contact
async function submitContactForm(formData) {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      _replyto: formData.email,
      _subject: `FormTheField.io Contact: ${formData.name}`
    })
  });
  
  if (!response.ok) {
    throw new Error('Form submission failed');
  }
  
  return await response.json();
}
```

## User Preference API

### Theme Management
```javascript
// Local Storage API for theme preferences
class ThemeManager {
  static getTheme() {
    return localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  
  static setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  static toggleTheme() {
    const current = this.getTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }
}
```

### User Preferences
```javascript
// Local Storage API for user preferences
class UserPreferences {
  static getPreferences() {
    const prefs = localStorage.getItem('userPrefs');
    return prefs ? JSON.parse(prefs) : {
      theme: 'auto',
      autoplay: false,
      playbackSpeed: 1.0,
      volumeLevel: 0.8
    };
  }
  
  static setPreference(key, value) {
    const prefs = this.getPreferences();
    prefs[key] = value;
    localStorage.setItem('userPrefs', JSON.stringify(prefs));
  }
}
```

## Error Handling

### API Error Responses
```javascript
class APIError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new APIError(
        `Failed to fetch ${url}`, 
        response.status, 
        url
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
  }
}
```

### Fallback Strategies
```javascript
// Fallback for failed episode loading
async function getEpisodesWithFallback() {
  try {
    return await getLatestEpisodes();
  } catch (error) {
    console.warn('Failed to load episodes, using cached data');
    return getCachedEpisodes() || [];
  }
}

// Cache management
class DataCache {
  static set(key, data, ttl = 3600000) { // 1 hour default
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  }
  
  static get(key) {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return null;
    
    const cached = JSON.parse(item);
    if (Date.now() - cached.timestamp > cached.ttl) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    
    return cached.data;
  }
}
```

## Performance Optimization

### Lazy Loading Strategy
```javascript
// Intersection Observer for lazy loading
class LazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { rootMargin: '50px' }
    );
  }
  
  observe(element) {
    this.observer.observe(element);
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadContent(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  loadContent(element) {
    // Load episode data or images
    if (element.dataset.episodeId) {
      this.loadEpisodeCard(element);
    } else if (element.dataset.src) {
      this.loadImage(element);
    }
  }
}
```

### Data Pagination
```javascript
// Pagination for episode lists
class EpisodePagination {
  constructor(pageSize = 12) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.episodes = [];
  }
  
  async loadPage(page = 1) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    
    if (!this.episodes.length) {
      this.episodes = await getAllEpisodes();
    }
    
    return {
      episodes: this.episodes.slice(start, end),
      hasMore: end < this.episodes.length,
      totalPages: Math.ceil(this.episodes.length / this.pageSize),
      currentPage: page
    };
  }
}
```

## Contract Validation

### Client-Side Data Validation
```javascript
// Schema validation for episode data
function validateEpisode(episode) {
  const required = ['id', 'title', 'shortDescription', 'publishDate'];
  const errors = [];
  
  required.forEach(field => {
    if (!episode[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  if (episode.title && episode.title.length > 100) {
    errors.push('Title exceeds maximum length');
  }
  
  if (episode.shortDescription && episode.shortDescription.length > 150) {
    errors.push('Short description exceeds maximum length');
  }
  
  return errors;
}

// Runtime type checking
function assertEpisode(data) {
  const errors = validateEpisode(data);
  if (errors.length > 0) {
    throw new Error(`Episode validation failed: ${errors.join(', ')}`);
  }
  return data;
}
```