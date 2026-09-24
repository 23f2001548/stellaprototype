# Deployment Guide — Stella

> Step-by-step instructions for deploying the Stella website to production.

---

## Pre-Deployment Checklist

Before deploying, ensure all placeholder content has been verified:

- [ ] **Hours**: Confirm opening hours in `Contact.tsx` and `Footer.tsx`
- [ ] **Phone number**: Verify `+91 90017 11617` is correct
- [ ] **WhatsApp link**: Test the pre-filled WhatsApp message URL
- [ ] **Menu PDF**: Upload and link the real menu PDF
- [ ] **Images**: Replace all AI-generated placeholders with venue photography
- [ ] **Videos**: Add hero background video if available (MP4 + WebM)
- [ ] **Instagram handle**: Confirm `@stellakotaa` is correct
- [ ] **Facebook URL**: Confirm `/stellathelandofale` is correct
- [ ] **Google Maps embed**: Verify the pin location is accurate
- [ ] **Testimonials**: Replace placeholder reviews with real guest quotes
- [ ] **Menu items**: Update dish names, descriptions in `MenuHighlights.tsx`
- [ ] **Events schedule**: Confirm weekly event schedule in `Events.tsx`
- [ ] **Analytics**: Add Google Analytics / Meta Pixel (see below)
- [ ] **Favicon**: Replace default Next.js favicon with Stella branding

---

## Option 1: Vercel (Recommended)

Vercel is the native deployment platform for Next.js and provides the best performance.

### Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (first time — will create project)
vercel

# Deploy to production
vercel --prod
```

### Custom Domain

1. Go to your Vercel dashboard → Project Settings → Domains
2. Add your domain (e.g., `stellakota.com`)
3. Update DNS records as instructed:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
4. SSL is provisioned automatically

### Environment Variables

If using any server-side features in the future, add environment variables in:
- Vercel Dashboard → Settings → Environment Variables
- Or via `.env.local` for local development

### Build Settings

Vercel auto-detects Next.js. Default settings work:
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### netlify.toml

Create this file in the project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Install the Next.js plugin:
```bash
npm install -D @netlify/plugin-nextjs
```

---

## Option 3: Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### next.config.ts (add standalone output)

```ts
const nextConfig = {
  output: 'standalone',
};
export default nextConfig;
```

### Build & Run

```bash
docker build -t stella-website .
docker run -p 3000:3000 stella-website
```

---

## Option 4: Static Export (No Server Required)

If you don't need any server-side features:

### next.config.ts

```ts
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
```

```bash
npm run build
# Output will be in the `out/` directory
# Upload to any static host (S3, Firebase Hosting, GitHub Pages, etc.)
```

> **Note**: Static export disables `next/image` optimization. Images will be served as-is.

---

## Adding Analytics

### Google Analytics (GA4)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (e.g., `G-XXXXXXXXXX`)
3. Add to `layout.tsx`:

```tsx
import Script from 'next/script';

// Inside <html> tag, before closing:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Meta Pixel (Facebook/Instagram Ads)

```tsx
<Script id="meta-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  `}
</Script>
```

---

## Performance Optimization

### Image Optimization

- Convert all images to **WebP** format for 25-35% smaller file sizes
- Hero image: max 1920x1080, quality 85
- Gallery images: max 800x800, quality 80
- Use `next/image` `sizes` prop to serve responsive images

### Video (if added)

- Encode as **H.264 MP4** (primary) + **VP9 WebM** (fallback)
- Max resolution: 1920x1080
- Bitrate: 2-4 Mbps
- Always include `poster` image for instant display
- Attributes: `muted autoPlay loop playsInline`

### Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | > 90 |
| Accessibility | > 95 |
| Best Practices | > 95 |
| SEO | > 95 |

---

## DNS & Domain Recommendations

| Domain Option | Notes |
|---------------|-------|
| `stellakota.com` | Clean, memorable |
| `stellabar.in` | India-specific TLD |
| `thelandofale.com` | Brand-specific |

### Recommended DNS Provider

Cloudflare (free tier) for DNS management + CDN + DDoS protection.

---

## Post-Deployment

1. **Test all links**: WhatsApp, phone, Instagram, Facebook, Google Maps directions
2. **Mobile test**: Open on actual phones (iPhone Safari, Android Chrome)
3. **Speed test**: Run [PageSpeed Insights](https://pagespeed.web.dev/)
4. **Submit to Google**: Add site to [Google Search Console](https://search.google.com/search-console)
5. **Monitor**: Set up uptime monitoring (e.g., UptimeRobot free tier)

---

<sub>Last updated: September 2026</sub>
