# Tautulli Frontend Redesign — Feature Spec Index

This directory contains the full feature specification for the Tautulli frontend redesign.
Each document covers one page or major feature area.

## Reference

| File | Description |
|------|-------------|
| [00-mobile-app-reference.md](00-mobile-app-reference.md) | Tautulli Remote mobile app design patterns and UX decisions |
| [design-rules.md](design-rules.md) | Codified design rules from the prototyping phase |

## Pages

| File | Page | Route |
|------|------|-------|
| [01-layout-and-nav.md](01-layout-and-nav.md) | Global Layout & Navigation | N/A |
| [02-dashboard.md](02-dashboard.md) | Dashboard (Home) | `/` |
| [03-history.md](03-history.md) | History | `/history` |
| [04-users-list.md](04-users-list.md) | Users List | `/users` |
| [05-user-detail.md](05-user-detail.md) | User Detail | `/user?user_id=X` |
| [06-libraries-list.md](06-libraries-list.md) | Libraries List | `/libraries` |
| [07-library-detail.md](07-library-detail.md) | Library Detail | `/library?section_id=X` |
| [08-graphs.md](08-graphs.md) | Graphs & Analytics | `/graphs` |
| [09-media-info.md](09-media-info.md) | Media Info / Item Detail | `/info?rating_key=X` |
| [10-13-remaining-pages.md](10-13-remaining-pages.md) | Recently Added | `/recently_added` |
| [10-13-remaining-pages.md](10-13-remaining-pages.md) | Search | `/search` |
| [10-13-remaining-pages.md](10-13-remaining-pages.md) | Logs | `/logs` |
| [10-13-remaining-pages.md](10-13-remaining-pages.md) | Sync | `/sync` |

## Shared Components

| File | Description |
|------|-------------|
| [components-shared.md](components-shared.md) | Reusable components used across multiple pages |

## Notes

- Settings pages are excluded from this redesign phase
- Notifier config, newsletter config, and mobile device management are excluded from this phase
- All data comes from the existing Tautulli API (`/api/v2`) or existing JSON endpoints
- Admin-only features are noted per-section
