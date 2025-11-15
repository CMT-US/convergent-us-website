import ProjectCarousel from '@/components/ui/ProjectCarousel';

export default function Projects() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Typical Projects: Smarter Manufacturing with Simulation
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            In aerospace manufacturing, specs are tight and timelines tighter. While process simulation can reduce risk by predicting defects and shortening cycle times, it&apos;s often complex and resource-intensive to implement. Convergent US focuses on simplifying process simulation to deliver smarter, faster, and more reliable outcomes.
          </p>
        </div>
      </section>

      {/* Projects Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Approach
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Resolved thermal compliance and optimized curing for heat blanket manufacturing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Predicted and minimized distortion in thin-ply composite aerospace structures (case study pending)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <p className="text-gray-600 mb-6">
              Explore the case studies below to see how our simulation-first approach delivers measurable results across aerospace programs.
            </p>
            <ProjectCarousel />
          </div>
        </div>
      </section>
    </div>
  );
}
