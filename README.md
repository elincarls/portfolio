# Portfolio

Personal portfolio and case-study site for a designer. Built with Next.js
(App Router) and React, with content stored in MongoDB.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **MongoDB** via **Mongoose** (Atlas)
- **CSS Modules** + CSS custom properties for theming
- **next/font** — Schibsted Grotesk and Lora
- No TypeScript
- Hosted on **Vercel**; Documents and images on Vercel Blob

## Getting started

Requires Node 18+.

```bash
npm install
npm run dev      # http://localhost:3000
```

Create a `.env.local` with the database connection string:

```
MONGO_URI=<your MongoDB connection string>
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals`)

## Project structure

```
app/
  page.js              # splash → redirect to /work
  work/                # project list + [slug] detail
  me/  contact/        # content pages
  api/                 # GET JSON endpoints (projects, site, checkdb), available in dev only
  schemas/             # Mongoose models: Project, Site
  fonts.js  globals.css
components/             # UI + the SVG "burst" splash animation
lib/                    # db connection + shared helpers (easing, sort, masks)
public/                 # brand SVGs (logo, icons, artwork)
```

## Content model

Content lives in MongoDB and is read in Server Components via Mongoose:

- **`Site`** — a single document holding `me`, `contact`, and `banner` content.
- **`Project`** — one document per project, stored in MongoDB. Each project has editorial metadata (`title`, `slug`, `tags`, `year`), an `enabled` visibility flag, and a `sections[]` array that forms the body. Sections are **typed content blocks** of the type `paragraph`, `image`, or `bullet-list`, ordered and schema-validated via Mongoose. This makes up a lightweight, headless-CMS.

Project ordering (enabled first, then newest) is defined once in `PROJECT_SORT`
(`app/schemas/Project.js`) and shared by the list page and the prev/next nav.

> Note: `/work`, `/me`, and `/contact` are statically prerendered and
> revalidated every 60s (ISR via `export const revalidate`), so database edits
> appear within about a minute without a redeploy. Project detail pages
> (`/work/[slug]`) are server-rendered on demand.

## Integrations

- **Contact form** → web3forms (`api.web3forms.com`)
- **Assets** (PDFs and images) → Vercel Blob storage

## Deployment

Deployed on Vercel via Git integration (push to `main`).
