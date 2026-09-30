# ADR 0011: Name the Selectable Interface Pulse

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The redesign needs a stable, recognizable name for interface selection,
distribution, documentation, and release artifacts. The former working name
`react` describes implementation technology rather than the user-facing
experience.

## Decision

Name the new interface **Pulse**. Use lowercase `pulse` as the technical
identifier:

- Interface package directory: `data/interfaces/pulse/`
- Frontend package name: `tautulli-pulse`
- Documentation and release language: “Pulse” or “Pulse for Tautulli”

The existing `default` interface name remains unchanged.

## Consequences

- Package installation and interface selection use a stable, technology-neutral
  identifier.
- Future changes to React, Vite, or routing do not require a branding rename.
- Build/deployment scripts must target `data/interfaces/pulse/`.
