import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityEnabled = Boolean(projectId && dataset);

export const client = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
      useCdn: true, // Set to false for fresh data (e.g., for preview)
      token: process.env.SANITY_API_TOKEN, // Only needed for mutations
    })
  : null;
