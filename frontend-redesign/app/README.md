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

## Remote Tautulli development

Pulse can proxy API v2 requests and media artwork from a remote Tautulli
instance during local development. Copy `.env.example` to `.env.local`, then
set a development-only remote URL and API key:

```dotenv
VITE_PULSE_REMOTE=true
TAUTULLI_REMOTE_URL=https://tautulli.example.com
TAUTULLI_API_KEY=your-development-api-key
```

Restart `npm run dev` after changing environment variables. The browser calls
local Vite proxy paths; the remote host and API key stay in the Vite process and
are never exposed to browser code. Use `tautulliApiUrl()` and
`tautulliImageUrl()` from `src/lib/tautulliUrls.ts` rather than embedding API or
image-proxy URLs in a component.
