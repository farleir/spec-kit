# Spec-Kit Skill: Cloudflare Pages & Workers Migration

```yaml
name: speckit-cloudflare-migrate
description: Migrates standalone domains and projects into a consolidated Cloudflare infrastructure under subdomains or subpaths (*.farleir.com).
version: 1.0.0
triggers:
  - "/speckit-cloudflare-migrate"
  - "migrate to cloudflare"
```

## Objective
Seamlessly transition independent apps running on costly custom domains (e.g. `frases.bingo`, `analistadebage.com`, `pesquisador.fan`) into Cloudflare Pages or a Cloudflare Worker Router under `farleir.com`, eliminating recurring domain renewal expenses.

## Migration Patterns

### Architecture A: Custom Subdomains (Zero code rewrite)
- `frases.bingo` -> `bingo.farleir.com`
- `analistadebage.com` -> `analista.farleir.com`
- `pesquisador.fan` -> `pesquisador.farleir.com`
- **Setup**:
  1. Add CNAME in Cloudflare DNS for `farleir.com` pointing to the respective `<project>.pages.dev`.
  2. In Cloudflare Pages Dashboard -> Project -> Custom Domains -> Add `xxx.farleir.com`.
  3. No changes to `base` path in `vite.config.ts`.
  4. SSL certificate provisioned automatically by Cloudflare in < 60 seconds.

### Architecture B: Unified Subpath Router (Cloudflare Worker Reverse Proxy)
- `farleir.com/bingo/*` -> proxies to `bingo-cantado.pages.dev`
- `farleir.com/analista/*` -> proxies to `analistadebage.pages.dev`
- `farleir.com/pesquisador/*` -> proxies to `pesquisadora-prod.pages.dev`
- **Requirements**:
  1. `vite.config.ts` must configure `base: './'` or `base: '/<subpath>/'`.
  2. Worker handles HTML streaming rewrite or asset path prefixes.
  3. API functions routed directly under `/<subpath>/api/*`.

## Spec-Kit Execution Steps
1. Run pre-flight build check: `npm run build`.
2. Inspect asset resolution and absolute URL references (`/`, `/api`, `/assets`).
3. Generate `wrangler.json` / `wrangler.toml` for standard Cloudflare deployment.
4. Add 301 Permanent Redirects on old domains to preserve SEO ranking before decommissioning.
