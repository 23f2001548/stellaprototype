# Stella — The Land of Ale

> Premium marketing website for Kota's finest rooftop bar, lounge & kitchen.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-ff69b4?logo=framer)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock)

---

## Overview

A single-page, smooth-scrolling marketing website for **Stella — The Land of Ale**, a rooftop bar and restaurant located on the 8th Floor of Akash Mall, Kota, Rajasthan. The site is designed with a dark, moody, premium nightlife aesthetic featuring warm amber/gold accents, full-bleed imagery, scroll-triggered animations, and a cinematic grain overlay.

### Key Features

- **Full-screen hero** with parallax zoom and animated wordmark reveal
- **Horizontal-scroll gallery** powered by GSAP ScrollTrigger
- **Lenis smooth scrolling** for buttery page navigation
- **Framer Motion** scroll-triggered section reveals with varied animations
- **Mobile-first responsive design** (most users arrive via Instagram)
- **WhatsApp-based reservation** flow with pre-filled messages
- **Embedded Google Map** with venue coordinates
- **SEO-optimized** meta tags, semantic HTML, Open Graph
- **Accessibility**: respects `prefers-reduced-motion`, proper alt text, ARIA labels
- **Performant**: lazy-loaded images via `next/image`, optimized fonts via `next/font`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 13, GSAP 3.15 + ScrollTrigger |
| Smooth Scroll | Lenis |
| Icons | Phosphor Icons |
| Fonts | Outfit (display), Inter (body) via `next/font` |
| Deployment | Vercel (recommended) |

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd stella-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint checks |

---

## Project Structure

```
stella-app/
├── public/
│   └── images/              # Static images (hero, gallery, food, etc.)
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, utilities, grain overlay
│   │   ├── layout.tsx       # Root layout with fonts, SEO metadata
│   │   └── page.tsx         # Main page assembling all sections
│   └── components/
│       ├── SmoothScroll.tsx  # Lenis smooth scroll wrapper
│       ├── Navbar.tsx        # Fixed nav with scroll transition
│       ├── Hero.tsx          # Full-screen hero with parallax
│       ├── About.tsx         # Brand story + feature highlights
│       ├── Gallery.tsx       # GSAP horizontal-scroll gallery
│       ├── MenuHighlights.tsx # Signature dishes & drinks grid
│       ├── Events.tsx        # DJ nights, karaoke, sports schedule
│       ├── Testimonials.tsx  # Auto-rotating review carousel
│       ├── InstagramFeed.tsx # Curated Instagram post grid
│       ├── Contact.tsx       # Map, hours, WhatsApp reservation
│       └── Footer.tsx        # Links, socials, closing brand
├── docs/
│   ├── ARCHITECTURE.md      # Technical architecture guide
│   ├── CONTENT-GUIDE.md     # How to update copy and content
│   └── MEDIA-GUIDE.md       # How to replace placeholder media
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DEPLOYMENT.md
├── DESIGN.md
├── SECURITY.md
├── LICENSE
├── .env.example
└── package.json
```

---

## Sections

| # | Section | Component | Description |
|---|---------|-----------|-------------|
| 1 | Hero | `Hero.tsx` | Full-screen video/image bg, wordmark reveal, CTAs |
| 2 | Experience | `About.tsx` | Brand story, parallax image, feature icons |
| 3 | Gallery | `Gallery.tsx` | Horizontal scroll with GSAP pin + scrub |
| 4 | Menu | `MenuHighlights.tsx` | 6 signature items as animated cards |
| 5 | Events | `Events.tsx` | Weekly schedule with stacked cards |
| 6 | Testimonials | `Testimonials.tsx` | Auto-rotating quote carousel |
| 7 | Instagram | `InstagramFeed.tsx` | 8-post curated grid |
| 8 | Contact | `Contact.tsx` | Map, hours, WhatsApp CTA |
| 9 | Footer | `Footer.tsx` | Socials, links, copyright |

---

## Content & Media

> [!IMPORTANT]
> All copy, prices, hours, and media are **placeholders** sourced from public listings. They must be confirmed with the venue before going live. See [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) for update instructions.

- **Images**: Generated placeholders in `public/images/`. Replace with real venue photos — see [`docs/MEDIA-GUIDE.md`](docs/MEDIA-GUIDE.md).
- **Video**: The hero supports `<video>` backgrounds. Add MP4/WebM files to `public/videos/` and update `Hero.tsx`.
- **Menu PDF**: Link the "View Full Menu" button to a real PDF.
- **Instagram**: Currently a static grid. Can be connected to Instagram Basic Display API.

---

## Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for detailed instructions. The recommended platform is **Vercel**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| [`DESIGN.md`](DESIGN.md) | Design system, color tokens, typography, animation philosophy |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | Step-by-step deployment guide for Vercel, Netlify, Docker |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contribution workflow and code standards |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history |
| [`SECURITY.md`](SECURITY.md) | Security policy and vulnerability reporting |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Technical architecture deep-dive |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | How to update text, hours, prices |
| [`docs/MEDIA-GUIDE.md`](docs/MEDIA-GUIDE.md) | How to replace placeholder photos/videos |

---

## License

This project is proprietary software. See [`LICENSE`](LICENSE) for details.

---

<sub>Built for Stella — The Land of Ale, Kota, Rajasthan, India.</sub>
