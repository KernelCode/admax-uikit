# CLAUDE.md

**Admax** — a finished, dashboard-first ads-campaign-manager UI kit (built on the
uikit.studio BASE canvas). Read [`AGENTS.md`](./AGENTS.md) for the full map.

- **Truly flat:** no gradients, no box shadows. Separation = borders + fills.
- **Dashboard is the first page** (`/`). Then campaign, social, pricing, components.
- **Brand:** amber `#f59e0b` / `#fbb828`; accent orange `#ff7a45`; status
  green/red/blue/grape. Fonts: Plus Jakarta Sans + Cairo (AR) + JetBrains Mono.
- **Bilingual + dark:** EN/AR with full RTL (logical properties), light + dark.

Theme lives in `design/theme.css` (+ `design/tokens.json`). Components in
`react/src/components/*`, pages in `react/src/routes/*`. Keep `en.ts` and `ar.ts`
in sync. Run: `cd react && pnpm install && pnpm dev`.
