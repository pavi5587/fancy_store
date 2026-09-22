"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type BannerSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const AUTOPLAY_MS = 5000;

export default function HeroBanner({ slides }: { slides: BannerSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isProgrammaticScroll = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (index + slides.length) % slides.length;
    const child = track.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    isProgrammaticScroll.current = true;
    track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    setActive(clamped);
    window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  }, [slides.length]);

  // Autoplay: scroll to the next slide on an interval, pausing on hover/touch/focus.
  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => {
      scrollToIndex(active + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [active, isPaused, scrollToIndex]);

  // Keep the active dot in sync when the user scrolls/swipes manually.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const { scrollLeft, children } = track;
        let closest = 0;
        let closestDist = Infinity;
        Array.from(children).forEach((child, i) => {
          const dist = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActive(closest);
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-plum-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        role="region"
        aria-roledescription="carousel"
        aria-label="Promotional banners"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="snap-start shrink-0 w-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={active === i ? undefined : true}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 items-center gap-10 py-16 md:py-24">
              <div className="order-2 md:order-1 text-ivory">
                <p className="text-gold-200 text-sm tracking-wideish mb-4">{slide.eyebrow}</p>
                <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
                  {slide.title.split("\n").map((line, idx, arr) => (
                    <span key={idx}>
                      {line}
                      {idx < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-plum-100/80 max-w-md mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex gap-3">
                  <Link
                    href={slide.ctaHref}
                    className="bg-gold-500 text-ink px-6 py-3 rounded-full text-sm font-medium hover:bg-gold-400 transition-colors"
                  >
                    {slide.ctaLabel}
                  </Link>
                  {slide.secondaryLabel && slide.secondaryHref && (
                    <Link
                      href={slide.secondaryHref}
                      className="border border-ivory/40 text-ivory px-6 py-3 rounded-full text-sm hover:bg-ivory/10 transition-colors"
                    >
                      {slide.secondaryLabel}
                    </Link>
                  )}
                </div>
              </div>
              <div className="order-1 md:order-2 relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / next arrows */}
      <button
        type="button"
        aria-label="Previous banner"
        onClick={() => scrollToIndex(active - 1)}
        className="hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/15 text-ivory hover:bg-ivory/25 backdrop-blur transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next banner"
        onClick={() => scrollToIndex(active + 1)}
        className="hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/15 text-ivory hover:bg-ivory/25 backdrop-blur transition-colors"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={active === i}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-6 bg-gold-400" : "w-1.5 bg-ivory/40 hover:bg-ivory/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
