# Verification

- Production build, TypeScript and ESLint pass.
- Five Playwright tests pass against the production build.
- All five pages checked at 1440, 768, 390 and 320 pixels; no horizontal overflow.
- Automated WCAG A/AA checks pass at desktop and phone widths. This is not a substitute for a full manual accessibility audit.
- All 246 portfolio image files respond successfully.
- Filters, lightbox arrows, Escape, focus restoration, touch swipe and mobile navigation checked.
- Quote validation, missing configuration, honeypot, origin rejection and oversized requests checked.
- `node scripts/check-email.cjs` verifies the actual email route with mocked provider acceptance, rejection, missing ID and network failure. No email is sent by this check.
- Desktop and mobile screenshots visually reviewed. Local screenshots and test output are excluded from Git.
- Real email delivery and live deployment remain unverified until provider credentials and valid Vercel authentication are supplied.
