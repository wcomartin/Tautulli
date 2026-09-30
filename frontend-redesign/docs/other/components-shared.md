# Shared Components

Reusable components used across multiple pages in the Tautulli frontend redesign.

---

## PosterTile

Used in: Recently Added, Media Info (children/related), Home Stats, Library Detail

Props:
- `imageUrl` — poster/cover image URL via `pms_image_proxy`
- `title`
- `subtitle` — year, episode info, album name
- `mediaType` — determines aspect ratio (portrait for video, square for music)
- `href` — navigates to media info page on click
- `badge` — optional overlay badge (e.g. "Added 2 days ago", "4K", "LIVE")
- `live` — boolean, uses live art fallback

Behavior:
- Hover: dim overlay with title + subtitle visible
- Lazy loads image
- Placeholder/skeleton while loading
- Falls back to type-appropriate placeholder image on error

---

## StreamInfoPanel

Used in: Activity card (dashboard), Activity detail page/panel, History stream detail

The scrollable info panel showing stream decisions, network, and device info.

Sections:
1. Device (product, player, quality, optimized/synced flags)
2. Stream decisions (overall, container, video, audio, subtitle)
3. Network (location, IP, bandwidth)

Props:
- `session` — full session/history object
- `compact` — boolean, collapses to a single-column layout for cards
- `adminMode` — shows "Stream" label as clickable raw JSON link

---

## ProgressBar

Used in: Activity cards, Activity detail, History stream detail

Two-layer progress bar: transcode buffer (background) + playback position (foreground).

Props:
- `progressPercent` — playback position 0–100
- `bufferPercent` — transcode buffer 0–100
- `state` — playing/paused/buffering/error/live
- `animate` — boolean, enables client-side tick-up animation

For live TV: renders a solid full-width "LIVE" bar.

---

## StatCard

Used in: Dashboard home stats, Library detail watch stats, User detail stats

A card with a background image that changes on hover, and a ranked list.

Props:
- `statId` — used for API calls and image switching logic
- `title` — card heading
- `items` — array of ranked items (each with thumb, art, title, count/duration, href)
- `metric` — "plays" or "duration"

Behavior:
- Background and poster update on item hover
- Default state shows top item's art
- Clicking an item navigates to the relevant page

---

## DataTable

Used in: History, Users list, Libraries list, User IPs, User Logins, Notification Log, etc.

A standardized wrapper around the table component with consistent:
- Filter/search bar above the table
- Column visibility toggle
- Server-side pagination (prev/next/page size)
- Sortable columns (click header)
- Row click handler
- Empty state slot
- Loading skeleton state
- Optional delete mode with row checkboxes

Props:
- `columns` — column definitions (id, label, visible, sortable)
- `fetchFn` — async function to fetch paginated data
- `filters` — external filter values (media type, user, etc.)
- `onRowClick` — optional row click handler
- `deleteMode` — boolean
- `onDelete` — callback with selected row IDs

---

## IPInfoModal

Used in: Activity cards, History table, User IP addresses tab

Modal showing geo/ISP info for an IP address.

Props:
- `ipAddress`
- `location` — LAN/WAN
- `secure` — boolean
- `relayed` — boolean

Fetches from `get_ip_address_details` on open.

Shows:
- IP address
- Country, region, city
- ISP / organisation
- Secure/insecure indicator
- Relay indicator

---

## StreamDetailPanel

Used in: History table row click

A slide-over panel (right side) or modal showing the full session breakdown for
a historical stream entry.

Contains: StreamInfoPanel + timing info + media header (poster + title).

Replaces the current `stream_data.html` modal pattern.

---

## Toast / Notification System

Global toast positioned bottom-right.

Variants:
- `success` — green, auto-dismisses after 3s
- `error` — red, auto-dismisses after 5s or on click
- `info` — blue, auto-dismisses after 3s
- `loading` — spinner, stays until replaced by success/error

API: `useToast()` composable (Vue) or equivalent.

---

## ConfirmDialog

Used everywhere a destructive action needs confirmation.

Props:
- `title`
- `message`
- `confirmLabel` (default "Confirm")
- `cancelLabel` (default "Cancel")
- `danger` — boolean, makes confirm button red

---

## MediaTypeBadge

Small colored icon badge indicating media type.

Types: movie, episode, track, photo, clip, live, channel

---

## PlatformIcon

SVG icon for Plex platform/player type.

Used in: Activity cards, History table, User player stats

Takes a `platform` string (e.g. "Plex Web", "iOS", "Android TV", "Roku") and
renders the appropriate SVG icon. Falls back to a generic device icon.

---

## ServerStatusIndicator

Used in: Top bar

Small colored dot showing Plex server connection state:
- Green dot: connected
- Yellow dot: connecting/checking
- Red dot: error/unreachable

Tooltip shows server name and last checked time.
Clicking navigates to settings (admin) or shows a status message (non-admin).

---

## BlurHash Placeholder

Used wherever images are loaded lazily (posters, art, avatars).

Renders a BlurHash placeholder while the image loads, then cross-fades to the
real image on load. Prevents layout shift. The current web app already uses
this pattern — carry it forward.
