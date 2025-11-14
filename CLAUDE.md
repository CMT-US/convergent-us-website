# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for Convergent Manufacturing Technologies US, a company providing advanced composite process simulation services and tools. The project uses:
- **Next.js 15.5.2** with App Router and Turbopack
- **React 19.1.0**
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **Inter font** from Google Fonts

## Working Directory

All development commands should be run from the `convergent-website/` directory:

```bash
cd convergent-website
```

## Development Commands

```bash
# Start development server (uses Turbopack)
npm run dev

# Build for production (uses Turbopack)
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The development server runs at `http://localhost:3000`.

## Project Architecture

### App Router Structure

The project uses Next.js App Router with the following page routes:
- `/` - Home page with hero section, process icons, and about section
- `/consulting` - Consulting services page
- `/services` - Services overview page
- `/products` - Products page (OSPREY, OSPREY Live)
- `/about` - About the company page
- `/contact` - Contact form page

All pages are located in `src/app/` with each route having its own directory containing a `page.tsx` file.

### Component Organization

Components are organized in `src/components/` with two main directories:

**`layout/`** - Layout components used across all pages:
- `Header.tsx` - Main navigation header with mobile menu (client component)
- `Footer.tsx` - Site footer

**`ui/`** - Reusable UI components:
- `ProcessIcon.tsx` - Icon components for manufacturing processes (Heat Blanket, Autoclave, Closed Mold, AFP, Infusion, Bonding)
- `ContactForm.tsx` - Contact form component

### Root Layout

`src/app/layout.tsx` defines the global layout with Header/Footer wrapper and Inter font configuration. All pages are wrapped in this layout automatically.

### Styling

- Global styles in `src/app/globals.css`
- Tailwind configuration in `tailwind.config.ts` with custom "convergent-blue" color palette
- Uses `@/` path alias for imports (maps to `src/`)

### Client vs Server Components

- **Client components** (marked with `'use client'`): Header (for mobile menu state), ContactForm
- **Server components** (default): All page routes, Footer, ProcessIcon

## Key Patterns

1. **Navigation**: Main navigation links defined in `Header.tsx` navigation array
2. **Color scheme**: Primary brand color is blue (convergent-blue variants in Tailwind config)
3. **Responsive design**: Mobile-first approach with breakpoints (sm, md, lg)
4. **Font loading**: Inter font loaded via next/font/google with CSS variable `--font-inter`

## Asset Management

Static assets are stored in `public/` directory and referenced with absolute paths (e.g., `/logo.svg`).

## TypeScript Configuration

- Path alias `@/*` maps to `src/*`
- Strict mode enabled
- Target ES2017
- No emit (Next.js handles compilation)
