"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    tagline: "CAMPUS LIFE",
    title: "Our Classes that fit your busy life and leisure",
    image: "/landing-page/robotics-dojo.webp",
  },
  {
    id: 2,
    tagline: "ICT COMPETITION 2025",
    title:
      "Vice Chancellor Prof. Victoria Ngumi (4th right) with students and staff winners of Huawei regional ICT competition 2025",
    image: "/landing-page/huawei-ict-2025.webp",
  },

  {
    id: 3,
    tagline: "TRAINING WORKSHOP",
    title:
      "VC interacts with participants of Turkana County during the JICA sponsored in-country training workshop",
    image: "/landing-page/training-workshop.webp",
  },
  {
    id: 4,
    tagline: "COMMERCIALIZATION",
    title:
      "Jkuat and partners JHUB AFRICA, Mush & CO. and KOICA unveil a Smart Mushroom Farm",
    image: "/landing-page/commercialization.webp",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (SLIDES.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="relative h-[85vh] min-h-150 w-full overflow-hidden bg-black text-white">
      {/* LAYER 1: Background Images */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/50 z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* LAYER 2: Foreground Layout Container */}
      <div className="relative z-20 container mx-auto h-full max-w-7xl px-4 md:px-8 flex flex-col justify-between pt-12 pb-6 md:pb-8">
        {/* Top-most Section: Fixed University Title Block */}
        <div className="w-full text-left">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-md uppercase">
            Jomo Kenyatta University
            <span className="mt-0.5 block text-primary font-semibold text-lg sm:text-xl md:text-2xl normal-case">
              of Agriculture and Technology
            </span>
          </h1>
        </div>

        {/* Middle/Bottom-ish Section: Left-Aligned Tagline and Subtitles */}
        <div className="w-full flex flex-col items-start text-left mt-auto mb-6 max-w-3xl pr-12">
          {SLIDES[current].tagline && (
            <span className="inline-block bg-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded mb-3">
              {SLIDES[current].tagline}
            </span>
          )}
          <h2 className="text-xl font-medium md:text-3xl leading-snug drop-shadow-lg transition-all duration-500">
            {SLIDES[current].title}
          </h2>
        </div>

        {/* Bottom Section: Progress Indicators & Bottom-Right Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
          {/* Progress Indicators (Left Side Footer) */}
          <div className="flex gap-1.5 order-2 sm:order-1 mb-2 sm:mb-0">
            {SLIDES.map((slide, index) => (
              <button
                key={`indicator-${slide.id}`}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? "bg-primary w-5" : "bg-white/30 w-1.5"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* LAYER 3: Left & Right Manual Browse Arrow Buttons */}
      {SLIDES.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs border border-white/10 text-primary hover:bg-primary hover:text-white transition duration-300 shadow-md group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 group-hover:scale-105 transition" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs border border-white/10 text-primary hover:bg-primary hover:text-white transition duration-300 shadow-md group"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 group-hover:scale-105 transition" />
          </button>
        </>
      )}
    </section>
  );
}
export default Hero;
