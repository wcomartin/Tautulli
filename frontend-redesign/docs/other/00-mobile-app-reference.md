# Mobile App Reference (Tautulli Remote)

This document summarizes the Tautulli Remote mobile app's design decisions and patterns
that should inform the web frontend redesign for visual and UX consistency.

## Overview

- **Stack:** Flutter (Dart), Material 3 + Cupertino styles
- **State management:** BLoC pattern
- **Repo:** https://github.com/Tautulli/Tautulli-Remote
- **Platforms:** Android and iOS

---

## Features Covered by Mobile App

The mobile app implements most of the same features as the web app.
Design decisions there are relevant reference points.

| Feature | Mobile |
|---------|--------|
| Activity (live streams) | ✅ Single + multi-server |
| Activity details | ✅ Full detail page per stream |
| Terminate stream | ✅ Bottom sheet confirmation |
| History | ✅ Filterable by media type |
| History details | ✅ Full detail page |
| Statistics (home stats) | ✅ |
| Recently added | ✅ |
| Libraries | ✅ Grid with media browsing |
| Users | ✅ |
| User details | ✅ |
| Graphs | ✅ |
| Media info | ✅ Navigable media pages |
| Logs | ✅ |
| Notifications | ✅ (via OneSignal) |
| Multi-server | ✅ Activity grouped per server |
| Settings | ✅ |

---

## Key UX Patterns to Carry Over

### Activity Page (most important)

- **Responsive grid:** 1 column (mobile), 2 columns (580px+), 3 columns (1000px+)
  — same breakpoints should translate well to the web redesign
- **Server activity info card:** A summary card above the stream cards showing total
  stream count (direct play / direct stream / transcode) and bandwidth — shown only
  when streams are active
- **Per-session detail page** (not modal): tapping a stream card navigates to a
  dedicated full-screen detail page rather than an overlay. For web, this could be
  a slide-over panel or dedicated route. The mobile approach of a full page is cleaner
  than a modal for the amount of data shown
- **Auto-refresh pauses when app is backgrounded** — web equivalent: pause polling
  when the tab is hidden (Page Visibility API)
- **Terminate stream via bottom sheet:** message input + confirm button in a bottom
  sheet (web: equivalent modal/drawer)
- **AppBar actions on detail page:** quick links to User Details and Media Info pages
  directly from the activity detail view — good pattern to replicate on web

### Activity Card Design

- Card has a **poster/thumbnail on the left**, with session info filling the right
- Progress bar at the bottom of the card
- Title / subtitle / detail line at the very bottom (outside the card)
- Platform icon visible on the card
- State icon (play/pause/buffer) on the card
- Compact: designed to show as much as possible in a small space

### History

- List-based (not grid)
- Tap to open full detail page
- Filter chips for media type at the top
- Infinite scroll / pagination at the bottom
- Same detail layout as activity details (poster + info)

### Statistics

- Horizontally scrolling cards grouped by stat type
- Each card shows the ranked list with a background image
- Tapping a stat item navigates to the relevant media/user/library page

### Recently Added

- Grid of poster tiles
- Filter toggles at top (All / Movies / TV / Music)
- Tap navigates to media detail page

### Libraries

- Grid of library cards
- Each card shows library name, type icon, item counts
- Tapping navigates into the library's media browser

### Navigation

- **Bottom navigation bar** on mobile (Activity, Statistics, Libraries, Users, More)
- "More" tab holds: Recently Added, Graphs, History, Settings, etc.
- Web equivalent: left sidebar (all items visible, no "More" needed)

### Media Detail Pages

- Full-screen page with large poster/backdrop at top
- Scrollable content below: metadata, children (seasons/episodes/tracks), history
- "Open in Plex" action button — useful to replicate on web too

---

## Design Tokens (Material 3)

The mobile app uses Material 3 theming with dynamic color. The web redesign
should not copy Material 3 literally, but these signal intent:

- Surface colors are dark (dark theme primary)
- Primary container used for progress bar accent
- `onSurface` / `onSurfaceVariant` for text hierarchy
- Error color for terminate button
- Consistent use of `Gap` (spacing) rather than arbitrary margins

---

## Notable Differences from Web App

| Aspect | Web (current) | Mobile | Web (proposed) |
|--------|-------------|--------|----------------|
| Stream grid | Single column stacked cards | Responsive 1/2/3 col grid | Same as mobile |
| Activity detail | Modal overlay | Full page | Slide-over panel or page |
| Terminate | Confirm modal | Bottom sheet w/ message | Modal w/ message |
| Navigation | Top navbar | Bottom tabs | Left sidebar |
| History | DataTable | Infinite scroll list | Table + infinite scroll option |
| Multi-server | Not supported | Grouped per server | Consider adding |

---

## Multi-Server Consideration

The mobile app supports multiple Tautulli servers with activity grouped by server
under sticky section headers. This is a meaningful feature gap in the web app.
The redesign spec should at minimum leave room for this pattern in the activity
layout (server heading above stream cards).
