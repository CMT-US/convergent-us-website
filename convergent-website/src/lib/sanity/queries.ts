// GROQ queries for Sanity CMS

// Get all projects ordered by order field, then by completed date
export const projectsQuery = `*[_type == "project"] | order(order asc, completedDate desc) {
  _id,
  title,
  slug,
  client,
  description,
  mainImage,
  industry,
  process,
  completedDate,
  featured,
  order
}`;

// Get featured projects only
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  client,
  description,
  mainImage,
  industry,
  process,
  completedDate,
  featured,
  order
}`;

// Get a single project by slug
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  description,
  mainImage,
  gallery,
  industry,
  process,
  completedDate,
  content,
  featured,
  order
}`;

// Get projects by process type
export const projectsByProcessQuery = `*[_type == "project" && process == $process] | order(order asc, completedDate desc) {
  _id,
  title,
  slug,
  client,
  description,
  mainImage,
  industry,
  process,
  completedDate,
  featured,
  order
}`;
