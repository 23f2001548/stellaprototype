# Architecture — Stella Website

> Technical architecture, component relationships, and data flow.

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Router                    │
│                                                           │
│  ┌──────────────┐                                        │
│  │  layout.tsx   │  Server Component (root)               │
│  │  - Fonts      │  - Outfit + Inter via next/font        │
│  │  - Metadata   │  - SEO meta tags, Open Graph           │
│  │  - globals.css│  - Design tokens, grain overlay        │
│  └──────┬───────┘                                        │
│         │                                                 │
│  ┌──────▼───────┐                                        │
│  │   page.tsx    │  Server Component (page)                │
│  │  Assembles    │  - Imports all section components       │
│  │  all sections │  - Wraps in SmoothScroll               │
│  └──────┬───────┘                                        │
│         │                                                 │
│  ┌──────▼───────────────────────────────────────────┐    │
│  │              Client Components ("use client")      │    │
│  │                                                     │    │
│  │  SmoothScroll ─── Lenis instance (global)          │    │
│  │  Navbar ────────── Framer Motion scroll tracking   │    │
│  │  Hero ──────────── Framer Motion parallax          │    │
│  │  About ─────────── Framer Motion whileInView       │    │
│  │  Gallery ───────── GSAP ScrollTrigger (pin/scrub)  │    │
│  │  MenuHighlights ── Framer Motion stagger           │    │
│  │  Events ────────── Framer Motion + parallax bg     │    │
│  │  Testimonials ──── Framer Motion AnimatePresence   │    │
│  │  InstagramFeed ─── Framer Motion scale reveal      │    │
│  │  Contact ───────── Framer Motion + Google Maps     │    │
│  │  Footer ────────── Framer Motion whileInView       │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Rendering Strategy

| Component | Rendering | Why |
|-----------|-----------|-----|
| `layout.tsx` | Server | Static metadata, fonts, global CSS |
| `page.tsx` | Server | Static page shell importing client components |
| All section components | Client | Require browser APIs: scroll listeners, animation, IntersectionObserver |

The page is **statically generated** at build time (`output: static`). All interactivity is client-side hydration. No server-side data fetching.

---

## Animation Architecture

### Two-Library Strategy

```
Framer Motion (motion/react)     GSAP + ScrollTrigger
─────────────────────────        ──────────────────────
• Scroll-triggered reveals       • Horizontal-scroll gallery
• Page transitions               • Pinned sections
• Hover/tap interactions          • Scrubbed animations
• AnimatePresence (carousel)     • Complex timeline sequences
• useScroll / useTransform       • Performance-critical paths
```

**Rule**: Framer Motion handles most scroll reveals and UI animations. GSAP is reserved for scroll-pinned/scrubbed effects that Framer Motion can't natively handle (horizontal pan, card stacking).

### Scroll Stack

```
Lenis (smooth scroll engine)
    │
    ▼
Browser scroll events
    │
    ├── Framer Motion useScroll() ─── Hero parallax, About image, Events bg
    │
    └── GSAP ScrollTrigger ─────────── Gallery horizontal pan (pin + scrub)
```

Lenis and GSAP ScrollTrigger coexist because Lenis proxies the native scroll — ScrollTrigger reads the same scroll position.

---

## Component Dependency Map

```
page.tsx
├── SmoothScroll.tsx
│   └── lenis (npm)
├── Navbar.tsx
│   ├── framer-motion (useScroll, AnimatePresence)
│   └── @phosphor-icons/react
├── Hero.tsx
│   ├── next/image
│   ├── framer-motion (useScroll, useTransform)
│   └── @phosphor-icons/react
├── About.tsx
│   ├── next/image
│   ├── framer-motion (useScroll, useTransform, whileInView)
│   └── @phosphor-icons/react
├── Gallery.tsx
│   ├── next/image
│   ├── framer-motion (whileHover, useReducedMotion)
│   └── gsap + ScrollTrigger
├── MenuHighlights.tsx
│   ├── next/image
│   └── framer-motion (whileInView)
├── Events.tsx
│   ├── next/image
│   ├── framer-motion (useScroll, useTransform, whileInView)
│   └── @phosphor-icons/react
├── Testimonials.tsx
│   ├── framer-motion (AnimatePresence)
│   └── @phosphor-icons/react
├── InstagramFeed.tsx
│   ├── next/image
│   ├── framer-motion (whileInView)
│   └── @phosphor-icons/react
├── Contact.tsx
│   ├── framer-motion (whileInView)
│   ├── @phosphor-icons/react
│   └── Google Maps iframe
└── Footer.tsx
    ├── framer-motion (whileInView)
    └── @phosphor-icons/react
```

---

## Data Flow

This is a **zero-API, zero-database** static site. All content is hardcoded in component files:

| Data | Location | Format |
|------|----------|--------|
| Menu items | `MenuHighlights.tsx` | Array of objects |
| Events schedule | `Events.tsx` | Array of objects |
| Testimonials | `Testimonials.tsx` | Array of objects |
| Instagram posts | `InstagramFeed.tsx` | Array of objects |
| Opening hours | `Contact.tsx` | Array of objects |
| Nav links | `Navbar.tsx` | Array of objects |
| Social links | `Footer.tsx` | Hardcoded URLs |

### Future: CMS Integration

If content needs to be editable by non-developers, consider:

1. **Headless CMS** (Sanity, Strapi, Contentful) — query at build time
2. **MDX files** — markdown-based content in the repo
3. **JSON files** — centralized `data/` directory

This would require minimal component restructuring since data is already separated from rendering logic.

---

## File Size Budget

| Asset Category | Target | Notes |
|---------------|--------|-------|
| JavaScript (total) | < 200 KB gzipped | Next.js + Framer Motion + GSAP |
| CSS (total) | < 30 KB gzipped | Tailwind purges unused styles |
| Hero image | < 300 KB | WebP, 1920x1080, quality 85 |
| Gallery images (each) | < 150 KB | WebP, max 800px wide |
| Total page weight | < 2 MB | First load, all visible content |

---

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | Yes |
| Safari 15+ | Yes |
| Firefox 90+ | Yes |
| Edge 90+ | Yes |
| Samsung Internet 15+ | Yes |
| iOS Safari 15+ | Yes (primary mobile target) |
| IE 11 | No |

### Critical Mobile Browsers (Target Audience)

Given the Instagram-discovery audience, the primary browsers are:
1. **Instagram In-App Browser** (WebView)
2. **Chrome for Android**
3. **Safari for iOS**

All animations and layouts are tested against these.

---

<sub>Last updated: September 2026</sub>
