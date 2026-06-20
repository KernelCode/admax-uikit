# screenshots/ — your kit's gallery assets

These files live **in this kit's repo** and are the single source of truth for
how the kit looks on [uikit.studio](https://uikit.studio). They are **never
committed to the gallery** — when your kit is listed, the gallery pulls them from
here at build time (from your `repo` at `main`) and serves them from its own CDN.

## What to put here

| File              | Used as              | Notes                                                        |
| ----------------- | -------------------- | ----------------------------------------------------------- |
| `landing.png`     | card photo / poster  | Required. Also the fallback if there's no preview clip.     |
| `dashboard.png`   | detail-page shot     | Recommended.                                                |
| `components.png`  | detail-page shot     | Recommended.                                                |
| `preview.webm`    | homepage card video  | A short scrolling clip — see below.                          |

The basenames here **must match** the `screenshots[].url` and `video` values in
your gallery entry (`/kits/<id>/<file>`), or the build-time fetch can't find them.

## preview.webm — the card clip

A **5–10 second**, **muted**, **autoplaying**, **looping** clip that **scrolls**
through the kit. Aim for:

- **Aspect 4:3** (e.g. `1200×900`) — matches the gallery card.
- **webm** (VP8/VP9), **no audio**, **~1–2 MB**.

If it's missing, the card simply shows `landing.png`.

### Quick way to record it

Any screen recorder works. The gallery repo also ships
`apps/web/scripts/record-previews.mjs`, which serves your built demo, scrolls it
top→bottom, and writes `preview.webm` straight into this folder.
