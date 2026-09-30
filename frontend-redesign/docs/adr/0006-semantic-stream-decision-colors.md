# ADR 0006: Use Consistent Semantic Stream-Decision Colors

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Stream decisions are central to Tautulli's activity, history, and graph views.
Inconsistent colors make streams harder to scan and can misrepresent the
relative cost of a transcode.

## Decision

Use these mappings throughout the redesign:

- Direct Play: Tautulli gold (`#EBAF00`)
- Direct Stream: near-white (`#EEEEEE`)
- Transcode: red (`#E5534B`)

Every color-coded decision also includes an explicit text label or icon.
Colors are expressed through the centralized theme tokens and apply to badges,
progress indicators, legends, and charts.

## Consequences

- Components do not choose arbitrary status colors for stream decisions.
- The UI remains understandable for users who cannot distinguish color alone.
- New dashboard, history, and analytics components share a predictable visual
  vocabulary.
