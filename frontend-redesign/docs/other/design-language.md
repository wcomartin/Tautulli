# Frontend Redesign — Design Language

This is the working visual language for the selectable React interface. It
preserves Tautulli's dark UI and gold accent while making semantic colors,
spacing, states, and interaction rules explicit.

## Principles

1. **Tautulli first:** retain the familiar dark surfaces and Plex-inspired gold
   accent rather than introducing a new brand palette.
2. **Scan before detail:** show the answer to “what is happening?” first; put
   technical detail behind a deliberate disclosure interaction.
3. **Semantic color:** colors communicate stream decisions and system states;
   they are never the only way information is conveyed.
4. **Quiet surfaces, clear edges:** use contrast, spacing, and borders to group
   content instead of excessive shadows or decoration.
5. **Self-hosted by default:** assets are local or served through Tautulli's
   image proxy; the interface must not require a third-party CDN at runtime.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#111113` | Page background |
| `--surface` | `#1c1c1f` | Cards and header |
| `--surface-2` | `#242428` | Inputs, controls, hover surfaces |
| `--surface-3` | `#2a2a2f` | Nested surfaces and badges |
| `--border` | `#2e2e33` | Dividers and card edges |
| `--accent` | `#EBAF00` | Tautulli gold; focus, active UI, Direct Play |
| `--text` | `#E2E2E5` | Primary text |
| `--muted` | `#888890` | Secondary text |
| `--danger` | `#E5534B` | Errors, destructive actions, Transcode |
| `--success` | `#3FB950` | Connected/healthy/positive status |
| `--info` | `#58A6FF` | Informational status only |

The existing mock uses `#e5a00d` for the accent. V4 may retain that value for
legacy visual continuity, but new React tokens should standardize on
`#EBAF00`, the documented Plex gold.

## Stream decision colors

These mappings are mandatory and apply to badges, progress, legends, and chart
series:

- Direct Play: gold `#EBAF00`
- Direct Stream: near-white `#EEEEEE`
- Transcode: red `#E5534B`

Always include a text label or icon with the color. Never communicate a stream
decision through color alone.

Decision badges use a dark, lightly translucent backing with a subtle neutral
border when placed over artwork. Semantic color should be carried by the text
and a small indicator, not by a loud full-badge outline. Avoid unbacked text or
strong shadows over artwork.

## Typography and spacing

- Base type scales fluidly: `clamp(14px, 0.3vw + 10.2px, 17px)`.
- Page content uses `clamp(1.25rem, 2vw, 2.5rem)` padding.
- Page headings are approximately `1.25rem`; body/table text is approximately
  `0.8125rem`; labels are approximately `0.75rem`.
- Use `rem` for component sizing and spacing. Use pixels only where a hairline,
  icon, or progress-bar height genuinely requires it.
- Cards use consistent header/body/footer anatomy. Footers pin to the bottom.

## Interaction and state rules

- Primary actions use gold; destructive actions use red and require confirmation.
- Focus states must be visible and keyboard accessible.
- Hover may enhance content but may not be the only way to discover important
  information.
- Loading, empty, error, offline, and permission-denied states are first-class
  designs, not afterthoughts.
- Reduced-motion preferences disable decorative animation.
- Advanced detail is off by default and persists per user/browser where useful.

## Imagery

- Use Tautulli's image proxy and existing placeholder/BlurHash behavior.
- Do not ship external TMDB, avatar, or font URLs in the production interface.
- Artwork backgrounds always have a dark gradient for text contrast.
- Every meaningful image has useful alternative text; decorative images use an
  empty alt value.

## Responsive behavior

- Desktop: two-row horizontal header and multi-column content.
- Tablet: navigation may collapse into an overflow menu; cards reduce columns.
- Mobile: single-row/header menu, full-width stream cards, stacked statistics,
  and touch-sized controls.
