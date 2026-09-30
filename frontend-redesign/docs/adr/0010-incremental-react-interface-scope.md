# ADR 0010: Migrate the React Interface in Vertical Slices

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The full Tautulli interface includes operational pages, configuration pages,
notifier/newsletter management, and mobile-device administration. Replacing all
areas at once would increase delivery and compatibility risk.

## Decision

Migrate the React interface as independent vertical slices. Start with the
dashboard, then progress through history, users, libraries, graphs, recently
added, media information, logs, and sync. Each migrated page includes its data
contract, permissions, responsive behavior, and non-success states.

Settings, notifier configuration, newsletter configuration, and mobile-device
management are outside the initial React redesign scope. They remain on the
legacy interface until an intentional replacement is specified.

## Consequences

- A React interface release may contain intentional gaps; they must be explicit
  rather than silently handled by an unrelated template or client route.
- Page specifications remain reference material, not a commitment to migrate
  every legacy page in the first release.
- API work and visual work are planned per feature, limiting the scope of each
  increment.
