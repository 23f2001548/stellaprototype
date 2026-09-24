# Design System: Stella — The Land of Ale (Ultra-Premium Redesign)

## 1. Visual Theme & Atmosphere
An immersive, ultra-premium hospitality experience that captures the transition from golden hour to midnight. The atmosphere is luxurious, cinematic, and highly atmospheric. It blends the tactile warmth of a high-end taproom with the expansive, airy feeling of a rooftop skyline. The design features frosted glassmorphism, overlapping elegant typography, rich photography, and fluid, frictionless motion that feels expensive and effortless.

## 2. Color Palette & Roles
- **Midnight Canvas** (#06080F) — Deep, rich, cool-toned black for the primary immersive background.
- **Dusk Indigo** (#121626) — Secondary surface color for elevated cards and modal backgrounds.
- **Liquid Amber** (#F5A623) — Primary interactive accent for primary buttons, active links, and key highlights.
- **Champagne Gold** (#FDE3A7) — Secondary delicate accent for thin borders, subtle icons, and decorative typographic flourishes.
- **Starlight White** (#FDFDFD) — Primary high-contrast text for maximum legibility.
- **Frosted Slate** (#8E94A8) — Secondary text for descriptions, tasting notes, and metadata.
- **Glass Shimmer** (rgba(255,255,255,0.05)) — For glassmorphic panel borders and subtle dividers.

## 3. Typography Rules
- **Display:** *Fraunces* (or a high-end modern serif like *Editorial New* / *Playfair Display*) — Elegant, expressive, and slightly italicized in key moments. Used for massive, cinematic hero headlines and section titles. Allowed to overlap images slightly for an editorial magazine feel.
- **Body:** *Satoshi* (or *Neue Montreal*) — A beautiful, geometric, highly legible sans-serif for body copy, paragraphs, and general UI.
- **Eyebrow & Metadata:** *Space Grotesk* — Used in all-caps with wide letter-spacing (`0.2em`) for small labels, button text, and technical beer metrics (ABV, IBU).
- **Hierarchy:** Contrast is created through extreme scale differences—massive serifs paired with tiny, widely-spaced sans-serif caps. 

## 4. Component Stylings
* **Buttons:** Elegant, pill-shaped (`rounded-full`) or softly rounded (`rounded-2xl`) buttons. Primary buttons feature a subtle Liquid Amber gradient with a soft drop shadow. Hover states trigger a slow, fluid fill animation.
* **Cards:** Glassmorphic panels. Backgrounds use backdrop blur (`blur-xl`), very subtle white noise textures, and 1px Champagne Gold borders at 10% opacity. 
* **Media:** Images are expansive. Use full-bleed edge-to-edge photography with soft vignette overlays. Hovering over gallery images triggers a slow, smooth zoom effect.
* **Navigation:** A floating, frosted-glass header that blurs the background as you scroll.

## 5. Layout Principles
- **Editorial Asymmetry:** Break the grid. Text and images should overlap elegantly. Use offset, staggered columns rather than perfectly aligned boxes.
- **Breathing Room:** Massive negative space (padding up to 150px between sections). The layout should feel airy and unhurried.
- **Immersive Sections:** Full viewport-height (`100dvh`) sticky sections where the background crossfades seamlessly as the user scrolls from one concept to the next.

## 6. Motion & Interaction
- **Cinematic Easing:** All animations must use slow, fluid, frictionless spring physics or `cubic-bezier(0.16, 1, 0.3, 1)` easing.
- **Scroll Storytelling:** Elements reveal themselves dynamically on scroll. Text lines slide up from invisible masks. Images parallax smoothly against the scroll direction.
- **Cursor Dynamics:** A custom, soft glowing cursor that magnetically snaps to buttons and expands when hovering over clickable images.

## 7. Anti-Patterns (Banned)
- No rigid, boxy, 3-column template layouts.
- No harsh, pure black (`#000000`) or pure white (`#FFFFFF`) backgrounds.
- No generic font pairings (e.g., Arial, Open Sans, Times New Roman).
- No instant, blocky hover states (everything must transition smoothly).
- No stock-looking placeholder images (use high-end, cinematic lifestyle and architectural photography).
