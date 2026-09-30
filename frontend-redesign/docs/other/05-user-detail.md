# 05 — User Detail

## Overview

The User Detail page is a full profile view for a single Plex user. It aggregates
stats, history, player info, IP addresses, and Tautulli login records for that user.
Tabs keep the page organized. Non-admin users can see their own profile only.

---

## API Endpoints

| Data | Endpoint |
|------|---------|
| User details | `GET /get_user?user_id=X` |
| Watch time stats | `GET /user_watch_time_stats?user_id=X` |
| Player stats | `GET /user_player_stats?user_id=X` |
| Recently watched | `GET /get_user_recently_watched?user_id=X&limit=10` |
| History (tab) | `POST /get_history?user_id=X` |
| IP addresses | `POST /get_user_ips?user_id=X` |
| Login history | `POST /get_user_logins?user_id=X` |
| Playlists | `GET /get_playlists_list?user_id=X` |
| Edit user | `POST /edit_user` (admin) |
| Delete user history | `POST /delete_all_user_history` (admin) |
| Logout user session | `POST /logout_user_session` (admin) |
| Export data | `GET /export_metadata_modal?user_id=X` (admin) |

---

## Page Header

**Full-width layout with user identity:**
- Large circular avatar (from Plex or Gravatar)
- Friendly name (large heading)
- Username (secondary)
- Inactive badge if user is no longer on Plex server
- Edit button (pencil icon, admin only) — opens edit user modal/drawer
- Quick stat chips: Total plays · Total duration · Last seen

**Background:** Subtle dark surface, no fanart (user profile, not media)

---

## Tabs

### Profile (default tab)

#### Global Stats
Watch time stats loaded from `user_watch_time_stats`. Displays stat cards for:
- Last 1 day
- Last 7 days
- Last 30 days
- All time

Each card shows: plays count, total duration, most used platform.

#### Player Stats
Platform/player breakdown from `user_player_stats`. Shows each platform used with:
- Platform icon
- Platform name
- Play count
- Last seen

#### Recently Played
Horizontal scrollable row (or small grid) of the last 10 items watched.
Each item: poster thumbnail + title + date.
Clicking navigates to the media info page.

### History Tab
Full history table filtered to this user. Same columns and controls as the global
History page but pre-filtered. No user selector (single user context).

Includes: date, platform, player, title, started, paused, stopped, duration, progress.
Stream detail modal/panel opens on row click.

### Playlists Tab
List of Plex playlists for this user. Shows playlist name, item count, total duration.
Clicking navigates to the playlist media info page.

### IP Addresses Tab (admin only)
Paginated table of all IP addresses seen for this user.

Columns:
- IP Address (with geo-lookup link)
- Friendly name / location
- Last seen date
- Play count from that IP
- Platform
- Player

### Tautulli Logins Tab (admin only)
Paginated table of this user's login history to Tautulli itself.

Columns:
- Date
- IP Address
- Platform / Browser
- Result (success/failure)
- Action (logout button for active sessions)

### Export Tab (admin only)
Interface to export this user's data to CSV/JSON/M3U. Launches the export modal.

---

## Edit User Modal / Drawer (admin only)

Slide-over drawer or modal with editable fields:
- Friendly name (text input)
- Custom avatar URL (text input with preview)
- Email (text input)
- Do notify (toggle) — whether notifications fire for this user
- Keep history (toggle) — whether to record history for this user
- Allowed networks (textarea)

Save / Cancel buttons.

---

## UX Improvements

**Current issues:**
- The current page loads all sections on page load, even inactive tabs, causing
  unnecessary API calls
- The tab list is a horizontal pill nav that overflows on mobile

**Proposed:**
- Lazy-load tab content on first tab activation, not on page load
- Tabs should scroll horizontally on narrow viewports
- The header stat chips give a quick summary without needing to open any tab —
  most users just want "how much has this person watched?" at a glance
- **Add a "Watch History" mini-chart** in the Profile tab: a small sparkline or
  bar chart showing plays per day over the last 30 days, similar to what the mobile
  app shows in user stats. This gives instant visual context.

---

## Non-Admin View

Non-admin users can see their own profile page with:
- Profile tab (stats, player stats, recently played)
- History tab (own history only)
- Playlists tab

IP Addresses, Tautulli Logins, and Export tabs are hidden.
Edit user controls are hidden.
