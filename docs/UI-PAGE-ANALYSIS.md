# Page-by-page UI analysis

Analysis of all 13 reference pages (captured in `design-reference/`), followed by
the section inventory each one was rebuilt from.

Legend: **↳** = section reused from the shared library · **★** = page-specific.

---

## 1. Home

**Reference:** dark espresso canvas, asymmetric hero (copy left / portrait right),
gold accent only on the italic second line, trust row with avatar stack and a
counter, an infinite "trusted in …" strip, four icon features, a two-column about
with stats and layered imagery, four service tiles, a four-step process band, four
dish rows with circular photography, a testimonial row with a pager, and a framed
CTA with a plated dish bottom-left.

**Composition used**

| # | Section | Notes |
| --- | --- | --- |
| 1 | `Hero` ★ | Eyebrow, 2-line h1 (2nd line italic gold), lede, 2 CTAs, avatar stack + "800+" counter, rating, portrait with rounded frame and 2 parallax badges |
| 2 | `MarqueeStrip` ↳ | Cities, pause-on-hover |
| 3 | `Features` ↳ | 4-up: icon, two-line title (line 2 gold), copy |
| 4 | `AboutIntro` ↳ | Copy + 3 counters + button, then a 2×2 image cluster with a "Fine Dining / Trained Chef" chip |
| 5 | `ServicesGrid` variant `tiles` ↳ | 4 image-led tiles with icon chips |
| 6 | `Steps` ↳ | 01 Book → 04 Enjoy with a dotted connector |
| 7 | `FeaturedMenus` variant `list` ↳ | Circular dish photo, name + price on one line, description |
| 8 | `Testimonials` variant `grid` ↳ | 5-star card grid |
| 9 | Promise strip ★ | Oversized pull-quote in Cormorant |
| 10 | `CtaBand` ↳ | Framed panel, circular dish + glass imagery |

---

## 2. About Us

**Reference:** breadcrumb hero with a large floral watermark, an arched portrait,
copy, a "Read more" button, four value cards, a chef-profile split with three
stats, testimonial grid, closing CTA.

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | Breadcrumb, h1, lede, arched image, corner sprigs |
| 2 | `SplitFeature` ↳ | "A Passion For Fine Dining & Meaningful Moments" + arched image + badge |
| 3 | `Features` ↳ | Four values |
| 4 | `SplitFeature` flipped ↳ | Chef profile with 3-stat block and a tasting note |
| 5 | Timeline ★ | 2006 → today, gold left rule |
| 6 | `Testimonials` variant `wall` ↳ | Two auto-scrolling rows |
| 7 | `Steps` ↳ | Process reminder |
| 8 | Promise card ★ | Quote + shared stat block |
| 9 | `CtaBand` ↳ | |

---

## 3. Services (index)

**Reference:** hero with arched photo, "Services tailored to every occasion",
2×3 card grid where each card is *image → circular icon badge straddling the
image edge → centered title → copy → "Learn More"*, then the process band and a
framed CTA.

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | |
| 2 | `ServicesGrid` variant `cards` ↳ | All six services; the straddled icon badge is the signature detail |
| 3 | `SplitFeature` ↳ | "One chef, one kitchen…" + bullets + note |
| 4 | `PlansGrid` ↳ | Weekly meal-prep plans |
| 5 | `Steps` ↳ | |
| 6 | `Testimonials` variant `grid` ↳ | |
| 7 | `CtaBand` ↳ | |

---

## 4–9. Service detail pages

Six pages share one template (`pages/ServicePage.jsx`) driven by
`data/servicePages.js`, so pacing stays identical while copy and imagery differ.

**Pages:** Private Dining · Weekly Meal Prep · Special Events · Corporate Dining ·
Wellness & Dietary Plans · Wine Pairing Experience

Common structure:

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | Breadcrumb `Home / Services / <Page>` |
| 2 | `SplitFeature` ↳ | Page-specific eyebrow, title, two paragraphs, 4 bullets, arched image, badge, CTA |
| 3 | `Features` ↳ | 3–4 "what's included" highlights |
| 4 | `PlansGrid` ↳ | *Weekly Meal Prep only* |
| 5 | `FeaturedMenus` ↳ | `list` on Private Dining / Dietary, `grid` elsewhere |
| 6 | `Steps` ↳ | Process |
| 7 | `Testimonials` variant `grid` ↳ | |
| 8 | FAQ teaser ★ | Three accordion items + "Read all FAQs" |
| 9 | `CtaBand` ↳ | Page-specific closing copy |

---

## 10. Menu Experience

**Reference:** a course list where each course is a wide row (thumbnail,
`01 — Amuse-Bouche`, dish name, description), three "menu style" cards, then a
pairings block with imagery.

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | |
| 2 | `MenuCourses` ★ | Four courses, alternating row direction |
| 3 | Menu styles ★ | Classic Fine Dining / Mediterranean Table / Celebration Menu |
| 4 | `FeaturedMenus` variant `grid` ↳ | Per-guest pricing chips |
| 5 | Pairings ★ | Wine list + two overlapping images |
| 6 | `Steps` ↳ | |
| 7 | `CtaBand` ↳ | |

---

## 11. Gallery

**Reference:** hero, filter row, masonry-style grid, three themed feature cards,
CTA.

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | |
| 2 | `GalleryGrid` ★ | Category filter, mixed `tall` / `wide` spans, hover zoom + plus affordance, click-to-open lightbox |
| 3 | `Features` ↳ | Culinary Art / Special Events / Chef's Craft |
| 4 | `CtaBand` ↳ | |

---

## 12. FAQ

**Reference:** hero, a split block (arched photo of plated dish left, accordion
right), then two further question groups, then a "Still have questions?" CTA.

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | |
| 2 | `FaqSection` layout `split` ↳ | Sticky heading + arched image, 5 questions |
| 3 | `FaqSection` layout `stacked` ↳ | "Everything You Need To Know" |
| 4 | `SplitFeature` ↳ | "Personalized around your occasion" |
| 5 | `FaqSection` layout `stacked` ↳ | "Simple, Secure And Personalized" |
| 6 | `CtaBand` ↳ | |

Accordion behaviour: single-open, GSAP height animation, `aria-expanded`,
gold border on the active row.

---

## 13. Book a Chef

**Reference:** hero, framed booking panel — copy + five perks on the left, a
2-column form on the right (name, email, phone, date, guests, service, dietary,
notes) — a gold submit button, a four-step "seamless journey" band, then FAQ.

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | |
| 2 | `BookingForm` ★ | Client-side validation, inline errors, animated success panel, "prefer to talk?" phone card |
| 3 | `Steps` ↳ | Book → Consult → Customize → Enjoy |
| 4 | `FaqSection` ↳ | Booking-related questions |
| 5 | `CtaBand` ↳ | |

---

## 14. Contact Us

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | |
| 2 | `ContactSection` ★ | Form + validated success state; four detail cards (email, phone, location, hours) |
| 3 | Service area ★ | Location chips + travel note |
| 4 | Phone band ★ | Direct call CTA |
| 5 | `CtaBand` ↳ | |

---

## 15. Blog

| # | Section | Notes |
| --- | --- | --- |
| 1 | `PageHero` ★ | |
| 2 | Category chips ★ | |
| 3 | `BlogGrid` ★ | Featured post spans two columns; hover image zoom |
| 4 | Newsletter ★ | Validated inline subscribe with success state |
| 5 | `CtaBand` ↳ | |

---

## 16. 404

Centred gold monogram, oversized `4·0·4`, wing divider, two recovery links.
Rendered with a real 404 status code from the Laravel fallback route.

---

## Cross-page design rules

| Rule | Value |
| --- | --- |
| Section vertical rhythm | `clamp(3.75rem, 7.5vw, 7rem)` |
| Container | max `78rem`, gutters 1.25 / 2 / 2.5rem |
| Eyebrow | 0.68rem, `0.3em` tracking, uppercase, gold |
| Section titles | Cormorant 600, `clamp(2rem, 3.9vw, 3.375rem)`, centered |
| Body copy | Inter 400, `#B8AA96`, line-height 1.75 |
| Buttons | small radius, gold gradient fill or 1px outline, 0.75rem 600 label |
| Cards | `#1A1713`, 1px `rgba(cream, 8%)`, hover → gold border + 4px lift |
| Signature motifs | wing divider, floral watermark, arched image, straddled icon badge |
| Focus | 2px gold outline, 3px offset, always visible |
