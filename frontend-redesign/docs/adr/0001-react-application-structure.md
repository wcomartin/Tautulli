# ADR 0001: React Application Structure

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The selectable redesign is a Vite/React application that will grow from the
dashboard into the complete Tautulli interface. The existing mock port began
as a single dashboard implementation, but keeping page composition, reusable
layout, domain-specific UI, fixtures, and future API code together would make
the application difficult to navigate and test.

The team is also familiar with Vue conventions such as route-level `pages`,
shared `components`, and feature-local composables. The React structure should
provide similarly discoverable boundaries without forcing all components into
a global directory.

## Decision

Use a shared application shell and a feature-first folder structure.
Route-level page components compose features; they do not contain all domain UI
or API logic. The current delivery model is server-routed React pages; ADR 0007
records the eventual SPA migration path.

```text
src/
├── app/
│   └── router.tsx             # route table and route-level redirects
├── assets/                    # bundled static assets, such as the logo
├── components/
│   ├── layout/                # AppShell, AppHeader, CommandPalette
│   └── ui/                    # generic reusable controls and states
├── features/
│   └── dashboard/
│       ├── components/        # dashboard-specific visual sections
│       ├── dashboardApi.ts    # dashboard API adapter/query functions
│       ├── dashboardData.ts   # temporary fixtures only
│       └── dashboardTypes.ts  # feature domain types
├── hooks/                     # reusable React hooks (Vue composable analogue)
├── lib/
│   ├── api/                   # API client, raw contracts, shared transport
│   ├── formatters.ts
│   └── imageProxy.ts
├── pages/                     # route-level components
│   ├── DashboardPage.tsx
│   ├── HistoryPage.tsx
│   └── ...
└── styles/                    # global theme tokens and narrowly global CSS
```

### Page composition

- `AppShell` owns the persistent header, navigation, and command palette.
- Every React page is rendered inside `AppShell`, ensuring a consistent header
  and navigation.
- CherryPy owns navigation between main pages during the initial rollout.
- Navigation uses canonical server URLs and normal links; avoid `.html` URLs.
- Placeholder pages receive their own files now, even when they share a
  temporary placeholder component, so each can evolve independently.

### Component ownership

- Put a component in `components/ui` only when it is generic and does not know
  about a Tautulli feature (for example `Button`, `Card`, `LoadingState`).
- Put shared persistent chrome in `components/layout`.
- Put feature-specific UI next to its types, fixtures, API adapter, and tests
  in `features/<feature>`.
- Keep `pages` thin: page-level layout, route parameters, and composition of
  features only.

### Data ownership

Fixture data remains feature-local during visual development. When integrating
the backend, replace fixtures through typed feature adapters rather than
allowing raw Tautulli API responses to spread through components. Shared HTTP
behavior and raw response contracts belong in `lib/api`.

## Consequences

### Positive

- Route ownership is obvious and maps closely to a Vue `pages` directory.
- Shared layout is implemented once and is consistent across every route.
- Features can be developed, tested, and eventually lazy-loaded independently.
- Mock fixtures can be replaced incrementally with API adapters.
- Generic UI stays reusable without becoming a catch-all for feature code.

### Trade-offs

- Small features may initially have several files; avoid creating folders until
  the feature has meaningful feature-local code.
- A nested client-side route requires the eventual CherryPy integration to
  serve the React entry document as an SPA fallback on refresh.
- Existing mock-faithful markup should be extracted gradually to avoid visual
  regressions; structural cleanup must not become a redesign.

## Current implementation

The application currently has `AppShell`, `AppHeader`, `CommandPalette`, a
temporary React Router scaffold, and independent placeholder page files. The
router scaffold is a development aid and will be replaced by server-routed page
entries under ADR 0007. Dashboard-specific components are still directly in
`src/features/dashboard` from the initial port. As dashboard work continues,
they should move under `src/features/dashboard/components` alongside typed
fixtures and future API files.
