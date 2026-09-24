# Content Guide — Stella Website

> How to update text, data, hours, and other content without restructuring code.

---

## Overview

All website content is stored directly in React component files as TypeScript arrays/objects. No CMS or database is involved. To update content, edit the relevant file, commit, and redeploy.

> [!IMPORTANT]  
> Every piece of content marked with `/* PLACEHOLDER */` in the code must be confirmed with the venue before going live.

---

## Quick Reference

| Content | File | What to Edit |
|---------|------|-------------|
| Brand tagline | `src/components/Hero.tsx` | `"Kota's Rooftop. Redefined."` string |
| About text | `src/components/About.tsx` | Paragraph in the text side |
| Menu items | `src/components/MenuHighlights.tsx` | `menuItems` array |
| Events schedule | `src/components/Events.tsx` | `events` array |
| Testimonials | `src/components/Testimonials.tsx` | `testimonials` array |
| Opening hours | `src/components/Contact.tsx` | `hours` array |
| Phone number | `src/components/Contact.tsx`, `Navbar.tsx`, `Footer.tsx` | Search for `919001711617` |
| Address | `src/components/Contact.tsx`, `Footer.tsx` | Search for `Akash Mall` |
| Social links | `src/components/Footer.tsx`, `InstagramFeed.tsx` | Search for `stellakotaa` and `stellathelandofale` |
| SEO metadata | `src/app/layout.tsx` | `metadata` object |
| Nav links | `src/components/Navbar.tsx` | `navLinks` array |
| Footer links | `src/components/Footer.tsx` | Inline link array |

---

## Detailed Update Instructions

### 1. Menu Items

**File**: `src/components/MenuHighlights.tsx`

Find the `menuItems` array and update:

```tsx
const menuItems = [
  {
    name: "Tandoori Lamb Chops",        // ← Dish/drink name
    desc: "Charcoal-grilled with mint chutney", // ← One-line description
    category: "Kitchen",                 // ← Category label
    image: "/images/food-plating.jpg",   // ← Image path (see MEDIA-GUIDE.md)
  },
  // ... more items (recommended: 6 items)
];
```

**Categories to use**: `"Kitchen"`, `"Signature Cocktail"`, `"The Ale Program"`, `"Mocktail"`, or any custom label.

### 2. Events Schedule

**File**: `src/components/Events.tsx`

Find the `events` array:

```tsx
const events = [
  {
    icon: Headphones,                    // ← Phosphor icon component
    title: "DJ Nights",                  // ← Event name
    schedule: "Friday & Saturday",       // ← Days
    time: "9 PM onwards",               // ← Time
    desc: "Resident and guest DJs...",   // ← Description (keep under 2 lines)
    image: "/images/dj-nightlife.jpg",   // ← Background image
  },
  // ...
];
```

**Available icons**: `Headphones`, `MicrophoneStage`, `Monitor`, `MusicNote`, `SoccerBall`, `Microphone`, `VideoCamera`.

### 3. Opening Hours

**File**: `src/components/Contact.tsx`

```tsx
const hours = [
  { days: "Monday", time: "5 PM – 12 AM" },
  { days: "Tuesday", time: "5 PM – 2 AM" },
  // ...
];
```

### 4. Testimonials

**File**: `src/components/Testimonials.tsx`

```tsx
const testimonials = [
  {
    quote: "Hands down the best rooftop...",  // ← Max 2-3 sentences
    name: "Arjun Mehra",                       // ← Full name
    role: "Regular Patron",                     // ← Role/context
    rating: 5,                                  // ← 1-5 stars
  },
  // ... (recommended: 4-6 testimonials)
];
```

**Source ideas**: Pull short quotes from Google Reviews, Zomato reviews, or Instagram DMs (with permission).

### 5. Phone Number

The phone number appears in multiple files. Search globally for `919001711617` and update all instances:

- `src/components/Navbar.tsx` — Mobile call CTA
- `src/components/Hero.tsx` — WhatsApp link
- `src/components/Contact.tsx` — Phone display + WhatsApp CTA
- `src/components/Footer.tsx` — Footer phone

### 6. SEO Metadata

**File**: `src/app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: "Stella — The Land of Ale | ...",
  description: "Kota's most premium...",
  keywords: ["Stella Kota", "rooftop bar Kota", ...],
  openGraph: {
    title: "...",
    description: "...",
  },
};
```

### 7. WhatsApp Pre-filled Message

The WhatsApp links use URL-encoded messages. Current message:

```
Hi, I'd like to reserve a table at Stella.
```

To change, update the `text` parameter in the WhatsApp URL:
```
https://wa.me/919001711617?text=YOUR%20URL%20ENCODED%20MESSAGE
```

Use [urlencoder.org](https://www.urlencoder.org/) to encode your message.

---

## Adding the Menu PDF

1. Save the menu PDF to `public/menu/stella-menu.pdf`
2. In `MenuHighlights.tsx`, update the CTA link:

```tsx
// Change from:
<a href="#" className="btn-primary">View Full Menu</a>

// To:
<a href="/menu/stella-menu.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
  View Full Menu
</a>
```

---

## Content Tone Guide

The Stella brand voice is:
- **Confident** — "Kota's finest", not "one of Kota's nice places"
- **Warm** — Inviting, not exclusive or gatekeepy
- **Energetic** — Nightlife energy without sounding juvenile
- **Genuine** — Real vibe descriptions, not marketing fluff

**Avoid**: "Welcome to our humble establishment", "We are proud to offer", "Don't miss out!", excessive exclamation marks.

**Prefer**: Direct statements, sensory descriptions (what you'll see/taste/hear), confidence without arrogance.

---

<sub>Last updated: September 2026</sub>
