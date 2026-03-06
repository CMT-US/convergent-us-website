'use client';

import { useState } from 'react';
import Image from 'next/image';

export type CarouselImage = {
  src: string;
  alt: string;
};

type TwoImageCarouselProps = {
  images: CarouselImage[];
};

export default function TwoImageCarousel({ images }: TwoImageCarouselProps) {
  const slides = images.length
    ? images
    : [{ src: '/images/projects/slide-1.jpg', alt: 'Project placeholder slide' }];
  const [currentSlide, setCurrentSlide] = useState(0);

  const goTo = (index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    setCurrentSlide(nextIndex);
  };

  const showNav = slides.length > 1;

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative aspect-[16/9] bg-gray-100">
          {slides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {showNav && (
          <>
            <button
              onClick={() => goTo(currentSlide - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-convergent-blue-600"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => goTo(currentSlide + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-convergent-blue-600"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {showNav && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goTo(index)}
              className={`transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-convergent-blue-600 ${
                index === currentSlide
                  ? 'w-3 h-3 bg-convergent-blue-600'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
