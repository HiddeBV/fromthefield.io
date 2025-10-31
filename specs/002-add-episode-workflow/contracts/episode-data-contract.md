# Episode Data Contract

**Version**: 1.0.0  
**Date**: October 31, 2025  
**Feature**: 002-add-episode-workflow

## Purpose

This contract defines the structure and validation rules for episode data in the From The Field podcast website. It serves as the authoritative reference for:
- Content managers adding new episodes
- Developers updating Jekyll templates
- Validation logic in template includes

## Contract Stability

This is a **STABLE** contract. Breaking changes require:
1. Major version bump (1.x.x → 2.0.0)
2. Migration guide for existing episodes
3. Backward compatibility period

## Data Location

**File**: `_data/episodes.json`  
**Format**: JSON array of episode objects  
**Access**: `site.data.episodes` (Jekyll Liquid)

---

## Episode Object Schema

### JSON Schema (Informal)

```typescript
interface Episode {
  // Required fields
  id: string;              // Unique identifier, format: "ep001", "ep002", etc.
  title: string;           // Episode title, max 100 chars
  description: string;     // Episode description, 50-300 chars
  date: string;            // Publication date, format: "YYYY-MM-DD"
  duration: string;        // Episode length, format: "MM:SS" or "HH:MM:SS"
  spotifyUrl: string;      // Full Spotify episode URL
  
  // Optional fields
  thumbnailUrl?: string;   // Relative path to thumbnail image
  topics?: string[];       // Array of topic IDs (must exist in topics.json)
  hosts?: string[];        // Array of host IDs (must exist in hosts.json)
  guests?: Guest[];        // Array of guest objects
  showNotes?: string;      // Markdown formatted show notes
}

interface Guest {
  name: string;            // Guest full name
  role: string;            // Professional title
  company: string;         // Company or organization
}
```

### Example: Minimal Episode

```json
{
  "id": "ep006",
  "title": "Kubernetes Security Best Practices",
  "description": "A deep dive into securing Kubernetes clusters in production environments.",
  "date": "2024-03-25",
  "duration": "45:00",
  "spotifyUrl": "https://open.spotify.com/episode/abc123xyz"
}
```

### Example: Full Episode with All Fields

```json
{
  "id": "ep007",
  "title": "Platform Engineering: Building Developer Platforms",
  "description": "Exploring how to build effective internal developer platforms that accelerate software delivery.",
  "date": "2024-04-08",
  "duration": "52:30",
  "spotifyUrl": "https://open.spotify.com/episode/def456uvw",
  "thumbnailUrl": "/assets/images/episodes/ep007.webp",
  "topics": ["platform-engineering", "devops", "cloud-native"],
  "hosts": ["host001", "host002"],
  "guests": [
    {
      "name": "Jamie Rodriguez",
      "role": "VP of Engineering",
      "company": "Platform Inc"
    },
    {
      "name": "Alex Kim",
      "role": "Staff Engineer",
      "company": "Cloud Systems"
    }
  ],
  "showNotes": "## Episode Overview\n\nIn this episode, we explore...\n\n## Key Topics\n\n- Platform as a product\n- Developer experience metrics\n- Golden paths and paved roads\n\n## Resources\n\n- [Platform Engineering Blog](https://example.com)\n- [Internal Developer Platforms](https://example.com)\n\n## Timestamps\n\n- 00:00 - Introduction\n- 05:30 - What is Platform Engineering?\n- 15:00 - Building Your First Platform\n- 35:00 - Measuring Success\n- 48:00 - Q&A"
}
```

---

## Field Specifications

### id (required)

**Type**: String  
**Purpose**: Unique identifier for the episode  
**Format**: Lowercase letters and numbers, typically `ep` + zero-padded number  
**Pattern**: `^ep\d{3,}$` (recommended but not enforced)  
**Constraints**:
- Must be unique across all episodes
- Cannot be changed after publication (used in URLs)
- Case-sensitive

**Valid Examples**:
- `"ep001"`
- `"ep042"`
- `"ep100"`
- `"ep001-special"` (acceptable for special episodes)

**Invalid Examples**:
- `"EP001"` (uppercase)
- `"episode-1"` (inconsistent format)
- `""` (empty)

---

### title (required)

**Type**: String  
**Purpose**: Episode title displayed in lists and detail pages  
**Constraints**:
- Min length: 10 characters (recommended)
- Max length: 100 characters (for optimal SEO)
- Should be descriptive and keyword-rich
- Avoid special HTML characters that need escaping

**Valid Examples**:
- `"Building Cloud-Native Platforms: Lessons from the Trenches"`
- `"The Future of DevOps in 2024"`
- `"Career Advice: From Developer to CTO"`

**Invalid Examples**:
- `""` (empty)
- `"Ep1"` (too short, not descriptive)
- Title with 150+ characters (too long for SEO)

---

### description (required)

**Type**: String  
**Purpose**: Episode summary used for meta descriptions and episode cards  
**Constraints**:
- Min length: 50 characters
- Max length: 300 characters (optimal for meta description: 150-160)
- Should accurately summarize episode content
- Written for search engine snippets and social sharing

**Valid Examples**:
- `"We dive deep into platform engineering, discussing the challenges of building developer platforms on Kubernetes, the importance of golden paths, and how to balance standardization with team autonomy."`

**Invalid Examples**:
- `"Good episode"` (too short, not descriptive)
- Description exceeding 300 characters (truncated in many contexts)

---

### date (required)

**Type**: String  
**Purpose**: Episode publication date, used for sorting and display  
**Format**: ISO 8601 date format  
**Pattern**: `^\d{4}-\d{2}-\d{2}$` (YYYY-MM-DD)  
**Constraints**:
- Must be a valid calendar date
- Used for chronological sorting (newest first on site)
- Timezone: Assume EST/EDT (as configured in _config.yml)

**Valid Examples**:
- `"2024-01-15"`
- `"2024-12-31"`
- `"2025-03-01"`

**Invalid Examples**:
- `"2024-13-01"` (invalid month)
- `"2024-02-30"` (invalid date)
- `"01/15/2024"` (wrong format)
- `"2024-1-5"` (missing zero-padding)

---

### duration (required)

**Type**: String  
**Purpose**: Episode length displayed to users  
**Format**: `MM:SS` (under 1 hour) or `HH:MM:SS` (1+ hours)  
**Pattern**: `^\d{1,2}:\d{2}(:\d{2})?$`  
**Constraints**:
- Minutes and seconds must be zero-padded (e.g., `05:08`, not `5:8`)
- Seconds must be 00-59
- Display only, not used for calculations

**Valid Examples**:
- `"42:30"` (42 minutes, 30 seconds)
- `"5:08"` (5 minutes, 8 seconds)
- `"1:15:22"` (1 hour, 15 minutes, 22 seconds)
- `"2:03:45"` (2 hours, 3 minutes, 45 seconds)

**Invalid Examples**:
- `"42"` (missing seconds)
- `"42:5"` (seconds not zero-padded)
- `"90:00"` (should be `"1:30:00"`)

---

### spotifyUrl (required)

**Type**: String  
**Purpose**: Link to episode on Spotify, used for embed generation  
**Format**: Full Spotify episode URL  
**Pattern**: `^https://open\.spotify\.com/episode/[a-zA-Z0-9]+.*$`  
**Constraints**:
- Must be valid Spotify episode URL
- Episode ID extracted for iframe embed
- Query parameters allowed but ignored

**Valid Examples**:
- `"https://open.spotify.com/episode/3abc123xyz"`
- `"https://open.spotify.com/episode/7UVEFJhNqgkXbEGJ7jqKXm?si=abc123"`

**Invalid Examples**:
- `"spotify:episode:3abc123xyz"` (Spotify URI, not URL)
- `"https://spotify.com/episode/abc"` (wrong domain)
- `"https://open.spotify.com/show/abc"` (show URL, not episode)

**Embed Transformation**:
```
Input:  https://open.spotify.com/episode/3abc123xyz?si=...
Extract: 3abc123xyz
Output: https://open.spotify.com/embed/episode/3abc123xyz
```

---

### thumbnailUrl (optional)

**Type**: String  
**Purpose**: Path to episode thumbnail image  
**Format**: Relative path from site root or absolute URL  
**Constraints**:
- If omitted, fallback image used
- Recommended location: `/assets/images/episodes/`
- Recommended format: WebP with JPEG fallback
- Recommended dimensions: 800×800px (square)
- Recommended file size: <150KB

**Valid Examples**:
- `"/assets/images/episodes/ep001.jpg"`
- `"/assets/images/episodes/ep001.webp"`
- `"https://cdn.example.com/episode-001.jpg"` (external CDN)

**Invalid Examples**:
- `"assets/images/ep001.jpg"` (missing leading slash for relative path)
- `"C:/images/ep001.jpg"` (local file path)

**Fallback Behavior**:
- If field omitted: Use site default episode thumbnail
- If URL returns 404: Fall back to default thumbnail
- Default defined in: `_includes/episode-card.html`

---

### topics (optional)

**Type**: Array of strings  
**Purpose**: Categorize episode for filtering and discovery  
**Constraints**:
- Each string must be a valid topic ID from `_data/topics.json`
- Recommended: 2-5 topics per episode
- Order not significant (displayed alphabetically)
- Empty array allowed

**Valid Examples**:
- `["cloud-native", "kubernetes", "devops"]`
- `["consulting-life"]`
- `[]` (no topics)
- Field omitted entirely (treated as empty)

**Invalid Examples**:
- `["Cloud Native"]` (topic ID must be slug, not display name)
- `["nonexistent-topic"]` (topic not in topics.json)

**Validation**:
```liquid
{% for topic_id in episode.topics %}
  {% assign topic_exists = false %}
  {% for topic in site.data.topics %}
    {% if topic.id == topic_id %}
      {% assign topic_exists = true %}
    {% endif %}
  {% endfor %}
  {% unless topic_exists %}
    ERROR: Episode {{ episode.id }} references invalid topic: {{ topic_id }}
  {% endunless %}
{% endfor %}
```

---

### hosts (optional)

**Type**: Array of strings  
**Purpose**: Link episode to host profiles  
**Constraints**:
- Each string must be a valid host ID from `_data/hosts.json`
- Typically 1-2 hosts per episode
- Empty array or omitted field: no host information displayed
- Order determines display order

**Valid Examples**:
- `["host001"]`
- `["host001", "host002"]`
- `[]` (no hosts shown)
- Field omitted entirely

**Invalid Examples**:
- `["John Doe"]` (must be host ID, not name)
- `["nonexistent"]` (host not in hosts.json)

**Validation**: Similar to topics validation against hosts.json

---

### guests (optional)

**Type**: Array of guest objects  
**Purpose**: Display guest information on episode page  
**Constraints**:
- Each object must have: name, role, company (all required)
- Typical: 0-3 guests per episode
- Empty array or omitted: no guest section displayed

**Guest Object Schema**:
```typescript
{
  name: string;      // Full name, 2-50 characters
  role: string;      // Job title, 2-100 characters
  company: string;   // Company name, 2-100 characters
}
```

**Valid Examples**:
```json
[
  {
    "name": "Dr. Sarah Chen",
    "role": "Principal Cloud Architect",
    "company": "Tech Innovations Inc"
  },
  {
    "name": "Marcus Williams",
    "role": "VP of Engineering",
    "company": "StartupXYZ"
  }
]
```

**Invalid Examples**:
```json
[
  {
    "name": "Sarah Chen"
    // ERROR: missing role and company
  }
]
```

**Empty/Omitted**:
```json
"guests": []  // Valid: no guests
// or
// "guests" field omitted entirely
```

---

### showNotes (optional)

**Type**: String  
**Purpose**: Detailed episode notes in Markdown format  
**Format**: Kramdown-compatible Markdown  
**Constraints**:
- Must be valid Markdown
- Processed by Kramdown (Jekyll's Markdown engine)
- Newlines must be escaped in JSON: `\n`
- Can be omitted for minimal episode pages

**Supported Markdown Features**:
- Headings: `##`, `###`, `####`
- Lists: unordered (`-`, `*`) and ordered (`1.`, `2.`)
- Links: `[text](url)`
- Emphasis: `*italic*`, `**bold**`
- Code: `` `inline` `` and ``` code blocks ```
- Blockquotes: `> quote`

**Recommended Structure**:
```markdown
## Episode Overview

[Brief summary]

## Key Topics

- Topic 1
- Topic 2

## Resources Mentioned

- [Link Title](URL)

## Timestamps

- 00:00 - Introduction
- 05:30 - Topic 1
```

**Valid Example**:
```json
"showNotes": "## Episode Highlights\n\n- The evolution from DevOps to Platform Engineering\n- Key principles for building internal developer platforms\n\n## Resources Mentioned\n\n- [Platform Engineering Guide](https://example.com)\n\n## Timestamps\n\n- 00:00 - Introduction\n- 05:30 - What is Platform Engineering?"
```

**Invalid Examples**:
- Unescaped quotes within show notes
- Invalid Markdown syntax that breaks Kramdown parser
- HTML script tags (filtered for security)

---

## Validation Rules

### Critical Validations (Build Fails)

1. **Required Fields Present**
   - All episodes must have: id, title, description, date, duration, spotifyUrl
   - Build fails if any required field missing

2. **Unique Episode IDs**
   - No two episodes can share the same ID
   - Build fails on duplicate

3. **Valid Date Format**
   - Date must match YYYY-MM-DD pattern
   - Build fails on invalid format

4. **Valid Duration Format**
   - Duration must match MM:SS or HH:MM:SS pattern
   - Build fails on invalid format

### Warning Validations (Build Succeeds)

5. **Topic References**
   - Warn if episode references non-existent topic
   - Episode still displays, but topic tag may not work

6. **Host References**
   - Warn if episode references non-existent host
   - Episode still displays, but host info missing

7. **Guest Object Completeness**
   - Warn if guest object missing name, role, or company
   - Guest section may display incorrectly

8. **Thumbnail URL Accessibility**
   - Warn if thumbnail URL doesn't exist (checked at build time if possible)
   - Fallback image used

### Validation Implementation

Validation logic located in: `_includes/validate-episodes.html`

Include at top of episode layouts:
```liquid
{% include validate-episodes.html %}
```

---

## Backward Compatibility

### Adding New Fields

New optional fields can be added without breaking existing episodes:
- Add field to schema documentation
- Provide default value for missing field
- Update templates to handle field presence check

Example:
```liquid
{% if episode.newField %}
  {{ episode.newField }}
{% else %}
  [default value or omit section]
{% endif %}
```

### Deprecating Fields

To deprecate a field:
1. Announce in changelog
2. Continue supporting for 6 months minimum
3. Remove from documentation but keep template support
4. After grace period, remove from templates

### Breaking Changes

Breaking changes require:
1. Major version bump (1.x → 2.0)
2. Migration script or guide
3. Announcement with timeline
4. Backward compatibility period

---

## Usage Examples

### Adding a Simple Episode

```json
{
  "id": "ep010",
  "title": "Microservices vs Monoliths: The Great Debate",
  "description": "We examine the pros and cons of microservices architecture versus monolithic applications in modern software development.",
  "date": "2024-05-15",
  "duration": "38:45",
  "spotifyUrl": "https://open.spotify.com/episode/abc123xyz"
}
```

### Adding an Episode with All Fields

See "Example: Full Episode with All Fields" section above.

### Updating an Episode

To update an existing episode, locate it by ID and modify fields:

```json
{
  "id": "ep005",
  "title": "Updated Title with Clarification",  // Modified
  "description": "Original description",
  "date": "2024-03-11",
  "duration": "36:20",
  "spotifyUrl": "https://open.spotify.com/episode/example005",
  "thumbnailUrl": "/assets/images/episodes/ep005-v2.jpg",  // Updated thumbnail
  "topics": ["leadership", "career-development"],
  "hosts": ["host001", "host002"],
  "guests": [],
  "showNotes": "## Episode Highlights\n\n[Updated content]"  // Modified
}
```

---

## Related Contracts

- **Topics Contract**: `_data/topics.json` structure (referenced by episodes)
- **Hosts Contract**: `_data/hosts.json` structure (referenced by episodes)
- **Jekyll Template Contract**: Episode display templates in `_layouts/` and `_includes/`

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-10-31 | Initial contract definition |

---

## Contact

For questions about this contract:
- See: `specs/002-add-episode-workflow/` directory
- Reference: Feature specification and data model documents
