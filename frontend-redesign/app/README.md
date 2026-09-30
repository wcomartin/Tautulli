# React frontend scaffold

This is the initial React/TypeScript/Vite scaffold for the selectable frontend
interface. It currently uses local fixture data and is intentionally isolated
from the existing `default` interface.

Tailwind is compiled into the production bundle through the Vite plugin. The
Tautulli theme is defined in `src/styles/tokens.css`, including surface colors,
brand gold, semantic status colors, stream-decision colors, and platform colors.
The V4 HTML mocks use Tailwind utility classes, so their markup can be ported
into React components without recreating every utility in custom CSS.

## Commands

```sh
npm install
npm run dev
npm run typecheck
npm run build
```

The first implementation pass establishes the V4 dashboard shell, responsive
layout, design tokens, and loading/empty/offline/partial states. API contracts,
authentication, routing, and packaging integration are next.
