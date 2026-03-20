# Cybersecurity Portfolio

Modern Next.js portfolio for a cybersecurity practitioner, powered by Markdown content in GitHub.

## Stack

- Next.js App Router
- Tailwind CSS
- Framer Motion
- Markdown collections with `gray-matter` + `remark`

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Content management with GitHub

All content lives in the `content` folder:

- `content/projects`
- `content/lab`
- `content/notes`

Create a new Markdown file with frontmatter:

```md
---
title: "My New Entry"
date: "2026-03-19"
tags: ["web", "security"]
summary: "Short summary for cards and SEO."
featured: true
---

Markdown content goes here.
```

Push those changes to GitHub and the site updates automatically after Vercel redeploys.

## Personalize the site

Update your main profile details in `lib/site.js`:

- name and short site name
- hero name, title, and intro
- GitHub / LinkedIn links
- public contact email
- Open Graph image

If you deploy to Vercel, set `NEXT_PUBLIC_SITE_URL` to your production domain so sitemap, robots, and metadata use the correct URL.

## Resume

Replace the sample PDF at `public/resume.pdf` with your own file and keep the same name, or update the link in the resume section.

## Deploy to GitHub

1. Create a new GitHub repository.
2. In this project folder, initialize Git if needed.
3. Commit the project.
4. Add your GitHub remote.
5. Push your code.

Typical commands:

```bash
git init
git add .
git commit -m "Initial cybersecurity portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Deploy to Vercel

1. Go to [Vercel](https://vercel.com).
2. Import your GitHub repository.
3. Accept the default Next.js settings.
4. Add `NEXT_PUBLIC_SITE_URL` in the Vercel project settings.
5. Click deploy.

Vercel will rebuild the site automatically every time you push changes to GitHub.

## Project notes

- No login system is included.
- The site is public-only by design.
- SEO metadata is configured per page and per content item.
- Content pages are generated automatically from Markdown files.
- Mobile and desktop navigation are both included.
- Search and tag filtering work from the Markdown frontmatter content.
