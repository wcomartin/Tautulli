# ADR 0005: Use Tautulli-Managed Images and Local Runtime Assets

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Tautulli is self-hosted and must remain usable without third-party runtime
dependencies. The visual mock used remote TMDB and avatar URLs for convenience,
which is not acceptable for the production interface.

## Decision

Use Tautulli's image proxy and existing placeholder/BlurHash behavior for
media artwork. Bundle application assets, such as the shared Tautulli logo,
with the React application. Do not depend on external TMDB, avatar, font, or
CDN URLs at runtime.

## Consequences

- Production UI image URLs require an image-proxy adapter rather than direct
  mock URLs.
- Image components need loading, error, and type-appropriate fallback states.
- Bundled visual assets are versioned and available offline with Tautulli.
