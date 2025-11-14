'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    src: '/images/projects/slide-1.jpg',
    alt: 'Heat Blanket Process Design & Optimization overview with background, Convergent US approach, and typical project details'
  },
  {
    src: '/images/projects/slide-2.jpg',
    alt: 'Example 1: Chevron Skin Bond onto Complex Substructure with process details and thermal diagrams'
  },
  {
    src: '/images/projects/slide-3.jpg',
    alt: 'Step 1: Create OSPREY Shape Template with component diagrams and material specifications'
  },
  {
    src: '/images/projects/slide-4.jpg',
    alt: 'Step 2: Design & Perform Experimental Thermal Test with RAVEN plot and process diagrams'
  },
  {
    src: '/images/projects/slide-5.jpg',
    alt: 'Step 3: Create Candidate OSPREY Heat Blanket with zone layout and manufacturing limitations'
  }
];

export default function ProjectCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Main carousel container */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Slides */}
        <div className="relative aspect-[16/9] bg-gray-100">
          {slides.map((slide, index) => (
            <div
              key={index}
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

        {/* Previous button */}
        <button
          onClick={prevSlide}
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

        {/* Next button */}
        <button
          onClick={nextSlide}
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
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
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

      {/* Slide counter */}
      <div className="text-center mt-4 text-sm text-gray-600">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
