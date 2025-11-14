# Sanity CMS Implementation Plan

## Overview
This document outlines the plan to integrate Sanity CMS into the Convergent Manufacturing Technologies US website. The primary goals are:
1. **Projects Management**: Create and manage project case studies/portfolio items
2. **Contact Form Submissions**: Store and manage feedback from the contact form

## Phase 1: Setup & Configuration

### 1.1 Install Dependencies
```bash
cd convergent-website
npm install @sanity/client next-sanity
npm install -D sanity @sanity/vision
```

### 1.2 Initialize Sanity Studio
```bash
npx sanity init --env
```
- Create new Sanity project
- Project name: "convergent-website"
- Dataset: "production"
- Output path: `./sanity`

### 1.3 Configure Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=your_token_with_write_access
```

Update `.gitignore`:
```
.env.local
.env*.local
```

## Phase 2: Schema Design

### 2.1 Project Schema (`project.ts`)
```typescript
{
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: required },
    { name: 'slug', type: 'slug', from: 'title' },
    { name: 'client', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'mainImage', type: 'image' },
    { name: 'gallery', type: 'array', of: [{ type: 'image' }] },
    { name: 'industry', type: 'string' },
    { name: 'process', type: 'string', options: {
      list: ['Heat Blanket', 'Autoclave', 'Closed Mold', 'AFP', 'Infusion', 'Bonding']
    }},
    { name: 'completedDate', type: 'date' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] }, // Rich text
    { name: 'featured', type: 'boolean', default: false },
    { name: 'order', type: 'number' }
  ]
}
```

### 2.2 Contact Submission Schema (`contactSubmission.ts`)
```typescript
{
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    { name: 'firstName', type: 'string' },
    { name: 'lastName', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'message', type: 'text' },
    { name: 'submittedAt', type: 'datetime', initialValue: new Date() },
    { name: 'status', type: 'string', options: {
      list: ['new', 'read', 'responded', 'archived']
    }, initialValue: 'new' },
    { name: 'notes', type: 'text' } // Internal notes for team
  ]
}
```

## Phase 3: Sanity Studio Setup

### 3.1 Embed Studio in Next.js
Create `src/app/studio/[[...index]]/page.tsx`:
```typescript
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

Access at: `http://localhost:3000/studio`

### 3.2 Configure Studio
File: `sanity.config.ts` (root of convergent-website)
- Register project and contactSubmission schemas
- Add Vision plugin for GROQ testing
- Customize desk structure to group submissions

## Phase 4: Projects Page Implementation

### 4.1 Create Sanity Client
File: `src/lib/sanity/client.ts`
```typescript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN, // Only needed for mutations
});
```

### 4.2 Create Project Queries
File: `src/lib/sanity/queries.ts`
```typescript
export const projectsQuery = `*[_type == "project"] | order(order asc, completedDate desc)`;
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc)`;
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]`;
```

### 4.3 Create Projects Page
File: `src/app/projects/page.tsx`
- Fetch all projects from Sanity
- Display in grid layout (similar to services page)
- Filter by process type (optional)
- Click to view project detail

### 4.4 Create Project Detail Page
File: `src/app/projects/[slug]/page.tsx`
- Dynamic route for individual projects
- Display full project details
- Image gallery
- Related projects section

### 4.5 Add Projects to Navigation
Update `src/components/layout/Header.tsx`:
```typescript
const navigation = [
  { name: 'Consulting Services', href: '/consulting' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Projects', href: '/projects' }, // Add this
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
```

## Phase 5: Contact Form Backend

### 5.1 Create API Route
File: `src/app/api/contact/route.ts`
```typescript
import { client } from '@/lib/sanity/client';

export async function POST(request: Request) {
  const data = await request.json();

  // Validate data
  if (!data.firstName || !data.lastName || !data.email || !data.message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Store in Sanity
  try {
    const result = await client.create({
      _type: 'contactSubmission',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      message: data.message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    });

    return Response.json({ success: true, id: result._id });
  } catch (error) {
    return Response.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
```

### 5.2 Update ContactForm Component
File: `src/components/ui/ContactForm.tsx`
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Thank you! We will get back to you soon.');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } else {
      alert('Error submitting form. Please try again.');
    }
  } catch (error) {
    alert('Error submitting form. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Phase 6: Content Management Workflow

### 6.1 Projects Management
- Access studio at `/studio`
- Navigate to "Projects" section
- Click "Create new project"
- Fill in details, upload images
- Set featured flag for homepage
- Set order number for positioning
- Publish

### 6.2 Contact Submissions Management
- Access studio at `/studio`
- Navigate to "Contact Submissions"
- View all submissions sorted by date
- Mark as read/responded
- Add internal notes
- Filter by status

## Phase 7: Optional Enhancements

### 7.1 Featured Projects on Homepage
Update `src/app/page.tsx` to show 2-3 featured projects below the hero section

### 7.2 Email Notifications (Optional)
Consider adding email service (Resend, SendGrid) to send notifications when contact form is submitted

### 7.3 Project Filtering
Add filters on projects page:
- Filter by process type
- Filter by industry
- Search by keyword

### 7.4 Image Optimization
Use Sanity's image CDN with `@sanity/image-url` for automatic optimization

## Estimated Timeline

- **Phase 1-2**: Setup & Schema - 1-2 hours
- **Phase 3**: Studio Setup - 30 minutes
- **Phase 4**: Projects Page - 3-4 hours
- **Phase 5**: Contact Form Backend - 1-2 hours
- **Phase 6**: Testing & Content Entry - 1-2 hours
- **Phase 7**: Optional Enhancements - 2-3 hours

**Core Implementation**: 6-10 hours
**With Enhancements**: 8-13 hours

## Success Criteria

- [ ] Projects page displays all projects from Sanity
- [ ] Can create/edit/delete projects in Studio
- [ ] Individual project pages work with dynamic routes
- [ ] Contact form submissions save to Sanity
- [ ] Can view and manage submissions in Studio
- [ ] Projects link appears in navigation
- [ ] Images load and display correctly
- [ ] Mobile responsive design maintained

## Rollback Plan

- Keep all original static components
- Can revert to static site at any time via Git
- Projects page is new, so no risk to existing pages
- Contact form can fall back to console.log if API fails
