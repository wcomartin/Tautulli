# ADR 0002: Ship Pulse as a Selectable Interface

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Tautulli's current interface is a server-rendered interface in
`data/interfaces/default`. Replacing it in place would make visual comparison,
rollback, and staged adoption unnecessarily risky.

## Decision

Ship Pulse, the React redesign, as a separate selectable interface beside the
default interface. The Pulse build will ultimately be deployed to the dedicated
`data/interfaces/pulse/` directory.

The existing `data/interfaces/default` directory remains unchanged and remains
the fallback interface. Selection must extend Tautulli's existing interface
setting rather than introduce a frontend-only preference.

Pulse is distributed as a self-contained interface package. A
user can install it by placing its templates and compiled assets in
`data/interfaces/<interface-name>/` and selecting that interface through the
existing Tautulli setting.

## Consequences

- Users can opt in, compare, and roll back through the established interface
  selection mechanism.
- The existing `/interfaces` static mount can serve package assets from the
  selected interface directory without a new static mount. React templates must
  reference package assets through `/interfaces/<interface-name>/…` (with the
  configured HTTP root), rather than legacy `/css`, `/js`, `/images`, or
  `/fonts` aliases that currently target `default`.
- Legacy templates are a preserved compatibility baseline, not migration input
  to be deleted or rewritten.
