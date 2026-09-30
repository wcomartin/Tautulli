# 04 — Users List

## Overview

The Users page shows all Plex users who have streamed from the server, with aggregate stats
and quick access to each user's detail page. Admin-only page in most configurations.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| User list (paginated) | `POST /get_user_list` |
| Refresh from Plex | `GET /refresh_users_list` (admin) |
| Delete user | `POST /delete_user` (admin) |
| Purge user history | `POST /delete_all_user_history` (admin) |

---

## Table Columns

| Column | Default Visible | Notes |
|--------|----------------|-------|
| Avatar | ✅ | User profile picture, not sortable |
| User | ✅ | Friendly name, links to user detail page |
| Username | ❌ | Plex username |
| Full Name | ❌ | Real name if available |
| Email | ❌ | Email address |
| Last Streamed | ✅ | Relative timestamp |
| Last Known IP | ✅ | Clickable for IP modal |
| Last Platform | ✅ | |
| Last Player | ❌ | |
| Last Played | ✅ | Title of last item played |
| Total Plays | ✅ | |
| Total Duration | ✅ | Formatted as hours/minutes |

### User column
- Avatar thumbnail (circular) on the left
- Friendly name links to user detail page
- Inactive users (not on Plex server) shown with a warning indicator

---

## Controls

**Edit mode (admin only)**
- Activates per-row controls for delete/purge
- Delete: removes user record entirely
- Purge: removes all history for that user but keeps the user record
- Exiting edit mode with selections triggers a confirmation modal listing affected users

**Refresh users button (admin only)**
- Syncs user list from Plex server
- Shows success/error toast

**Column visibility selector**

**Search input** (should be in the toolbar, not DataTables footer)

---

## UX Improvement

The current page is a pure DataTable with no visual personality — avatars are tiny and easy to miss.

**Proposed:** Add an optional "card grid" view toggle in addition to the table. The card view shows each user as a tile with their avatar, friendly name, last seen timestamp, and total plays — similar to how the mobile app presents users. Power users can switch to the dense table view.

---

## Empty State

"No users found." with a suggestion to check settings if the server isn't connected.

---

## Non-Admin View

Non-admin users do not see this page at all — they are redirected to their own user detail page.
