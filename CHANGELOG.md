# Changelog

All notable changes to the Stella website are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] — 2026-09-24

### Added

- **Hero Section**: Full-screen background image with parallax Ken Burns zoom, animated wordmark reveal, "Reserve a Table" and "View Menu" CTAs, scroll-down indicator
- **Navbar**: Fixed navigation with transparent-to-solid scroll transition, mobile fullscreen menu overlay, sticky "Reserve" CTA button
- **About / Experience Section**: Split layout with parallax image and scroll-triggered text reveals, 4-icon feature highlight grid (skyline views, DJ nights, full bar, kitchen)
- **Gallery / Ambiance**: Horizontal-scroll gallery powered by GSAP ScrollTrigger pin + scrub, 7 images with varied aspect ratios and hover scale effects
- **Menu Highlights**: 6 signature dish/drink cards in responsive grid with animated scroll reveals, "View Full Menu" CTA
- **Nightlife / Events**: Stacked event cards for DJ nights, karaoke, live sports, live music — each with schedule, description, and background image
- **Testimonials**: Auto-rotating quote carousel (5-second interval) with AnimatePresence transitions, star ratings, and dot navigation
- **Instagram Feed**: 8-post curated grid linking to @stellakotaa with hover overlay effect
- **Contact / Reservation**: Address, phone, hours, WhatsApp reservation CTA, embedded Google Maps
- **Footer**: Brand logo, quick nav links, contact info, social links (Instagram, Facebook), copyright
- **Smooth Scrolling**: Lenis integration for buttery page scroll
- **Design System**: Dark theme with amber/gold accents, grain overlay, vignette effects, custom scrollbar
- **Typography**: Outfit (display) + Inter (body) via next/font
- **SEO**: Complete meta tags, Open Graph, semantic HTML
- **Accessibility**: prefers-reduced-motion support, ARIA labels, alt text, focus styles
- **Documentation**: README, DESIGN.md, DEPLOYMENT.md, CONTRIBUTING.md, CHANGELOG.md, SECURITY.md, ARCHITECTURE.md, CONTENT-GUIDE.md, MEDIA-GUIDE.md

### Placeholder Content (to be replaced before launch)

- All images are AI-generated placeholders
- Menu items are representative, not from the actual venue menu
- Testimonials are fictional
- Opening hours need venue confirmation
- Event schedule needs venue confirmation
- Instagram feed is static (not API-connected)

---

## [Unreleased]

### Planned

- Hero background video (MP4/WebM) when venue provides footage
- Instagram Basic Display API integration for live feed
- Menu PDF link
- Real venue photography from @stellakotaa
- Google Analytics / Meta Pixel integration
- Contact form with email integration
- Online reservation system integration (if venue adopts one)
- Multi-language support (Hindi/English)
