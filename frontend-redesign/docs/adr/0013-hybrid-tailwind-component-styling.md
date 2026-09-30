# ADR 0013: Use Hybrid Tailwind and Component-Scoped Styling

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

Tailwind utilities make the V4 mock straightforward to port faithfully, but
large utility strings can obscure the anatomy of dense, reusable UI such as
activity cards, statistics, tables, dialogs, and navigation. Recreating every
utility combination as a global CSS class would lose the benefits of Tailwind
and create an unstructured stylesheet.

## Decision

Use a hybrid styling approach:

- Use Tailwind utilities directly in TSX for simple layout, responsive
  visibility, one-off spacing, and page composition.
- Use React components as the primary abstraction for repeated UI.
- Use meaningful component-scoped CSS classes with `@apply` for dense or
  reusable component anatomy, including ActivityCard, StatCard, DataTable,
  PosterTile, shared controls, dialogs, toasts, and global navigation.
- Keep global CSS limited to design tokens, reset/base rules, animations,
  pseudo-elements, and cross-component state selectors.

Do not create generic CSS aliases for individual utility patterns. A class such
as `.activity-card__footer` is appropriate because it represents stable UI
anatomy; a class such as `.dark-card` is not when it only hides a short list of
utilities.

## Consequences

- Initial mock ports may retain longer utility strings until their visual
  behavior is validated.
- Refactoring should first extract repeated markup into React components, then
  introduce semantic component classes only where they improve readability or
  consistency.
- The CSS codebase remains small and semantic while Tailwind tokens and
  responsive utilities remain available at the point of use.
