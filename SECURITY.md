# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### Contact

- **Email**: [security contact — add your email here]
- **Response time**: We aim to acknowledge within 48 hours

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What We Will Do

1. Acknowledge your report within 48 hours
2. Investigate and validate the issue
3. Develop and test a fix
4. Deploy the fix to production
5. Credit you in the changelog (if you wish)

---

## Security Considerations

### This Is a Static Marketing Site

The Stella website is a **static marketing site** with no:
- User authentication or accounts
- Server-side data processing
- Database connections
- Payment processing
- User-generated content
- API endpoints

This significantly reduces the attack surface.

### External Links

The site links to external services:
- **WhatsApp** (`wa.me`) — for reservation messages
- **Google Maps** (`google.com/maps`) — for directions
- **Instagram** (`instagram.com`) — social profile
- **Facebook** (`facebook.com`) — social profile

All external links use `target="_blank"` with `rel="noopener noreferrer"` to prevent tab-napping.

### Third-Party Dependencies

| Dependency | Risk Level | Notes |
|-----------|------------|-------|
| Next.js | Low | Major framework, well-maintained |
| React | Low | Industry standard |
| Tailwind CSS | Low | Build-time only, no runtime |
| Framer Motion | Low | Client-side animation |
| GSAP | Low | Client-side animation |
| Lenis | Low | Client-side scroll |
| Phosphor Icons | Low | Static SVG icons |

### Content Security

- No user input forms process data server-side
- Google Maps iframe is sandboxed by the browser
- No cookies are set by the application itself
- Analytics (if added) should comply with GDPR / Indian IT Act

### Recommendations for Production

1. **Enable HTTPS**: Enforced automatically on Vercel/Netlify
2. **Content Security Policy**: Add CSP headers via `next.config.ts`:
   ```ts
   headers: async () => [
     {
       source: '/(.*)',
       headers: [
         { key: 'X-Content-Type-Options', value: 'nosniff' },
         { key: 'X-Frame-Options', value: 'DENY' },
         { key: 'X-XSS-Protection', value: '1; mode=block' },
         { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
       ],
     },
   ],
   ```
3. **Dependency auditing**: Run `npm audit` regularly
4. **Keep dependencies updated**: Use `npm outdated` and update monthly

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x | Yes |

---

<sub>Last updated: September 2026</sub>
