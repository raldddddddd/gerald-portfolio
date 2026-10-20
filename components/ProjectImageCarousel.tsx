"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectImage = { src: string; alt: string };

export function ProjectImageCarousel({
  images,
  imagesPerSlide = 1,
  intervalMs = 4000,
  projectName,
  className = "",
}: {
  images: ProjectImage[];
  imagesPerSlide?: number;
  intervalMs?: number;
  projectName: string;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const effectiveImagesPerSlide = isMobile ? 1 : imagesPerSlide;
  const slides = Array.from({ length: Math.ceil(images.length / effectiveImagesPerSlide) }, (_, slideIndex) =>
    images.slice(slideIndex * effectiveImagesPerSlide, (slideIndex + 1) * effectiveImagesPerSlide),
  );

  useEffect(() => {
    const mobileBreakpoint = window.matchMedia("(max-width: 640px)");
    const updateMobileLayout = () => setIsMobile(mobileBreakpoint.matches);
    updateMobileLayout();
    mobileBreakpoint.addEventListener("change", updateMobileLayout);
    return () => mobileBreakpoint.removeEventListener("change", updateMobileLayout);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [slides.length, intervalMs, paused]);

  const currentIndex = activeIndex % slides.length;
  const activeSlide = slides[currentIndex];
  if (!activeSlide?.length) return null;

  const changeSlide = (direction: number) => {
    setActiveIndex((index) => (index % slides.length + direction + slides.length) % slides.length);
  };

  return (
    <div
      className={`project-image-carousel${effectiveImagesPerSlide > 1 ? " project-image-carousel--grouped" : ""}${className ? ` ${className}` : ""}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-label={`${projectName} screenshots`}
    >
      <div className="project-image-slide">
        {activeSlide.map((image) => (
          <Image key={image.src} className="project-image" src={image.src} alt={image.alt} width={1200} height={900} />
        ))}
      </div>
      {isMobile && slides.length > 1 && (
        <>
          <button className="project-image-control project-image-control--previous" type="button" aria-label={`Previous ${projectName} screenshot`} onClick={() => changeSlide(-1)}>
            <span aria-hidden="true">‹</span>
          </button>
          <span className="project-image-count" aria-live="polite" aria-atomic="true">
            {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button className="project-image-control project-image-control--next" type="button" aria-label={`Next ${projectName} screenshot`} onClick={() => changeSlide(1)}>
            <span aria-hidden="true">›</span>
          </button>
        </>
      )}
    </div>
  );
}
