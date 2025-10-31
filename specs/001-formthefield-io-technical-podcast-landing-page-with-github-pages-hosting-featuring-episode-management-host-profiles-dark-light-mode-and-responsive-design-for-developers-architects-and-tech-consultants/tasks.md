````markdown
# Tasks: FormTheField.io Podcast Website

**Input**: Design documents from `/specs/001-formthefield-io-technical-podcast-landing-page-with-github-pages-hosting-featuring-episode-management-host-profiles-dark-light-mode-and-responsive-design-for-developers-architects-and-tech-consultants/`  
**Prerequisites**: plan.md (complete), spec.md (complete), research.md (complete), data-model.md (complete), contracts/ (complete)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Jekyll project initialization and basic structure

- [X] T001 Create Jekyll project structure with _config.yml, Gemfile, and GitHub Pages configuration
- [X] T002 [P] Initialize Ruby dependencies with Jekyll, jekyll-feed, jekyll-sitemap, and jekyll-seo-tag in Gemfile
- [X] T003 [P] Create directory structure: _layouts/, _includes/, _data/, assets/{css,js,images}/, assets/images/{episodes,hosts,guests}/
- [X] T004 [P] Configure build tools and package.json for CSS/JS processing and testing scripts
- [X] T005 [P] Setup favicon.ico, robots.txt, and basic sitemap.xml files in root directory

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout, styling, and data infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create base layout template _layouts/default.html with semantic HTML5 structure, SEO meta tags, and theme support
- [X] T007 [P] Create site header component _includes/header.html with navigation, logo, and theme toggle
- [X] T008 [P] Create site footer component _includes/footer.html with social links and copyright
- [X] T009 Implement core CSS system in assets/css/main.css with CSS custom properties for light/dark themes
- [X] T010 [P] Create responsive navigation styles and mobile menu functionality in assets/css/main.css
- [X] T011 [P] Implement theme toggle JavaScript in assets/js/main.js with localStorage persistence and system preference detection
- [X] T012 Create sample data structure: _data/episodes.json with at least one sample episode
- [X] T013 [P] Create sample data structure: _data/hosts.json with host profile information
- [X] T014 [P] Create sample data structure: _data/topics.json with topic definitions and colors
- [X] T015 [P] Create sample data structure: _data/site-config.json with podcast branding and social links

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Discover and Listen to Latest Episode (Priority: P1) 🎯 MVP

**Goal**: Visitors can discover the podcast and listen to the latest episode immediately from the homepage

**Independent Test**: Visit homepage, see podcast branding and latest episode with working Spotify embed player

### Implementation for User Story 1

- [X] T016 [P] [US1] Create homepage hero section in index.html with podcast name, tagline, and description
- [X] T017 [P] [US1] Add subscription buttons component in _includes/subscribe-buttons.html for Spotify, Apple Podcasts, and RSS
- [X] T018 [US1] Implement latest episode display section in index.html with Liquid templating from _data/episodes.json
- [X] T019 [US1] Create Spotify embed player component in _includes/audio-player.html with fallback audio support
- [X] T020 [US1] Add hero section styles in assets/css/main.css with responsive design and proper typography
- [X] T021 [US1] Add latest episode card styles in assets/css/main.css with thumbnail, metadata, and player layout
- [X] T022 [US1] Implement episode display using Jekyll Liquid to fetch and display latest published episode

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Browse and Filter Episode Library (Priority: P2)

**Goal**: Users can browse all episodes and filter by topics to find relevant content

**Independent Test**: Navigate to episodes page, see episode grid, apply topic filters, and view filtered results

### Implementation for User Story 2

- [X] T023 [P] [US2] Create episodes listing page episodes.html with grid layout and filter controls
- [X] T024 [P] [US2] Create episode card component _includes/episode-card.html for consistent episode display
- [X] T025 [P] [US2] Create episode detail page episode.html with full show notes and embedded player
- [X] T026 [US2] Implement topic filter component in episodes.html with checkboxes and clear functionality
- [X] T027 [US2] Create episodes management JavaScript in assets/js/episodes.js with filtering and search logic
- [X] T028 [US2] Add episode grid styles in assets/css/main.css with responsive cards and loading states
- [X] T029 [US2] Add topic filter styles in assets/css/main.css with accessible checkboxes and topic colors
- [X] T030 [US2] Implement episode search functionality in assets/js/episodes.js with title and description matching
- [X] T031 [US2] Add pagination/load more functionality in assets/js/episodes.js for large episode lists
- [X] T032 [US2] Implement episode detail page JavaScript for loading individual episode data by ID

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Learn About Hosts and Podcast Mission (Priority: P3)

**Goal**: Visitors can learn about podcast hosts and mission to build trust and credibility

**Independent Test**: Visit about page and view complete host profiles with photos, bios, and social links

### Implementation for User Story 3

- [x] T033 [P] [US3] Create about page about.html with podcast mission section and host profiles
- [x] T034 [P] [US3] Create host profile component _includes/host-profile.html for consistent host display
- [x] T035 [US3] Implement about page JavaScript to load host data from _data/hosts.json
- [x] T036 [US3] Add about page styles in assets/css/main.css with mission section and host profile cards
- [x] T037 [US3] Add social media link styles in assets/css/main.css with icons and hover effects
- [x] T038 [US3] Implement responsive host profile layout for mobile and desktop viewing

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Contact and Guest Inquiries (Priority: P4)

**Goal**: Users can contact hosts through a functional contact form with proper validation

**Independent Test**: Submit contact form and receive confirmation, with form validation working properly

### Implementation for User Story 4

- [x] T039 [P] [US4] Create contact page contact.html with contact form and guest inquiry section
- [x] T040 [P] [US4] Create contact form component _includes/contact-form.html with proper form fields and labels
- [x] T041 [US4] Implement contact form JavaScript in assets/js/contact.js with validation and Formspree integration
- [x] T042 [US4] Add contact form styles in assets/css/main.css with accessible form design and error states
- [x] T043 [US4] Add form validation JavaScript with real-time feedback and accessibility support
- [x] T044 [US4] Configure Formspree integration with proper error handling and success confirmation

**Checkpoint**: At this point, all core user stories should be independently functional

---

## Phase 7: User Story 5 - Personalized Viewing Experience (Priority: P3)

**Goal**: Users can toggle between dark/light modes with persistent preference storage

**Independent Test**: Toggle theme modes and verify preference persistence across page reloads

### Implementation for User Story 5

- [x] T045 [P] [US5] Enhance theme toggle functionality in assets/js/main.js with smooth transitions
- [x] T046 [P] [US5] Create comprehensive dark mode styles in assets/css/main.css for all components
- [x] T047 [US5] Implement system preference detection and respect user's OS theme setting
- [x] T048 [US5] Add theme transition animations in assets/css/main.css to prevent jarring theme switches
- [x] T049 [US5] Test and refine theme consistency across all pages and components

**Checkpoint**: Complete theming system should work across all user stories

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: SEO optimization, performance improvements, and production readiness

- [ ] T050 [P] Add comprehensive SEO meta tags and Open Graph data to _layouts/default.html
- [ ] T051 [P] Create RSS feed template _layouts/feed.xml for podcast syndication
- [ ] T052 [P] Implement structured data (JSON-LD) for podcast and episode schema
- [ ] T053 [P] Add image optimization and lazy loading JavaScript in assets/js/main.js
- [ ] T054 [P] Create 404 error page 404.html with navigation back to main site
- [ ] T055 Performance optimization: compress CSS, implement critical CSS inlining
- [ ] T056 [P] Add accessibility improvements: skip links, enhanced ARIA labels, keyboard navigation
- [ ] T057 [P] Configure GitHub Actions for automated Lighthouse testing and image optimization
- [ ] T058 [P] Add analytics integration (Google Analytics or Plausible) to site configuration
- [ ] T059 Cross-browser testing and mobile responsiveness validation across all pages
- [ ] T060 Final quickstart.md validation and deployment checklist completion

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of other stories  
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Independent of other stories
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Enhances all other stories but doesn't block them

### Within Each User Story

- Jekyll layout and component files before page-specific implementations
- CSS styling after HTML structure is complete
- JavaScript functionality after HTML/CSS foundation is established
- Story validation before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Component creation tasks within stories marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch component creation for User Story 1 together:
Task: "Create homepage hero section in index.html"
Task: "Add subscription buttons component in _includes/subscribe-buttons.html"

# Launch styling tasks for User Story 1 together:
Task: "Add hero section styles in assets/css/main.css"
Task: "Add latest episode card styles in assets/css/main.css"
```

---

## Parallel Example: User Story 2

```bash
# Launch page and component creation together:
Task: "Create episodes listing page episodes.html"
Task: "Create episode card component _includes/episode-card.html"
Task: "Create episode detail page episode.html"

# Launch styling tasks together:
Task: "Add episode grid styles in assets/css/main.css"
Task: "Add topic filter styles in assets/css/main.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T015) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T016-T022)
4. **STOP and VALIDATE**: Test User Story 1 independently on homepage
5. Deploy to GitHub Pages for demo/feedback

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test episode browsing independently → Deploy/Demo
4. Add User Story 3 → Test about page independently → Deploy/Demo
5. Add User Story 4 → Test contact form independently → Deploy/Demo
6. Add User Story 5 → Test theming across all pages → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Homepage and latest episode)
   - Developer B: User Story 2 (Episodes browsing and filtering)
   - Developer C: User Story 3 & 4 (About page and contact form)
3. Stories complete and integrate independently

---

## Summary

- **Total Tasks**: 60 tasks across 8 phases
- **Task Count per User Story**:
  - User Story 1 (P1): 7 tasks - Homepage and latest episode functionality
  - User Story 2 (P2): 10 tasks - Episode browsing and filtering system
  - User Story 3 (P3): 6 tasks - About page and host profiles
  - User Story 4 (P4): 6 tasks - Contact form and validation
  - User Story 5 (P3): 5 tasks - Dark/light theme system
- **Parallel Opportunities**: 26 tasks marked [P] can run in parallel within their phases
- **Independent Test Criteria**: Each user story has clear validation steps for standalone testing
- **Suggested MVP Scope**: User Story 1 only (7 tasks after setup/foundation) - Complete homepage with latest episode
- **Format Validation**: ✅ All tasks follow the required checklist format (checkbox, ID, labels, file paths)

**MVP Development Time**: Approximately 1-2 weeks for User Story 1 after foundation
**Full Feature Development Time**: Approximately 3-4 weeks for all user stories
**Team Parallel Development**: Can reduce timeline to 2-3 weeks with multiple developers

````