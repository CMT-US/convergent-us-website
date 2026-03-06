import Link from 'next/link';
import TwoImageCarousel, { CarouselImage } from '@/components/ui/TwoImageCarousel';

const defaultImages: CarouselImage[] = [
  { src: '/images/projects/slide-1.jpg', alt: 'Project placeholder slide 1' },
  { src: '/images/projects/slide-2.jpg', alt: 'Project placeholder slide 2' },
];

type ProjectDetailLayoutProps = {
  title: string;
  contractNumber: string;
  customer: string;
  summary?: string;
  images?: CarouselImage[];
};

export default function ProjectDetailLayout({
  title,
  contractNumber,
  customer,
  summary,
  images,
}: ProjectDetailLayoutProps) {
  const slides = images && images.length ? images : defaultImages;

  return (
    <div className="min-h-screen">
      <section className="pt-16 pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            &larr; Back to Projects
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <span className="text-gray-500">Contract Number: </span>
                <span className="text-gray-900 font-medium">{contractNumber}</span>
              </div>
              <div>
                <span className="text-gray-500">Customer: </span>
                <span className="text-gray-900 font-medium">{customer}</span>
              </div>
            </div>

            {summary && (
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Overview</h2>
                <p className="text-gray-600">{summary}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Images</h2>
          <TwoImageCarousel images={slides} />
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Interested in a Similar Project?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Contact us to discuss how we can help with your composites manufacturing needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
