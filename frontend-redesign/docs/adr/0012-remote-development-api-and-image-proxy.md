# ADR 0012: Proxy Remote Development Data and Images Through Vite

- **Status:** Accepted
- **Date:** 2026-09-30

## Context

The Pulse frontend needs to be developed against real Tautulli data before the
Pulse interface is packaged into a local installation. Artwork is required from
the beginning because activity cards, statistics, and media grids depend on it.

Direct browser requests to a remote Tautulli instance cause CORS and
authentication problems. The standard UI image endpoint, `/pms_image_proxy`,
also requires authentication. Tautulli's API v2 exposes the same image proxy as
the `pms_image_proxy` command when authenticated with an API key.

## Decision

Use opt-in Vite development proxies for remote API and image requests:

- Browser requests use local development paths only:
  `/__pulse/remote/api` and `/__pulse/remote/image`.
- Vite reads the remote URL and API key from uncommitted environment variables,
  forwards the request to the remote instance, and adds the API key server-side.
- The image proxy forwards to `/api/v2?cmd=pms_image_proxy` and preserves image
  transformation parameters such as `rating_key`, dimensions, opacity, and
  fallback.
- Production uses same-origin Tautulli API and image-proxy paths. The Vite
  proxy and remote credentials are never part of the Pulse runtime package.

## Consequences

- `.env.local` may contain developer-specific remote credentials and is ignored
  by Git; `.env.example` documents required variable names without values.
- Components use shared URL helpers rather than embedding remote hosts or API
  keys.
- Remote development works with an instance mounted below an HTTP root because
  the configured remote base path is retained by the proxy.
- API-key scope and remote-instance access remain the developer's
  responsibility; the key must be treated as a development secret.
