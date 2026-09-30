# 09 — Media Info (Item Detail)

## Overview

A rich detail page for any Plex media item: movies, shows, seasons, episodes,
artists, albums, tracks, collections, playlists, and live TV. Accessible via
`/info?rating_key=X` or via links from any poster/title in the app.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Item metadata | `GET /get_metadata_details?rating_key=X` |
| Child items | `GET /get_item_children?rating_key=X` |
| Related items | `GET /get_item_children_related?rating_key=X` |
| Watch time stats | `GET /get_item_watch_time_stats?rating_key=X` |
| User stats | `GET /get_item_user_stats?rating_key=X` |
| History | `POST /get_history` filtered by rating_key |
| Children metadata | `GET /get_children_metadata_details?rating_key=X` |
| Search / update metadata | `GET /update_metadata?rating_key=X` |
| Send manual notification | `POST /send_manual_on_created` (admin) |
| Export | `GET /export_metadata_modal` (admin) |

---

## Page Header

**Full-bleed fanart** as the background image (blurred, darkened).
For live TV: live art fallback.

**Breadcrumb navigation** for context:
- Movie: Library → Movie Title
- Episode: Library → Show → Season → Episode N - Title
- Season: Library → Show → Season Title
- Track: Library → Artist → Album → Track

**Core identity block (overlaid on fanart):**
- Poster / cover image (left side on desktop, top on mobile)
- Title (large)
- Edition title (movies, if applicable)
- Content rating badge (PG-13, TV-MA, etc.)
- Year / original air date
- Duration (formatted)
- Genres (tag pills)
- Rating (star display)
- Studio / network

**Action buttons (admin only):**
- Refresh metadata (force re-fetch from Plex)
- Update metadata (search TMDB/TVDB for a different match)
- Send notification (manual "on created" notification)
- Export data

---

## Body Content

### Summary / Description
Full text synopsis.

### Media File Info
Technical details of the media file(s):

- **Container:** MKV, MP4, etc.
- **Video:** Codec, resolution, frame rate, aspect ratio, dynamic range (HDR/DV)
- **Audio:** Codec, channels, language
- **Subtitles:** Available subtitle tracks
- **File path** (admin only)
- **File size**
- **Bitrate**

For items with multiple media versions (e.g. a movie with a 4K and 1080p version),
each version is listed as a separate row.

### Additional Metadata
Context-dependent fields:

| Media Type | Additional Fields |
|-----------|------------------|
| Movie | Directors, Writers, Actors, Studio |
| Episode | Directors, Writers, Guest Stars |
| Show | Studio, Network, Status |
| Artist | Similar artists, genres |
| Album | Label, release date |
| Track | Composer |

Actors/Directors/Writers shown as a horizontal scrollable row of avatar + name chips.
Clicking an actor searches for their other content.

### Children (for container types)
- **Show:** Season grid with poster and episode count per season
- **Season:** Episode list with thumbnail, title, air date, summary
- **Artist:** Album grid with cover art and year
- **Album:** Track list with track number, title, duration
- **Collection:** Poster grid of contained items
- **Playlist:** Ordered item list

Each child is clickable and navigates to its own info page.

### Watch History for This Item
History table filtered to this specific item (or all episodes/tracks for shows/artists).
Same columns as the global history page, with stream detail on click.

### Watch Time Stats
Stat cards for this item:
- All-time plays
- Total duration watched
- Unique users who have watched

### User Stats
Table showing which users have watched this item:
- User avatar + name
- Play count
- Last played date

### Related Items
"More Like This" — related content (same collection, same director, etc.).
Displayed as a horizontal poster grid.

---

## Update Metadata (admin only)

A modal or drawer for re-matching the item against metadata providers.

1. Search field pre-filled with the item title
2. Results list from TMDB/TVDB/MusicBrainz showing potential matches
3. Preview of selected match (poster, year, overview)
4. Apply button — updates the record

---

## UX Improvements

**Current issues:**
- The page is extremely long with everything on one scrolling page and no clear
  sections — it can be overwhelming
- The technical media file info is buried after cast/crew

**Proposed:**
- **Tabbed sections** below the header: Overview | Cast & Crew | Files | History | Stats
  - Overview: summary, genres, related items
  - Cast & Crew (only for video content)
  - Files: technical file info for all versions
  - History: watch history table
  - Stats: watch time + user stats
- **"Open in Plex" button** — the mobile app has this, it should be on web too.
  Deep-links to the item in the Plex web player
- **Copy rating key** button for power users / API debugging
