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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="w-full">
          <Image
            src="/images/hero-digital-twin.png"
            alt="Person using computer with digital airplane model projected in background, highlighting digital twin technology and physics-based simulation for composite manufacturing."
            width={1920}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Typical Processes Modeled Section */}
      <section className="py-20">
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
      <section className="bg-white py-20">
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