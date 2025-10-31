<!--
Sync Impact Report
Version change: TEMPLATE → 1.0.0
Modified principles: (initial ratification)
Added sections: Core Principles, Static Site Constraints & Required Assets, Development Workflow, Governance
Removed sections: None
Templates requiring updates:
	- .specify/memory/constitution.md ✅ updated
	- .specify/templates/plan-template.md ✅ updated (Constitution Check gates inserted)
	- .specify/templates/spec-template.md ✅ no changes needed
	- .specify/templates/tasks-template.md ✅ no changes needed
Deferred TODOs: None
-->

# FromTheField.io Constitution

## Core Principles

### 1. Content Quality & Accessibility (NON-NEGOTIABLE)
All published pages MUST use semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`),
provide descriptive `<title>` tags, a unique meta description (50–160 chars), and meaningful alt
text for non-decorative images. Color contrast MUST meet WCAG AA. Headings MUST form a logical
hierarchy (no skipped levels). Rationale: Accessible, well-structured content improves usability,
SEO crawl efficiency, and long‑term maintainability.

### 2. Performance & Static Delivery
Site MUST remain a purely static GitHub Pages build (Jekyll or raw HTML/CSS/JS). No client-side
framework hydration unless explicitly justified in a PR Complexity Tracking note. Each page's
initial HTML (excluding hero imagery) SHOULD load in <200ms on a typical broadband connection and
total critical CSS SHOULD be <50KB. Rationale: Fast static delivery maximizes Core Web Vitals and
search ranking while minimizing maintenance overhead.

### 3. SEO & Discoverability Discipline
Each page MUST declare a canonical URL, structured data (JSON-LD for Site + Organization on root
`index.html`), and be linked in `sitemap.xml`. Filenames, slugs, and internal anchor text MUST be
human-readable and keyword-aligned without stuffing. Robots directives MUST be explicit via
`robots.txt`. Rationale: Consistent metadata and crawl surfaces drive sustainable organic traffic.

### 4. Review & Version Control Integrity
Changes to SEO-critical assets (`index.html`, layout includes, `_config.yml`, `robots.txt`,
`sitemap.xml`) MUST go through a Pull Request with at least one reviewer approval. Each PR MUST
state impact category (`content`, `seo`, `performance`, or `infrastructure`) in its description.
Rationale: Guardrails prevent accidental regressions in discoverability and stability.

### 5. Simplicity & Maintainability
Avoid unnecessary abstractions: Prefer plain HTML + minimal CSS utilities over heavy frameworks.
Dead or unused CSS/JS MUST be removed before merging (goal: <5% unused CSS per Lighthouse report).
Directory structure MUST stay flat and purpose-driven (e.g., `assets/`, `images/`, `css/`).
Rationale: Simplicity accelerates iteration and reduces cognitive + technical load.

## Static Site Constraints & Required Assets

Mandatory root files: `_config.yml`, `index.html`, `robots.txt`, `sitemap.xml`, `favicon.ico`,
`404.html`. `_config.yml` MUST define `url` and `baseurl` correctly for canonical generation.
All HTML pages MUST include: `<title>`, meta description, canonical link tag, open graph title &
description, and viewport meta. JSON-LD (Site + Organization) MUST exist on root `index.html`.
Image assets MUST be optimized (WebP preferred where supported) and width/height attributes set.
CSS MUST be split into critical (`<style>` inline or small file) and non-critical (deferred with
`media="print"` swap or `rel="preload"` followed by `rel="stylesheet"`). No third-party script
unless it provides measurable value; each external script MUST have an owner justification note.

## Development Workflow

1. Author writes or updates content locally ensuring principles 1–3 pass (lint + Lighthouse check).
2. Run local validation (optional script) to generate/update `sitemap.xml` and verify canonical tags.
3. Open PR: include section "SEO Impact" summarizing title/meta/URL changes.
4. Reviewer verifies: accessibility semantics, performance budget, metadata completeness.
5. Merge triggers (manual) re-run of sitemap + broken-link check (documented in project tasks).
6. Quarterly review: audit top pages for outdated content, performance drift, or accessibility issues.

Quality Gates BEFORE merge:
* Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
* No console errors in static build preview.
* No orphan pages (each new page linked from at least one existing page).

## Governance

The Constitution governs content, structure, and review discipline for FromTheField.io. All PRs MUST
assert compliance or list justified exceptions under "Complexity Tracking". Amendments follow:

1. Proposal PR citing affected principle(s) and expected impact (MAJOR/MINOR/PATCH) with rationale.
2. Mandatory reviewer approval (min 1) and performance/accessibility re-check if principles change.
3. Version bump per semantic rules: MAJOR = principle removal or incompatible redefinition; MINOR =
new principle or significant expansion; PATCH = wording clarifications without behavioral impact.
4. On merge: update Constitution version, set `Last Amended` date (ISO), and list changes in Sync
Impact Report comment at top.

Compliance Review: At least quarterly, run accessibility + performance audit and review open issues
for repeated exceptions; systemic violations trigger governance amendment or remediation tasks.

**Version**: 1.0.0 | **Ratified**: 2025-10-27 | **Last Amended**: 2025-10-27
