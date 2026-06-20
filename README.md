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
| `design/theme.css` | Tailwind v4 tokens — brand scale, light/dark, RTL face, radii, type scale, `brand-fill` + `mark` utilities (flat: `--shadow-*: none`) |
| `design/tokens.json` | W3C DTCG tokens, kept in sync with `theme.css` |
| `design/tailwind-preset.js` | Tailwind v3 compatibility preset |

This is a **flat** kit: no gradients, no box shadows — separation comes from borders + fills.

### Brand scale

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| `#fff8e6` | `#ffefc2` | `#ffe095` | `#ffcd55` | `#fbb828` | `#f59e0b` | `#e2820a` | `#b9650a` | `#934f0e` | `#78410f` |

### Semantic tokens

| Token | Light | Dark |
| --- | --- | --- |
| background | `#f5f6f8` | `#0f1117` |
| foreground | `#1d2231` | `#eef1f7` |
| card | `#ffffff` | `#181b23` |
| muted | `#eef0f4` | `#20242e` |
| border | `#e9ecf2` | `#272c38` |
| primary | `#f59e0b` | `#fbb828` |
| soft (active pill) | `#fff4d6` | `#2a2415` |

### Status / data accents

| accent | success | danger | info | grape |
| --- | --- | --- | --- | --- |
| `#ff7a45` | `#22c55e` | `#f7585b` | `#4c6ef5` | `#845ef7` |

### Type scale (`--text-*`)

| display | h1 | h2 | h3 | body | caption |
| --- | --- | --- | --- | --- | --- |
| 2.25rem | 1.875rem | 1.5rem | 1.125rem | 0.9375rem | 0.75rem |

Fonts: **Plus Jakarta Sans** (display + body), **Cairo** (Arabic), **JetBrains Mono**.

### Radius (`--radius-*`)

| sm | md | DEFAULT | lg | xl |
| --- | --- | --- | --- | --- |
| 0.375rem | 0.625rem | 0.75rem | 0.875rem | 1.125rem |

### Breakpoints (Tailwind)

`sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 — mobile-first; the sidebar collapses to a drawer below `lg`.

## Components

`react/src/components/` — `button`, `card`, `input` (+ `SearchInput`), `badge`
(+ `StatusPill`), `avatar`, `switch`, `stat-card`, `table` (`Table`/`TH`/`TD` …),
`charts` (`Sparkline`, `LineChart`, `BarsChart`, `Donut`), and `primitives`
(`Checkbox`, `RadioGroup`, `Select`, `Textarea`, `Tabs`, `Progress`, `Skeleton`,
`Tooltip`, `Pagination`), plus `container`, `page-header`. Charts + table are
dependency-free. Every component is shown in all states on `/components`.

## License

MIT © Abdullah Al-taheri ([@KernelCode](https://github.com/KernelCode))
