'use client';

import { useState } from 'react';

const PDF_PATH = '/images/projects/Current%20work.pdf';

const pages = [1, 2, 3, 4, 5]; // adjust length if the PDF page count changes

export default function PdfCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const nextIndex = (index + pages.length) % pages.length;
    setCurrent(nextIndex);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <object
          data={`${PDF_PATH}#page=${pages[current]}&zoom=100`}
          type="application/pdf"
          className="w-full h-[70vh]"
        >
          <p className="p-4 text-gray-600">
            PDF preview unavailable.{' '}
            <a href={PDF_PATH} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              Open in a new tab
            </a>
            .
          </p>
        </object>

        <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
          <button
            onClick={() => goTo(current - 1)}
            className="bg-white/90 hover:bg-white text-gray-800 rounded-full px-3 py-2 shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Previous page"
          >
            ← Prev
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="bg-white/90 hover:bg-white text-gray-800 rounded-full px-3 py-2 shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        {pages.map((page, idx) => (
          <button
            key={page}
            onClick={() => goTo(idx)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              idx === current ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={idx === current ? 'true' : 'false'}
          />
        ))}
        <span className="ml-2">
          Page {current + 1} / {pages.length}
        </span>
      </div>
    </div>
  );
}
