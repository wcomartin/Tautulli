# ADR 0008: Use a Responsive Two-Row Global Header

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The redesign needs persistent access to Tautulli's main operational areas while
preserving room for server status, global search, notifications, and the user
menu. Sidebar and icon-rail variants were evaluated during prototyping.

## Decision

Use a two-row horizontal header as the shared application shell:

1. An identity and utility row for the Tautulli logo, server status, command
   palette trigger, notifications, and user menu.
2. A navigation row for the primary page links and Settings.

On desktop, navigation is horizontal with text and icons. The active page uses
a gold underline. At narrower widths, navigation may overflow into a More menu;
on mobile it becomes a single-row header with a menu/drawer.

Provide a global command palette, opened by the header search control or
`Ctrl+K`/`Cmd+K`, for navigation, recent media, and common actions.

## Consequences

- Every React page mounts within the same `AppShell` and `AppHeader`.
- Main-page navigation remains discoverable without a persistent sidebar.
- Responsive navigation behavior must be implemented before the interface is
  considered mobile-ready.
