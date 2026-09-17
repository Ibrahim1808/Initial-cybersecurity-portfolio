# Carreiro Flooring Contractor LLC

Photography-led, responsive five-page flooring website built with Next.js App Router, React and TypeScript. Ready to import into Vercel. The email form remains explicitly unavailable until email delivery is configured; phone and email links work immediately.

## Local development

Use Node.js 22 or 24 LTS.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On Windows, use `Copy-Item .env.example .env.local` instead of `cp` if desired.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Browser checks: `npx playwright install chromium` then `npm test`. Tests expect an unconfigured email provider and no SITE_URL; they do not send email. Run against the production build. Screenshots go to ignored `.qa/`.

## Structure

- `app/`: Home, Services, Gallery, About, Contact, custom 404/error pages, metadata, sitemap and robots.
- `app/api/quote/route.ts`: server-only validation and optional Resend email delivery.
- `components/`: navigation, footer, shared image/CTA components, gallery/lightbox, quote form.
- `lib/business.ts`: **edit company name, phone, email and service area here**.
- `data/services.ts`: service copy and featured photo references.
- `data/projects.json`: photo IDs, dimensions, paths, alt text, stage and material categories.
- `public/images/projects/`: optimized WebP images and smaller gallery derivatives; originals remain untouched outside the repository.
- `docs/image-audit.json`: disposition of every supplied JPG.
- `scripts/prepare_images.py`: optional repeatable image import, requires Python Pillow; accepts a source directory argument. Review category/alt mappings before adding new photographs.

## Vercel deployment

1. Push this project directory to your GitHub repository, then import it into Vercel.
2. Choose the Next.js preset and Node 24. Build command: `npm run build`. Use the default output setting.
3. Add environment variables below. The site can deploy without an email provider; visitors are clearly directed to phone/email.
4. Deploy and verify all five routes and images on the Vercel URL. After configuring delivery, make one intentional real quote submission and verify receipt in the company inbox.
5. Use Vercel Firewall rate-limiting rules for `/api/quote` when enabling public email delivery. The endpoint includes a honeypot, bounded payloads, same-origin checks and server validation. It deliberately does not use unreliable in-memory rate limits on serverless instances. Turnstile or a shared rate limiter can be added at the marked point.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical production origin, including `https://`. Leave empty locally. |
| `RESEND_API_KEY` | Server-only Resend API key. |
| `QUOTE_FROM_EMAIL` | Sender address on a domain verified with Resend. A personal Gmail address is not a verified sending domain. |
| `QUOTE_TO_EMAIL` | Company inbox that receives leads; set to the supplied business email. |

All three email variables are required to enable the form. No credentials are included. Responses report success only after Resend accepts the message and returns an ID; acceptance is not a guarantee of inbox delivery. User content is sent as plain text. Logs do not include lead details.

On Vercel production, the production hostname environment variable supplies a fallback origin until SITE_URL is set. Local builds without an origin omit canonicals and output an empty sitemap rather than inventing a domain. Vercel preview environments are noindex. No preview deployment hostname is used as a canonical origin.

## Custom domain later

Add the purchased domain in Vercel → Project → Settings → Domains. Apply the exact DNS records Vercel shows at your registrar. Choose the primary domain and redirect its alternate (www/apex). Set production `SITE_URL=https://your-purchased-domain` and **redeploy** so static metadata, Open Graph URLs, sitemap and robots update. No source-code domain replacement is necessary.

## Content decisions

All 133 JPGs were visually reviewed. 123 are published: 10 exclusions cover two duplicates, blurred/obstructed shots and the unrelated door/lockbox photo. Photography is grouped conservatively; unknown materials stay in All. Gallery labels distinguish installation progress from installed flooring. Hardwood examples show visible wood grain and installation; laminate identification uses the packaging visible in photo 13; vinyl groups use visible rigid-vinyl packaging. Owner confirmation remains welcome. No project dates or locations are inferred. “Recent work” is a selected portfolio, not a verified date ordering.

Photo 44 leads the homepage; photos 41, 75, 77 and 137 support the portfolio. Photo 15 illustrates laminate, photo 99 vinyl, photo 137 hardwood and photo 77 stairs. The seven supplied MOV files are preserved in the original attachment location and not shipped: the portfolio uses still images to keep loading predictable. No stock or generated project photography is used. The CF monogram is a temporary design, not an existing official logo.

## Before launch

- Supply a verified email sender and API key to enable online submissions; confirm a real delivery after configuration.
- Connect the final domain and update SITE_URL.
- Optionally provide an official logo, owner biography, material corrections and confirmed project details. No invented reviews, licenses, history, pricing or statistics are present.
- Confirm the approximate two-hour Phoenixville service-area wording and business contact spelling are how you want them presented.

No analytics or tracking is installed. Fonts are bundled locally. Dependencies are locked in package-lock.json. Keep `.env.local` and `.vercel` out of Git.

Framework/provider references: [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying), [Vercel custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [Resend email API](https://resend.com/docs/api-reference/emails/send-email).
