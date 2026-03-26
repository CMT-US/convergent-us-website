const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export function fileUrlFor(assetRef?: string | null): string | null {
  if (!assetRef || !projectId || !dataset) {
    return null;
  }

  const parts = assetRef.split('-');
  if (parts.length < 3) {
    return null;
  }

  const ext = parts.pop();
  const id = parts.slice(1).join('-');

  if (!id || !ext) {
    return null;
  }

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}
