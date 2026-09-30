# 02 — Dashboard (Home)

## Overview

The dashboard is the landing page. It shows live stream activity, watch statistics, library statistics, and recently added content. All four sections are configurable — admins can reorder or hide sections.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Live activity | `GET /get_activity` |
| Single session card | `GET /get_current_activity_instance?session_key=X` |
| Home watch stats | `GET /home_stats?time_range=30&stats_type=plays` |
| Library counts | `GET /library_stats` |
| Recently added | `GET /get_recently_added?count=50&media_type=all` |
| Server status | `GET /server_status` |
| Terminate session | `GET /terminate_session` (admin + PlexPass) |
| IP lookup | `GET /get_ip_address_details` |
| Raw session JSON | `GET /get_activity?session_key=X` |

---

## Section 1: Live Activity

### Polling Behavior
- On page load: poll `server_status` every 1 second until Plex is reachable, then begin activity polling
- Poll `get_activity` on a configurable interval (default: user's `home_refresh_interval` setting)
- Progress bars and elapsed time counters interpolate client-side every 1 second between polls
- New session keys trigger a `get_current_activity_instance` fetch to build the card
- Existing sessions update in-place via DOM patching (no full card re-fetch)
- Sessions that vanish between polls are removed from the DOM

### Activity Header Bar
Shown only when ≥1 stream is active. Disappears when idle.

Displays:
- Stream count with breakdown: `3 streams (1 direct play, 1 direct stream, 1 transcode)`
- Total bandwidth: `45.2 Mbps`
- LAN/WAN split: `(LAN: 20.0 Mbps, WAN: 25.2 Mbps)`
- Browser tab title updates: `2 streams | Tautulli`

When no streams are active: show a subtle empty state ("Nothing is currently being played.").

#### UX Improvement
The current header is a plain text line. The redesign should present these as small inline stat chips/badges that are easier to scan at a glance.

### Stream Card

Each active session renders as a card. Cards are laid out in a responsive grid (1 column on mobile, 2 on tablet, up to 3–4 on wide screens depending on stream count).

#### Card Layout

```
┌─────────────────────────────────────────────────────┐
│  [Fanart background, blurred]                       │
│  ┌───────┐  ┌──────────────────────────────────┐   │
│  │Poster │  │ Product       Plex for Apple TV  │   │
│  │       │  │ Player        Living Room TV     │   │
│  │       │  │ Quality       20 Mbps (20.0 Mbps)│   │
│  │       │  ├──────────────────────────────────┤   │
│  │       │  │ Stream        Direct Play         │   │
│  │       │  │ Container     Direct Play (MKV)  │   │
│  │       │  │ Video         H264 1080p          │   │
│  │       │  │ Audio         English - EAC3 5.1 │   │
│  │       │  │ Subtitle      None                │   │
│  └───────┘  ├──────────────────────────────────┤   │
│  [Platform] │ Location  LAN: 192.168.1.x       │   │
│  [Terminate]│ Bandwidth 20.0 Mbps              │   │
│             └──────────────────────────────────┘   │
│  ETA: 10:42 PM          1:23:45 / 2:10:00          │
├─────────────────────────────────────────────────────┤
│  [Buffer bar (transcode progress)]                  │
│  [Playback progress bar]                            │
├─────────────────────────────────────────────────────┤
│  [User avatar]  ▶ Show Title - Episode Title        │
│                    S03 · E07  |  username           │
└─────────────────────────────────────────────────────┘
```

#### Card Header Area (fanart + poster + info panel)

**Background:** Blurred fanart for the media item. For live TV use the live art fallback.

**Poster (left side, hidden on mobile):**
- Movie: movie poster
- Episode: show poster (links to show info page)
- Track: album cover (square)
- Photo: parent album thumb
- Live TV: live poster fallback
- Channel stream: channel icon

**Platform icon:** Top-right of the card, SVG icon per platform (Plex Web, iOS, Android, Apple TV, Roku, etc.)

**Terminate button (admin + PlexPass only):** X icon top-right. Opens a confirmation modal with:
- User name, media title, subtitle
- Optional custom message text field
- Cancel / Terminate buttons

**Info panel (right of poster, scrollable on overflow):**

Three column groups, rendered as a clean key/value list:

*Column 1 — Device info:*
- Product (Plex app name)
- Player (device name)
- Quality profile + bitrate estimate (with tooltip noting it's an estimate)
- Optimized version (if applicable)
- Synced version (if applicable)

*Column 2 — Stream decisions:*
- Stream: Direct Play / Direct Stream / Transcode (Speed: X.Xx) / Transcode (Throttled)
  - "Stream" label is clickable by admins to open raw JSON modal
- Container: Direct Play (MKV) or Converting (MKV → TS)
- Video: codec + resolution + HDR/DV flags, with HW decode/encode indicators
  - e.g. `Transcode (HEVC (HW) 4k HDR → H264 (HW) 1080p SDR)`
  - Only shown for movie/episode/clip/photo
- Audio: decision + language + codec + channel layout
  - Only shown for movie/episode/clip/track
- Subtitle: decision + language + codec, or None
  - Only shown for movie/episode/clip

*Column 3 — Network:*
- Location: LAN or WAN, with lock icon (secure) or unlock icon (insecure)
- IP address: shown, external IPs get a geo-lookup icon (opens IP info modal)
  - Plex Relay indicator if relayed
- Bandwidth: current stream bandwidth (kbps/Mbps/Gbps), with "Streaming Brain estimate" tooltip

**Time row (bottom of info panel):**
- For VOD: `ETA: 10:42 PM` and `1:23:45 / 2:10:00` (ticking up every second client-side)
- For live TV: channel name/call sign (with popover channel thumbnail on hover)

#### UX Improvements to Stream Info Panel
The current design scrolls all three info columns horizontally inside the card, which is awkward on smaller displays. **Proposed:** stack the three column groups vertically within the card's info panel, with a subtle divider between groups. This is easier to read and doesn't require horizontal scrolling.

#### Progress Bars

Two stacked progress bars at the bottom of the card:
- **Transcode buffer bar** (background, lighter): shows how far the transcoder has buffered
- **Playback progress bar** (foreground, accent color): shows current playback position
- Both show percentage tooltip on hover
- For live TV: single solid "LIVE" bar

#### Card Footer (metadata)

Below the progress bars:
- User avatar (links to user detail page)
- Play state icon (▶ playing, ⏸ paused, ⟳ buffering, ⚠ error)
- Media title (links to info page):
  - Movie: "Movie Title"
  - Episode: "Show Title - Episode Title"
  - Track: "Track Title - Artist"
  - Photo: "Album Name"
- Subtitle: year (movie), S03 · E07 (episode), album name (track), channel (live TV)
- Media type icon (film, tv, music, broadcast, cloud for channel streams)
- Friendly name (links to user page)

#### UX Improvement — Card Footer
The current footer has the user avatar and title stacked awkwardly. Propose a cleaner two-row footer: top row for play state + title, bottom row for media type icon + subtitle + user name.

### Play State Icons
Update in real time on each poll:
- ▶ Playing
- ⏸ Paused
- ⟳ Buffering
- ⚠ Error

### Raw Stream Info Modal (admin only)
Opened by clicking the "Stream" label. Shows a formatted JSON dump of the full session object, sorted alphabetically. Title bar shows media title and user.

### IP Info Modal
Clicking the geo-lookup icon next to an external IP opens a modal showing:
- IP address
- ISP / organisation
- City, region, country
- Approximate coordinates
- Secure/insecure indicator
- Relayed indicator

### Terminate Session Modal (admin + PlexPass)
- Confirm modal showing user, title, subtitle
- Optional message field (default: "The server owner has ended the stream.")
- Cancel / Terminate buttons

---

## Section 2: Watch Statistics

Cards showing the top items in each stat category over a configurable time range.

### Controls
- **Metric toggle:** Play Count | Play Duration (radio)
- **Days input:** numeric field, default 30, min 1

Both controls persist to localStorage and re-fetch on change.

### Stat Categories

Each category renders as a card with a scrollable ranked list and an art/poster backdrop that changes on hover:

| Stat ID | Title | Description |
|---------|-------|-------------|
| `top_movies` | Top Movies | Most played movies |
| `popular_movies` | Popular Movies | Most unique user plays |
| `top_tv` | Top TV Shows | Most played TV shows |
| `popular_tv` | Popular TV Shows | Most unique user plays |
| `top_music` | Top Music | Most played artists |
| `popular_music` | Popular Music | Most unique user plays |
| `top_libraries` | Top Libraries | Most played libraries |
| `top_users` | Top Users | Most active users |
| `top_platforms` | Top Platforms | Most used platforms |
| `last_watched` | Last Watched | Most recently watched items |
| `most_concurrent` | Most Concurrent Streams | Peak concurrent stream count |

### Card Behavior
- Background art updates when hovering a list item
- User cards show user avatar as the "poster"
- Platform cards show platform SVG icon and a platform-colored background
- Library cards show library type icon
- Each item in the list is clickable: media → info page, user → user page, library → library page

### UX Improvement
The current stat cards are a custom horizontal scroll list. The redesign should present them as a proper grid of cards (responsive, 2–4 per row depending on viewport), each card having:
- A header with the category title
- The art/backdrop taking up the top half of the card
- The ranked list taking up the bottom half
- Clear hover states on list items

---

## Section 3: Library Statistics

Shows counts for each Plex library (total movies/shows/artists, seasons/albums, episodes/tracks).

### Display
A grid of library stat cards, one per library. Each card shows:
- Library name and type icon
- Total items (movies, shows, or artists)
- Child count (seasons/albums)
- Grandchild count (episodes/tracks)
- Library artwork as background

### UX Improvement
Currently just a row of text-heavy stat tiles. The redesign should use the same card pattern as watch stats, with the library's own art as background.

---

## Section 4: Recently Added

A horizontally scrollable (or paginated) grid of recently added media items.

### Controls
- **Media type filter:** All | Movies | TV Shows | Music | Videos (radio toggle)
- **Count input:** 1–50, default 50
- **Pagination arrows:** left/right to scroll the row

Both controls persist to localStorage and re-fetch on change.

### Item Display
Each item is a poster/cover tile:
- Poster image (or album cover for music)
- Hover overlay showing title, year/episode info
- Clicking opens the info page for that item
- "Added X days ago" badge or timestamp

### UX Improvement
The current implementation is a single horizontally scrolling row, which is very limiting. The redesign should use a responsive grid that wraps to multiple rows, similar to how Plex itself displays recently added content. Pagination arrows can still exist but the primary layout should be a grid, not a carousel.

---

## Section Ordering & Visibility

The dashboard sections are configurable via settings (`home_sections`). The frontend should respect this ordering. Section headers should each have a small collapse toggle so users can minimize sections they don't care about without going to settings.

---

## Empty / Error States

| Scenario | Display |
|---------|---------|
| Plex server unreachable | Error message with link to settings (admin) or generic message (non-admin) |
| Plex Cloud sleeping | "Plex Cloud server is sleeping." |
| No active streams | "Nothing is currently being played." |
| Setup wizard not complete | Message with link to wizard |
| Stats loading | Skeleton loader placeholders |
