import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

export const sanityWriteEnabled = Boolean(projectId && dataset && token);

export const writeClient = sanityWriteEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
      useCdn: false,
      token,
    })
  : null;
