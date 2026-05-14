'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const DEFAULT_PDF_PATH = '/images/projects/Current%20work.pdf';
const DEFAULT_PAGE_COUNT = 5;
const MAX_PAGE_WIDTH = 960;

type PdfCarouselProps = {
  pdfUrl?: string;
  pageCount?: number;
};

export default function PdfCarousel({ pdfUrl, pageCount }: PdfCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(MAX_PAGE_WIDTH);
  const [current, setCurrent] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const resolvedPdfUrl = pdfUrl || DEFAULT_PDF_PATH;
  const normalizedPdfUrl = encodeURI(resolvedPdfUrl);
  const resolvedCount = pageCount && pageCount > 0
    ? pageCount
    : numPages || DEFAULT_PAGE_COUNT;
  const effectiveCount = numPages ? Math.min(resolvedCount, numPages) : resolvedCount;

  const pages = useMemo(
    () => Array.from({ length: effectiveCount }, (_, index) => index + 1),
    [effectiveCount]
  );

  useEffect(() => {
    if (current >= pages.length) {
      setCurrent(0);
    }
  }, [current, pages.length]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const updateWidth = () => {
      if (containerRef.current) {
        setPageWidth(Math.min(containerRef.current.clientWidth, MAX_PAGE_WIDTH));
      }
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isActive = true;
    setLoadError(null);
    setIsLoading(true);

    const loadingTask = getDocument(normalizedPdfUrl);
    loadingTask.promise
      .then((doc) => {
        if (!isActive) {
          return;
        }
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }
        setLoadError(error instanceof Error ? error.message : 'Failed to load PDF.');
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
      loadingTask.destroy();
    };
  }, [normalizedPdfUrl]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) {
        return;
      }

      const pageNumber = pages[current];
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      const scale = pageWidth / viewport.width;
      const outputScale = window.devicePixelRatio || 1;
      const scaledViewport = page.getViewport({ scale: scale * outputScale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      canvas.style.width = `${scaledViewport.width / outputScale}px`;
      canvas.style.height = `${scaledViewport.height / outputScale}px`;
      context.clearRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
    };

    renderPage();
  }, [pdfDoc, current, pageWidth, pages]);

  const goTo = (index: number) => {
    const nextIndex = (index + pages.length) % pages.length;
    setCurrent(nextIndex);
  };

  const showNav = pages.length > 1;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
      >
        {isLoading && (
          <div className="p-6 text-gray-600">Loading deck...</div>
        )}

        {!isLoading && loadError && (
          <div className="p-4 text-gray-600 space-y-4">
            <p>
              PDF preview unavailable.{' '}
              <a href={normalizedPdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                Open in a new tab
              </a>
              .
            </p>
            <object
              data={normalizedPdfUrl}
              type="application/pdf"
              className="min-h-[70vh] w-full rounded-md border border-gray-200"
            >
              <p>
                Your browser could not display this PDF inline.{' '}
                <a href={normalizedPdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  Download the PDF
                </a>
                .
              </p>
            </object>
          </div>
        )}

        {!isLoading && !loadError && (
          <div className="flex justify-center bg-gray-50 py-6">
            <canvas ref={canvasRef} />
          </div>
        )}

        {showNav && !loadError && (
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
        )}
      </div>

      {showNav && !loadError && (
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
      )}
    </div>
  );
}
