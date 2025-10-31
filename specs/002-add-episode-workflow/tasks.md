# Tasks: Episode Content Management Workflow

**Feature**: 002-add-episode-workflow  
**Date**: October 31, 2025  
**Input**: Design documents from `/specs/002-add-episode-workflow/`

## Format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- All tasks follow strict checklist format with checkboxes

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Verify and update project configuration files

- [x] T001 Verify .gitignore contains Ruby/Jekyll patterns (Gemfile.lock, _site/, .sass-cache/, .jekyll-cache/, .jekyll-metadata)
- [x] T002 [P] Verify assets/images/episodes/ directory exists or create it for thumbnail storage

**Checkpoint**: Project structure ready for episode management

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core validation infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create _includes/validate-episodes.html with Liquid validation logic for required fields (id, title, description, date, duration, spotifyUrl)
- [x] T004 Add date format validation (YYYY-MM-DD pattern) to _includes/validate-episodes.html
- [x] T005 Add duration format validation (MM:SS or HH:MM:SS pattern) to _includes/validate-episodes.html
- [x] T006 Add unique episode ID check to _includes/validate-episodes.html
- [x] T007 Add Spotify URL format validation (must start with https://open.spotify.com/episode/) to _includes/validate-episodes.html

**Checkpoint**: Foundation ready - validation infrastructure in place, user story implementation can now begin

---

## Phase 3: User Story 1 - Quick Episode Addition (Priority: P1) 🎯 MVP

**Goal**: Enable content managers to add episodes with basic information and see them live on the site

**Independent Test**: Add a minimal episode with only required fields (id, title, description, date, duration, spotifyUrl) to _data/episodes.json, commit, push, wait for build, verify episode appears on episodes page and has clickable detail page with Spotify embed

### Implementation for User Story 1

- [x] T008 [P] [US1] Update or create _layouts/episode.html layout for episode detail pages with basic structure (title, date, duration, description display)
- [x] T009 [P] [US1] Update or create _includes/episode-card.html component for episode list display with required fields only
- [x] T010 [US1] Update or create _includes/audio-player.html component for Spotify iframe embed with episode ID extraction logic
- [x] T011 [US1] Update episodes.html page to iterate over site.data.episodes sorted by date (reverse chronological order)
- [x] T012 [US1] Include validation logic at top of _layouts/episode.html using {% include validate-episodes.html %}
- [x] T013 [US1] Update episode.html detail page template to use query parameter (?id=ep001) for episode lookup
- [x] T014 [US1] Add basic episode-specific SCSS styles to assets/css/main.scss (episode card layout, date formatting, duration badge)
- [x] T015 [US1] Update assets/js/episodes.js to handle episode list rendering if needed for client-side enhancements

**Checkpoint**: ✅ User Story 1 complete - basic episode addition workflow functional, episodes display in list and detail views with Spotify playback

---

## Phase 4: User Story 2 - Rich Episode Metadata (Priority: P2)

**Goal**: Enable detailed episode metadata including topics, guests, and formatted show notes

**Independent Test**: Add an episode with topics array, guests array, and markdown show notes to _data/episodes.json, verify topics display as clickable tags, guest information renders properly formatted, and show notes appear with correct markdown formatting

### Implementation for User Story 2

- [ ] T016 [P] [US2] Add topic reference validation to _includes/validate-episodes.html (check each topic ID exists in _data/topics.json)
- [ ] T017 [P] [US2] Add host reference validation to _includes/validate-episodes.html (check each host ID exists in _data/hosts.json)
- [ ] T018 [P] [US2] Add guest object validation to _includes/validate-episodes.html (ensure name, role, company present if guests array exists)
- [ ] T019 [US2] Update _layouts/episode.html to display topics as clickable tags that filter episodes on episodes.html
- [ ] T020 [US2] Update _layouts/episode.html to display guest information section with name, role, company formatted properly
- [ ] T021 [US2] Update _layouts/episode.html to render show notes markdown using Kramdown ({{ episode.showNotes | markdownify }})
- [ ] T022 [US2] Update _includes/episode-card.html to display topic tags on episode cards in list view
- [ ] T023 [US2] Add topic filtering functionality to assets/js/episodes.js (filter episodes by clicked topic tag)
- [ ] T024 [US2] Add SCSS styles for topics, guests, and show notes sections to assets/css/main.scss

**Checkpoint**: User Story 2 complete - rich metadata displays correctly, topics are filterable, guests show properly, show notes render markdown

---

## Phase 5: User Story 3 - Visual Content Management (Priority: P2)

**Goal**: Support episode thumbnail images with responsive display and fallback handling

**Independent Test**: Add an episode with thumbnailUrl field pointing to an image in assets/images/episodes/, verify thumbnail displays on list and detail pages; add episode without thumbnailUrl and verify fallback image appears

### Implementation for User Story 3

- [ ] T025 [P] [US3] Create or verify default fallback thumbnail image exists at assets/images/episodes/default-episode.jpg
- [ ] T026 [US3] Update _includes/episode-card.html to display episode thumbnail with fallback logic ({% if episode.thumbnailUrl %} ... {% else %} default {% endif %})
- [ ] T027 [US3] Update _layouts/episode.html to display episode thumbnail with responsive sizing on detail page
- [ ] T028 [US3] Implement responsive picture element in _includes/episode-card.html for WebP support with JPEG fallback (<picture><source type="image/webp">)
- [ ] T029 [US3] Add explicit width and height attributes (800x800) to img tags in _includes/episode-card.html to prevent layout shift
- [ ] T030 [US3] Add lazy loading attribute (loading="lazy") to thumbnail images in _includes/episode-card.html
- [ ] T031 [US3] Add SCSS styles for episode thumbnails to assets/css/main.scss (aspect ratio, border radius, hover effects)

**Checkpoint**: User Story 3 complete - thumbnails display correctly with WebP optimization, fallback images work, responsive design verified

---

## Phase 6: User Story 4 - Episode Validation (Priority: P3)

**Goal**: Provide clear, actionable error messages when episode data is malformed

**Independent Test**: Intentionally create invalid episodes (missing required field, invalid date format, broken JSON, duplicate IDs) and verify Jekyll build fails with clear error messages identifying the problem

### Implementation for User Story 4

- [ ] T032 [P] [US4] Enhance _includes/validate-episodes.html error messages to include episode ID and specific field name (ERROR: Episode ep005 missing required field: title)
- [ ] T033 [P] [US4] Add descriptive error messages for date validation failures to _includes/validate-episodes.html (ERROR: Episode ep005 has invalid date format: 2024-1-5, expected YYYY-MM-DD)
- [ ] T034 [P] [US4] Add descriptive error messages for duration validation failures to _includes/validate-episodes.html (ERROR: Episode ep005 has invalid duration format: 42, expected MM:SS or HH:MM:SS)
- [ ] T035 [US4] Add duplicate episode ID detection with clear error message to _includes/validate-episodes.html (ERROR: Duplicate episode ID found: ep005)
- [ ] T036 [US4] Add warning messages (not errors) for non-existent topic/host references to _includes/validate-episodes.html (WARNING: Episode ep005 references non-existent topic: invalid-topic)

**Checkpoint**: User Story 4 complete - validation provides clear, actionable error messages that help content managers fix issues quickly

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: SEO, performance, documentation, and final testing

- [ ] T037 [P] Add Schema.org PodcastEpisode JSON-LD structured data to _layouts/episode.html in <head> section
- [ ] T038 [P] Ensure jekyll-seo-tag generates correct meta title, description, and canonical URL for episode pages in _layouts/episode.html
- [ ] T039 [P] Add Open Graph meta tags for social sharing to _layouts/episode.html (og:title, og:description, og:image from thumbnail)
- [ ] T040 [P] Verify episodes automatically added to sitemap.xml by jekyll-sitemap plugin (no action needed, just verify)
- [ ] T041 Update README.md with episode management section linking to specs/002-add-episode-workflow/quickstart.md
- [ ] T042 Add responsive design testing checklist to quickstart.md (test mobile, tablet, desktop breakpoints)
- [ ] T043 [P] Optimize Spotify embed container SCSS in assets/css/main.scss (responsive aspect ratio, max-width constraints)
- [ ] T044 Test complete workflow per quickstart.md: add sample episode, verify display, check SEO metadata, test Spotify embed, validate responsive design
- [ ] T045 Cross-browser testing: verify episode pages in Chrome, Firefox, Safari, Edge (manual testing as per plan.md)
- [ ] T046 Performance verification: check episode page load time <1 second, images <150KB, critical CSS <50KB

**Checkpoint**: All features complete, tested, documented, and ready for production

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - MVP foundation
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion (builds on basic episode display)
- **User Story 3 (Phase 5)**: Depends on User Story 1 completion (adds thumbnails to existing display)
- **User Story 4 (Phase 6)**: Depends on Foundational (Phase 2) - enhances validation infrastructure
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - **MVP COMPLETE AT THIS POINT**
- **User Story 2 (P2)**: Depends on User Story 1 (enhances episode display with metadata) - Can run in parallel with User Story 3
- **User Story 3 (P2)**: Depends on User Story 1 (adds images to episode display) - Can run in parallel with User Story 2
- **User Story 4 (P3)**: Depends on Foundational (Phase 2) only (enhances validation) - Can run in parallel with User Stories 2 and 3

### Within Each User Story

**User Story 1**:
- T008 (layout), T009 (card), T010 (audio player) can run in parallel [P]
- T011 (episodes page) depends on T009 (episode-card component)
- T012, T013 (validation and detail page) depend on T008 (episode layout)
- T014, T015 (styles and scripts) can run after component structure is complete

**User Story 2**:
- T016, T017, T018 (validation rules) can run in parallel [P]
- T019, T020, T021 (layout updates) must run sequentially (all edit _layouts/episode.html)
- T022, T023, T024 (card, filtering, styles) can run in parallel [P] after layout updates

**User Story 3**:
- T025 (default image), T026 (card update), T027 (layout update) can start in parallel [P]
- T028, T029, T030 (responsive features) depend on T026 (all edit episode-card)
- T031 (styles) can run in parallel [P] with T028-T030

**User Story 4**:
- T032, T033, T034, T035, T036 all edit _includes/validate-episodes.html so must run sequentially or can be done as single task

### Parallel Opportunities

Within phases, tasks marked [P] can run in parallel:

**Phase 1 (Setup)**:
- T002 can run in parallel with T001

**Phase 3 (User Story 1)**:
- T008, T009, T010 can run in parallel (different files)
- T014, T015 can run in parallel (different files)

**Phase 4 (User Story 2)**:
- T016, T017, T018 can run in parallel (all add to same validation file but separate rules)
- T022, T023, T024 can run in parallel (different files)

**Phase 5 (User Story 3)**:
- T025, T026, T027 can start in parallel
- T031 can run in parallel with T028-T030

**Phase 7 (Polish)**:
- T037, T038, T039 can run in parallel (all add to episode layout <head>)
- T040, T041, T042, T043 can run in parallel (different files)

---

## Parallel Example: User Story 1

```bash
# Launch foundational validation tasks:
Task T003: Create validation file with required fields check
Task T004: Add date validation to same file
Task T005: Add duration validation to same file
(These are sequential since they edit the same file)

# Launch User Story 1 component tasks in parallel:
Task T008: Update episode layout file
Task T009: Update episode-card component  
Task T010: Update audio-player component
(Three different files - can run in parallel)

# Launch User Story 1 styling tasks in parallel:
Task T014: Update main.scss
Task T015: Update episodes.js
(Two different files - can run in parallel)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational validation (T003-T007) - **CRITICAL CHECKPOINT**
3. Complete Phase 3: User Story 1 (T008-T015)
4. **STOP and VALIDATE**: 
   - Add a test episode with only required fields
   - Verify it displays on episodes page
   - Verify detail page shows with Spotify embed
   - Test across browsers
5. **MVP READY** - Can deploy and get user feedback

### Incremental Delivery

After MVP:
- Add User Story 2 (T016-T024) for rich metadata → Deploy
- Add User Story 3 (T025-T031) for thumbnails → Deploy  
- Add User Story 4 (T032-T036) for better validation → Deploy
- Add Polish (T037-T046) for SEO and final touches → Deploy

Each increment adds value without breaking previous work.

### Parallel Team Strategy

With multiple developers:
1. Complete Setup + Foundational together (everyone needs this)
2. After Foundational complete:
   - **Developer A**: User Story 1 (T008-T015) - MVP priority
   - **Developer B**: User Story 4 (T032-T036) - validation improvements (independent)
3. After User Story 1 complete:
   - **Developer A**: User Story 2 (T016-T024)
   - **Developer B**: User Story 3 (T025-T031)
   - (US2 and US3 can run in parallel as they update different aspects)
4. Everyone: Polish phase (T037-T046)

---

## Total Task Count

- **Phase 1 (Setup)**: 2 tasks
- **Phase 2 (Foundational)**: 5 tasks ⚠️ BLOCKING
- **Phase 3 (User Story 1 - P1)**: 8 tasks 🎯 MVP
- **Phase 4 (User Story 2 - P2)**: 9 tasks
- **Phase 5 (User Story 3 - P2)**: 7 tasks
- **Phase 6 (User Story 4 - P3)**: 5 tasks
- **Phase 7 (Polish)**: 10 tasks

**Total**: 46 tasks

**Parallel Tasks**: 18 tasks marked [P]

**MVP Scope** (T001-T015): 15 tasks (~3-4 hours estimated)

**Full Feature** (T001-T046): 46 tasks (~8-12 hours estimated as per plan.md)

---

## Notes

- All tasks follow strict checklist format: `- [ ] [TaskID] [P?] [Story?] Description with file path`
- [P] indicates parallelizable tasks (different files or independent work)
- [Story] labels (US1-US4) map tasks to user stories for traceability
- No test tasks included (feature spec doesn't request TDD, manual browser testing per plan.md)
- Each user story is independently testable per acceptance scenarios in spec.md
- Stop at any checkpoint to validate story independently before proceeding
- Constitution compliance verified in plan.md - all tasks maintain compliance

---

**Generated**: October 31, 2025  
**Ready for**: Implementation via `/speckit.implement` command
