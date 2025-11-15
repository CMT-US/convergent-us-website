import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity/client';
import { projectsQuery } from '@/lib/sanity/queries';
import { Project } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/image';

export const revalidate = 60; // Revalidate every 60 seconds

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

const processLabels: Record<string, string> = {
  'heat-blanket': 'Heat Blanket',
  'autoclave': 'Autoclave',
  'closed-mold': 'Closed Mold',
  'afp': 'AFP',
  'infusion': 'Infusion',
  'bonding': 'Bonding',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Our Projects
          </h1>
          <p className="text-xl text-center text-gray-600">
            Explore our portfolio of composites manufacturing projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No projects available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Project Image */}
                  {project.mainImage ? (
                    <div className="relative h-48 w-full bg-gray-200">
                      <Image
                        src={urlFor(project.mainImage).width(600).height(400).url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h2>

                    {project.client && (
                      <p className="text-sm text-gray-500 mb-2">
                        Client: {project.client}
                      </p>
                    )}

                    {project.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-2">
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

                    {project.completedDate && (
                      <p className="text-sm text-gray-500 mt-2">
                        Completed: {new Date(project.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
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
