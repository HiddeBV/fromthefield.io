/**
 * Episode Detail Page JavaScript
 * Handles loading and displaying individual episode data
 */

(function() {
  'use strict';

  // Episodes data (injected from Jekyll)
  const EPISODES_DATA = {{ site.data.episodes | jsonify }};
  const TOPICS_DATA = {{ site.data.topics | jsonify }};
  const HOSTS_DATA = {{ site.data.hosts | jsonify }};

  // DOM Elements
  const elements = {
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    episodeDetail: document.getElementById('episodeDetail'),
    episodeDate: document.getElementById('episodeDate'),
    episodeDuration: document.getElementById('episodeDuration'),
    episodeTitle: document.getElementById('episodeTitle'),
    episodeDescription: document.getElementById('episodeDescription'),
    episodeTopics: document.getElementById('episodeTopics'),
    episodeImage: document.getElementById('episodeImage'),
    episodePlayer: document.getElementById('episodePlayer'),
    showNotesContent: document.getElementById('showNotesContent'),
    episodeHostsSection: document.getElementById('episodeHostsSection'),
    episodeHosts: document.getElementById('episodeHosts'),
    episodeGuestsSection: document.getElementById('episodeGuestsSection'),
    episodeGuests: document.getElementById('episodeGuests'),
    relatedEpisodesSection: document.getElementById('relatedEpisodesSection'),
    relatedEpisodesGrid: document.getElementById('relatedEpisodesGrid'),
    prevEpisode: document.getElementById('prevEpisode'),
    nextEpisode: document.getElementById('nextEpisode'),
    prevEpisodeTitle: document.getElementById('prevEpisodeTitle'),
    nextEpisodeTitle: document.getElementById('nextEpisodeTitle')
  };

  /**
   * Initialize the episode detail page
   */
  function init() {
    // Get episode ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = urlParams.get('id');

    if (!episodeId) {
      showError();
      return;
    }

    // Find episode
    const episode = getEpisodeById(episodeId);
    
    if (!episode) {
      showError();
      return;
    }

    // Load episode data
    loadEpisode(episode);
  }

  /**
   * Get episode by ID
   */
  function getEpisodeById(id) {
    return EPISODES_DATA.find(ep => ep.id === id);
  }

  /**
   * Load and display episode
   */
  function loadEpisode(episode) {
    try {
      // Hide loading, show content
      elements.loadingState.style.display = 'none';
      elements.episodeDetail.style.display = 'block';

      // Update page title
      document.title = `${episode.title} - From The Field`;

      // Load episode header
      loadEpisodeHeader(episode);

      // Load audio player
      loadAudioPlayer(episode);

      // Load show notes
      loadShowNotes(episode);

      // Load hosts
      loadHosts(episode);

      // Load guests
      loadGuests(episode);

      // Load related episodes
      loadRelatedEpisodes(episode);

      // Load episode navigation
      loadEpisodeNavigation(episode);

    } catch (error) {
      console.error('Error loading episode:', error);
      showError();
    }
  }

  /**
   * Load episode header
   */
  function loadEpisodeHeader(episode) {
    // Date
    elements.episodeDate.setAttribute('datetime', episode.date);
    elements.episodeDate.textContent = formatDate(episode.date);

    // Duration
    elements.episodeDuration.textContent = episode.duration;

    // Title
    elements.episodeTitle.textContent = episode.title;

    // Description
    elements.episodeDescription.textContent = episode.description;

    // Topics
    elements.episodeTopics.innerHTML = '';
    episode.topics.forEach(topicId => {
      const topic = TOPICS_DATA.find(t => t.id === topicId);
      if (topic) {
        const tag = document.createElement('a');
        tag.href = `/episodes.html?topics=${topicId}`;
        tag.className = 'topic-tag';
        tag.style.backgroundColor = topic.color;
        tag.textContent = topic.name;
        elements.episodeTopics.appendChild(tag);
      }
    });

    // Image
    if (episode.thumbnailUrl) {
      elements.episodeImage.src = episode.thumbnailUrl;
      elements.episodeImage.alt = episode.title;
    }
  }

  /**
   * Load audio player
   */
  function loadAudioPlayer(episode) {
    if (episode.spotifyUrl) {
      // Convert Spotify URL to embed URL
      const embedUrl = episode.spotifyUrl.replace(
        'open.spotify.com/episode/',
        'open.spotify.com/embed/episode/'
      );

      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.width = '100%';
      iframe.height = '152';
      iframe.frameBorder = '0';
      iframe.allowTransparency = 'true';
      iframe.allow = 'encrypted-media';
      iframe.loading = 'eager';
      iframe.title = `Spotify player for ${episode.title}`;

      elements.episodePlayer.innerHTML = '';
      elements.episodePlayer.appendChild(iframe);
    } else {
      // Fallback message
      elements.episodePlayer.innerHTML = `
        <div class="player-fallback">
          <p>Audio player not available for this episode.</p>
        </div>
      `;
    }
  }

  /**
   * Load show notes
   */
  function loadShowNotes(episode) {
    if (episode.showNotes) {
      // Simple markdown to HTML conversion
      const html = markdownToHTML(episode.showNotes);
      elements.showNotesContent.innerHTML = html;
    } else {
      elements.showNotesContent.innerHTML = '<p>Show notes not available for this episode.</p>';
    }
  }

  /**
   * Load hosts
   */
  function loadHosts(episode) {
    if (episode.hosts && episode.hosts.length > 0) {
      elements.episodeHosts.innerHTML = '';
      
      episode.hosts.forEach(hostId => {
        const host = HOSTS_DATA.find(h => h.id === hostId);
        if (host) {
          const hostCard = createHostCard(host);
          elements.episodeHosts.appendChild(hostCard);
        }
      });

      elements.episodeHostsSection.style.display = 'block';
    } else {
      elements.episodeHostsSection.style.display = 'none';
    }
  }

  /**
   * Load guests
   */
  function loadGuests(episode) {
    if (episode.guests && episode.guests.length > 0) {
      elements.episodeGuests.innerHTML = '';
      
      episode.guests.forEach(guest => {
        const guestCard = createGuestCard(guest);
        elements.episodeGuests.appendChild(guestCard);
      });

      elements.episodeGuestsSection.style.display = 'block';
    } else {
      elements.episodeGuestsSection.style.display = 'none';
    }
  }

  /**
   * Load related episodes
   */
  function loadRelatedEpisodes(episode) {
    // Find episodes with matching topics
    const relatedEpisodes = EPISODES_DATA
      .filter(ep => ep.id !== episode.id) // Exclude current episode
      .filter(ep => ep.topics.some(topic => episode.topics.includes(topic)))
      .slice(0, 3); // Limit to 3

    if (relatedEpisodes.length > 0) {
      elements.relatedEpisodesGrid.innerHTML = '';
      
      relatedEpisodes.forEach(ep => {
        const card = createRelatedEpisodeCard(ep);
        elements.relatedEpisodesGrid.appendChild(card);
      });

      elements.relatedEpisodesSection.style.display = 'block';
    } else {
      elements.relatedEpisodesSection.style.display = 'none';
    }
  }

  /**
   * Load episode navigation (prev/next)
   */
  function loadEpisodeNavigation(episode) {
    // Sort episodes by date
    const sortedEpisodes = [...EPISODES_DATA].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    const currentIndex = sortedEpisodes.findIndex(ep => ep.id === episode.id);

    // Previous episode (newer)
    if (currentIndex > 0) {
      const prevEp = sortedEpisodes[currentIndex - 1];
      elements.prevEpisode.href = `/episode.html?id=${prevEp.id}`;
      elements.prevEpisodeTitle.textContent = prevEp.title;
      elements.prevEpisode.style.display = 'flex';
    }

    // Next episode (older)
    if (currentIndex < sortedEpisodes.length - 1) {
      const nextEp = sortedEpisodes[currentIndex + 1];
      elements.nextEpisode.href = `/episode.html?id=${nextEp.id}`;
      elements.nextEpisodeTitle.textContent = nextEp.title;
      elements.nextEpisode.style.display = 'flex';
    }
  }

  /**
   * Create host card
   */
  function createHostCard(host) {
    const card = document.createElement('div');
    card.className = 'host-card';
    
    card.innerHTML = `
      <a href="/about.html#${host.id}" class="host-link">
        <div class="host-info">
          <div class="host-name">${host.name}</div>
          <div class="host-role">${host.role}</div>
        </div>
      </a>
    `;
    
    return card;
  }

  /**
   * Create guest card
   */
  function createGuestCard(guest) {
    const card = document.createElement('div');
    card.className = 'guest-card';
    
    card.innerHTML = `
      <div class="guest-info">
        <div class="guest-name">${guest.name}</div>
        <div class="guest-role">${guest.role}</div>
        ${guest.company ? `<div class="guest-company">${guest.company}</div>` : ''}
      </div>
    `;
    
    return card;
  }

  /**
   * Create related episode card
   */
  function createRelatedEpisodeCard(episode) {
    const card = document.createElement('article');
    card.className = 'related-episode-card';
    
    // Find first matching topic
    const topicId = episode.topics[0];
    const topic = TOPICS_DATA.find(t => t.id === topicId);
    
    card.innerHTML = `
      <a href="/episode.html?id=${episode.id}" class="related-episode-link">
        <div class="related-episode-content">
          <div class="episode-meta">
            <time datetime="${episode.date}">${formatDate(episode.date)}</time>
            <span class="meta-separator">•</span>
            <span>${episode.duration}</span>
          </div>
          <h3 class="related-episode-title">${episode.title}</h3>
          ${topic ? `<span class="topic-tag" style="background-color: ${topic.color};">${topic.name}</span>` : ''}
        </div>
      </a>
    `;
    
    return card;
  }

  /**
   * Format date
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  /**
   * Simple markdown to HTML converter
   */
  function markdownToHTML(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraphs if not already wrapped
    if (!html.startsWith('<h') && !html.startsWith('<p')) {
      html = '<p>' + html + '</p>';
    }

    return html;
  }

  /**
   * Show error state
   */
  function showError() {
    elements.loadingState.style.display = 'none';
    elements.errorState.style.display = 'flex';
  }

  // Initialize on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
