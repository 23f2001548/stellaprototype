# Contributing to Stella Website

Thank you for contributing to the Stella website. This document outlines the development workflow, code standards, and review process.

---

## Development Setup

```bash
# Clone
git clone <repo-url>
cd stella-app

# Install
npm install

# Start dev server
npm run dev
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys to live site |
| `staging` | Pre-production testing |
| `dev` | Active development |
| `feature/<name>` | Feature branches off `dev` |
| `fix/<name>` | Bug fix branches off `dev` |
| `content/<name>` | Content-only updates (copy, images) |

### Workflow

1. Create a branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run lint and build checks:
   ```bash
   npm run lint
   npm run build
   ```
4. Commit with conventional commits (see below)
5. Push and open a Pull Request to `dev`
6. After review and approval, merge to `dev`
7. `dev` → `staging` for QA
8. `staging` → `main` for production deploy

---

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type | When |
|------|------|
| `feat` | New feature or section |
| `fix` | Bug fix |
| `style` | Visual/CSS changes (no logic change) |
| `content` | Copy, image, or media updates |
| `refactor` | Code restructuring |
| `perf` | Performance improvement |
| `docs` | Documentation changes |
| `chore` | Build, tooling, dependency updates |

### Examples

```
feat(gallery): add lightbox modal on image click
fix(nav): resolve mobile menu not closing on anchor click
content(menu): update dish names with confirmed venue menu
style(hero): adjust gradient opacity for better text contrast
docs: add video format requirements to MEDIA-GUIDE
```

---

## Code Standards

### TypeScript

- Strict mode enabled
- Explicit return types on exported functions
- No `any` — use proper types or `unknown`
- Prefer `interface` over `type` for object shapes

### Components

- One component per file
- Client components marked with `"use client"` at the top
- Props destructured in function signature
- No inline styles — use Tailwind classes or `globals.css` utilities

### CSS / Tailwind

- Design tokens live in `globals.css` as CSS custom properties
- Tailwind classes preferred for layout and spacing
- Complex or reusable styles go in `globals.css` as utility classes
- No `!important` unless overriding third-party styles

### Animation

- Framer Motion for scroll reveals and UI transitions
- GSAP only for scroll-pinned/scrubbed animations
- Always respect `prefers-reduced-motion`
- Use `useMotionValue` / `useTransform` for continuous values — never `useState`

### Images

- Always use `next/image` for optimized delivery
- Include meaningful `alt` text
- Set appropriate `sizes` prop for responsive images
- Use `loading="lazy"` for below-the-fold images

---

## Pull Request Guidelines

### PR Checklist

- [ ] Code builds without errors (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Tested on mobile viewport (Chrome DevTools or real device)
- [ ] Tested on desktop (1280px+)
- [ ] All images have `alt` text
- [ ] No console errors in browser
- [ ] Animations work correctly
- [ ] `prefers-reduced-motion` tested
- [ ] Placeholder content clearly marked with `/* PLACEHOLDER */` comments

### PR Description Template

```markdown
## What

Brief description of the change.

## Why

Context on why this change is needed.

## Screenshots

Before/after screenshots if visual changes.

## Testing

How was this tested? What devices/browsers?
```

---

## Content Updates

For non-technical content updates (copy, hours, images), use the `content/` branch prefix and refer to:

- [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) — Text and data updates
- [`docs/MEDIA-GUIDE.md`](docs/MEDIA-GUIDE.md) — Image and video replacements

These PRs can skip the full code review process but must still build successfully.

---

## Questions?

Reach out to the project maintainer or open a discussion in the repository.

---

<sub>Last updated: September 2026</sub>
