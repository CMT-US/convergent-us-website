import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { client, sanityEnabled } from '@/lib/sanity/client';
import { caseStudiesQuery, caseStudyBySlugQuery } from '@/lib/sanity/queries';
import { CaseStudy } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/image';
import { fileUrlFor } from '@/lib/sanity/file';
import PdfCarousel from '@/components/ui/PdfCarousel';

export const revalidate = 60;

const processLabels: Record<string, string> = {
  'heat-blanket': 'Heat Blanket',
  'autoclave': 'Autoclave',
  'closed-mold': 'Closed Mold',
  'afp': 'AFP',
  'infusion': 'Infusion',
  'bonding': 'Bonding',
};
const materialLabels: Record<string, string> = {
  'thermoset': 'Thermoset',
  'thermoplastic': 'Thermoplastic',
  'bmi': 'BMI',
  'carbon-carbon': 'Carbon-Carbon',
  'polyimide': 'Polyimide',
};
const statusLabels: Record<string, string> = {
  'completed': 'Completed',
  'in-progress': 'In Progress',
};
const challengeLabels: Record<string, string> = {
  'thermal-compliance': 'Thermal Compliance',
  'distortion': 'Distortion',
  'offgassing': 'Offgassing',
  'part-thickness': 'Part Thickness',
  'porosity': 'Porosity',
  'wrinkling': 'Wrinkling',
  'tool-compensation': 'Tool Compensation',
};

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!sanityEnabled || !client) {
    return null;
  }

  try {
    const caseStudy = await client.fetch<CaseStudy>(caseStudyBySlugQuery, { slug });
    return caseStudy;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export async function generateStaticParams() {
  if (!sanityEnabled || !client) {
    return [];
  }

  try {
    const caseStudies = await client.fetch<CaseStudy[]>(caseStudiesQuery);
    return caseStudies.map((caseStudy) => ({
      slug: caseStudy.slug.current,
    }));
  } catch (error) {
    console.error('Error generating case study params:', error);
    return [];
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const materials = Array.isArray(caseStudy.material)
    ? caseStudy.material
    : caseStudy.material
      ? [caseStudy.material]
      : [];
  if (process.env.NODE_ENV === 'development') {
    console.log('[case-study] deckPdf asset:', caseStudy.deckPdf?.asset);
    console.log('[case-study] deckPageCount:', caseStudy.deckPageCount);
  }
  const deckUrl =
    caseStudy.deckPdf?.asset?.url ||
    fileUrlFor(caseStudy.deckPdf?.asset?._ref);
  const deckPageCount = caseStudy.deckPageCount && caseStudy.deckPageCount > 0
    ? caseStudy.deckPageCount
    : 1;

  return (
    <div className="min-h-screen">
      <section className="pt-16 pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects/case-studies"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            ← Back to Case Studies
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {caseStudy.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-8">
            {caseStudy.customer && (
              <div>
                <span className="text-gray-500">Customer: </span>
                <span className="text-gray-900 font-medium">{caseStudy.customer}</span>
              </div>
            )}
            {caseStudy.status && (
              <div>
                <span className="text-gray-500">Status: </span>
                <span className="text-gray-900 font-medium">
                  {statusLabels[caseStudy.status] || caseStudy.status}
                </span>
              </div>
            )}
            {caseStudy.completedDate && (
              <div>
                <span className="text-gray-500">Completed: </span>
                <span className="text-gray-900 font-medium">
                  {new Date(caseStudy.completedDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {caseStudy.process && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {processLabels[caseStudy.process] || caseStudy.process}
              </span>
            )}
            {materials.map((material) => (
              <span
                key={material}
                className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full"
              >
                {materialLabels[material] || material}
              </span>
            ))}
          </div>

          {caseStudy.manufacturingChallenges &&
            caseStudy.manufacturingChallenges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {caseStudy.manufacturingChallenges.map((challenge) => (
                  <span
                    key={challenge}
                    className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                  >
                    {challengeLabels[challenge] || challenge}
                  </span>
                ))}
              </div>
            )}

          {caseStudy.mainImage && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
              <Image
                src={urlFor(caseStudy.mainImage).width(1200).height(600).url()}
                alt={caseStudy.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {caseStudy.summary && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-600">{caseStudy.summary}</p>
            </div>
          )}

          {deckUrl && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Study Details</h2>
              <PdfCarousel pdfUrl={deckUrl} pageCount={deckPageCount} />
            </div>
          )}

          {caseStudy.content && caseStudy.content.length > 0 && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={caseStudy.content} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
