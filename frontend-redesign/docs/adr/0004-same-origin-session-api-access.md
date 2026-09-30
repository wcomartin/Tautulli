# ADR 0004: Use Same-Origin Session-Authenticated API Access

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The redesign runs within an authenticated Tautulli installation. Tautulli may
also run under a configurable `HTTP_ROOT`, so browser code cannot assume a
localhost host, a fixed port, or an installation-root path.

## Decision

Use one relative-path API client that works from the current installation URL
and sends the existing authenticated session cookies. Do not put Tautulli API
keys or credentials in browser local storage.

Frontend permission checks control presentation only. The existing backend
continues to enforce permissions for every protected endpoint and mutation.

## Consequences

- API calls work when Tautulli is installed below a non-root HTTP path.
- The client must handle JSON, empty responses, auth failures, server failures,
  cancellation, and stale requests consistently.
- Typed feature adapters must normalize raw endpoint responses before UI
  components consume them.
