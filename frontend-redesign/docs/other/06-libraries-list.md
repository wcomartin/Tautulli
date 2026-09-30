# 06 — Libraries List

## Overview

Lists all Plex libraries registered with this Tautulli instance, with aggregate play
stats and item counts.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| Library list (paginated) | `POST /get_library_list` |
| Refresh from Plex | `GET /refresh_libraries_list` (admin) |
| Delete library | `POST /delete_library` (admin) |
| Purge library history | `POST /delete_all_library_history` (admin) |

---

## Table Columns

| Column | Default Visible | Notes |
|--------|----------------|-------|
| Thumb | ✅ | Library type icon or art thumbnail |
| Library Name | ✅ | Links to library detail page |
| Library Type | ✅ | Movie / TV / Music / Photo / etc. |
| Total Items | ✅ | Movies, Shows, or Artists depending on type |
| Seasons / Albums | ✅ | Parent count |
| Episodes / Tracks | ✅ | Child count |
| Last Streamed | ✅ | Relative timestamp |
| Last Played | ✅ | Title of last item played |
| Total Plays | ✅ | |
| Total Duration | ✅ | |

---

## Controls

**Edit mode (admin only)**
- Delete: removes library record from Tautulli
- Purge: removes all history for that library
- Confirmation modal on exit lists affected libraries

**Refresh libraries button (admin only)**
- Re-syncs library list from Plex

**Column visibility selector**

**Search input** (in toolbar)

---

## UX Improvement

Same as users — the pure table view loses the visual character of libraries.

**Proposed:** Default view as a card grid showing each library as a tile with:
- Library fanart as background (blurred)
- Library type icon
- Library name
- Key counts (e.g. "1,243 Movies" or "45 Shows · 892 Episodes")
- Total plays

Table view available as a toggle for those who want sortable columns. This is
how the mobile app presents libraries and it works much better visually.

---

## Empty State

"No libraries found." with suggestion to check server connection.
