import Link from 'next/link';
import { client, sanityEnabled } from '@/lib/sanity/client';
import { caseStudiesQuery } from '@/lib/sanity/queries';
import { CaseStudy } from '@/lib/sanity/types';
import CaseStudiesGrid from '@/components/ui/CaseStudiesGrid';

export const revalidate = 60; // Revalidate every 60 seconds

async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!sanityEnabled || !client) {
    return [];
  }

  try {
    const caseStudies = await client.fetch<CaseStudy[]>(caseStudiesQuery);
    return caseStudies;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="min-h-screen">
      <section className="bg-blue-600 text-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-wide text-blue-100 font-semibold mb-2">Projects</p>
          <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
          <p className="text-lg text-blue-100">
            Practical applications of our process modeling and manufacturing support across aerospace and industrial programs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CaseStudiesGrid caseStudies={caseStudies} />
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Looking for specifics?</h2>
          <p className="text-gray-600 mb-6">
            We can share anonymized results or set up a focused demo aligned to your part geometry and process.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
