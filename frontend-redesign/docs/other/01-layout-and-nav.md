# 01 — Global Layout & Navigation

## Overview

The global layout wraps every page. It consists of a two-row header (branding/search/user on top, navigation below) and a full-width content area beneath it. No sidebar.

---

## Decision: Horizontal Navigation

We evaluated several navigation patterns during the design phase:
- Left sidebar (full 220px) — functional but feels dated for a web app
- Icon rail (56px) — too macOS/native-app, bad discoverability on web
- Horizontal top nav, single thin bar — feels like Bootstrap 2013
- **Two-row horizontal header** — chosen. Separates identity/utility from navigation, scales well, feels modern.

---

## Layout Structure

```
┌────────────────────────────────────────────────────────────┐
│  Header Row 1 (56px): Logo · Server Status · Search · User │
├────────────────────────────────────────────────────────────┤
│  Header Row 2 (44px): Nav links · Settings (far right)     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Page Content Area (full width, scrollable)                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Header Row 1 (Identity + Utility)

**Height:** `3.75rem` (scales with fluid type)

### Elements left to right
- **Logo mark** — amber icon in a rounded square container + "Tautulli" wordmark
- **Server status pill** — green dot + server name. Always visible. Clicking shows connection details
- *(spacer)*
- **Command palette trigger** — search box appearance, label "Search or go to…", `⌘ K` key glyphs. Opens full command palette overlay
- **Notification bell** — amber dot badge when unread
- **User menu** — avatar + display name + role (two lines). Dropdown on click

---

## Header Row 2 (Navigation)

**Height:** `2.75rem` (scales with fluid type)

### Nav links
Text + small icon. Active state: amber 2px underline at the bottom edge of the row.

| Label | Route |
|-------|-------|
| Dashboard | `/` |
| History | `/history` |
| Users | `/users` |
| Libraries | `/libraries` |
| Graphs | `/graphs` |
| Recently Added | `/recently_added` |
| *(divider)* | |
| Sync | `/sync` |
| Logs | `/logs` |
| *(spacer — far right)* | |
| Settings | `/settings` |

### Link states
- Default: `color: muted`, no background
- Hover: very faint white background tint (`rgba(255,255,255,0.04)`), color lightens to primary
- Active: color primary white, amber 2px underline anchored to the bottom of the row

---

## Command Palette (`⌘K`)

Full-screen dimmed overlay, centered card (580px wide, ~400px tall).

### Sections
1. **Navigation** — all pages with icon + label + hint text
2. **Recent** — last 5 viewed media items (poster + title + type)
3. **Actions** — Refresh Libraries, Settings, etc.

### Keyboard behavior
- `↑↓` navigates results
- `↵` opens selected
- `ESC` closes
- Typing filters all sections

### Trigger points
- `⌘K` / `Ctrl+K` from anywhere
- Clicking the search box in the header

---

## Fluid Type Scale

```css
html { font-size: clamp(14px, 0.3vw + 10.2px, 17px); }
```

- At 1280px → 14px base
- At 1600px → 15px
- At 1920px → 16.2px
- Caps at 17px

All spacing, header heights, and icon sizes use `rem`/`em` so they scale automatically with viewport width.

---

## Page Content Area

- Full width below the header — no max-width on the page container itself
- Consistent padding: `clamp(1.25rem, 2vw, 2.5rem)`
- Each page manages its own scroll
- Individual content grids may have their own sizing constraints (see Design Rules)

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#111113` | Page background |
| `--surface` | `#1c1c1f` | Cards, header |
| `--surface2` | `#242428` | Hover states, inputs |
| `--surface3` | `#2a2a2f` | Nested surfaces, badges |
| `--border` | `#2e2e33` | All borders |
| `--accent` | `#e5a00d` | Active states, highlights, progress |
| `--muted` | `#888890` | Secondary text, inactive icons |
| `--danger` | `#e5534b` | Destructive actions, errors |
| `--success` | `#3fb950` | Direct play, connected, positive delta |
| `--info` | `#58a6ff` | Direct stream, informational |
| `--text` | `#e2e2e5` | Primary text |

---

## Responsive Behavior

| Breakpoint | Behavior |
|-----------|---------|
| ≥1024px | Full two-row header, all nav links visible |
| 768–1023px | Nav links may truncate; overflow into a "More" dropdown |
| <768px | Header collapses to single row; nav accessible via hamburger drawer |

---

## Toast / Notification System

Bottom-right positioned. Variants:
- `success` — green, auto-dismisses 3s
- `error` — red, auto-dismisses 5s or on click
- `info` — blue, auto-dismisses 3s
- `loading` — spinner, replaced by success/error on completion

---

## Auth / Login Page

Full-screen dark background. Centered card with:
- Tautulli logo (large, amber)
- Username + password fields
- "Remember me" checkbox
- Login button (accent)
- "Sign in with Plex" button (if OAuth configured)

