# ADR 0003: Build the React Interface Ahead of Time

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Tautulli is a self-hosted Python application distributed through existing
package targets. It must not require users to install Node.js or run a Vite
development server to use the redesign.

## Decision

Use React, TypeScript, Vite, and the existing Tailwind-based token setup during
development. Produce static frontend assets during the build process and copy
them into the selectable interface directory for packaging.

Node, npm, and the Vite development server are development/build dependencies
only. They are not production runtime dependencies.

## Consequences

- The frontend build must run before package creation.
- Existing package mechanisms that include the `data` directory can distribute
  the compiled interface without an additional runtime service.
- Source stays in `frontend-redesign/app/`; generated build artifacts are not
  edited by hand.
