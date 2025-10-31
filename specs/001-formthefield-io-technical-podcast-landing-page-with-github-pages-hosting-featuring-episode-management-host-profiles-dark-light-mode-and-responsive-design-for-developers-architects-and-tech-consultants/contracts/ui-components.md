# UI Component Contracts

**Purpose**: Define interfaces and behavior contracts for UI components

## Core Component Interfaces

### EpisodeCard Component

#### Interface
```javascript
interface EpisodeCardProps {
  episode: {
    id: string;
    title: string;
    shortDescription: string;
    publishDate: string;
    duration: string;
    thumbnail: string;
    topics: string[];
    hosts: string[];
    guests?: Guest[];
  };
  showPlayButton?: boolean;
  showTopics?: boolean;
  onClick?: (episodeId: string) => void;
}
```

#### Behavior Contract
```javascript
class EpisodeCard {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.render();
    this.bindEvents();
  }
  
  // MUST implement: Render episode card HTML
  render() {
    this.container.innerHTML = this.getTemplate();
  }
  
  // MUST implement: Handle click events
  bindEvents() {
    this.container.addEventListener('click', this.handleClick.bind(this));
  }
  
  // MUST implement: Navigate to episode detail
  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(this.props.episode.id);
    } else {
      window.location.href = `/episode.html?id=${this.props.episode.id}`;
    }
  }
  
  // MUST implement: Generate accessible HTML
  getTemplate() {
    return `
      <article class="episode-card" role="article" tabindex="0">
        <img src="${this.props.episode.thumbnail}" 
             alt="Episode ${this.props.episode.title} thumbnail"
             loading="lazy">
        <div class="episode-info">
          <h3>${this.props.episode.title}</h3>
          <p>${this.props.episode.shortDescription}</p>
          <div class="episode-meta">
            <time datetime="${this.props.episode.publishDate}">
              ${this.formatDate(this.props.episode.publishDate)}
            </time>
            <span>${this.props.episode.duration}</span>
          </div>
        </div>
      </article>
    `;
  }
}
```

### AudioPlayer Component

#### Interface
```javascript
interface AudioPlayerProps {
  audioUrl?: string;
  spotifyUrl: string;
  title: string;
  autoplay?: boolean;
  showControls?: boolean;
}
```

#### Behavior Contract
```javascript
class AudioPlayer {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.audio = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
  }
  
  // MUST implement: Initialize player with fallback strategy
  async init() {
    try {
      await this.loadSpotifyEmbed();
    } catch (error) {
      console.warn('Spotify embed failed, using fallback player');
      await this.loadFallbackPlayer();
    }
  }
  
  // MUST implement: Spotify embed with error handling
  loadSpotifyEmbed() {
    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://open.spotify.com/embed/episode/${this.getSpotifyId()}`;
      iframe.width = '100%';
      iframe.height = '152';
      iframe.frameBorder = '0';
      iframe.allow = 'encrypted-media';
      
      iframe.onload = resolve;
      iframe.onerror = reject;
      
      this.container.appendChild(iframe);
    });
  }
  
  // MUST implement: Custom HTML5 audio fallback
  loadFallbackPlayer() {
    if (!this.props.audioUrl) {
      throw new Error('No fallback audio URL provided');
    }
    
    this.container.innerHTML = this.getFallbackTemplate();
    this.audio = this.container.querySelector('audio');
    this.bindAudioEvents();
  }
  
  // MUST implement: Keyboard navigation support
  bindAudioEvents() {
    this.container.addEventListener('keydown', (event) => {
      switch (event.key) {
        case ' ':
          event.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowLeft':
          this.seek(-10);
          break;
        case 'ArrowRight':
          this.seek(10);
          break;
      }
    });
  }
}
```

### TopicFilter Component

#### Interface
```javascript
interface TopicFilterProps {
  topics: Topic[];
  selectedTopics: string[];
  onFilterChange: (selectedTopics: string[]) => void;
  multiSelect?: boolean;
}
```

#### Behavior Contract
```javascript
class TopicFilter {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.selectedTopics = new Set(props.selectedTopics || []);
  }
  
  // MUST implement: Render filter UI with accessibility
  render() {
    this.container.innerHTML = `
      <div class="topic-filter" role="group" aria-label="Filter episodes by topic">
        <div class="filter-header">
          <h3>Filter by Topic</h3>
          <button class="clear-filters" ${this.selectedTopics.size === 0 ? 'disabled' : ''}>
            Clear All
          </button>
        </div>
        <div class="filter-options">
          ${this.props.topics.map(topic => this.getTopicCheckbox(topic)).join('')}
        </div>
      </div>
    `;
    
    this.bindEvents();
  }
  
  // MUST implement: Handle filter changes with debouncing
  handleFilterChange(topicId, checked) {
    if (checked) {
      if (!this.props.multiSelect) {
        this.selectedTopics.clear();
      }
      this.selectedTopics.add(topicId);
    } else {
      this.selectedTopics.delete(topicId);
    }
    
    // Debounce filter changes to avoid excessive API calls
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.props.onFilterChange(Array.from(this.selectedTopics));
    }, 300);
  }
  
  // MUST implement: Accessible checkbox with proper ARIA
  getTopicCheckbox(topic) {
    const isSelected = this.selectedTopics.has(topic.id);
    return `
      <label class="topic-option">
        <input type="checkbox" 
               value="${topic.id}"
               ${isSelected ? 'checked' : ''}
               aria-describedby="topic-${topic.id}-count">
        <span class="topic-name">${topic.name}</span>
        <span class="topic-count" id="topic-${topic.id}-count">
          ${topic.episodeCount} episodes
        </span>
      </label>
    `;
  }
}
```

### ThemeToggle Component

#### Interface
```javascript
interface ThemeToggleProps {
  initialTheme?: 'light' | 'dark' | 'auto';
  onThemeChange?: (theme: string) => void;
}
```

#### Behavior Contract
```javascript
class ThemeToggle {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.currentTheme = this.props.initialTheme || this.detectTheme();
  }
  
  // MUST implement: System preference detection
  detectTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' : 'light';
  }
  
  // MUST implement: Toggle with smooth transition
  toggle() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }
  
  // MUST implement: Theme application with transition
  setTheme(theme) {
    // Add transition class to prevent flash
    document.documentElement.classList.add('theme-transitioning');
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    this.currentTheme = theme;
    this.updateToggleUI();
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 200);
    
    if (this.props.onThemeChange) {
      this.props.onThemeChange(theme);
    }
  }
  
  // MUST implement: Accessible toggle button
  render() {
    this.container.innerHTML = `
      <button class="theme-toggle" 
              aria-label="Toggle ${this.currentTheme === 'dark' ? 'light' : 'dark'} mode"
              title="Switch to ${this.currentTheme === 'dark' ? 'light' : 'dark'} mode">
        <span class="theme-icon" aria-hidden="true">
          ${this.currentTheme === 'dark' ? '☀️' : '🌙'}
        </span>
      </button>
    `;
  }
}
```

## Form Component Contracts

### ContactForm Component

#### Interface
```javascript
interface ContactFormProps {
  formspreeId: string;
  onSubmitSuccess?: (response: any) => void;
  onSubmitError?: (error: Error) => void;
}
```

#### Behavior Contract
```javascript
class ContactForm {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.isSubmitting = false;
  }
  
  // MUST implement: Form validation
  validate(formData) {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!this.isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  }
  
  // MUST implement: Async form submission with error handling
  async handleSubmit(event) {
    event.preventDefault();
    
    if (this.isSubmitting) return;
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    const errors = this.validate(data);
    if (Object.keys(errors).length > 0) {
      this.showErrors(errors);
      return;
    }
    
    this.isSubmitting = true;
    this.showSubmitting();
    
    try {
      const response = await this.submitToFormspree(data);
      this.showSuccess();
      if (this.props.onSubmitSuccess) {
        this.props.onSubmitSuccess(response);
      }
    } catch (error) {
      this.showError(error.message);
      if (this.props.onSubmitError) {
        this.props.onSubmitError(error);
      }
    } finally {
      this.isSubmitting = false;
    }
  }
  
  // MUST implement: Accessible error display
  showErrors(errors) {
    Object.keys(errors).forEach(field => {
      const input = this.container.querySelector(`[name="${field}"]`);
      const errorElement = this.container.querySelector(`#${field}-error`);
      
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', `${field}-error`);
      errorElement.textContent = errors[field];
      errorElement.setAttribute('role', 'alert');
    });
  }
}
```

## Component Lifecycle Contracts

### Initialization Contract
```javascript
// All components MUST implement these lifecycle methods
interface ComponentLifecycle {
  constructor(container: HTMLElement, props: any): void;
  render(): void;
  bindEvents(): void;
  destroy(): void;
}

// Example implementation
class BaseComponent {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.eventListeners = [];
  }
  
  // MUST track event listeners for cleanup
  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  }
  
  // MUST implement cleanup to prevent memory leaks
  destroy() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
    
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
```

## Accessibility Requirements

### ARIA Support
- All interactive components MUST include appropriate ARIA labels
- Form validation errors MUST use `role="alert"`  
- Loading states MUST use `aria-live="polite"`
- Focus management MUST be handled for modal dialogs

### Keyboard Navigation
- All interactive elements MUST be keyboard accessible
- Tab order MUST be logical and consistent
- Escape key MUST close modals and overlays
- Arrow keys MUST navigate through lists and grids

### Screen Reader Support
- All images MUST have descriptive alt text
- Complex UI components MUST include ARIA descriptions
- Loading states and dynamic content changes MUST be announced