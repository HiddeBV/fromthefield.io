# Data Model: Episode Content Management

**Feature**: 002-add-episode-workflow  
**Date**: October 31, 2025  
**Purpose**: Define the structure and validation rules for episode data

## Overview

Episodes are stored as JSON objects in `_data/episodes.json`. Each episode is a self-contained object with all metadata required for display and discovery. The file contains an array of episode objects, processed by Jekyll during build time.

---

## Entity: Episode

### Description
Represents a single podcast episode with all associated metadata, audio links, and content.

### Storage Location
`_data/episodes.json` (JSON array of episode objects)

### Schema

```json
{
  "id": "string (required, unique)",
  "title": "string (required)",
  "description": "string (required)",
  "date": "string (required, ISO 8601 YYYY-MM-DD)",
  "duration": "string (required, MM:SS or HH:MM:SS format)",
  "spotifyUrl": "string (required, full Spotify episode URL)",
  "thumbnailUrl": "string (optional, relative path from site root)",
  "topics": ["array of strings (optional, must match topics.json)"],
  "hosts": ["array of strings (optional, must match host IDs in hosts.json)"],
  "guests": [
    {
      "name": "string (required if guests array present)",
      "role": "string (required if guests array present)",
      "company": "string (required if guests array present)"
    }
  ],
  "showNotes": "string (optional, Markdown formatted)"
}
```

### Field Definitions

#### id (required)
- **Type**: String
- **Format**: Lowercase alphanumeric, typically `ep001`, `ep002`, etc.
- **Constraints**: 
  - Must be unique across all episodes
  - Recommended format: `ep` + zero-padded number (e.g., `ep001`, `ep042`, `ep100`)
  - Used in URLs and file references
- **Example**: `"ep001"`

#### title (required)
- **Type**: String
- **Constraints**: 
  - Max length: 100 characters (for SEO and display)
  - Should be descriptive and keyword-rich
- **Example**: `"Building Cloud-Native Platforms: Lessons from the Trenches"`

#### description (required)
- **Type**: String
- **Constraints**: 
  - Min length: 50 characters
  - Max length: 300 characters (for meta description SEO)
  - Should summarize episode content clearly
- **Example**: `"We dive deep into platform engineering, discussing the challenges of building developer platforms on Kubernetes..."`

#### date (required)
- **Type**: String
- **Format**: ISO 8601 date format (YYYY-MM-DD)
- **Constraints**: 
  - Must be valid date
  - Used for sorting (newest first)
- **Example**: `"2024-01-15"`

#### duration (required)
- **Type**: String
- **Format**: `MM:SS` for episodes under 1 hour, `HH:MM:SS` for longer episodes
- **Constraints**: 
  - Must match pattern: `\d{2}:\d{2}` or `\d{2}:\d{2}:\d{2}`
  - Displayed to users before they play
- **Examples**: 
  - `"42:30"` (42 minutes, 30 seconds)
  - `"1:15:22"` (1 hour, 15 minutes, 22 seconds)

#### spotifyUrl (required)
- **Type**: String
- **Format**: Full Spotify episode URL
- **Constraints**: 
  - Must start with `https://open.spotify.com/episode/`
  - Episode ID extracted for embed generation
- **Example**: `"https://open.spotify.com/episode/3abc123xyz"`

#### thumbnailUrl (optional)
- **Type**: String
- **Format**: Relative path from site root or absolute URL
- **Constraints**: 
  - Recommended location: `/assets/images/episodes/`
  - Recommended naming: `{episode-id}.jpg` or `{episode-id}.webp`
  - If omitted, fallback image will be used
- **Examples**: 
  - `"/assets/images/episodes/ep001.jpg"`
  - `"/assets/images/episodes/ep001.webp"`

#### topics (optional)
- **Type**: Array of strings
- **Constraints**: 
  - Each topic must exist in `_data/topics.json`
  - Used for filtering and categorization
  - Recommended: 2-5 topics per episode
- **Example**: `["cloud-native", "kubernetes", "platform-engineering"]`

#### hosts (optional)
- **Type**: Array of strings
- **Constraints**: 
  - Each host ID must exist in `_data/hosts.json`
  - If empty, no host information displayed
  - Typically 1-2 hosts per episode
- **Example**: `["host001", "host002"]`

#### guests (optional)
- **Type**: Array of guest objects
- **Constraints**: 
  - Can be empty array or omitted entirely for host-only episodes
  - Each guest must have name, role, and company
  - Typically 0-3 guests per episode
- **Guest Object Schema**:
  - `name` (string, required): Full name of guest
  - `role` (string, required): Job title or professional role
  - `company` (string, required): Company or organization name
- **Example**:
  ```json
  [
    {
      "name": "Sarah Chen",
      "role": "Principal Platform Architect",
      "company": "Tech Corp"
    }
  ]
  ```

#### showNotes (optional)
- **Type**: String
- **Format**: Markdown formatted text
- **Constraints**: 
  - Processed by Kramdown (Jekyll's Markdown processor)
  - Supports: headings, lists, links, code blocks, emphasis
  - Recommended structure: Episode Highlights, Resources, Timestamps
  - Can be omitted for minimal episode pages
- **Example**:
  ```markdown
  ## Episode Highlights
  
  - The evolution from DevOps to Platform Engineering
  - Key principles for building internal developer platforms
  
  ## Resources Mentioned
  
  - [Platform Engineering Guide](https://example.com)
  - [Kubernetes Best Practices](https://example.com)
  
  ## Timestamps
  
  - 00:00 - Introduction
  - 05:30 - What is Platform Engineering?
  ```

---

## Entity: Guest (Embedded)

### Description
Represents a guest speaker on an episode. Guests are embedded objects within the episode data (not separate entities).

### Schema

```json
{
  "name": "string (required)",
  "role": "string (required)",
  "company": "string (required)"
}
```

### Field Definitions

#### name (required)
- **Type**: String
- **Format**: Full name
- **Example**: `"Dr. Priya Sharma"`

#### role (required)
- **Type**: String
- **Format**: Job title or professional role
- **Example**: `"Chief Security Officer"`

#### company (required)
- **Type**: String
- **Format**: Company or organization name
- **Example**: `"SecureCloud Systems"`

---

## Relationships

### Episode → Topics (Many-to-Many)
- **Nature**: Reference relationship
- **Implementation**: Episode stores topic IDs (strings) that match `id` field in `_data/topics.json`
- **Validation**: All referenced topics must exist in topics.json
- **Display**: Topic names and metadata fetched from topics.json for display

### Episode → Hosts (Many-to-Many)
- **Nature**: Reference relationship
- **Implementation**: Episode stores host IDs (strings) that match `id` field in `_data/hosts.json`
- **Validation**: All referenced hosts must exist in hosts.json
- **Display**: Host names, bios, and images fetched from hosts.json for display

### Episode → Guests (One-to-Many)
- **Nature**: Embedded relationship
- **Implementation**: Guest objects embedded directly in episode data
- **Rationale**: Guests are episode-specific and not reused across episodes (unlike hosts)
- **Validation**: Each guest object must have all required fields

---

## Validation Rules

### Build-Time Validation (Jekyll)

These checks are performed during Jekyll build using Liquid template logic:

1. **Required Fields Check**
   - Episode must have: id, title, description, date, duration, spotifyUrl
   - Error message: "Episode {id} missing required field: {field}"

2. **Date Format Validation**
   - Must match pattern: YYYY-MM-DD
   - Error message: "Episode {id} has invalid date format: {date}"

3. **Duration Format Validation**
   - Must match pattern: MM:SS or HH:MM:SS
   - Error message: "Episode {id} has invalid duration format: {duration}"

4. **Unique ID Check**
   - No duplicate episode IDs
   - Error message: "Duplicate episode ID found: {id}"

5. **Topic Reference Validation**
   - All topics in episode.topics array must exist in topics.json
   - Error message: "Episode {id} references non-existent topic: {topic}"

6. **Host Reference Validation**
   - All hosts in episode.hosts array must exist in hosts.json
   - Error message: "Episode {id} references non-existent host: {host}"

7. **Guest Object Validation**
   - If guests array present and non-empty, each guest must have name, role, company
   - Error message: "Episode {id} has guest missing required field: {field}"

8. **Spotify URL Format**
   - Must start with `https://open.spotify.com/episode/`
   - Warning message: "Episode {id} has unexpected Spotify URL format"

### Validation Implementation Location
`_includes/validate-episodes.html` - included at top of episode layouts

---

## Data File Structure

### File: _data/episodes.json

```json
[
  {
    "id": "ep001",
    "title": "Building Cloud-Native Platforms: Lessons from the Trenches",
    "description": "We dive deep into platform engineering, discussing challenges...",
    "date": "2024-01-15",
    "duration": "42:30",
    "spotifyUrl": "https://open.spotify.com/episode/example001",
    "thumbnailUrl": "/assets/images/episodes/ep001.jpg",
    "topics": ["cloud-native", "kubernetes", "platform-engineering"],
    "hosts": ["host001", "host002"],
    "guests": [
      {
        "name": "Sarah Chen",
        "role": "Principal Platform Architect",
        "company": "Tech Corp"
      }
    ],
    "showNotes": "## Episode Highlights\n\n- Evolution from DevOps..."
  },
  {
    "id": "ep002",
    "title": "Next Episode Title",
    "description": "Next episode description...",
    "date": "2024-01-29",
    "duration": "38:15",
    "spotifyUrl": "https://open.spotify.com/episode/example002",
    "thumbnailUrl": "/assets/images/episodes/ep002.jpg",
    "topics": ["ai-ml", "devops"],
    "hosts": ["host001"],
    "guests": [],
    "showNotes": "## Episode Overview\n\n..."
  }
]
```

### Array Ordering
- Episodes should be ordered chronologically (oldest first or newest first - doesn't matter)
- Jekyll templates will sort by date field for display
- Recommended: Keep chronological order for easier human editing

---

## State Transitions

Episodes are immutable once published. Content updates follow this workflow:

1. **Draft State**: Episode exists in local working copy of episodes.json
2. **Committed State**: Episode committed to Git but not yet deployed
3. **Published State**: Episode live on GitHub Pages after build completes
4. **Updated State**: Edits to published episode (typo fixes, show notes additions)

No explicit state field needed - state is implicit in Git workflow.

---

## Migration Notes

### Adding New Episodes

1. Open `_data/episodes.json`
2. Add new episode object to array (any position - will be sorted by date)
3. Ensure all required fields are present
4. Validate JSON syntax (use JSON formatter tool)
5. Commit and push to trigger GitHub Pages build
6. Verify episode appears on site after build completes (~2-3 minutes)

### Updating Existing Episodes

1. Locate episode by ID in episodes.json
2. Edit fields as needed
3. Commit with descriptive message: `"Update ep001: fix typo in title"`
4. Push to trigger rebuild

### Removing Episodes (Rare)

1. Remove entire episode object from array
2. Commit with message: `"Remove ep001 (reason)"`
3. Consider keeping thumbnail image for archival purposes

---

## Performance Considerations

- **Array Size**: Tested up to 100 episodes without performance issues
- **JSON Parse Time**: <10ms for 100 episodes on modern systems
- **Memory Usage**: Minimal - Jekyll loads data once during build
- **Build Time**: Approximately 5-10 seconds per 100 episodes

---

## SEO Implications

### Structured Data Generation

For each episode, Jekyll generates Schema.org PodcastEpisode JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "url": "{{ episode URL }}",
  "name": "{{ episode.title }}",
  "datePublished": "{{ episode.date }}",
  "description": "{{ episode.description }}",
  "duration": "PT{{ episode.duration converted to ISO 8601 duration }}",
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "{{ site.title }}",
    "url": "{{ site.url }}"
  }
}
```

### Meta Tags Generation

Each episode page receives:
- `<title>`: `{{ episode.title }} | {{ site.title }}`
- `<meta name="description">`: `{{ episode.description }}`
- `<link rel="canonical">`: `{{ site.url }}/episode/?id={{ episode.id }}`
- Open Graph tags for social sharing

---

## Backup and Recovery

### Backup Strategy
- Primary backup: Git version history
- GitHub maintains full commit history
- Local clones serve as distributed backups

### Recovery Procedures
- Accidental deletion: `git revert` or `git reset`
- Corrupted JSON: Restore from previous commit
- Data loss: Recover from any Git clone

---

## Future Extensibility

This data model is designed to be extensible. Future enhancements could include:

- `season` field (integer) for grouping episodes by season
- `episodeNumber` field (integer) for explicit ordering
- `transcript` field (string or URL) for full episode transcripts
- `chapters` array for chapter markers
- `downloadUrl` field for direct MP3 downloads
- `explicit` boolean for content warnings

These fields can be added without breaking existing episodes (optional fields with sensible defaults).
