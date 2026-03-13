# SEO Recommendations

This document captures prioritized, concrete improvements for SEO in this codebase.

## 1) Metadata & Social Cards
- Add per-page `metadata` exports for core routes so each page has a unique title/description.
  - Targets: `src/app/about/page.tsx`, `src/app/services/page.tsx`, `src/app/consulting/page.tsx`,
    `src/app/projects/page.tsx`, `src/app/contact/page.tsx`, `src/app/toolsets/page.tsx`,
    `src/app/publications/page.tsx`.
- Add `generateMetadata` in `src/app/projects/[slug]/page.tsx` to use Sanity data
  (title, summary, og image, canonical).
- Expand global metadata in `src/app/layout.tsx`:
  - `metadataBase`
  - `title: { default, template }`
  - `openGraph` + `twitter` defaults

## 2) Sitemap & Robots
- Add a `src/app/sitemap.ts` file to expose a sitemap for crawlers.
- Add a `src/app/robots.ts` file with a basic allow/disallow policy.
- Include dynamic routes (projects) in the sitemap if Sanity is enabled.

## 3) Structured Data (JSON-LD)
- Add Organization/LocalBusiness JSON-LD with address, phone, and URL in `src/app/layout.tsx`.
- Add Service/Website structured data on relevant pages (e.g., Services, Consulting).

## 4) Open Graph Images
- Provide a default OG image in `public/images/og-default.png`.
- Use project images from Sanity for per-project OG where available.

## 5) Content & On-Page Signals
- Ensure exactly one H1 per page and a clear hierarchy (H2/H3).
- Add descriptive copy and internal links between services, projects, and toolsets.
- Use meaningful anchor text (avoid "click here").

## 6) Performance/UX
- Make sure LCP images (hero) are optimized and use `priority` appropriately.
- Keep layout shifts low by setting dimensions or aspect ratios for large images.

## 7) Sanity/Content Ops
- Add meta fields to Sanity (SEO title, SEO description, og image) for projects or pages.
- Use those fields in `generateMetadata` for consistent authoring.
