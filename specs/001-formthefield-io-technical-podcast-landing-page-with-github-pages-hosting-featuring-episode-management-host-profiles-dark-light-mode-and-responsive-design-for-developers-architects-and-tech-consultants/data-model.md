# Data Model: FormTheField.io Podcast Website

**Phase 1 Design Output** | **Date**: October 31, 2025  
**Purpose**: Define data structures and relationships for podcast website entities

## Core Entities

### Episode Entity

**Purpose**: Represents individual podcast episodes with metadata and content information

**Structure**:
```json
{
  "id": "unique-episode-identifier",
  "season": 1,
  "episodeNumber": 1,
  "title": "Episode Title",
  "description": "Full episode description for SEO and detail pages",
  "shortDescription": "Brief description for episode cards (max 150 chars)",
  "publishDate": "2025-10-31",
  "duration": "45:30",
  "thumbnail": "/assets/images/episodes/ep001.webp",
  "spotifyUrl": "https://open.spotify.com/episode/...",
  "audioUrl": "/assets/audio/ep001.mp3",
  "topics": ["cloud-native", "kubernetes", "devops"],
  "hosts": ["host-id-1", "host-id-2"],
  "guests": [
    {
      "name": "Guest Name",
      "title": "CTO at TechCorp",
      "company": "TechCorp",
      "photo": "/assets/images/guests/guest001.webp",
      "social": {
        "linkedin": "https://linkedin.com/in/guest",
        "twitter": "https://twitter.com/guest",
        "website": "https://guest-website.com"
      }
    }
  ],
  "showNotes": "Detailed show notes with timestamps and links",
  "transcript": "Episode transcript (future enhancement)",
  "status": "published",
  "featured": false
}
```

**Validation Rules**:
- `id` must be unique across all episodes
- `title` required, max 100 characters
- `shortDescription` required, max 150 characters  
- `publishDate` must be ISO 8601 format
- `duration` format: "MM:SS" or "HH:MM:SS"
- `topics` must match predefined topic list
- `hosts` array must contain valid host IDs
- `status` enum: ["draft", "published", "archived"]

**Relationships**:
- Many-to-many with Host entities via `hosts` array
- Many-to-many with Topic entities via `topics` array
- One-to-many with Guest entities (embedded)

### Host Entity

**Purpose**: Represents podcast hosts with profile information and social links

**Structure**:
```json
{
  "id": "host-unique-id",
  "name": "Host Full Name", 
  "title": "Senior Cloud Architect",
  "company": "TechConsulting Inc",
  "bio": "Detailed biography covering experience and expertise",
  "photo": "/assets/images/hosts/host001.webp",
  "social": {
    "linkedin": "https://linkedin.com/in/host",
    "twitter": "https://twitter.com/host",
    "github": "https://github.com/host",
    "website": "https://host-website.com"
  },
  "episodeCount": 25,
  "joinDate": "2024-01-01",
  "active": true
}
```

**Validation Rules**:
- `id` must be unique across all hosts
- `name` required, max 50 characters
- `bio` required, max 500 characters
- `photo` path must exist
- Social URLs must be valid URLs or null
- `episodeCount` calculated field (read-only)
- `joinDate` must be ISO 8601 format

**Relationships**:
- Many-to-many with Episode entities
- Referenced by Episode `hosts` array

### Topic Entity

**Purpose**: Predefined categories for episode classification and filtering

**Structure**:
```json
{
  "id": "topic-slug",
  "name": "Display Name",
  "description": "Topic description for filtering UI",
  "color": "#2DD4BF",
  "episodeCount": 12,
  "featured": true
}
```

**Predefined Topics**:
- `cloud-native`: "Cloud Native"
- `kubernetes`: "Kubernetes" 
- `devops`: "DevOps"
- `platform-engineering`: "Platform Engineering"
- `architecture`: "Architecture"
- `leadership`: "Leadership"
- `career-development`: "Career Development"
- `ai-ml`: "AI/ML"
- `security`: "Security"
- `consulting-life`: "Consulting Life"

**Validation Rules**:
- `id` must be URL-safe slug format
- `name` required, max 30 characters
- `color` must be valid hex color code
- `episodeCount` calculated field (read-only)

### Site Configuration Entity

**Purpose**: Global site settings and metadata

**Structure**:
```json
{
  "podcast": {
    "name": "FormTheField.io",
    "tagline": "Life as a Consultant in Tech",
    "description": "A technical podcast exploring the challenges and opportunities of consulting in the technology industry",
    "logo": "/assets/images/logo.svg",
    "baseUrl": "https://fromthefield.io",
    "email": "hello@fromthefield.io"
  },
  "social": {
    "spotify": "https://open.spotify.com/show/...",
    "apple": "https://podcasts.apple.com/podcast/...",
    "rss": "/feed.xml",
    "twitter": "https://twitter.com/fromthefield",
    "linkedin": "https://linkedin.com/company/fromthefield"
  },
  "seo": {
    "defaultTitle": "FormTheField.io - Life as a Consultant in Tech",
    "defaultDescription": "Technical podcast for developers, architects, and consultants exploring the consulting lifestyle",
    "keywords": ["podcast", "consulting", "technology", "career", "development"]
  },
  "analytics": {
    "googleAnalytics": "GA_TRACKING_ID",
    "plausible": "fromthefield.io"
  }
}
```

## Data Relationships

### Episode-Host Relationship
- **Type**: Many-to-Many
- **Implementation**: Host IDs array in Episode entity
- **Queries**: Episodes by host, Host episode count

### Episode-Topic Relationship  
- **Type**: Many-to-Many
- **Implementation**: Topic slugs array in Episode entity
- **Queries**: Episodes by topic, Topic episode count

### Episode-Guest Relationship
- **Type**: One-to-Many (embedded)
- **Implementation**: Guest objects embedded in Episode entity
- **Queries**: Episodes by guest name, Guest appearances

## State Transitions

### Episode Status Flow
```
draft → published → archived
  ↓         ↓
published ← published (featured toggle)
```

- **Draft**: Episode created but not visible publicly
- **Published**: Episode visible on site and in feeds
- **Archived**: Episode hidden from main listings but accessible via direct link
- **Featured**: Published episode highlighted on homepage

### Data Validation Layer

**Client-side validation**:
- Form field validation for admin interfaces
- Image size and format validation
- URL format validation for social links

**Build-time validation**:
- JSON schema validation against data models
- Required field validation
- Reference integrity (host IDs exist, topic slugs valid)
- Duplicate ID detection

## File Organization

### Data Files Structure
```
_data/
├── episodes/
│   ├── 2025/
│   │   ├── episode-001.json
│   │   └── episode-002.json
│   └── episodes-index.json    # Episode list with metadata only
├── hosts.json                 # All host profiles
├── topics.json               # Topic definitions
└── site-config.json          # Global configuration
```

### Benefits of Structure
- **Performance**: Load only needed episode data per page
- **Maintainability**: Individual files easier to edit
- **Scalability**: Year-based folders prevent directory bloat
- **Caching**: Individual episode files can be cached separately

## Data Access Patterns

### Homepage Queries
- Latest 3 episodes (featured first)
- All hosts for "About Preview"
- Site configuration for branding

### Episodes Page Queries  
- All episodes with pagination
- All topics for filter UI
- Episode counts per topic

### Episode Detail Queries
- Single episode by ID
- Related episodes by topic
- Host profiles for episode hosts

### Performance Considerations
- **Lazy loading**: Episode thumbnails and guest photos
- **Data splitting**: Separate files prevent loading unused data
- **Caching strategy**: Static JSON files cached by CDN
- **Search optimization**: Pre-computed search indices for client-side filtering