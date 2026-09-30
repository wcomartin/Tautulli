# 03 — History

## Overview

The History page shows a paginated, filterable, sortable log of all past watch sessions recorded by Tautulli. It is one of the most-used pages in the app. Admins can delete individual history rows.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| History rows (paginated) | `POST /get_history` with DataTables JSON payload |
| User names list (for filter) | `GET /get_user_names` |
| Stream detail data | `GET /get_stream_data?row_id=X` |
| IP address details | `GET /get_ip_address_details?ip_address=X` |
| Delete rows | `POST /delete_history_rows` (admin only) |

---

## Filters

The filter bar sits above the table and is always visible. Filters are persisted to localStorage and restored on page load.

### Filter Controls

**User selector (admin only)**
- Multi-select dropdown populated from `get_user_names`
- Default: all users selected ("All users")
- Shows "X users" when multiple but not all are selected
- Shows user friendly name when exactly one is selected

**Media type checkboxes** (multi-select toggles)
- Movies (film icon)
- TV Shows (television icon)
- Music (music note icon)
- Live TV (broadcast icon)

**Stream type checkboxes** (multi-select toggles)
- Direct Play
- Direct Stream
- Transcode

**Refresh button** — manually re-fetches the current table state

**Column visibility selector (admin)** — show/hide individual columns

---

## Table Columns

Columns are sortable. Some are hidden by default and can be toggled via the column visibility control.

| Column | Default Visible | Notes |
|--------|----------------|-------|
| Date | ✅ | Date/time session ended |
| User | ✅ | Friendly name, links to user page |
| IP Address | ✅ | Clickable to open IP modal |
| Platform | ✅ | Platform type (Plex Web, iOS, etc.) |
| Product | ❌ | Plex app product name |
| Player | ❌ | Device name |
| Title | ✅ | Media title — clickable to open stream detail |
| Started | ❌ | Session start time |
| Paused | ❌ | Total paused duration |
| Stopped | ❌ | Session stop time |
| Duration | ✅ | Total play duration |
| Progress | ✅ | % complete (icon/bar) |

### Title Column
The title cell shows the full media hierarchy depending on media type:
- Movie: "Movie Title (Year)"
- Episode: "Show Title - S01E01 - Episode Title"
- Track: "Artist - Track Title"
- Live TV: "Show/Movie Title (Live)"

Clicking the title opens the **Stream Detail Modal**.

### Progress Column
Shows a small progress bar + percentage. A "watched" checkmark replaces the bar at 100%.

---

## Stream Detail Modal

Clicking a history row title opens a modal with the full session breakdown.

### Modal Content

**Header:** Media title + user name

**Poster / Art section:**
- Poster thumbnail on the left
- Fanart as the background (blurred)

**Stream Info (same field set as the live activity card):**

*Media info:*
- Title, year, season/episode, library

*Session timing:*
- Date, Started, Stopped, Duration, Paused duration, % complete

*Device info:*
- Platform, product, player, IP address (with geo-lookup link)
- Location (LAN/WAN), bandwidth, quality profile

*Stream decisions:*
- Overall decision (Direct Play / Direct Stream / Transcode)
- Container decision
- Video decision (codec, resolution, HDR, HW flags)
- Audio decision (language, codec, channels)
- Subtitle decision (language, codec, type)

*Transcode details (if applicable):*
- Transcode speed, throttled state
- Hardware decode/encode flags

### UX Improvement
The current stream detail view is a separate page (`stream_data.html`) loaded into a modal. The redesign should make this a proper slide-over panel or modal with clear sections and better visual hierarchy — the current layout is a wall of key/value pairs with no grouping.

---

## Delete Mode (admin only)

A "Delete mode" toggle button activates row selection:
- Each row gets a checkbox
- Checked rows are highlighted
- Exiting delete mode (clicking the button again) triggers a confirmation modal
- Confirmation modal shows count of rows to be deleted
- On confirm: `POST /delete_history_rows` with selected row IDs
- On cancel: selection is cleared, mode exits without deleting

### UX Improvement
The current delete mode is confusing — it's not obvious that you need to toggle the button off to trigger the delete. The redesign should make this clearer: a persistent "Delete X rows" button appears in the toolbar as soon as rows are selected, with a confirmation step. The toggle pattern should be replaced with explicit select-then-delete UX.

---

## Import In-Progress State

When Tautulli is importing history from another database (`database_is_importing = true`), a banner is shown at the top of the page:
- Spinner + "Tautulli is importing history from another database. This could take a few minutes..."
- User can leave and come back

---

## Pagination

Server-side pagination via DataTables. Controls:
- Page size selector (10, 25, 50, 100 rows)
- Page navigation (prev/next/numbered)
- Total record count display

---

## Search

DataTables built-in search filters across visible columns. The search input should be in the filter bar (not buried in the table footer as it is currently).

### UX Improvement
Move the search input into the main filter bar above the table, not below it in the DataTables footer. Make it a prominent text input with a clear button.

---

## Empty State

When no history records match the current filters: "No history found for the selected filters."

---

## Non-Admin View

Non-admin users see only their own history. The user selector filter is hidden. The delete mode button is hidden.
