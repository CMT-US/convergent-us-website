# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `src/app`; top-level routes include `page.tsx` (home) plus `about`, `services`, `projects`, `consulting`, `toolsets`, `contact`, and API at `app/api/contact/route.ts`. Sanity Studio is served from `src/app/studio/[[...index]]/page.tsx` with config in `sanity.config.ts` and schemas in `sanity/schemaTypes`.
- UI primitives sit in `src/components/ui` (e.g., `ContactForm`, `ProjectCarousel`, `ProcessIcon`, `VideoPlayer`) and layout scaffolding in `src/components/layout` (`Header`, `Footer`). Shared logic lives in `src/lib` (Sanity client/types). Static assets go in `public/`; global styles are in `src/app/globals.css`; Tailwind tokens live in `tailwind.config.ts`.

## Build, Test, and Development Commands
- `npm run dev` — start Next.js with Turbopack on `http://localhost:3000` (`/studio` for CMS).
- `npm run lint` — ESLint using `next/core-web-vitals` + TypeScript rules.
- `npm run build` — production build with type checks.
- `npm start` — serve the built output.
- Configure `.env.local` with `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `NEXT_PUBLIC_SANITY_API_VERSION`, and `SANITY_API_TOKEN` for mutations (contact API writes).

## Coding Style & Naming Conventions
- TypeScript with `strict` mode; imports may use the `@/*` path alias. Prefer server components; add `'use client'` only when client-side hooks/events are required.
- Components and files in `src/components` use PascalCase; route folders stay lowercase/kebab-case. Use 2-space indentation, semicolons, and descriptive prop names.
- Tailwind is the primary styling layer; keep to existing tokens (`convergent-blue`, `navy`, `success`, `warning`, `error`, `accent`) and the typography scale defined in `globals.css`.

## Testing Guidelines
- No automated tests yet; add `*.test.tsx` or `*.spec.ts` near the code or under `__tests__`. Aim to cover contact form validation and API behavior (mock the Sanity client and env vars). For UI changes, manually verify key pages render without console errors and forms submit successfully against the test dataset.

## Commit & Pull Request Guidelines
- Match existing history: short, imperative titles (e.g., `Update email address`, `Add basePath to Sanity config`); avoid noise like build artefacts.
- PRs should include: concise summary, linked issue (if any), screenshots/recordings for UI changes (desktop + mobile), list of test commands run, and call out env/config changes. Request review for CMS schema updates to confirm Studio behavior.
