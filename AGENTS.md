# AGENTS.md — Tayang Ads Campaign Manager kit

A finished, **dashboard-first** admin kit for ad-campaign tooling, built on the
uikit.studio BASE canvas. Truly **flat** design — no gradients, no box shadows;
separation comes from borders + fills. EN/AR + full RTL, light + dark.

## Run

```bash
cd react && pnpm install && pnpm dev   # http://localhost:5173 → Dashboard
```

## Layout of the kit

- `design/theme.css` — Tailwind v4 tokens. Brand = amber `#f59e0b` (scale
  50–900, flat), accent orange `#ff7a45`, status green/red/blue/grape, big radii,
  `--shadow-*: none` (flat), `brand-fill` + `mark` utilities. Dark block + `[dir=rtl]`
  font swap. Keep `design/tokens.json` in sync.
- `react/src/components/` — `button`, `card`, `input` (+`SearchInput`), `badge`
  (+`StatusPill`), `avatar`, `switch`, `stat-card`, `charts` (`Sparkline`,
  `LineChart`, `BarsChart`, `Donut` — dependency-free inline SVG), `container`,
  `page-header`.
- `react/src/routes/` — `layout` (sidebar app shell + topbar), `dashboard` (the
  index `/`), `campaign`, `social`, `pricing`, `showcase`.
- `react/src/i18n/` — `en.ts` (shape of `Dict`) + `ar.ts` (must match), provider
  flips `dir`/`lang` and persists to `localStorage`.

## Conventions

- **Dashboard is the first page** — `{ path: "/", element: <Dashboard/> }` in `main.tsx`.
- Use logical properties for RTL: `ps/pe/ms/me`, `start/end`, `text-start/end`.
- Read tokens via `var(--color-*)` / `rounded-[var(--radius-*)]`; never hardcode
  hex except where documenting the palette (showcase color scale).
- Flat only: do not reintroduce `linear-gradient` or box `shadow`.
- Add a translation key to **both** `en.ts` and `ar.ts` or the build breaks.
