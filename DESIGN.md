# Design System: Stella — The Land of Ale

## 1. Visual Theme & Atmosphere
A cinematic, high-density nightlife interface with fluid spring-physics motion and offset asymmetric variance. The atmosphere is upscale, energetic, and moody—like a premium rooftop club illuminated by city lights and warm copper accents. Density is high, variance is elevated, and motion is perpetual but hardware-accelerated.

## 2. Color Palette & Roles
- **Canvas Night** (#0A0A0A) — Primary background surface, deep off-black
- **Elevated Night** (#111111) — Card and container fill
- **Copper Glow** (#D4A148) — Single primary accent for CTAs, focus rings, icons, and active states
- **Gold Highlight** (#E8C068) — Secondary accent strictly for gradient stops and decorative elements
- **Warm Platinum** (#F5F0E8) — Primary text, maximum readability against dark backgrounds
- **Muted Smoke** (#A8A29E) — Secondary text, descriptions, metadata
- **Whisper Border** (rgba(212,161,72,0.15)) — Card borders, 1px structural lines
(Max 1 accent family. Saturation < 80%. No purple/neon. No pure black #000000.)

## 3. Typography Rules
- **Display:** Bebas Neue — Track-tight, controlled scale, massive weight-driven hierarchy, uppercase. Used for hero and section headers.
- **Body:** Inter — Relaxed leading, 65ch max-width, neutral secondary color. Strictly for body and UI elements.
- **Mono:** JetBrains Mono — For timestamps, metadata, schedules, and high-density numbers.
- **Banned:** Generic system fonts for display. Serif fonts banned in dashboard/UI components.

## 4. Component Stylings
* **Buttons:** Flat, no outer glow. Tactile -1px translate on active state with spring physics. Copper Glow fill for primary, ghost/outline with whisper border for secondary.
* **Cards:** Sharp corners (0rem) matching a brutalist/premium aesthetic. Diffused warm whisper shadow. Used only when elevation serves hierarchy. For high-density: replace with border-top dividers.
* **Inputs:** Label above, error below. Focus ring in Copper Glow. No floating labels.
* **Loaders:** Skeletal shimmer matching exact layout dimensions in Elevated Night color. No circular spinners.
* **Empty States:** Composed, moody illustrations—not just "No data" text.

## 5. Layout Principles
Grid-first responsive architecture. Asymmetric splits for Hero sections.
Strict single-column collapse below 768px. Max-width containment (1400px).
No flexbox percentage math. Generous internal padding (`clamp(5rem, 12vw, 10rem)`).
No overlapping elements—clean spatial separation always.

## 6. Motion & Interaction
Spring physics for all interactive elements (stiffness: 100, damping: 20). Staggered cascade reveals on scroll using `transform` and `opacity` only.
Perpetual micro-loops on active components (e.g., slow marquee, floating images).
Hardware-accelerated transforms only. Grain/noise filters on fixed pseudo-elements only.

## 7. Anti-Patterns (Banned)
- No emojis anywhere
- No pure black (`#000000`)
- No neon/outer glow shadows or purple/blue accents
- No generic names or fake round numbers
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash")
- No filler UI text ("Scroll to explore", scroll arrows)
- No broken Unsplash links
- No 3-column equal card layouts
- No overlapping elements—clean spatial separation always
- No centered Hero sections (variance > 4)
