# Admax — Ads Campaign Manager UI Kit

A **dashboard-first**, production-grade admin kit for ad-campaign tooling. Sunny
amber/gold brand, an orange "spends" accent, candy status colors (green = running
/ income, red = paused / expense, slate = expired), big friendly radii and soft
diffuse shadows. Built on the [uikit.studio](https://uikit.studio) BASE canvas.

- **Dashboard is the first page** (`/`) — KPI tiles with sparklines, the orange
  *Spends Today* / slate *Spends Yesterday* banner, a multi-series Chart Activity,
  a candlestick Transaction Overview, campaign goals, social stats, a target donut,
  click summary and a most-performed list.
- **Campaign** (`/campaign`) — running / paused / expired rows with mini
  candlesticks, target reached, user-insight sparklines and play/pause/stop controls.
- **Social Network** (`/social`) — a filter rail (search + view-by network) beside
  an ad feed with conversion / engagement / likes / comments metrics.
- **Pricing** (`/pricing`) — monthly/yearly toggle and three plans.
- **Components** (`/components`) — every building block: buttons, badges & status
  pills, inputs, avatars & toggles, KPI cards, charts (line / bars / donut /
  sparkline), the color scale and typography.

Runnable, bilingual (EN + AR with full RTL) and dark-mode ready.

## Run it

```bash
cd react
pnpm install
pnpm dev      # http://localhost:5173  (Dashboard)
```

```bash
pnpm build    # production build
pnpm typecheck
```

## Design system

| File | What |
| --- | --- |
| `design/theme.css` | Tailwind v4 tokens — brand scale, light/dark, RTL face, radii, shadows, `brand-gradient` + `mark` utilities |
| `design/tokens.json` | W3C DTCG tokens, kept in sync with `theme.css` |
| `design/tailwind-preset.js` | Tailwind v3 compatibility preset |

**Brand:** amber `#f59e0b` (gradient `#ffcd55 → #e2820a`). **Accent:** orange
`#ff7a45`. **Status:** success `#22c55e`, danger `#f7585b`, info `#4c6ef5`,
grape `#845ef7`. **Type:** Plus Jakarta Sans (display + body), Cairo (Arabic),
JetBrains Mono.

## Components

`react/src/components/` — `button`, `card`, `input` (+ `SearchInput`), `badge`
(+ `StatusPill`), `avatar`, `switch`, `stat-card`, `charts` (`Sparkline`,
`LineChart`, `BarsChart`, `Donut`), `container`, `page-header`. All charts are
dependency-free inline SVG.

## License

MIT © Abdullah Al-taheri ([@KernelCode](https://github.com/KernelCode))
