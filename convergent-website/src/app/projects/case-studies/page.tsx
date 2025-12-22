import Link from 'next/link';

const caseStudies = [
  {
    title: 'Chevron Skin Bond onto Complex Substructure',
    outcome: 'Heat blanket design for complex structures to predict and prevent overtemping.',
    link: '/projects',
  },
  {
    title: 'Distortion Prediction for Thin Ply Composite Parts',
    outcome: 'Content under construction.',
    link: '/projects',
  },
  {
    title: 'Thermal Management for Autoclave Processes',
    outcome: 'Content under construction.',
    link: '/projects',
  },
];

export default function CaseStudiesPage() {
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          {caseStudies.map((cs) => (
            <div key={cs.title} className="rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{cs.title}</h2>
              <p className="text-gray-600 mb-4">{cs.outcome}</p>
              {cs.outcome !== 'Content under construction.' && (
                <Link
                  href={cs.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View details
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
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
