import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Convergent Manufacturing Technologies US
          </h3>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-600">
            <Link
              href="mailto:info@convergent-mfg.com"
              className="hover:text-blue-600 transition-colors"
            >
              info@convergent-mfg.com
            </Link>
            <Link
              href="tel:+14253740302"
              className="hover:text-blue-600 transition-colors"
            >
              (425) 374-0302
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}