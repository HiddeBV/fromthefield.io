/**
 * Episodes Page JavaScript
 * Handles filtering, search, and pagination for the episodes listing page
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    episodesPerPage: 12,
    searchDebounceMs: 300
  };

  // State
  let allEpisodes = [];
  let filteredEpisodes = [];
  let visibleCount = CONFIG.episodesPerPage;
  let activeTopicFilters = new Set();
  let searchQuery = '';
  let searchTimeout = null;

  // DOM Elements
  const elements = {
    grid: document.getElementById('episodesGrid'),
    emptyState: document.getElementById('emptyState'),
    loadMoreContainer: document.getElementById('loadMoreContainer'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    searchInput: document.getElementById('episodeSearch'),
    clearSearchBtn: document.getElementById('clearSearch'),
    clearFiltersBtn: document.getElementById('clearFilters'),
    resetFiltersBtn: document.getElementById('resetFilters'),
    topicCheckboxes: document.querySelectorAll('.topic-checkbox'),
    filterSummary: document.getElementById('filterSummary'),
    activeFilterCount: document.getElementById('activeFilterCount'),
    resultsCount: document.getElementById('resultsCount'),
    visibleCountEl: document.getElementById('visibleCount'),
    totalCountEl: document.getElementById('totalCount'),
    toggleFiltersBtn: document.getElementById('toggleFilters'),
    filterSidebar: document.getElementById('filterSidebar')
  };

  /**
   * Initialize the episodes page
   */
  function init() {
    // Load episodes from DOM
    loadEpisodesFromDOM();

    // Initialize filters from URL
    initFiltersFromURL();

    // Set up event listeners
    setupEventListeners();

    // Initial filter application
    applyFilters();
  }

  /**
   * Load episodes data from DOM cards
   */
  function loadEpisodesFromDOM() {
    const episodeCards = document.querySelectorAll('.episode-card');
    allEpisodes = Array.from(episodeCards).map(card => ({
      element: card,
      id: card.dataset.episodeId,
      topics: card.dataset.topics ? card.dataset.topics.split(',') : [],
      title: card.querySelector('.episode-card-title')?.textContent || '',
      description: card.querySelector('.episode-card-description')?.textContent || ''
    }));
    filteredEpisodes = [...allEpisodes];
  }

  /**
   * Initialize filters from URL parameters
   */
  function initFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Load topic filters
    const topics = urlParams.get('topics');
    if (topics) {
      topics.split(',').forEach(topic => {
        activeTopicFilters.add(topic);
        const checkbox = document.querySelector(`input[value="${topic}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }

    // Load search query
    const search = urlParams.get('search');
    if (search) {
      searchQuery = search;
      elements.searchInput.value = search;
      elements.clearSearchBtn.style.display = 'flex';
    }
  }

  /**
   * Set up event listeners
   */
  function setupEventListeners() {
    // Topic filter checkboxes
    elements.topicCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleTopicFilterChange);
    });

    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', handleSearchInput);
      elements.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          clearSearch();
        }
      });
    }

    // Clear search button
    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener('click', clearSearch);
    }

    // Clear filters button
    if (elements.clearFiltersBtn) {
      elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Reset filters button (in empty state)
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Load more button
    if (elements.loadMoreBtn) {
      elements.loadMoreBtn.addEventListener('click', loadMoreEpisodes);
    }

    // Mobile filter toggle
    if (elements.toggleFiltersBtn) {
      elements.toggleFiltersBtn.addEventListener('click', toggleMobileFilters);
    }

    // Close mobile filters on outside click
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 768) {
        const isFilterClick = elements.filterSidebar?.contains(e.target);
        const isToggleClick = elements.toggleFiltersBtn?.contains(e.target);
        
        if (!isFilterClick && !isToggleClick && elements.filterSidebar?.classList.contains('is-open')) {
          closeMobileFilters();
        }
      }
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
  }

  /**
   * Handle topic filter checkbox change
   */
  function handleTopicFilterChange(e) {
    const topicId = e.target.value;
    
    if (e.target.checked) {
      activeTopicFilters.add(topicId);
    } else {
      activeTopicFilters.delete(topicId);
    }

    // Reset visible count when filters change
    visibleCount = CONFIG.episodesPerPage;
    
    applyFilters();
    updateURL();
  }

  /**
   * Handle search input with debounce
   */
  function handleSearchInput(e) {
    const value = e.target.value.trim();

    // Show/hide clear button
    elements.clearSearchBtn.style.display = value ? 'flex' : 'none';

    // Debounce search
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = value.toLowerCase();
      visibleCount = CONFIG.episodesPerPage;
      applyFilters();
      updateURL();
    }, CONFIG.searchDebounceMs);
  }

  /**
   * Clear search input and filters
   */
  function clearSearch() {
    searchQuery = '';
    elements.searchInput.value = '';
    elements.clearSearchBtn.style.display = 'none';
    visibleCount = CONFIG.episodesPerPage;
    applyFilters();
    updateURL();
    elements.searchInput.focus();
  }

  /**
   * Clear all active filters
   */
  function clearAllFilters() {
    // Clear topic filters
    activeTopicFilters.clear();
    elements.topicCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    // Clear search
    clearSearch();

    // Reset visible count
    visibleCount = CONFIG.episodesPerPage;

    applyFilters();
    updateURL();
  }

  /**
   * Apply filters and search to episodes
   */
  function applyFilters() {
    // Start with all episodes
    filteredEpisodes = allEpisodes.filter(episode => {
      // Apply topic filters (OR logic - match any selected topic)
      const topicMatch = activeTopicFilters.size === 0 || 
        episode.topics.some(topic => activeTopicFilters.has(topic));

      // Apply search filter (AND logic with topic filter)
      const searchMatch = !searchQuery || 
        episode.title.toLowerCase().includes(searchQuery) ||
        episode.description.toLowerCase().includes(searchQuery);

      return topicMatch && searchMatch;
    });

    updateDisplay();
    updateFilterSummary();
  }

  /**
   * Update the display of episodes
   */
  function updateDisplay() {
    // Hide all episodes first
    allEpisodes.forEach(episode => {
      episode.element.style.display = 'none';
    });

    // Show filtered episodes up to visibleCount
    const episodesToShow = filteredEpisodes.slice(0, visibleCount);
    episodesToShow.forEach(episode => {
      episode.element.style.display = 'block';
    });

    // Update counts
    const visibleEpisodesCount = episodesToShow.length;
    const totalFilteredCount = filteredEpisodes.length;

    elements.visibleCountEl.textContent = visibleEpisodesCount;
    elements.totalCountEl.textContent = totalFilteredCount;

    // Show/hide empty state
    if (filteredEpisodes.length === 0) {
      elements.grid.style.display = 'none';
      elements.emptyState.style.display = 'flex';
      elements.loadMoreContainer.style.display = 'none';
    } else {
      elements.grid.style.display = 'grid';
      elements.emptyState.style.display = 'none';

      // Show/hide load more button
      if (visibleEpisodesCount < totalFilteredCount) {
        elements.loadMoreContainer.style.display = 'block';
        elements.loadMoreBtn.textContent = `Load More Episodes (${totalFilteredCount - visibleEpisodesCount} remaining)`;
      } else {
        elements.loadMoreContainer.style.display = 'none';
      }
    }

    // Announce to screen readers
    announceResults(visibleEpisodesCount, totalFilteredCount);
  }

  /**
   * Update filter summary
   */
  function updateFilterSummary() {
    const activeFiltersCount = activeTopicFilters.size + (searchQuery ? 1 : 0);

    if (activeFiltersCount > 0) {
      elements.filterSummary.style.display = 'block';
      elements.activeFilterCount.textContent = activeFiltersCount;
    } else {
      elements.filterSummary.style.display = 'none';
    }
  }

  /**
   * Load more episodes
   */
  function loadMoreEpisodes() {
    visibleCount += CONFIG.episodesPerPage;
    updateDisplay();

    // Scroll to first newly visible episode
    const firstNewEpisode = filteredEpisodes[visibleCount - CONFIG.episodesPerPage]?.element;
    if (firstNewEpisode) {
      firstNewEpisode.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /**
   * Toggle mobile filters
   */
  function toggleMobileFilters() {
    const isOpen = elements.filterSidebar.classList.toggle('is-open');
    elements.toggleFiltersBtn.setAttribute('aria-expanded', isOpen);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Close mobile filters
   */
  function closeMobileFilters() {
    elements.filterSidebar.classList.remove('is-open');
    elements.toggleFiltersBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    if (window.innerWidth >= 768) {
      closeMobileFilters();
    }
  }

  /**
   * Update URL with current filter state
   */
  function updateURL() {
    const params = new URLSearchParams();

    // Add topic filters
    if (activeTopicFilters.size > 0) {
      params.set('topics', Array.from(activeTopicFilters).join(','));
    }

    // Add search query
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    // Update URL without page reload
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newURL);
  }

  /**
   * Announce results to screen readers
   */
  function announceResults(visible, total) {
    const message = visible === 0 
      ? 'No episodes found matching your filters'
      : `Showing ${visible} of ${total} episodes`;
    
    // Results count element already has aria-live="polite"
    elements.resultsCount.setAttribute('aria-label', message);
  }

  // Initialize on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
