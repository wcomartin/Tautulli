# Frontend Redesign — React Implementation Plan

## Purpose

Turn the existing redesign specifications and HTML mocks into a maintainable
React application without changing the way Tautulli is distributed. Tautulli is
a self-hosted Python application, so the frontend must be compiled ahead of
time and served by the existing CherryPy server from the packaged application.

This document is a plan only. It does not introduce the React application or
change the current UI.

## Current repository findings

- The current frontend is server-rendered Mako/HTML in
  `data/interfaces/default`, with Bootstrap, jQuery, DataTables, Highcharts,
  and page-specific JavaScript.
- CherryPy serves `data/interfaces` as `/interfaces`, and also exposes
  `/css`, `/js`, `/images`, and `/fonts` as static paths. The application can
  run below a configurable `HTTP_ROOT`, so frontend URLs must be relative to
  that root.
- Existing page and API handlers live in `plexpy/webserve.py`. The documented
  public API is `/api/v2`; many current pages also use internal JSON endpoints
  exposed by the web server.
- There is no existing Node package, JavaScript build pipeline, or frontend CI
  job. The current package build installs Python dependencies and runs
  PyInstaller.
- Both PyInstaller specs include the complete `data` directory. The Dockerfile
  copies the complete repository into the image, and the Snap package follows
  the same repository layout. A compiled frontend placed under `data` will
  therefore be included in all existing distributions.
- Existing redesign documentation covers the global layout, 13 page areas,
  shared components, API notes, responsive behavior, and design tokens. The
  design documents are the source of truth for visual behavior.

## Recommended architecture

### A second selectable interface

The redesign will be shipped as a second Tautulli interface, while
`data/interfaces/default` remains unchanged and remains the default. This is
preferable to a route-by-route migration because users can opt in, compare the
two UIs, and roll back by changing the existing interface setting.

The new interface should have its own stable name (for example `react`) and
live beside `default`:

```text
data/interfaces/
├── default/             # existing interface: do not modify for redesign work
└── react/               # new selectable interface and its built assets
```

Tautulli already has an `INTERFACE` configuration value, uses it when creating
the Mako template lookup, and exposes the available interface directories in
the settings API. The implementation should extend that existing mechanism,
not invent a frontend-only preference or a separate deployment mode.

Before coding, audit and update the few paths that are currently hard-coded to
`interfaces/default` (notably CherryPy's `/images`, `/css`, `/fonts`, and `/js`
static mappings plus image/default-art helpers). The selected interface must
serve its own assets, while shared system resources and legacy behavior must
continue to work for the default interface. Changing the setting should take
effect on the same restart/reload boundary as it does today, and invalid or
missing interface names must safely fall back to `default`.

### Frontend location

Create a self-contained workspace at `frontend-redesign/app/`, with production
output copied to the selectable interface directory:

```text
frontend-redesign/
├── app/                 # React source and frontend package metadata
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── dist/                # generated output; do not edit by hand
├── docs/
└── mocks/
```

The build output should be copied to `data/interfaces/react/` (or the final
agreed interface name), never into `data/interfaces/default`. This gives the
release a natural rollback path and makes it possible to test both interfaces
from the same installation.

### Tooling

Use React with TypeScript and Vite for the new workspace. Use a small set of
focused dependencies:

- React and React DOM
- React Router, configured with the Tautulli HTTP root/base path
- TanStack Query for request caching, loading/error states, polling, and
  invalidation
- A chart library only where the existing graph behavior cannot be retained
- A tested accessible component primitive library, or local primitives, for
  dialogs, popovers, menus, and keyboard interactions
- Vitest plus Testing Library for unit/component tests
- Playwright for end-to-end browser tests

Do not introduce a second global styling framework. Encode the redesign tokens
and shared rules in CSS variables and component styles, using `rem` and the
responsive rules already documented in `design-rules.md`.

### Application boundaries

Organize the React code by responsibility rather than by endpoint alone:

```text
src/
├── app/                 # bootstrap, router, providers, error boundary
├── api/                 # HTTP client, endpoint functions, response parsing
├── auth/                # current user, permissions, login/session behavior
├── components/          # shared visual components
├── features/            # dashboard, history, users, libraries, etc.
├── layouts/             # authenticated shell, login shell
├── routes/              # route definitions and route-level loaders
├── styles/              # tokens, reset, global accessibility styles
├── types/               # API/domain types and type guards
└── utils/               # formatters, URLs, dates, media labels
```

Keep API response shapes separate from view models. Normalize inconsistent or
optional legacy fields in `api/` so components do not need to know whether a
value came from an old endpoint, a missing Plex field, or a permission-limited
response.

## Data and interface strategy

### HTTP client

Build one relative-path client that:

1. derives its base URL from the current Tautulli installation path;
2. sends cookies for the existing authenticated session;
3. handles JSON, empty responses, authentication failures, and server errors;
4. preserves query parameters and supports aborting stale requests;
5. never hard-codes `localhost`, port `8181`, or `/` as the installation root.

Use the existing session/auth flow first. Do not move credentials or API keys
into browser local storage. Admin-only actions must continue to be enforced by
the backend; hiding a button in React is only a presentation concern.

### API inventory before implementation

Before building each feature, record an endpoint contract in a typed module:

- request parameters and defaults;
- success response examples from a real Tautulli instance;
- empty, partial, and error responses;
- required permissions;
- polling or cache policy;
- mutations and invalidation targets.

Start with the endpoints already called by the existing page JavaScript and the
redesign specs. Prefer `/api/v2` when it provides the required data, but use an
existing page endpoint where changing the backend would create unnecessary
compatibility risk. Generate or maintain types from observed contracts rather
than assuming every API field is present.

### Shared data primitives

Implement these first because they cross multiple pages:

- `useCurrentUser` / permission checks;
- server status and reconnect behavior;
- media image URL and BlurHash helpers;
- polling and stale-data indicators;
- paginated/sortable table query state;
- mutation/toast handling;
- date, duration, bandwidth, and media-label formatters;
- platform and stream-decision color mappings.

The existing shared-component specification should be translated into React
components, correcting the explicitly documented transcode color rule (red,
not amber) and preserving the existing image proxy behavior.

## Routing and interface rollout

### Opt-in rollout

Do not replace pages in the default interface. Build the React interface as a
complete selectable experience, allowing temporary gaps to fall back to an
explicitly documented behavior rather than silently rendering the default
interface's templates:

1. Add the interface directory and settings selection without changing the
   default directory.
2. Prove the bundle works under an arbitrary `HTTP_ROOT` and with both
   interface selections.
3. Build the dashboard first, because it exercises polling, images, cards,
   permissions, statistics, and responsive layout.
4. Add history, users, libraries, graphs, recently added, media info, logs,
   and sync in vertical slices.
5. Keep settings and excluded notifier/newsletter/mobile-device areas on the
   existing Mako UI unless the selected interface has an intentional
   replacement. The default interface remains the fallback/reference.
6. Never remove or rewrite legacy templates as part of this project.

### SPA history fallback decision

The current CherryPy setup has no generic SPA fallback. The selected React
interface needs a deliberate shell/fallback implementation before using clean
client-side URLs such as `/history`. It must:

- serves the React HTML shell only for known frontend routes;
- never intercepts `/api`, `/auth`, `/image`, `/pms_image_proxy`, static assets,
  downloads, or existing backend actions;
- respects `HTTP_ROOT` and authentication;
- returns a real 404 for unknown server paths.

The fallback must be interface-aware and must not change responses when
`INTERFACE=default`. During development, hash routing or an existing server
route may be used as a proving ground, but the final React interface should
use the documented clean routes. The final route table must be agreed with the
backend maintainers before implementation.

## Build and packaging plan

### Local development

- `npm ci` installs the locked frontend dependencies.
- `npm run dev` starts Vite with an API proxy to a running Tautulli instance.
- `npm run typecheck`, `npm run lint`, and `npm run test` run without needing
  the packaged Python application.
- `npm run build` emits deterministic production assets.
- `npm run preview` serves the production build for manual checks.

The proxy is development-only. Production requests must be same-origin and
relative, so Docker, installers, Snap, and source installs behave identically.

### Production build

Add a repository-level frontend build step that runs before packaging:

1. install Node using a pinned major version in CI;
2. run `npm ci` from `frontend-redesign/app`;
3. run typecheck, lint, unit tests, and the production build;
4. copy the generated assets into the runtime `data/interfaces/react`
   directory;
5. verify that no source maps, development server references, or environment
   URLs are accidentally shipped (source maps may be retained only in a
   private artifact if needed for diagnostics).

Prefer generating the runtime directory in CI/build staging rather than
committing generated output. If source distributions are expected to build
without Node, publish or package the generated assets as an explicit release
artifact and document that contract. The exact choice should be made before
the first release containing React.

### Existing distribution targets

The existing packaging paths should remain the source of truth:

- **Windows/macOS:** the PyInstaller specs already include `../data`; the
  frontend build must complete before `pyinstaller` runs.
- **Docker:** the image already copies the repository; add the frontend build
  to the Docker/CI process without requiring Node in the final runtime image.
  Use a builder stage or a CI-produced asset directory.
- **Snap:** verify the Snap staging rules include the generated `data` assets.
- **Source installs:** document the built-asset requirement and provide a
  development fallback/error if the React bundle is absent.

The final application image/package should contain static assets only. Node and
the Vite dev server must never be runtime dependencies.

## Delivery phases

### Phase 0 — contracts and infrastructure

- Confirm route ownership and the SPA shell/fallback design.
- Add the frontend workspace, lockfile, formatting/lint/typecheck/test scripts.
- Add CI checks for frontend validation.
- Implement HTTP client, auth context, design tokens, app shell, and error
  boundaries.
- Capture API fixtures from supported Tautulli versions.

### Phase 1 — dashboard vertical slice

- Implement global header/navigation, login state, status indicator, toast,
  responsive layout, and command palette.
- Implement live activity polling and stream cards, including admin actions,
  IP lookup, raw JSON, progress interpolation, and empty/error states.
- Implement watch stats, library stats, and recently added using the shared
  card/tile primitives.
- Run old and new dashboards side by side against the same server.

### Phase 2 — data-heavy pages

- History with server-side table behavior and stream detail.
- Users and user detail.
- Libraries and library detail.
- Media info and related content.

### Phase 3 — analytics and operational pages

- Graphs with parity checks against current graph data.
- Search, recently added full page, logs, and sync.
- Accessibility, mobile, keyboard navigation, and performance pass.

### Phase 4 — release integration and cleanup

- Make frontend build a required packaging prerequisite.
- Test Windows, macOS, Docker, Snap, source install, non-root `HTTP_ROOT`,
  authentication, upgrades, and rollback.
- Do not remove legacy assets as part of the redesign; retain them so users can
  switch back to `default` and so existing installations remain upgrade-safe.
- Update contributor and release documentation.

## Quality gates

Every migrated route should have:

- loading, empty, permission-denied, offline, and server-error states;
- keyboard and screen-reader coverage for navigation, menus, dialogs,
  popovers, tables, and destructive actions;
- responsive checks at the documented breakpoints;
- tests for API parsing and permission-sensitive actions;
- a browser test against a real or fixture-backed Tautulli server;
- visual comparison against the corresponding redesign mock/spec;
- a production-build smoke test from the packaged `data` directory.

Release smoke tests must specifically verify installation under a non-root
`HTTP_ROOT`, because absolute asset URLs are a common failure mode in
self-hosted deployments.

## Decisions to confirm before coding

1. What stable interface name should be used (`react`, `redesign`, or another
   name), and should it be selectable in the existing settings UI immediately?
2. Should generated assets be committed, attached as release artifacts, or
   built in every packaging workflow?
3. Which supported browsers and minimum Node/npm versions should CI enforce?
4. Is a backend SPA fallback acceptable for the selected interface, or must the
   first version preserve server-owned routes and use a transitional mount
   point?
5. Which existing undocumented JSON endpoints are stable enough to consume,
   and which need a typed `/api/v2` addition first?

The recommended defaults are: preserve `default` exactly, add a selectable
`react` interface, CI-generated assets, a pinned current LTS Node version, an
interface-aware CherryPy fallback, and API contracts backed by fixtures before
component work begins.
