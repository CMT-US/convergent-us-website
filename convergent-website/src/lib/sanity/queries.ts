// GROQ queries for Sanity CMS

// Get all projects ordered by order field, then by completed date
export const projectsQuery = `*[_type == "project"] | order(order asc, completedDate desc) {
  _id,
  title,
  slug,
  customer,
  description,
  mainImage,
  industry,
  material,
  process,
  partFamilies[]->{ _id, title, slug },
  status,
  completedDate,
  manufacturingChallenges,
  featured,
  order
}`;

// Get featured projects only
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  customer,
  description,
  mainImage,
  industry,
  material,
  process,
  partFamilies[]->{ _id, title, slug },
  status,
  completedDate,
  manufacturingChallenges,
  featured,
  order
}`;

// Get a single project by slug
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  customer,
  description,
  mainImage,
  gallery,
  industry,
  material,
  process,
  partFamilies[]->{ _id, title, slug },
  status,
  completedDate,
  manufacturingChallenges,
  deckPdf{asset->{_id, url}},
  deckPageCount,
  content,
  featured,
  order
}`;

// Get projects by process type
export const projectsByProcessQuery = `*[_type == "project" && process == $process] | order(order asc, completedDate desc) {
  _id,
  title,
  slug,
  customer,
  description,
  mainImage,
  industry,
  material,
  process,
  partFamilies[]->{ _id, title, slug },
  status,
  completedDate,
  manufacturingChallenges,
  featured,
  order
}`;

// Get all case studies ordered by order field, then by completed date
export const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc, completedDate desc) {
  _id,
  title,
  slug,
  customer,
  summary,
  mainImage,
  industry,
  material,
  process,
  status,
  completedDate,
  manufacturingChallenges,
  featured,
  order,
  deckPdf{asset->{_id, url}},
  deckPageCount
}`;

// Get a single case study by slug
export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  customer,
  summary,
  mainImage,
  industry,
  material,
  process,
  status,
  completedDate,
  manufacturingChallenges,
  deckPdf{asset->{_id, url}},
  deckPageCount,
  content,
  featured,
  order
}`;
