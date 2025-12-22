import Link from 'next/link';
import PdfCarousel from '@/components/ui/PdfCarousel';

const researchAreas = [
  'Prepreg tack modeling for AFP/ATL',
  'Porosity prediction from gas and resin transport',
  'Thermal profiling and cure cycle optimization',
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-blue-600 text-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-wide text-blue-100 font-semibold mb-2">Projects</p>
          <h1 className="text-4xl font-bold mb-4">Research</h1>
          <p className="text-lg text-blue-100">
            Methods and models we advance to predict defects, optimize cures, and de-risk composite manufacturing.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Focus Areas</h2>
            <ul className="space-y-3 text-gray-700">
              {researchAreas.map((area) => (
                <li key={area} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/publications"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View Publications
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sample Outputs</h2>
            <p className="text-gray-600 mb-4">
              Typical research deliverables include calibrated material models, validation test plans,
              and simulation toolkits integrated into production workflows.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Validated thermal and cure kinetics models</li>
              <li>• Porosity risk maps and sensitivity studies</li>
              <li>• AFP tack envelopes and defect predictors</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Research Highlights</h2>
          <PdfCarousel />
        </div>
      </section>
    </div>
  );
}
