# Quickstart: Adding New Episodes

**Feature**: 002-add-episode-workflow  
**Date**: October 31, 2025  
**Audience**: Content managers, podcast hosts

## Overview

This guide shows you how to add a new episode to the From The Field podcast website. The process takes about 5 minutes and requires basic knowledge of JSON and Git.

---

## Prerequisites

✅ **Git Access**: You have write access to the repository  
✅ **Text Editor**: VS Code, Sublime Text, or similar with JSON syntax highlighting  
✅ **Episode Ready**: Episode published on Spotify with URL  
✅ **Optional**: Episode thumbnail image (800×800px, <150KB)

---

## Quick Steps

1. Clone or pull the latest repository
2. Open `_data/episodes.json`
3. Add your episode object to the array
4. Validate JSON syntax
5. Commit and push
6. Wait ~2-3 minutes for GitHub Pages to build
7. Verify episode appears on site

---

## Detailed Walkthrough

### Step 1: Get the Repository

If you haven't cloned the repo yet:

```bash
git clone https://github.com/HiddeBV/fromthefield.io.git
cd fromthefield.io
```

If you already have it, pull latest changes:

```bash
git pull origin master
```

### Step 2: Create a New Branch (Recommended)

```bash
git checkout -b add-episode-XXX
```

Replace `XXX` with your episode number (e.g., `add-episode-006`).

### Step 3: Open the Episodes Data File

Open `_data/episodes.json` in your text editor.

You'll see an array of episode objects:

```json
[
  {
    "id": "ep001",
    "title": "First Episode",
    ...
  },
  {
    "id": "ep002",
    "title": "Second Episode",
    ...
  }
]
```

### Step 4: Prepare Your Episode Information

Gather the following information:

#### Required Information

| Field | Example | Where to Find |
|-------|---------|---------------|
| Episode ID | `ep006` | Use next sequential number |
| Title | `"Kubernetes Security Best Practices"` | Your episode title |
| Description | `"A deep dive into securing K8s..."` | 50-300 character summary |
| Date | `"2024-03-25"` | Publication date (YYYY-MM-DD) |
| Duration | `"45:00"` | Episode length from Spotify |
| Spotify URL | `"https://open.spotify.com/episode/..."` | Copy from Spotify |

#### Optional Information

| Field | Example | Notes |
|-------|---------|-------|
| Thumbnail URL | `"/assets/images/episodes/ep006.jpg"` | Upload image first |
| Topics | `["kubernetes", "security"]` | Use existing topic IDs |
| Hosts | `["host001", "host002"]` | Use existing host IDs |
| Guests | See guest example below | Guest name, role, company |
| Show Notes | Markdown text | Episode highlights, timestamps |

### Step 5: Add Your Episode Object

#### Option A: Minimal Episode (Fastest)

Add this template to the array:

```json
{
  "id": "ep006",
  "title": "Your Episode Title Here",
  "description": "Your 50-300 character episode description that summarizes the content and includes relevant keywords for SEO.",
  "date": "2024-03-25",
  "duration": "45:00",
  "spotifyUrl": "https://open.spotify.com/episode/YOUR_EPISODE_ID"
}
```

**Remember**: Add a comma after the previous episode object!

#### Option B: Full Episode with All Fields

```json
{
  "id": "ep006",
  "title": "Kubernetes Security Best Practices",
  "description": "A comprehensive guide to securing Kubernetes clusters in production environments, covering RBAC, network policies, pod security, and secrets management.",
  "date": "2024-03-25",
  "duration": "45:00",
  "spotifyUrl": "https://open.spotify.com/episode/abc123xyz",
  "thumbnailUrl": "/assets/images/episodes/ep006.webp",
  "topics": ["kubernetes", "security", "devops"],
  "hosts": ["host001"],
  "guests": [
    {
      "name": "Dr. Sarah Chen",
      "role": "Chief Security Officer",
      "company": "SecureCloud Inc"
    }
  ],
  "showNotes": "## Episode Overview\n\nIn this episode, we explore Kubernetes security best practices...\n\n## Key Topics\n\n- RBAC configuration\n- Network policies\n- Pod security standards\n- Secrets management\n\n## Resources\n\n- [Kubernetes Security Guide](https://kubernetes.io/docs/concepts/security/)\n- [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes)\n\n## Timestamps\n\n- 00:00 - Introduction\n- 05:30 - RBAC Basics\n- 15:00 - Network Policies\n- 25:00 - Pod Security\n- 35:00 - Secrets Management\n- 42:00 - Q&A"
}
```

### Step 6: Position Your Episode

**Where to add it?**

You can add your episode anywhere in the array. The site automatically sorts episodes by date (newest first).

**Recommendation**: Add new episodes at the end of the array for easier Git diffs.

```json
[
  { "id": "ep001", ... },
  { "id": "ep002", ... },
  { "id": "ep003", ... },
  { "id": "ep004", ... },
  { "id": "ep005", ... },
  {
    "id": "ep006",
    "title": "Your New Episode",
    ...
  }  // ← No comma on last item!
]
```

⚠️ **Important**: Don't add a comma after the last episode in the array!

### Step 7: Validate JSON Syntax

Before committing, validate your JSON:

#### Method 1: VS Code
- VS Code automatically validates JSON
- Look for red squiggly lines indicating errors
- Hover over errors for details

#### Method 2: Command Line (if jq installed)
```bash
cat _data/episodes.json | jq . > /dev/null
```

If no output, JSON is valid. If errors, fix them before continuing.

#### Method 3: Online Validator
- Copy your JSON to [jsonlint.com](https://jsonlint.com/)
- Click "Validate JSON"
- Fix any errors reported

#### Common JSON Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Unexpected token }" | Extra comma after last item | Remove trailing comma |
| "Unexpected token ]" | Missing comma between items | Add comma |
| "Unexpected end of JSON" | Missing closing bracket | Add `]` or `}` |
| "Unexpected string" | Missing quote mark | Add missing `"` |
| "Invalid escape character" | Unescaped quote in string | Use `\"` or change to single quote |

### Step 8: Upload Thumbnail (Optional)

If you have a thumbnail image:

1. Save it as: `assets/images/episodes/ep006.jpg` or `.webp`
2. Recommended specs:
   - Dimensions: 800×800px (square)
   - Format: WebP preferred, JPEG/PNG acceptable
   - File size: <150KB
3. Git add the image:
   ```bash
   git add assets/images/episodes/ep006.jpg
   ```

### Step 9: Commit Your Changes

```bash
# Stage the episodes file
git add _data/episodes.json

# If you added a thumbnail
git add assets/images/episodes/ep006.jpg

# Commit with descriptive message
git commit -m "Add episode 006: Kubernetes Security Best Practices"
```

**Good commit message format**:
```
Add episode XXX: [Episode Title]
```

### Step 10: Push to GitHub

```bash
# If on feature branch
git push origin add-episode-006

# Then create Pull Request on GitHub
# After review and merge, continue below

# If pushing directly to master (use caution!)
git push origin master
```

### Step 11: Monitor GitHub Pages Build

1. Go to repository on GitHub
2. Click "Actions" tab
3. Watch for "pages build and deployment" workflow
4. Build typically takes 2-3 minutes

**Build Status**:
- 🟡 Yellow dot: Building in progress
- ✅ Green checkmark: Build succeeded
- ❌ Red X: Build failed (check logs for errors)

### Step 12: Verify Episode on Site

Once build completes:

1. Visit: `https://fromthefield.io/episodes`
2. Find your episode in the list (sorted by date)
3. Click episode to view detail page
4. Verify:
   - ✅ Title displays correctly
   - ✅ Description is accurate
   - ✅ Spotify player loads and works
   - ✅ Thumbnail displays (if provided)
   - ✅ Topics are clickable (if provided)
   - ✅ Guest information shows (if provided)
   - ✅ Show notes render correctly (if provided)

---

## Troubleshooting

### Build Failed: JSON Parse Error

**Symptom**: GitHub Actions build fails with JSON error

**Solution**:
1. Validate JSON syntax using jsonlint.com
2. Common issues:
   - Missing comma between episodes
   - Extra comma after last episode
   - Unescaped quotes in strings
   - Missing closing bracket
3. Fix error, commit, push again

### Episode Doesn't Appear on Site

**Symptom**: Build succeeded but episode not visible

**Possible causes**:

1. **Date is in the future**: Episodes with future dates still show, but check date format
2. **JSON array corrupted**: Validate entire JSON file
3. **Browser cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
4. **Wrong branch**: Ensure you pushed to master (or merged PR)

### Spotify Player Not Loading

**Symptom**: Episode page shows but no audio player

**Possible causes**:

1. **Invalid Spotify URL**: Must be episode URL (not show or playlist)
   - Correct: `https://open.spotify.com/episode/abc123`
   - Wrong: `https://open.spotify.com/show/abc123`
2. **Episode not public**: Verify episode is published and public on Spotify
3. **Browser blocking iframe**: Check browser console for errors

### Thumbnail Not Showing

**Symptom**: Episode displays but no thumbnail image

**Possible causes**:

1. **Image not uploaded**: Verify file exists in `assets/images/episodes/`
2. **Wrong path in JSON**: Check `thumbnailUrl` path is correct
   - Must start with `/` for relative paths
   - Example: `"/assets/images/episodes/ep006.jpg"`
3. **Image too large**: Optimize image, target <150KB
4. **File extension mismatch**: JSON says `.jpg` but file is `.png`

### Topics Not Showing or Clickable

**Symptom**: Topics missing or non-functional

**Possible causes**:

1. **Topic ID doesn't exist**: Check `_data/topics.json` for valid topic IDs
2. **Typo in topic ID**: Topic IDs are case-sensitive
3. **Wrong format**: Must be array of strings, e.g., `["devops", "kubernetes"]`

---

## Advanced: Editing Existing Episodes

To update an existing episode:

1. Find episode by ID in `_data/episodes.json`
2. Edit the desired fields
3. Keep the same `id` (changing ID breaks URLs!)
4. Commit with message: `"Update ep005: fix typo in title"`
5. Push to GitHub

**Common edits**:
- Fix typos in title or description
- Add forgotten guests
- Update show notes with additional links
- Change thumbnail image

---

## Tips & Best Practices

### Episode Naming Convention

- ✅ **Good**: `ep001`, `ep042`, `ep100`
- ❌ **Avoid**: `episode-1`, `EP001`, `e1`

Keep consistent for easier maintenance.

### Description Writing

- **Length**: Aim for 150-160 characters for optimal SEO
- **Keywords**: Include relevant tech keywords naturally
- **Clarity**: Clearly state what listeners will learn
- **No clickbait**: Accurately represent content

### Show Notes Structure

Recommended sections:

```markdown
## Episode Overview
[2-3 sentence summary]

## Key Topics
- Topic 1
- Topic 2
- Topic 3

## Resources Mentioned
- [Resource Title](URL)
- [Another Resource](URL)

## Timestamps
- 00:00 - Introduction
- 05:30 - First topic
- 15:00 - Second topic
```

### Topic Selection

- **Use 2-5 topics** per episode
- **Be specific**: "kubernetes" better than "cloud"
- **Check existing topics** first before requesting new ones
- **Avoid duplicates**: Don't create similar topics

### Guest Information

- **Use full names**: "Dr. Sarah Chen" not "Sarah"
- **Professional titles**: Current role, not past roles
- **Company name**: Official company name

---

## Checklist

Before pushing, verify:

- [ ] Episode ID is unique and sequential
- [ ] Title is descriptive (10-100 characters)
- [ ] Description is 50-300 characters
- [ ] Date format is YYYY-MM-DD
- [ ] Duration format is MM:SS or HH:MM:SS
- [ ] Spotify URL is valid episode URL
- [ ] Thumbnail uploaded (if using)
- [ ] Topics exist in topics.json (if using)
- [ ] Hosts exist in hosts.json (if using)
- [ ] Guest objects complete (if using)
- [ ] Show notes use valid Markdown (if using)
- [ ] JSON syntax is valid (no trailing commas!)
- [ ] Commit message is descriptive

---

## Getting Help

**Documentation**:
- Full data model: `specs/002-add-episode-workflow/data-model.md`
- Data contract: `specs/002-add-episode-workflow/contracts/episode-data-contract.md`
- Feature spec: `specs/002-add-episode-workflow/spec.md`

**Common Questions**:

**Q: Can I schedule episodes for future publication?**  
A: Yes! Add episode with future date. It will appear on site immediately but sorted by date.

**Q: Can I have episodes without guests?**  
A: Yes! Either omit `guests` field or set it to `[]`.

**Q: Can I add multiple hosts?**  
A: Yes! Use array: `["host001", "host002"]`.

**Q: Can I use HTML in show notes?**  
A: No, use Markdown only. HTML tags are filtered for security.

**Q: Can I delete an episode?**  
A: Yes, but rare. Remove episode object from array and commit with reason.

**Q: What if I make a mistake?**  
A: Git history allows you to revert: `git revert HEAD` or restore previous version.

---

## Quick Reference Card

```bash
# 1. Update repo
git pull origin master

# 2. Create branch
git checkout -b add-episode-XXX

# 3. Edit file
code _data/episodes.json

# 4. Validate JSON
cat _data/episodes.json | jq . > /dev/null

# 5. Add thumbnail (optional)
cp ~/my-thumbnail.jpg assets/images/episodes/epXXX.jpg

# 6. Stage changes
git add _data/episodes.json
git add assets/images/episodes/epXXX.jpg  # if added

# 7. Commit
git commit -m "Add episode XXX: [Title]"

# 8. Push
git push origin add-episode-XXX

# 9. Create PR on GitHub or merge

# 10. Monitor build at github.com/[user]/fromthefield.io/actions

# 11. Verify at fromthefield.io/episodes
```

---

## Example: Complete Workflow

Let's add episode 007 step-by-step:

```bash
# Update repo
cd ~/fromthefield.io
git pull origin master

# Create branch
git checkout -b add-episode-007

# Edit episodes file (open in editor)
code _data/episodes.json

# Add this to the array:
{
  "id": "ep007",
  "title": "GitOps: The Future of Kubernetes Deployments",
  "description": "Exploring GitOps principles and tools like ArgoCD and Flux for managing Kubernetes deployments declaratively through Git.",
  "date": "2024-04-15",
  "duration": "48:30",
  "spotifyUrl": "https://open.spotify.com/episode/xyz789abc",
  "thumbnailUrl": "/assets/images/episodes/ep007.jpg",
  "topics": ["kubernetes", "devops", "gitops"],
  "hosts": ["host001", "host002"],
  "guests": [
    {
      "name": "Alex Kim",
      "role": "Senior Platform Engineer",
      "company": "GitOps Solutions"
    }
  ],
  "showNotes": "## Overview\n\nGitOps has revolutionized how we deploy to Kubernetes...\n\n## Topics\n\n- GitOps principles\n- ArgoCD vs Flux\n- Best practices\n\n## Resources\n\n- [GitOps.tech](https://gitops.tech)\n- [ArgoCD Docs](https://argo-cd.readthedocs.io)\n\n## Timestamps\n\n- 00:00 - Intro\n- 05:00 - What is GitOps?\n- 15:00 - ArgoCD Demo\n- 30:00 - Best Practices\n- 45:00 - Q&A"
}

# Save and close editor

# Validate JSON
cat _data/episodes.json | jq . > /dev/null
# (no output = valid)

# Add thumbnail
cp ~/Desktop/ep007-thumbnail.jpg assets/images/episodes/ep007.jpg

# Stage files
git add _data/episodes.json assets/images/episodes/ep007.jpg

# Commit
git commit -m "Add episode 007: GitOps - The Future of Kubernetes Deployments"

# Push
git push origin add-episode-007

# Create PR on GitHub, get approval, merge

# Wait 2-3 minutes for build

# Verify at https://fromthefield.io/episodes
```

Done! 🎉

---

**Last Updated**: October 31, 2025  
**Maintained By**: From The Field Team
