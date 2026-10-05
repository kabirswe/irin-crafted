# Irin Crafted

Luxury private chef website — **Laravel 12 + Inertia + React 19 + Tailwind CSS v4**,
animated with **GSAP** (ScrollTrigger, SplitText) and Lenis smooth scrolling.

The interface was designed against a captured reference (the Veyssette private
chef template kit) and then extended: richer art direction, real interactions,
accessible markup and motion that respects the reader.

---

## Quick start

### UI preview — no PHP required

```bash
npm install
npm run preview -- --port 5173 --host 0.0.0.0
```

This serves the identical React pages as a single page app, driven by the static
content model in `resources/js/data/content.js`. This is what the live preview
runs.

### Full Laravel + Inertia application

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate          # sessions / cache tables
npm install && npm run build
php artisan serve
```

Production build of the front end:

```bash
npm run build     # -> public/build
```

---

## What's inside

```
app/
  Http/Controllers/        PageController, BookingController, ContactController
  Http/Middleware/         Inertia shared props (brand, nav, footer, page meta)
  Support/SiteContent.php  Page metadata accessor
config/site.php            Site copy exposed to Inertia
routes/web.php             All 17 routes

resources/
  css/
    fonts.css              Self-hosted Cormorant Garamond + Inter
    app.css                Tailwind v4 theme tokens + component layer
  js/
    app.jsx                Inertia entry (Laravel)
    preview.jsx            Standalone preview entry
    lib/
      anim.js              GSAP layer (reveals, splits, parallax, counters)
      router.jsx           Link/router shim for the preview build
      siteContent.js       Merges Laravel props over the static content model
    data/
      content.js           Single source of truth for all copy + imagery
      servicePages.js      Per-service page composition
    components/
      layout/              Layout, Header, Footer, Logo, PageHero
      sections/            15 section blocks (hub of the design)
      ui/                  Icon, Img, Avatar, primitives, decor
    pages/                 17 route components

tools/capture/             Playwright reference-capture tooling
design-reference/          Captured reference screenshots, HTML and tokens
docs/                      UI development plan + page-by-page analysis
```

---

## Pages

| Route | Component |
| --- | --- |
| `/` | Home |
| `/about-us` | AboutUs |
| `/services` | Services |
| `/private-dining` · `/weekly-meal-prep` · `/special-events` · `/corporate-dining` · `/dietary-plans` · `/wine-pairing` | ServicePage (shared template) |
| `/menu-experience` | MenuExperience |
| `/gallery` | Gallery |
| `/faq` | Faq |
| `/book-a-chef` | BookAChef |
| `/contact-us` | ContactUs |
| `/blog` | Blog |
| any other | NotFound (404) |

---

## Design system

Tokens extracted from the reference and defined once in `resources/css/app.css`
using Tailwind v4's `@theme`:

| Token | Value |
| --- | --- |
| Surface | `#0E0D0B` / card `#1A1713` |
| Heading | `#F5E8D0` — Cormorant Garamond 600 |
| Body | `#B8AA96` — Inter 400 |
| Accent | `#C9A45C` |
| Type scale | `display-1` 72px → `display-4` 22px, `.lede` |
| Primitives | `.btn` / `.card` / `.icon-badge` / `.arch` / `.field` / `.eyebrow` |

Signature motifs live in `components/ui/decor.jsx` — the wing divider, floral
watermark and corner sprigs (all inline SVG, no image requests).

---

## Motion

`resources/js/lib/anim.js` is the only place animation is defined:

- `data-anim` — scroll reveals (one trigger per element, plus a safety sweep so
  content can never be left invisible)
- `data-split` — headline line masks via SplitText
- `data-img-reveal` — clip-path wipe + scale on imagery
- `data-parallax` — scrubbed depth on floating cards
- `data-count` — animated statistics

Everything is scoped through `gsap.context()` and reverted on route change, and
the whole layer is bypassed for `prefers-reduced-motion: reduce`.

---

## Content

`resources/js/data/content.js` holds every string and image path. The React
components take content as props, and `lib/siteContent.js` prefers values coming
from Laravel (`config/site.php` → Inertia shared props) while falling back to the
static model. Swapping in a CMS later means replacing one file, not the UI.

---

## Notes on the reference capture

`design-reference/` contains full-page desktop and mobile screenshots, rendered
HTML, computed design tokens and the ThemeForest item gallery for all 13 pages of
the design target. It was produced by `tools/capture/` running on GitHub Actions
(the demo host blocks the build environment's egress). See
`docs/UI-PAGE-ANALYSIS.md` for the page-by-page breakdown and
`docs/UI-DEVELOPMENT-PLAN.md` for the build plan.
