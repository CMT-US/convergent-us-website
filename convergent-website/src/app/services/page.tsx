import Link from 'next/link';

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Our Services
          </h1>
          <p className="text-xl text-center text-gray-600">
            Comprehensive solutions for composites manufacturing challenges
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            
            {/* R&D Services */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                R&D Services
              </h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  Project based process & material characterization modeling and simulation research 
                  with a focus on pragmatic integration of these advancement into user available tools.
                </p>
                <p>
                  Our development activities goal is to expand pragmatic process simulation for 
                  composites manufacturing stakeholders and make it more accessible to a wider user base.
                </p>
              </div>
            </div>

            {/* Material & Process Characterization */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Material & Process Characterization
              </h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  In lab and in facility material & process characterization and model fitting 
                  that support process understanding and simulation
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Materials:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Kinetics/Crystallinity</li>
                      <li>• Flow Compaction Voids</li>
                      <li>• Mechanical, Tack/Weld</li>
                      <li>• Aging & Degradation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Process:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Equipment</li>
                      <li>• Tooling</li>
                      <li>• Environment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Consulting */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <Link href="/consulting" className="text-blue-600 hover:text-blue-700">
                  Consulting
                </Link>
              </h2>
              <div className="text-gray-600 space-y-4">
                <p>Application specific pragmatic consulting, including:</p>
                <ul className="grid grid-cols-2 gap-2 text-gray-600">
                  <li>• Characterization</li>
                  <li>• Modeling</li>
                  <li>• Simulation</li>
                  <li>• Training</li>
                </ul>
                <p>
                  These activities support our customers in designing, analyzing, and optimizing 
                  composite part manufacturing & repair using CMT-US tools, approaches, and workflows. 
                  They are generally project specific and proprietary.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us to discuss how our services can help improve your composites manufacturing process.
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