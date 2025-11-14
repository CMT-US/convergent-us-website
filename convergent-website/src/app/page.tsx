import Link from 'next/link';
import Image from 'next/image';
import ProcessIcon, {
  HeatBlanketIcon,
  AutoclaveIcon,
  ClosedMoldIcon,
  AFPIcon,
  InfusionIcon,
  BondingIcon,
} from '@/components/ui/ProcessIcon';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Advanced Composite Process Simulation
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Convergent US provides services and tools to make composites manufacturing 
                lower risk at every stage of the process using model-based simulation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Our Services
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-digital-twin.png"
                alt="Person using computer with digital airplane model projected in background, highlighting digital twin technology and physics-based simulation for composite manufacturing."
                width={1200}
                height={674}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Typical Processes Modeled Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Typical Processes Modeled
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <ProcessIcon
              title="Heat Blanket"
              href="/consulting#heatblanket"
              icon={<HeatBlanketIcon />}
            />
            <ProcessIcon
              title="Autoclave & Oven"
              href="/consulting#autoclave"
              icon={<AutoclaveIcon />}
            />
            <ProcessIcon
              title="Closed Mold"
              href="/consulting#closedmold"
              icon={<ClosedMoldIcon />}
            />
            <ProcessIcon
              title="AFP"
              href="/consulting#afp"
              icon={<AFPIcon />}
            />
            <ProcessIcon
              title="Infusion"
              href="/consulting#infusion"
              icon={<InfusionIcon />}
            />
            <ProcessIcon
              title="Bonding & Weld"
              href="/consulting#weld"
              icon={<BondingIcon />}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            About Us
          </h2>
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-gray-600">
              Convergent Manufacturing Technologies US is a US owned and operated independent 
              developer and reseller of hardware and software products using model-based simulation 
              to design, optimize and trouble shoot advanced composite processes to improve 
              manufacturing efficiency and lower risk at every stage of the process.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn More About Us
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}