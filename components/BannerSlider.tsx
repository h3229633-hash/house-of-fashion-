'use client';
import { useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { id: 1, img: '/banners/banner-1-wedding.webp', label: 'A Wedding Collection', script: '' },
  { id: 2, img: '/banners/sania 2.webp', label: '', script: '' },
  { id: 3, img: '/banners/price-aaaaa.webp', label: 'Flat 20% Off', script: 'Sale' },
  { id: 4, img: '/banners/banner-2.webp', label: '', script: '' },
];

export default function BannerSlider() {
  const [active, setActive] = useState(0);

  const prevSlide = () =>
    setActive((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  const nextSlide = () =>
    setActive((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative w-full bg-[#111] aspect-video md:max-h-[520px] overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            index === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.img}
            alt={slide.label || 'Banner'}
            fill
            priority={index === 0}
            className="object-cover"
          />

          {(slide.label || slide.script) && (
            <div className="absolute left-5 bottom-10 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.4)] z-20">
              {slide.script && (
                <h2 className="font-(family-name:--font-script) text-[clamp(2rem,8vw,3rem)] leading-none mb-1">
                  {slide.script}
                </h2>
              )}
              {slide.label && (
                <p className="text-sm tracking-wide">{slide.label}</p>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="absolute right-4 bottom-4 z-30 flex gap-2">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full bg-white/90 text-[#111] text-xl leading-none flex items-center justify-center shadow-md"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full bg-white/90 text-[#111] text-xl leading-none flex items-center justify-center shadow-md"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}