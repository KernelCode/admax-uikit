# Extend your kit

Once the kit is built (see [`build.md`](./build.md)), keep it growing **without**
breaking the contract or the identity:

- **New components** go in `react/src/components/`, built against the **tokens** —
  never hard-code a colour or font. Add every variant + state, and show them on the
  `/components` page.
- **New pages/blocks** reuse the existing spacing, radius, and type scale so they
  feel native. Update `react/src/i18n/{en,ar}.ts` (EN **and** AR).
- **Keep the manifest honest** — when you add a component/template, add it to
  `uikit.json` and re-run `npx uikit-cli validate`.
- **Keep dark mode + RTL working** for everything new.

To make a genuinely different kit from this one, don't extend — **remix** it. See
[`remix.md`](./remix.md).
