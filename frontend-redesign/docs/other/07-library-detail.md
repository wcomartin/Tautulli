# 07 — Library Detail

## Overview

Deep-dive view for a single Plex library. Shows media file info, watch stats, collections,
playlists, and recently added/watched content.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Library info | `GET /get_library?section_id=X` |
| Watch time stats | `GET /library_watch_time_stats?section_id=X` |
| User stats | `GET /library_user_stats?section_id=X` |
| Media info table | `POST /get_library_media_info?section_id=X` |
| Collections | `GET /get_collections_list?section_id=X` |
| Playlists | `GET /get_playlists_list?section_id=X` |
| Recently watched | `GET /library_recently_watched?section_id=X` |
| Recently added | `GET /library_recently_added?section_id=X` |
| Delete media info cache | `POST /delete_media_info_cache?section_id=X` (admin) |
| Delete duplicate libraries | `POST /delete_duplicate_libraries` (admin) |
| Edit library | `POST /edit_library` (admin) |

---

## Page Header

- Library name (heading)
- Library type icon
- Breadcrumb: not needed (flat nav)
- Quick stats: total items, total plays, last streamed

---

## Tabs

### Media Info (default)
Paginated, sortable table of every media item in the library.

Columns vary by library type:

**Movies / Episodes:**
- Title
- Year
- Rating
- Duration
- File size
- Bitrate
- Video resolution (4K, 1080p, etc.)
- Video codec (H264, HEVC, AV1, etc.)
- Audio codec
- Audio channels
- Container

**Music (Tracks):**
- Title
- Artist
- Album
- Duration
- File size
- Bitrate
- Audio codec
- Audio channels
- Container

Includes a "Refresh file sizes" action (admin) which triggers background recalculation.

### Watch Stats
Stats cards matching the home stats format:
- Watch time by day (last 1 / 7 / 30 days / all time)
- Plays by day range

### User Stats
Table of users who have watched content from this library:
- User avatar + name
- Play count
- Total duration
- Last played

### Collections
Grid of collection tiles. Each shows:
- Collection poster
- Collection name
- Item count
Clicking navigates to the collection's info page.

### Playlists
List of playlists containing items from this library:
- Playlist name
- Item count
- Duration
Clicking navigates to playlist info page.

### Recently Watched
Horizontal scrollable row (or small grid) of the last 10 watched items.

### Recently Added
Horizontal scrollable row (or small grid) of the most recently added items.

---

## Edit Library (admin only)

Small inline form or slide-over drawer:
- Custom library name
- Custom library thumbnail
- Do notify (toggle)
- Keep history (toggle)

---

## UX Improvements

The current library page uses tabs but the tab content areas feel disconnected from the
header. **Proposed:**
- Sticky library header (name + type icon + quick stats) that stays visible while
  scrolling tabs
- The Media Info tab should support column visibility toggles like the main library
  media info — the current version hides too many useful columns by default
- Add a "file format breakdown" mini-chart in the Media Info tab — a small donut/bar
  showing distribution of codecs or resolutions. This gives at-a-glance insight into
  whether the library is 4K/HDR heavy, for example.
