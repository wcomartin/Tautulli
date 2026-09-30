# 10 — Recently Added

## Overview

A grid display of recently added media items across all libraries, with filtering by
media type.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Recently added items | `GET /get_recently_added?count=50&media_type=all` |

---

## Controls (filter bar)

**Media type filter** (radio toggles, single select):
- All (default)
- Movies
- TV Shows
- Music
- Videos (other video content)

**Count input:** 1–50 items (default 50), persisted to localStorage.

Both controls trigger a re-fetch on change.

---

## Item Grid

Responsive grid of poster/cover tiles:

- **1 column:** ≤480px
- **2–3 columns:** 480–768px
- **4 columns:** 768–1280px
- **5–6 columns:** ≥1280px

### Tile Content

- Poster image (portrait for movies/shows, square for music)
- On hover: overlay with title, year/episode info, "Added X ago" badge
- Media type indicator (small icon badge on tile)
- Clicking navigates to the media info page

### UX Improvement

The current implementation is a single horizontally-scrolling row that can only show
a handful of items at a time, requiring arrow-key navigation to see more. This is
a poor use of screen space on desktop.

**Proposed:** Standard responsive grid (wraps to multiple rows). No carousel — just
a natural poster grid, same pattern as Plex's own web interface and the mobile app.
If the user wants more items they increase the count input; no carousel navigation needed.

---

## Empty State

"No recently added items found." — shown when count is 0 or Plex is unreachable.

---

# 11 — Search

## Overview

Global search across the Plex media library. Returns results grouped by media type,
with child items expandable inline.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Search results | `GET /search_results?query=X&limit=10` |
| Children of a result | `GET /get_search_results_children?query=X&media_type=X` |

---

## UI

**Search input:** Large centered input with live search (debounced, ~300ms).
Autofocus on page load. Keyboard shortcut `/` or `Ctrl+K` from anywhere in the
app should focus this input (global shortcut).

**Results list:** Grouped by media type sections:
- Movies
- TV Shows
- Seasons
- Episodes
- Artists
- Albums
- Tracks

Each result shows:
- Poster/thumb thumbnail
- Title
- Year / episode info / album
- Media type icon

Clicking a result navigates to the media info page.

**Expandable children:** Show/season results can expand inline to show their
episodes/tracks, matching the current `get_search_results_children` behavior.

---

## UX Improvement

Search is currently buried — it's a small icon in the navbar that expands a
text input. There's no keyboard shortcut.

**Proposed:**
- Global `Ctrl+K` / `Cmd+K` keyboard shortcut opens a command-palette style
  search overlay (full-screen dimmed overlay with centered search input)
- Results appear inline as you type
- Keyboard navigable (arrow keys + enter)
- `Esc` closes it
- This pattern is familiar from modern apps (GitHub, Linear, Vercel, etc.) and
  significantly improves discoverability

---

# 12 — Logs

## Overview

Four log views behind a tab bar: Tautulli application logs, Plex Media Server logs,
Notification logs, and Newsletter logs.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Tautulli log | `GET /get_log?logfile=tautulli` |
| Plex log files list | `GET /get_plex_log` |
| Notification log | `POST /get_notification_log` |
| Newsletter log | `POST /get_newsletter_log` |
| Delete notification log | `POST /delete_notification_log` (admin) |
| Delete newsletter log | `POST /delete_newsletter_log` (admin) |
| Delete login log | `POST /delete_login_log` (admin) |
| Delete log file | `POST /delete_logs` (admin) |
| Toggle verbose logging | `GET /toggleVerbose` (admin) |
| Download log | `GET /download_log` (admin) |

---

## Tab 1: Tautulli Logs

Raw application log lines.

Controls:
- Log file selector (tautulli.log, tautulli.log.1, etc.)
- Search/filter input (regex-capable)
- Sort: newest first (default) or oldest first
- Verbose toggle (admin) — enables DEBUG level logging
- Download log button (admin)
- Clear log button (admin)

Log display:
- Fixed-width monospace table
- Columns: timestamp, level (colored badge: DEBUG/INFO/WARNING/ERROR), module, message
- Level color coding: DEBUG=grey, INFO=blue, WARNING=orange, ERROR=red
- Auto-scroll to bottom toggle

### UX Improvement
The current log display is a large DataTable which is slow to render for large log
files. **Proposed:** Virtualized list (only render visible rows) for performance.
Log level badges as colored pills, not just text.

## Tab 2: Plex Logs

Same controls as Tautulli logs but fetches from Plex Media Server's log directory.
File selector shows available Plex log files.

## Tab 3: Notification Logs

Paginated table of all notification attempts.

Columns:
- Date
- Notifier name
- Notify action (stream started, etc.)
- Subject
- Body (truncated)
- Status (success/failure)
- Error message (if failed)

Delete all button (admin, with confirmation).

## Tab 4: Newsletter Logs

Paginated table of newsletter send attempts.

Columns:
- Date
- Newsletter name
- Action
- Start/End date range
- Status
- Error message (if failed)

Delete all button (admin, with confirmation).

---

# 13 — Sync

## Overview

Shows Plex sync/download items — content that users have synced for offline playback.
Admin can see all users' synced items; non-admin sees only their own.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Sync items | `GET /get_sync?machine_id=X&user_id=X` |
| Delete sync item | `POST /delete_sync_rows` (admin) |

---

## Layout

Filter controls:
- User selector (admin only, multi-select)
- Sync client selector (if multiple Plex clients)

Table columns:
- User avatar + name
- Sync title (media item)
- Media type icon
- Platform / player
- Status (complete/pending/error)
- Item count
- Total size
- Created date
- Delete button (admin only)

Delete selected rows button with confirmation modal.

---

## Empty State

"No synced items found." — common for servers where no one uses offline sync.

---

## UX Note

The Sync page is low-traffic and relatively simple. The table layout is appropriate
here. Main improvement is moving the search/filter above the table (same pattern
as other pages) and making the delete UX explicit rather than edit-mode-based.
