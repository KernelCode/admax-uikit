# Build a UI kit from BASE — the brief for your editor

You are turning this **base canvas** into a complete, production-grade **UI kit**
for the [uikit.studio](https://uikit.studio) gallery. This works in any AI editor
(Claude Code, Codex, Cursor, …). The **developer** supplies the creative brief
(the vision, the mood, the product); **this document** tells you how to build it
the uikit way, and — most importantly — **how big and how finished it must be.**

> Paste your brief here, e.g.:
> *"A fintech kit — deep navy + electric mint, a condensed grotesk, glass panels,
> data-dense. A trading-desk dashboard and a high-conversion landing."*

---

## Non-negotiables

### 1. Be ORIGINAL — do not clone another kit
The fastest way to fail is to ship a recolor. **Invent this kit's own structure.**
- Design your **own** hero composition, section order, and page rhythm.
- Design your **own** signature components/flourishes (a kit might have a stat
  ticker, a bento, a pricing slider, a feature accordion, a marquee, a device
  mock — pick what fits *this* brief; don't copy another kit's set).
- Two kits in the gallery must not be recognizable as "the same layout, recolored."
  If you started from an existing kit, **restructure the pages**, don't just retheme.

### 2. Be FULL — a real product, not a sampler
This is the part people cut. **Do not.** Ship a *complete* system:

- **Design system (complete):** a full color scale (50–900 or similar) **plus**
  semantic tokens for **both light and dark**; a real **type scale** (display →
  caption); spacing, radius, shadow, and border tokens. One coherent **mood board**
  applied to *every* surface — no orphan colors, no off-brand components.
- **Components (complete set, every variant + state):** Button (variants/sizes/
  loading/disabled), Input + Textarea + Select + Checkbox + Radio + Switch, Card,
  Badge, Pill/Tag, Avatar, Tabs, Table, Tooltip, Dropdown/Menu, Dialog/Sheet,
  Toast, Pagination, Breadcrumb, Progress, Skeleton — plus this kit's signature
  pieces. Each with hover/focus/active/disabled and dark-mode states.
- **Landing (full, multi-section):** hero, social proof, a rich features section,
  at least one **dark/feature-contrast** section, a secondary content section
  (testimonials / logos / FAQ / comparison — your call), pricing teaser, a big CTA,
  and a real footer. Many sections, real copy, real imagery placeholders.
- **Dashboard (full app screen — show the possibilities):** this is where you
  prove the kit can build a real product, so make it **dense and complete**, not a
  few cards. Include: a persistent **sidebar** (multiple sections) + a topbar
  (search, notifications, user menu); a row of **KPI stat cards** with deltas; **at
  least two charts** (e.g. a trend line/area + a bar/donut); **multiple data
  tables** with realistic rows, sortable headers, status badges, row actions, and
  pagination; a **users / customers** list (avatars, roles, status); an **activity
  feed / timeline**; filters, tabs, and **empty + loading** states. It should look
  like a screenshot of a shipping SaaS, dense with real components.
- **Pricing:** a full page — tiers, a feature matrix or comparison, an FAQ.
- **Components showcase (`/components`):** the "see everything" page — color
  swatches (light + dark), the type scale, fonts, and **every** component in **all**
  its variants. This page is the kit's proof of completeness.

If a page would feel thin next to a real SaaS product, it is not done.

### 3. Be CONSISTENT
One identity, everywhere. Same tokens, same spacing system, same component language
across landing, pricing, dashboard, and showcase. The dashboard and the landing must
clearly belong to the **same** kit.

### 4. Be RUNNABLE + bilingual
- `cd react && pnpm install && pnpm dev` shows the real app — no setup, no missing
  fonts. Load real fonts (self-host the Arabic face if it isn't on Google Fonts).
- **EN + AR with full RTL:** a language toggle, an Arabic typeface, and a layout
  that flips correctly (`dir="rtl"`, logical properties, `text-start`). Translate
  the content, don't leave English in Arabic mode.
- A **dark-mode toggle** that flips every token.

### 5. Be RESPONSIVE
Design **mobile-first**, then enhance up. Every page and component must work at
mobile → tablet → desktop using Tailwind `sm` / `md` / `lg` / `xl`. Nav collapses
to a usable mobile menu; grids reflow; type scales down; the dashboard sidebar
becomes a drawer or a bottom bar on small screens. Never ship a layout that only
looks right at one width. Verify at ~375px, ~768px, and ~1280px.

### 6. Be DOCUMENTED — everything defined and visible
No magic numbers buried in JSX. If a value matters (a **color**, the **radius
scale**, a **font**, a **breakpoint**, a **shadow**) it must live as a **token** in
`design/theme.css` (`@theme`) **and** `design/tokens.json`, **and** be shown in the
**README** (swatch table, type scale, radius scale, breakpoints) **and** reflected
in `uikit.json`. A reader should be able to see the whole system without reading
the components.

> **Tailwind v4 gotcha:** reference a token with `rounded-[var(--radius-lg)]` or the
> shorthand `rounded-(--radius-lg)`. The v3-style `rounded-[--radius-lg]` does **not**
> resolve to `var()` in v4 and silently renders square. The same applies to
> `bg-[var(--…)]`, `shadow-[var(--…)]`, etc.

### 7. Be AGENT-READY — consumable by URL
A finished kit must be reproducible by *another* developer's AI agent from a single
link. Ship, at the repo root:
- **`AGENTS.md`** — tells any agent "this is the `<name>` design; read `llms.txt` +
  `design/`, then reproduce these tokens/fonts/radius/components — no recolor."
- **`llms.txt`** — a self-contained markdown **design brief**: the prompt, the full
  light + dark token tables, fonts, radius, the component inventory and the pages.

Keep both in sync with `design/` and `uikit.json`. When the kit is listed on
uikit.studio, the gallery also generates `/kit/<id>/llms.txt` + `/manifest.json` from
your entry — so *"build me a website with this design: uikit.studio/kit/<id>"* just works.
(The `uikit new` scaffold already drops starter `AGENTS.md` + `llms.txt` in place.)

---

## How this base is wired (use it, don't fight it)

```
design/theme.css       Tailwind v4 @theme tokens (light), .dark block, [dir=rtl] swap
design/tokens.json     the same tokens in W3C DTCG form (keep in sync)
react/src/
  i18n/                en.ts + ar.ts dictionaries + provider (flips dir/lang)
  lib/cn.ts            class-merge helper
  components/          primitives (Button, Card, Input, Badge, Container) — extend these
  blocks/              composed sections (Navbar, Footer, …) — add your own
  routes/              layout.tsx (shell: nav · EN/AR · dark · CTA) + the pages
  routes/landing|pricing|dashboard|showcase.tsx   ← REPLACE these with full pages
```

Everything reads from the tokens, so **theme first**: set the palette + fonts in
`design/theme.css`, then build components against the tokens, then compose pages.

## Definition of done

1. `pnpm dev` shows a complete, original, on-brand product across all four pages.
2. Full design system: light **and** dark, full type scale, every component + states.
3. Landing and dashboard are both *full* screens (see above) — not placeholders.
4. EN + AR + RTL + dark all correct.
5. `npx uikit-cli validate` passes; `uikit.json` describes the real surface.
6. Assets in `screenshots/` (see [§ Assets](#assets-live-in-this-repo) below):
   `landing.png`, `dashboard.png`, `components.png` + a `preview.webm` clip.
7. Agent-ready: `AGENTS.md` + `llms.txt` at the repo root, in sync with `design/`.

## Assets live in THIS repo

Screenshots and a short preview video live in this kit's own `screenshots/` dir —
**they are never committed to the uikit.studio gallery**. When your kit is listed,
the gallery pulls them from here at build time (from your `repo` at `main`) and
serves them from its own CDN. So keep them here, current, and correctly named:

- **`screenshots/landing.png`**, **`dashboard.png`**, **`components.png`** — the
  page captures referenced by your gallery entry (`screenshots[].url`).
- **`screenshots/preview.webm`** — a 5–10s **autoplaying, muted, looping** clip
  that **scrolls** through the kit (a 4:3 frame like 1200×900 matches the gallery
  card). This is what the homepage card plays; if it's absent the card falls back
  to `landing.png`. Record it with any screen recorder, or with the gallery's
  `scripts/record-previews.mjs` (drives the demo and writes the webm here). Keep
  it small (~1–2 MB) — webm/VP8/VP9, no audio.

Filenames in `screenshots/` must match the basenames in your `uikit.json` /
gallery entry exactly, since that's how the build-time fetch finds them.

Then ship it: see [`prompts/extend.md`](./extend.md) to grow it, and
<https://uikit.studio/submit> to list it.
