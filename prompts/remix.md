# Remix an existing kit into a new one

Use this when you start from a **finished kit** (Aurora, Spark, Lime, …) instead of
the neutral base. A remix is **not** a recolor — it's a real redesign that reuses the
plumbing (i18n, RTL, dark mode, build setup) but ships a **distinct** product.

> Brief, e.g.: *"Remix this into a healthcare-booking kit — calm teal + warm sand,
> a humanist serif display, rounded everything, a patient dashboard."*

## Rules

1. **New identity.** New palette (full scale + light/dark), new fonts (display +
   body + mono + Arabic), new radius/shadow language. Update `design/theme.css` **and**
   `design/tokens.json`.
2. **New structure.** Re-order and re-compose the pages. Change the hero, swap the
   sections, add/remove signature components so it does **not** read as the source
   kit recolored. If the source had a marquee + bento, yours might have a split-hero +
   testimonial wall + comparison table instead. Diverge on purpose.
3. **New content.** Rewrite `react/src/i18n/{en,ar}.ts` for the new product (EN **and**
   AR). No leftover copy from the source kit.
4. **Keep the plumbing.** i18n provider, dark/lang toggles, `cn`, the contract — reuse.
5. **Stay full.** Same bar as [`build.md`](./build.md): complete design system, full
   landing, full dashboard, full pricing, full components showcase. Light + dark + RTL.
6. **Rename everything.** id, name, brand text, skill (`.claude/skills/<id>`), repo
   URL, `uikit.json`. Then `npx uikit-cli validate`.

Done when someone seeing both kits side by side would never guess one came from the
other.
