# FormTheField.io - Technical Podcast

A technical podcast website featuring episodes about life as a consultant in tech, covering topics like Cloud Native, Kubernetes, DevOps, Platform Engineering, and more.

## 🎙️ About

FormTheField.io brings conversations from the field - real experiences, lessons learned, and insights from consultants, architects, and technical leaders working in enterprise technology.

## 🚀 Local Development

### Prerequisites

- Ruby 2.7+ and Bundler
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/fromthefield.io.git
cd fromthefield.io

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

### Development Workflow

1. Create a new branch for your changes
2. Make your changes
3. Test locally with `bundle exec jekyll serve`
4. Submit a pull request

## 📁 Project Structure

```
fromthefield.io/
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page templates
├── _includes/            # Reusable components
├── _data/                # JSON data files
│   ├── episodes.json     # Episode metadata
│   ├── hosts.json        # Host profiles
│   ├── topics.json       # Topic definitions
│   └── site-config.json  # Site configuration
├── assets/               # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript
│   └── images/           # Images
├── index.html            # Homepage
├── episodes.html         # Episode library
├── about.html            # About page
└── contact.html          # Contact form
```

## 🎨 Tech Stack

- **Jekyll 4.x** - Static site generator
- **GitHub Pages** - Hosting
- **Vanilla JavaScript** - No frameworks
- **CSS Custom Properties** - Theming support
- **Spotify Web Playback** - Episode embeds
- **Formspree** - Contact form handling

## 📝 Content Management

### Adding a New Episode

Edit `_data/episodes.json` and add a new episode object:

```json
{
  "id": "episode-001",
  "title": "Your Episode Title",
  "description": "Episode description",
  "date": "2025-10-31",
  "duration": "45:30",
  "spotifyUrl": "https://open.spotify.com/episode/...",
  "thumbnailUrl": "/assets/images/episodes/episode-001.jpg",
  "topics": ["Cloud Native", "Kubernetes"],
  "hosts": ["host-1"],
  "guests": [],
  "showNotes": "# Show Notes\n\nYour show notes in Markdown..."
}
```

### Adding a New Host

Edit `_data/hosts.json` and add a new host object:

```json
{
  "id": "host-1",
  "name": "Host Name",
  "bio": "Host bio",
  "role": "Co-host",
  "photoUrl": "/assets/images/hosts/host-1.jpg",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/...",
    "twitter": "https://twitter.com/...",
    "github": "https://github.com/...",
    "website": "https://..."
  }
}
```

## 🎯 Features

- ✅ Episode discovery and playback
- ✅ Topic-based filtering
- ✅ Host profiles
- ✅ Dark/light mode
- ✅ Responsive design
- ✅ Contact form
- ✅ RSS feed
- ✅ SEO optimization

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For inquiries about being a guest or general questions, visit our [contact page](https://fromthefield.io/contact).
