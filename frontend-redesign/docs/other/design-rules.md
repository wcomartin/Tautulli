# Design Rules

Codified design decisions from the prototyping phase. These rules govern layout,
component behaviour, and visual style across all pages.

---

## 1. Layout

### 1.1 No global max-width on the page container
The page content area fills the full viewport width. Do not add a max-width wrapper
around the entire page. Individual content grids manage their own sizing.

### 1.2 Cards have their own max-width, not their container
When a grid of cards should not stretch on wide screens, cap the card itself:
```css
/* Good */
.stream-card { width: 420px; }

/* Bad */
.stream-card-grid { max-width: 1400px; }
```

### 1.3 Card grids use CSS grid, not flexbox, when row height equality matters
Flexbox wrapping produces uneven row heights. Use `display: grid` when cards in
the same row must be the same height:
```css
/* Good — equal height rows */
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;

/* Bad — rows will be uneven */
display: flex;
flex-wrap: wrap;
```

### 1.4 Use flexbox for grids where cards should NOT stretch when wrapping
When cards should stay at a fixed width and not fill the row on wrap, use flex
with explicit widths, not `flex: 1`:
```css
/* Good — cards stay fixed width when wrapping */
.card { width: 420px; }  /* fixed, never grows */

/* Bad — last card stretches to fill the row */
.card { flex: 1; min-width: 300px; }
```

### 1.5 Activity stream cards use fixed width, not flex-grow
Stream cards cap at `420px`. On wide screens, show more columns rather than
wider cards. The card grid uses `display: flex; flex-wrap: wrap` with fixed
card widths so the container naturally shrinks to content width.

### 1.6 Anchored columns use CSS grid with named areas
When a layout has a right column that must stay anchored regardless of what
wraps on the left (e.g. the stats section), use a two-column CSS grid:
```css
display: grid;
grid-template-columns: 1fr 25vw;
gap: 12px;
```
The right column spans the full height of the left by virtue of grid row
stretching. Do not use flexbox for this — the right column will not stretch.

### 1.7 Content padding scales with viewport
```css
padding: clamp(1.25rem, 2vw, 2.5rem);
```
Never use a fixed `p-6` / `24px` for the main content area padding.

---

## 2. Typography & Scaling

### 2.1 Use fluid type scaling
```css
html { font-size: clamp(14px, 0.3vw + 10.2px, 17px); }
```
All component sizing in `rem`/`em` automatically scales with viewport width.
Never use fixed `px` values for font sizes in components.

### 2.2 Size hierarchy
| Role | Size |
|------|------|
| Page heading | `1.25rem` (`text-xl`) |
| Section heading | `0.875rem` bold, uppercase + tracking |
| Card title | `0.875rem` semibold |
| Body / table | `0.8125rem` (`text-sm`) |
| Caption / label | `0.75rem` (`text-xs`) |
| Micro label | `0.625rem` (used sparingly) |

---

## 3. Cards

### 3.1 Card anatomy
Every card has a consistent structure:
1. **Header** — title + optional secondary label/badge + optional action
2. **Body** — primary content
3. **Footer** — optional, always pinned to the bottom

### 3.2 Footer always pins to bottom
Cards that have a footer (e.g. stream cards with user + terminate button) use
`display: flex; flex-direction: column` on the card and `margin-top: auto` on
the footer. This ensures footers align across cards in the same row regardless
of body content length.

### 3.3 Backdrop images darken with gradient, never lighten
When using media artwork as a card background:
- Apply `opacity: 0.4–0.5` to the image
- Layer a gradient: `from-black/80 via-black/40 to-transparent` (left-to-right
  or bottom-to-top depending on where text sits)
- Text always sits over the dark side of the gradient
- Never rely on the image alone for contrast

### 3.4 Stream type colors — aligned with Tautulli Remote mobile app

Colors sourced directly from the mobile app's `color_palette_helper.dart`
and `graph_helper.dart`. The web must use the same assignments.

**Stream decision badges and indicators:**

| Decision | Color | Hex | Mobile source |
|----------|-------|-----|---------------|
| Direct Play | Plex Gold | `#EBAF00` | `PlexColorPalette.primaryGold` |
| Direct Stream | Near-white | `#EEEEEE` | `TautulliColorPalette.notWhite` |
| Transcode | Red | `#e5534b` | `Colors.red` |

**Graph series colors (line and bar charts):**

| Series | Color | Hex |
|--------|-------|-----|
| Direct Play | Plex Gold | `#EBAF00` |
| TV plays | Plex Gold | `#EBAF00` |
| Direct Stream | Near-white | `#EEEEEE` |
| Movies | Near-white | `#EEEEEE` |
| Transcode | Red | `#e5534b` |
| Music plays | Red | `#e5534b` |
| Live TV | Plex Blue | `#15A9FC` |
| Concurrent / Total | Sea Green | `#69DD58` |

**Critical:** Transcode is **red**, not amber. Gold (`--accent`) is Direct Play
only. The stream type segmented bar in the stats section must follow this —
the initial mock used green/blue/amber which is wrong and must be corrected
when building the real component.

### 3.5 Platform colors — aligned with Tautulli Remote mobile app

Sourced from `TautulliColorPalette.mapPlatformToColor()`:

| Platform | Hex |
|---------|-----|
| Android | `#3DDC84` |
| iOS / macOS / Apple TV | `#A2AAAD` |
| Chromecast | `#4285F4` |
| Roku | `#6732AD` |
| Xbox | `#107C10` |
| Chrome | `#DB4437` |
| Firefox | `#FF7139` |
| Edge / Windows | `#0078D7` |
| Samsung | `#034EA2` |
| Kodi | `#30AADA` |
| Default / unknown | `#EBAF00` |

### 3.6 Paused streams are visually subdued
Paused stream cards use `opacity: 0.8` on the card and muted text for the
username. The progress bar uses `--muted/40` instead of the stream type color.
The play state icon is a static grey pause icon — no pulse animation.

### 3.7 Playing streams have a live pulse indicator
The play state icon uses `animate-pulse` (or equivalent) when `state === 'playing'`.
This stops on pause/buffer so users can distinguish active from paused at a glance
without reading the text.

---

## 4. Progressive Disclosure

### 4.1 Default to the compact view, let users opt into detail
Data-dense sections (stream cards, stat cards) default to showing the minimum
needed to answer "what's happening?" at a glance. Detail is available on demand
via toggle or interaction — never the default.

### 4.2 The "Advanced" toggle pattern
When a section has a compact vs detail mode:
- Toggle sits in the section header, right-aligned
- Uses a pill toggle (not a checkbox)
- Default state: OFF (compact)
- State persists in `localStorage`
- Implementation: single class on `<html>` (`.advanced-on`) driving CSS variables
  for `max-height` and `opacity` transitions — no JS querying individual elements

```css
:root { --detail-h: 0px; --detail-o: 0; }
:root.advanced-on { --detail-h: 500px; --detail-o: 1; }

.detail-rows {
  max-height: var(--detail-h);
  opacity: var(--detail-o);
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
```

### 4.3 Interaction patterns for detail disclosure
In order of preference for this app:

1. **Anchored popover** — click a card, detail appears anchored adjacent to it.
   Nothing else is obscured. Best for data-dense cards in a grid.
2. **Inline expand / accordion** — card expands in place. Good for list rows.
3. **Full page / route** — navigate to a dedicated detail page. Best for deep
   content (user profile, media info). This is what the mobile app does.
4. **Bottom sheet** — not preferred for desktop web.
5. **Side drawer / slide-over panel** — avoided. Feels dated for this type of app.

---

## 5. Statistics Section

### 5.1 Two-tier structure: KPI row + detail cards
Statistics always lead with a summary KPI row (total plays, watch time, unique
viewers, peak concurrent) before the detail cards. This answers the top-level
question ("how active is my server?") without requiring any interaction.

### 5.2 KPI tiles show delta vs previous period
Every KPI tile shows a comparison to the previous equivalent period:
- `↑ 12%` in green for positive
- `↓ 3%` in red for negative
- `— same` in muted for no change

### 5.3 Ranked lists use proportional bar indicators
Each item in a ranked list has a proportional bar showing its share of the
#1 item's count. The #1 item bar is always 100%. This gives visual context
("how much bigger is #1 vs #2?") that bare numbers don't.

### 5.4 The right stats column is always 25vw, anchored
The right column (Top Users, Stream Types, Active Hours) sits in a CSS grid
column at `25vw`, spanning the full height of the left section. It never wraps
or reflows. The left section (media library cards) fills `1fr`.

### 5.5 Media library cards use CSS grid with equal row heights
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;
```
Cards never use `flex: 1` — they do not stretch to fill a partial last row.
A card on a second row stays at `1fr` of 3 columns, not full width.

### 5.6 Stream type breakdown uses a segmented bar
Direct play / direct stream / transcode breakdown is shown as a single horizontal
segmented bar (three segments, color-coded) with percentage labels below.
This is more scannable than three separate stat tiles.

### 5.7 Active hours uses a 24-bar mini chart
One bar per hour (0–23). Peak hour highlighted in amber. No axis labels except
midnight, 6am, noon, 6pm, 11pm. Peak hour labelled below the chart.

---

## 6. Popovers

### 6.1 Popover header has strong contrast, not decorative
The popover header uses a backdrop image with a heavy diagonal dark gradient
(`rgba(0,0,0,0.88)` → `rgba(0,0,0,0.2)` left-to-right) so the left side is
nearly black. Text always sits over the dark side.

An accent-colored 1px line runs across the top of the header to visually
separate it from whatever is behind the popover.

### 6.2 Popovers show identity in the header
User avatar + username + platform, play state badge, and stream type badge all
live in the header. The body contains only technical detail fields. This means
the most human-readable info is immediately visible.

### 6.3 Popover positioning
- Primary: to the right of the triggering element
- Fallback (no room): below the triggering element
- Arrow points back at the triggering element
- Dismisses on: ESC, click outside

### 6.4 Destructive actions in popovers expand inline
Terminate Stream does not open a second modal. It expands an inline form
within the popover itself (message input + cancel/confirm). The popover
stays in place throughout the interaction.

---

## 7. Progress Bars

### 7.1 Two-layer progress bar for transcoded streams
Transcoded streams show two layers:
- Background layer: transcode buffer progress (`rgba(255,255,255,0.08)`)
- Foreground layer: playback position (stream type color)

Direct play/stream shows only the single playback layer.

### 7.2 Progress bar height
- In cards (compact): `6px` (`h-1.5`)
- In detail views (popover, panel): `6px`
- Never thinner than `4px` — too hard to see on dark backgrounds

---

## 8. Terminology in the UI

Consistent labels everywhere:

| Internal | Display label |
|----------|--------------|
| `transcode` | Transcode |
| `copy` | Direct Stream |
| `direct play` | Direct Play |
| `playing` | Playing |
| `paused` | Paused |
| `buffering` | Buffering |
| `wan` | WAN |
| `lan` | LAN |

Never show raw API values (`copy`, `direct play`) directly in the UI.
