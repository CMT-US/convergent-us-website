import Link from 'next/link';
import { client, sanityEnabled } from '@/lib/sanity/client';
import { projectsQuery } from '@/lib/sanity/queries';
import { Project } from '@/lib/sanity/types';
import ProjectsGrid from '@/components/ui/ProjectsGrid';

export const revalidate = 60; // Revalidate every 60 seconds

async function getProjects(): Promise<Project[]> {
  if (!sanityEnabled || !client) {
    return [];
  }

  try {
    const projects = await client.fetch<Project[]>(projectsQuery);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

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
          <ProjectsGrid projects={projects} />
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
