# FormTheField.io - Podcast Website Specifications

## Project Overview
**Project Name:** FormTheField.io  
**Type:** Technical Podcast Landing Page  
**Hosting:** GitHub Pages  
**Target Audience:** Developers, Architects, Platform Engineers, CTOs, Tech Consultants  
**Tech Stack:** HTML, CSS, JavaScript (Vanilla)

---

## Brand & Design

### Visual Style
- **Aesthetic:** Modern, sleek, visually stunning
- **Theme:** Dark/Light mode toggle
- **Primary Color:** Green (field/nature inspired)
  - Suggested: `#2DD4BF` (tech teal-green) for accents
  - Suggested: `#10B981` (emerald green) for primary actions
- **Dark Mode:** Dark gray background (`#0F172A`) with white text
- **Light Mode:** Off-white background (`#F8FAFC`) with dark text
- **Typography:** 
  - Headings: Modern geometric sans-serif (e.g., Inter, Space Grotesk)
  - Body: Clean sans-serif (e.g., Inter, System UI)
- **Design Principles:**
  - Generous white space
  - Smooth animations and transitions
  - Card-based layouts
  - Responsive design (mobile-first)

---

## Site Structure

### Pages
1. **Home** (`index.html`)
2. **Episodes** (`episodes.html`) - Filterable episode list
3. **About** (`about.html`) - Podcast mission + host profiles
4. **Contact** (`contact.html`) - Contact form + social links

### Navigation
- Sticky header with logo and nav links
- Mobile: Hamburger menu
- Dark/Light mode toggle in header
- Social media icons in footer

---

## Homepage Layout

### Hero Section
- Large, eye-catching header
- Podcast logo/name: "FormTheField.io"
- Tagline: "Life as a Consultant in Tech" (or custom)
- Brief description (1-2 sentences)
- CTA button: "Latest Episode" or "Listen Now"
- Animated gradient background (subtle)
- Subscribe buttons: Spotify, Apple Podcasts, RSS

### Latest Episode Section
- Featured episode card
- Embedded Spotify player
- Episode title, description, date
- Guest/host info with avatars
- "View All Episodes" CTA

### About Preview
- Brief podcast mission
- Host photos in circular frames
- "Meet the Hosts" CTA

### Newsletter Signup (Optional)
- Email capture for episode notifications
- Simple inline form

---

## Episodes Page

### Features
- **Filter/Search Bar**
  - Filter by topic/tag
  - Filter by guest
  - Search by title/description
  - Sort by date (newest/oldest)

- **Episode Grid/List**
  - Card layout (responsive grid)
  - Each card shows:
    - Episode thumbnail
    - Episode number & season
    - Title
    - Date published
    - Duration
    - Brief description (truncated)
    - Topics/tags as chips
    - Host & guest avatars
  - Click to view episode detail page

### Episode Detail Page (`episode.html?id=X`)
- Full episode information
- Spotify embed player
- Custom audio player (fallback/alternative)
- Complete show notes
- Host & guest profiles with links
- Social share buttons
- Related episodes suggestions

---

## About Page

### Sections
1. **Podcast Mission**
   - What the podcast is about
   - Who it's for
   - What listeners will learn

2. **Host Profiles**
   - Two hosts (always featured)
   - Large profile cards with:
     - Photo
     - Name & title
     - Bio (2-3 paragraphs)
     - Social links (LinkedIn, Twitter, GitHub, Website)
     - Episodes hosted count

3. **Past Guests** (Optional future addition)
   - Grid of guest photos
   - Names and episode count
   - Click to see their episodes

---

## Contact Page

### Elements
- Contact form
  - Name
  - Email
  - Message
  - Submit button
- Alternative contact methods
  - Email address
  - Social media links
- "Interested in being a guest?" CTA

---

## Data Structure

### Episode JSON Format
```json
{
  "episodes": [
    {
      "id": 1,
      "season": 1,
      "episodeNumber": 1,
      "title": "Episode Title Here",
      "description": "Full episode description...",
      "shortDescription": "Brief description for cards...",
      "date": "2025-11-15",
      "duration": "45:30",
      "thumbnail": "/assets/images/episodes/ep1.jpg",
      "spotifyUrl": "https://open.spotify.com/episode/...",
      "audioUrl": "/assets/audio/ep1.mp3",
      "topics": ["cloud-native", "kubernetes", "devops"],
      "hosts": [
        {
          "id": "host1",
          "name": "Host Name 1",
          "photo": "/assets/images/hosts/host1.jpg"
        },
        {
          "id": "host2",
          "name": "Host Name 2",
          "photo": "/assets/images/hosts/host2.jpg"
        }
      ],
      "guests": [
        {
          "name": "Guest Name",
          "title": "CTO at Company",
          "photo": "/assets/images/guests/guest1.jpg",
          "linkedin": "https://linkedin.com/in/...",
          "twitter": "https://twitter.com/..."
        }
      ],
      "showNotes": "Detailed show notes with timestamps..."
    }
  ]
}
```

### Host Data Format
```json
{
  "hosts": [
    {
      "id": "host1",
      "name": "Host Name",
      "title": "Role/Title",
      "bio": "Full biography...",
      "photo": "/assets/images/hosts/host1.jpg",
      "social": {
        "linkedin": "https://linkedin.com/in/...",
        "twitter": "https://twitter.com/...",
        "github": "https://github.com/...",
        "website": "https://..."
      }
    }
  ]
}
```

### Topics/Tags List
Predefined topics for consistency:
- Cloud Native
- Kubernetes
- DevOps
- Platform Engineering
- Architecture
- Leadership
- Career Development
- AI/ML
- Security
- Consulting Life
- [Add more as needed]

---

## Technical Features

### Audio Player
- **Primary:** Spotify embed iframe
- **Secondary:** Custom HTML5 audio player
  - Play/pause
  - Progress bar
  - Time display
  - Volume control
  - Speed control (0.5x, 1x, 1.5x, 2x)

### Filtering System
- Client-side JavaScript filtering
- Filter by multiple topics simultaneously
- Clear filters button
- URL parameters for shareable filtered views

### Dark/Light Mode
- Toggle button in header
- Preference saved in localStorage
- Respects system preference on first visit
- Smooth transition between modes

### Responsive Design
- Mobile breakpoint: < 768px
- Tablet breakpoint: 768px - 1024px
- Desktop: > 1024px
- Touch-friendly tap targets (min 44px)

### Performance
- Lazy loading images
- Minified CSS/JS for production
- Optimized images (WebP with fallbacks)
- Minimal external dependencies

### SEO & Meta
- Semantic HTML5
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD) for podcasts
- RSS feed generation
- Sitemap.xml

### Forms
- Contact form with validation
- Email newsletter signup
- Form submission via Formspree or similar (GitHub Pages compatible)

---

## Asset Requirements

### Images
- Podcast logo (SVG preferred)
- Episode thumbnails (1400x1400px, square)
- Host photos (800x800px, square)
- Guest photos (400x400px, square)
- Favicon set (multiple sizes)

### Audio
- Episode MP3 files (hosted externally or on CDN)
- Recommended: 128kbps for web streaming

### Fonts
- Google Fonts: Inter (weights: 400, 500, 600, 700)
- System font fallbacks

---

## Third-Party Integrations

### Platforms
- Spotify (embed player + link)
- Apple Podcasts (link)
- RSS feed (link)

### Analytics (Optional)
- Google Analytics or Plausible
- Track: page views, episode plays, downloads

### Forms
- Formspree (free tier for contact/newsletter)
- Or EmailJS for client-side email

---

## File Structure
```
formthefield.io/
├── index.html
├── episodes.html
├── about.html
├── contact.html
├── episode.html (template for individual episodes)
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── dark-mode.css
│   ├── js/
│   │   ├── main.js
│   │   ├── episodes.js
│   │   ├── player.js
│   │   └── theme-toggle.js
│   ├── images/
│   │   ├── logo.svg
│   │   ├── episodes/
│   │   ├── hosts/
│   │   └── guests/
│   └── audio/ (if hosted locally, otherwise CDN links)
├── data/
│   ├── episodes.json
│   └── hosts.json
└── README.md
```

---

## Development Phases

### Phase 1: Foundation
- Basic HTML structure for all pages
- CSS framework setup
- Dark/light mode toggle
- Responsive navigation

### Phase 2: Homepage
- Hero section
- Latest episode display
- About preview
- Footer with social links

### Phase 3: Episodes System
- Episodes page with grid layout
- JSON data structure
- Episode filtering
- Episode detail pages

### Phase 4: Audio Players
- Spotify embed integration
- Custom audio player (optional)

### Phase 5: About & Contact
- Host profiles
- Contact form
- Newsletter signup

### Phase 6: Polish
- Animations and transitions
- Performance optimization
- Cross-browser testing
- SEO implementation

---

## Browser Support
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Launch Checklist
- [ ] All pages functional
- [ ] Responsive on all devices
- [ ] Dark/light mode working
- [ ] Episode filtering working
- [ ] Forms tested
- [ ] SEO meta tags added
- [ ] Analytics integrated
- [ ] RSS feed generated
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Cross-browser tested
- [ ] Performance optimized (Lighthouse score > 90)

---

## Future Enhancements (Post-Launch)
- Transcript display for accessibility
- Episode comments/discussion
- Guest profile pages
- Advanced search with autocomplete
- Episode recommendations engine
- Integration with podcast analytics
- Merchandise store
- Premium content section
- Multi-language support

---

## Notes
- Keep it simple initially - can add features incrementally
- Focus on mobile experience (60%+ of podcast listeners browse on mobile)
- Ensure fast load times (critical for user retention)
- Make updating episodes as easy as editing a JSON file
- Green color scheme should evoke "field" but maintain professional tech aesthetic

---

**Document Version:** 1.0  
**Last Updated:** October 31, 2025  
**Status:** Ready for Development