# Irin Crafted — UI Development Plan

**Scope: interface only.** No dynamic data, no CMS, no payments and no
authentication. Every page is driven by a single content model
(`resources/js/data/content.js`) so wiring a backend later is a swap, not a
rewrite.

---

## 1. Reference source

The design target is the **Veyssette – Private Chef Services** Elementor Pro
template kit (ThemeForest item 63658456). Before writing any code the reference
demo was captured end-to-end so the build is measured against pixels, not
memory.

| Artefact | Location | What it gives us |
| --- | --- | --- |
| Full-page desktop screenshots (13 pages) | `design-reference/desktop/*.jpg` | Section order, spacing rhythm, composition |
| Mobile screenshots (13 pages) | `design-reference/mobile/*.jpg` | Breakpoint behaviour |
| Rendered HTML per page | `design-reference/html/*.html` | Exact section inventory |
| Computed design tokens | `design-reference/design-tokens.json` | Colours, fonts, sizes, weights |
| ThemeForest item gallery | `design-reference/themeforest/*` | Official page previews |

Capture tooling lives in `tools/capture/` and runs on GitHub Actions
(`.github/workflows/capture-reference.yml`) because the demo host blocks the
build environment.

### Tokens extracted from the live reference

```
surface base    #0E0D0B      heading text   #F5E8D0
panel surface   #1A1713      body text      #B8AA96
accent gold     #C9A45C      muted text     #918675

display font    Cormorant Garamond 600  — h1 72px, h2 54px, h3 26px
body font       Inter 400               — 16–18px, line-height ~1.7
buttons         Inter 600, ~17px, gold fill, small radius
```

---

## 2. Technology choices

| Layer | Choice | Reason |
| --- | --- | --- |
| Backend | **Laravel 12** | Requested. Serves one Blade shell, everything else is Inertia |
| Bridge | **Inertia 2** | Real Laravel routing, no REST layer needed for an interface build |
| UI | **React 19** | Requested |
| Styling | **Tailwind CSS v4** (`@theme` tokens) | Design tokens live in CSS, no config sprawl |
| Animation | **GSAP 3** + ScrollTrigger + SplitText | Headline masks, scroll reveals, counters, clip-path image reveals |
| Smooth scroll | **Lenis** | Wired into the GSAP ticker |
| Fonts | Cormorant Garamond + Inter, self-hosted | Matches the reference, no third-party requests |

---

## 3. Build phases

### Phase 0 — Reference capture ✅
- Playwright capture script, GitHub Actions runner (bypasses the demo host's IP blocks)
- Desktop + mobile screenshots, HTML, computed tokens, item gallery

### Phase 1 — Foundation ✅
- Laravel skeleton: `bootstrap/app.php`, routes, `PageController`, Inertia middleware
- Vite + React + Tailwind v4 + `@theme` design tokens
- Self-hosted font stack, preloaded above the fold
- Standalone preview harness (`vite.preview.config.js` + `resources/js/preview/`)
  so the UI runs without PHP — **live preview is always available**

### Phase 2 — Design system ✅
- Colour ramps (`ink`, `gold`, `cream`) matching extracted values
- Type scale (`display-1…4`), `.lede`, `.eyebrow`
- Components: `.btn` (`gold` / `ghost` / `dark`), `.card`, `.icon-badge`,
  `.arch` shapes, `.field`, `.hairline`
- Decor layer: `Wing` divider, `FloralMark` watermark, `CornerBloom` sprigs

### Phase 3 — Animation layer ✅
- `gsap.context()` scoped per page, reverted on route change
- `data-anim` batch reveals, `data-split` line masks, `data-img-reveal`
  clip-path + scale, `data-parallax` scrub, `data-count` counters
- `immediateRender: false` + `ScrollTrigger.refresh()` after fonts/images
- Full `prefers-reduced-motion` bypass

### Phase 4 — Pages ✅ (see `docs/UI-PAGE-ANALYSIS.md`)
17 routes: home, about, services, 6 service details, menu experience, gallery,
FAQ, blog, book a chef, contact, 404.

### Phase 5 — Verification (in progress)
- Screenshot every route at 1440 and 390, compare against reference
- Keyboard/contrast pass, focus-visible states, `sr-only` labels
- Lighthouse pass on the built bundle

---

## 4. Section library → reference mapping

| Component | Reference section | File |
| --- | --- | --- |
| `Hero` | "Elevated Dining, Crafted Around You" | `sections/Hero.jsx` |
| `MarqueeStrip` | "Trusted by clients in …" | `sections/MarqueeStrip.jsx` |
| `Features` | 4-up icon band | `sections/Features.jsx` |
| `AboutIntro` | "Passion for food. Commitment to you" | `sections/AboutIntro.jsx` |
| `ServicesGrid` | "Culinary experiences made for you" | `sections/ServicesGrid.jsx` |
| `Steps` | "Simple, personal & seamless" | `sections/Steps.jsx` |
| `FeaturedMenus` | "A taste of what we create" | `sections/FeaturedMenus.jsx` |
| `Testimonials` | "Experiences that speak for themselves" | `sections/Testimonials.jsx` |
| `CtaBand` | "Ready to enjoy an unforgettable…" | `sections/CtaBand.jsx` |
| `PlansGrid` | Meal prep pricing | `sections/PlansGrid.jsx` |
| `FaqSection` | FAQ accordion (split + stacked) | `sections/FaqSection.jsx` |
| `BookingForm` | "Plan your perfect dining experience" | `sections/BookingForm.jsx` |
| `MenuCourses` | Signature menu courses | `sections/MenuCourses.jsx` |
| `GalleryGrid` | Filterable gallery + lightbox | `sections/GalleryGrid.jsx` |
| `BlogGrid` | Journal cards | `sections/BlogGrid.jsx` |

---

## 5. Deliberate improvements over the reference

The brief allowed the design to be improved where it helps:

1. **Real photographic art direction** instead of placeholder imagery, generated
   to one brief (dark, warm key light, gold rim) so every page reads as one shoot.
2. **Motion that respects the reader** — masked headlines, clip-path image
   reveals and counter animations, all disabled under `prefers-reduced-motion`.
3. **Accessibility the reference lacks**: skip link, visible focus rings,
   `aria-expanded` on every accordion and dropdown, `sr-only` labels, and a
   focus-trapped mobile drawer.
4. **Working interactions** rather than static mock-ups: gallery filtering +
   lightbox, testimonial slider with autoplay, accordions, validated forms with
   success states, sticky header state, scroll progress bar.
5. **Type actually rendered at reference sizes** (h1 72px / h2 54px from the
   computed-style extraction) instead of "looks about right".

---

## 6. Running it

```bash
# UI preview, no PHP required (used for live preview)
npm install
npm run preview -- --port 5173 --host 0.0.0.0

# Full Laravel + Inertia app
composer install
cp .env.example .env && php artisan key:generate
php artisan migrate           # sessions/cache tables
npm install && npm run build
php artisan serve
```

`npm run preview` and `php artisan serve` render the *same* page components —
the only difference is where the content model comes from (`data/content.js`
versus Laravel's shared Inertia props, merged in `lib/siteContent.js`).
