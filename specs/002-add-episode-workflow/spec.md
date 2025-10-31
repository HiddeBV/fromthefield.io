# Feature Specification: Episode Content Management Workflow

**Feature Branch**: `002-add-episode-workflow`  
**Created**: October 31, 2025  
**Status**: Draft  
**Input**: User description: "I still don't see option on how to add new episodes. How is that going to work?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quick Episode Addition (Priority: P1)

As a podcast host, I need a straightforward way to add a new episode with its basic information so that listeners can discover and access new content immediately after publication.

**Why this priority**: This is the core workflow that enables the podcast to grow. Without the ability to add episodes, the site becomes static and loses its primary value proposition.

**Independent Test**: Can be fully tested by adding a single episode with required fields (title, date, Spotify URL) and verifying it appears on the episodes page and homepage. Delivers immediate value by making new content available to visitors.

**Acceptance Scenarios**:

1. **Given** I am a content manager with repository access, **When** I add a new episode entry to the episodes data file with all required fields, **Then** the episode appears in the episodes list ordered by date
2. **Given** a new episode entry exists, **When** visitors navigate to the episodes page, **Then** they see the new episode with its title, date, duration, and description
3. **Given** a new episode with a valid Spotify URL, **When** visitors click on the episode, **Then** they can access the full episode page with an embedded Spotify player
4. **Given** multiple episodes exist, **When** a new episode is added with a recent date, **Then** it appears at the top of the episodes list on the homepage

---

### User Story 2 - Rich Episode Metadata (Priority: P2)

As a podcast host, I want to add detailed metadata to episodes (topics, guests, show notes) so that listeners can find relevant content and understand what will be covered before listening.

**Why this priority**: Enhanced discoverability and user experience. While basic episode information (P1) gets content live, rich metadata helps listeners make informed decisions about what to listen to and improves SEO.

**Independent Test**: Can be tested by adding an episode with full metadata (topics, guests, detailed show notes) and verifying all information displays correctly on the episode detail page, topic filtering works, and guest information is properly formatted.

**Acceptance Scenarios**:

1. **Given** an episode entry with assigned topics, **When** the episode is displayed, **Then** visitors can see topic tags and filter episodes by clicking on them
2. **Given** an episode with guest information, **When** visitors view the episode details, **Then** guest names, roles, and companies are displayed prominently
3. **Given** an episode with formatted show notes (markdown), **When** visitors view the episode page, **Then** show notes render with proper formatting including headings, lists, links, and timestamps
4. **Given** an episode without guests, **When** the episode is displayed, **Then** only host information is shown without empty guest sections

---

### User Story 3 - Visual Content Management (Priority: P2)

As a podcast host, I want to add episode thumbnail images so that the episodes list is visually appealing and helps listeners quickly identify episodes.

**Why this priority**: Visual appeal improves engagement and makes the podcast feel professional. However, episodes can function without custom thumbnails using fallback images.

**Independent Test**: Can be tested by uploading a thumbnail image to the designated folder, referencing it in the episode data, and verifying it displays correctly across all episode views (list, detail, homepage).

**Acceptance Scenarios**:

1. **Given** I have a thumbnail image for an episode, **When** I place the image in the episodes images folder and reference it in the episode data, **Then** the thumbnail displays on the episodes list
2. **Given** an episode thumbnail URL, **When** visitors view the episode, **Then** the thumbnail loads with appropriate responsive sizing
3. **Given** an episode without a thumbnail URL, **When** the episode is displayed, **Then** a default placeholder image is shown
4. **Given** multiple episodes with thumbnails, **When** the episodes page loads, **Then** all thumbnails load efficiently without performance degradation

---

### User Story 4 - Episode Validation (Priority: P3)

As a content manager, I want to receive clear error messages when episode data is malformed so that I can quickly fix issues before deploying.

**Why this priority**: Improves the content management experience and prevents broken episodes from appearing on the site. However, with careful manual editing, basic validation can be handled through testing.

**Independent Test**: Can be tested by intentionally creating invalid episode entries (missing required fields, invalid dates, broken JSON) and verifying that the build process fails with helpful error messages.

**Acceptance Scenarios**:

1. **Given** an episode entry with a missing required field (title, date, or ID), **When** the site builds, **Then** the build fails with a clear error message indicating which field is missing
2. **Given** an episode with an invalid date format, **When** the site builds, **Then** the build fails with a message explaining the expected date format
3. **Given** malformed JSON in the episodes data file, **When** the site builds, **Then** Jekyll reports a clear JSON parsing error
4. **Given** duplicate episode IDs, **When** the site builds, **Then** a warning is displayed indicating which IDs are duplicated

---

### Edge Cases

- What happens when an episode has no duration specified? (Display "Duration TBD" or hide duration field)
- How does the system handle very long episode titles or descriptions? (Truncate in list views, show full text on detail page)
- What if a Spotify URL becomes invalid or changes? (Episode page should gracefully handle broken embeds)
- What happens when multiple episodes have the same date? (Sort by episode ID as secondary sort)
- How are episodes handled that are scheduled for future dates? (Show all episodes regardless of date, or implement filtering in future feature)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow content managers to add new episodes by editing a JSON data file in the repository
- **FR-002**: System MUST support the following episode fields: id (unique identifier), title, description, date, duration, spotifyUrl, thumbnailUrl, topics (array), hosts (array of host IDs), guests (array of guest objects), and showNotes (markdown text)
- **FR-003**: System MUST display episodes in reverse chronological order (newest first) on the episodes page
- **FR-004**: System MUST generate individual episode detail pages accessible via a URL pattern (e.g., /episode/?id=ep001)
- **FR-005**: System MUST embed Spotify players on episode detail pages using provided Spotify URLs
- **FR-006**: System MUST render episode show notes with markdown formatting support (headings, lists, links, code blocks)
- **FR-007**: System MUST display episode thumbnails with fallback to a default image when no thumbnail is specified
- **FR-008**: System MUST support filtering episodes by topics (clicking a topic tag shows related episodes)
- **FR-009**: System MUST display guest information including name, role, and company when guests are present
- **FR-010**: System MUST support episodes with zero, one, or multiple hosts
- **FR-011**: System MUST validate JSON structure on build and fail with clear error messages if data is malformed
- **FR-012**: System MUST support episodes without guests (hosts-only episodes)

### Key Entities

- **Episode**: Represents a single podcast episode with metadata including unique ID, title, description, publication date, audio duration, Spotify URL, optional thumbnail, topic associations, host references, optional guest list, and formatted show notes
- **Guest**: Represents a guest speaker with name, professional role, and company affiliation (embedded within episode data)
- **Topic**: Category tag for episode classification (references existing topics from topics.json)
- **Host**: Podcast host reference via ID (links to existing hosts from hosts.json)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Content managers can add a new episode and see it live on the site within 5 minutes (including Git commit and GitHub Pages build time)
- **SC-002**: Episodes with complete metadata display correctly 100% of the time across all browsers (Chrome, Firefox, Safari, Edge)
- **SC-003**: Episode images load within 2 seconds on standard broadband connections
- **SC-004**: Visitors can navigate from the episodes list to episode details in one click
- **SC-005**: Episode show notes with markdown formatting render identically to preview in markdown editors
- **SC-006**: 95% of episode additions succeed on first attempt without build errors (validated through tracking of successful vs failed deployments over first month)
- **SC-007**: Site build completes successfully with up to 100 episodes without performance degradation

## Assumptions *(mandatory)*

- Content managers have basic knowledge of JSON syntax and Git workflows
- Episodes will be published on Spotify or similar platforms that provide embed URLs
- Episode thumbnails will be created externally (not part of this workflow feature)
- The existing topics.json and hosts.json files are maintained separately
- GitHub Pages build times (typically 1-3 minutes) are acceptable for content publishing
- Content managers have write access to the repository
- Episode IDs follow a sequential pattern (ep001, ep002, etc.) and are manually assigned
- All episode metadata is in English (internationalization not in scope)
- Episode audio files are hosted on Spotify (not self-hosted)

## Dependencies *(optional)*

- Existing Jekyll site structure with _data folder for JSON files
- GitHub Pages hosting and automated builds
- Spotify Web Playback SDK or embed functionality
- Existing topics.json and hosts.json data files
- Image hosting in assets/images/episodes/ folder

## Open Questions / Clarifications Needed

None - specification is complete with reasonable defaults based on existing Jekyll/GitHub Pages architecture and current episode data structure
