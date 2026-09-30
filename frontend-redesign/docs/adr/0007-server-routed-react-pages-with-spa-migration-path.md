# ADR 0007: Use Server-Routed React Pages Before a Full SPA

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The React redesign is a selectable Tautulli interface, not a standalone web
service. Tautulli already owns clean page URLs and renders selected-interface
templates through CherryPy. A browser-history SPA would need an interface-aware
fallback that safely distinguishes React routes from API, authentication, image,
download, and legacy backend paths.

Adding that fallback now would create backend work and compatibility risk before
the React interface replaces enough pages to benefit from persistent client-side
navigation.

## Decision

Initially use a server-routed multi-page React architecture.

- CherryPy continues to own the main page URLs and refresh behavior.
- The selected React interface provides a minimal page template and React entry
  for each migrated page.
- Each entry mounts its route-level page inside the shared `AppShell`.
- Header navigation uses normal links to canonical server URLs.
- Vite produces page entries plus shared chunks, so React, layout code, and
  common dependencies are cached rather than duplicated for every page.
- The interface is installable as a self-contained directory under
  `data/interfaces/<interface-name>/`; it uses the existing selected-interface
  template lookup and `/interfaces` static mount rather than new backend routes.
- Unmigrated pages remain intentionally served by the legacy interface or an
  explicitly documented temporary behavior; they are not silently intercepted
  by a generic React fallback.

The URL contract must be router-neutral. React page components receive route
parameters through a small page/bootstrap boundary rather than importing a
client router throughout feature components.

## Consequences

### Positive

- Clean URLs and browser refresh work without a generic SPA fallback.
- The approach fits Tautulli's existing server page model.
- Pages can migrate independently, allowing a deliberate vertical-slice rollout.
- The redesign can be distributed as an installable interface extension instead
  of requiring a patched Tautulli backend.
- The default interface and existing backend routes stay isolated from React
  routing concerns.

### Trade-offs

- Page navigation remounts the React tree and resets transient UI/query state.
- The build needs page-entry/template and asset-manifest wiring.
- Shared navigation cannot provide instant SPA transitions during this phase.

## Future Migration to Browser-History SPA Routing

The architecture intentionally keeps this migration possible. Do not introduce
page-specific assumptions that make it harder.

### Preconditions

Move to a full SPA only when all are true:

1. The React interface covers the primary navigation paths users need.
2. CherryPy can serve an interface-aware React shell for a known route allowlist.
3. The fallback excludes `/api`, `/auth`, `/image`, `/pms_image_proxy`, static
   assets, downloads, and existing backend actions.
4. The fallback respects `HTTP_ROOT`, authentication, selected-interface
   behavior, and real 404 responses for unknown server paths.
5. Automated smoke tests cover direct navigation and refresh at a non-root
   installation path.

### Migration steps

1. Preserve canonical URLs while using server-routed React pages.
2. Keep route-level pages independent of CherryPy templates and keep `AppShell`
   independent of route mechanics by accepting page content as `children`.
3. Add a single React entry document and a browser-history route table using the
   same canonical paths.
4. Replace normal page links with router links inside the React interface only.
5. Add the constrained, selected-interface CherryPy fallback and its regression
   tests.
6. Release the SPA route mode behind the existing selectable interface boundary.
7. Remove per-page React entry templates only after direct loads, refreshes,
   authentication, and legacy-route isolation are proven.

## Rejected Alternatives for the Initial Rollout

### Browser-history SPA now

Rejected for now because it requires backend fallback behavior before the React
interface has sufficient page coverage.

### Hash routing

Rejected for now because it avoids backend work but introduces `#` URLs despite
Tautulli already having clean server routes that can host each page.
