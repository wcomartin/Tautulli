# ADR 0009: Default Dense Data to Compact Views and Design All Data States

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Tautulli exposes detailed stream, media, and operational data. Rendering all
technical fields by default makes the dashboard difficult to scan, while API
and server conditions mean that loading, empty, offline, partial, and
permission-limited responses are normal states rather than exceptions.

## Decision

Show the minimum useful information first and reveal technical detail through
deliberate disclosure controls such as an Advanced toggle, detail panel, or
modal. Advanced detail is off by default and may persist per user/browser where
appropriate.

Every data-driven page and reusable data component must have designed loading,
empty, error, offline, partial-failure, and permission-denied behavior. Destructive
actions require confirmation. Focus states and keyboard operation are required;
color alone never communicates critical state.

## Consequences

- Stream cards and similar data-dense components need compact and expanded
  render modes.
- Feature API adapters must expose enough state for the UI to distinguish
  unavailable, empty, stale, and partial data.
- Shared loading, empty, error, toast, and confirmation primitives are first
  implementation priorities.
