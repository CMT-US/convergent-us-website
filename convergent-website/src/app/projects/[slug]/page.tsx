import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { client } from '@/lib/sanity/client';
import { projectBySlugQuery, projectsQuery } from '@/lib/sanity/queries';
import { Project } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/image';

export const revalidate = 60;

const processLabels: Record<string, string> = {
  'heat-blanket': 'Heat Blanket',
  'autoclave': 'Autoclave',
  'closed-mold': 'Closed Mold',
  'afp': 'AFP',
  'infusion': 'Infusion',
  'bonding': 'Bonding',
};

async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch<Project>(projectBySlugQuery, { slug });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Generate static paths for all projects
export async function generateStaticParams() {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery);
    return projects.map((project) => ({
      slug: project.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            ← Back to Projects
          </Link>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.client && (
              <div>
                <span className="text-gray-500">Client: </span>
                <span className="text-gray-900 font-medium">{project.client}</span>
              </div>
            )}
            {project.completedDate && (
              <div>
                <span className="text-gray-500">Completed: </span>
                <span className="text-gray-900 font-medium">
                  {new Date(project.completedDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.process && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {processLabels[project.process] || project.process}
              </span>
            )}
            {project.industry && (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {project.industry}
              </span>
            )}
          </div>

          {/* Main Image */}
          {project.mainImage && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
              <Image
                src={urlFor(project.mainImage).width(1200).height(600).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Description */}
          {project.description && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-600">{project.description}</p>
            </div>
          )}

          {/* Rich Text Content */}
          {project.content && project.content.length > 0 && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={project.content} />
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={urlFor(image).width(800).height(600).url()}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in a Similar Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us to discuss how we can help with your composites manufacturing needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
