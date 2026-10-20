"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/portfolio";
import { TechnologyBadges } from "@/components/TechnologyBadges";

function getProjectPreview(project: Project) {
  if (project.slug === "stray-on-track") {
    return { src: "/stray-on-track-project-hero.png", alt: "Stray On Track displayed on two overlapping phone mockups" };
  }

  return project.images?.[0] ?? (project.image ? {
    src: project.image,
    alt: project.slug === "kalinga" ? "Two Kalinga phone screens showing caregiver onboarding and family account creation" : `${project.name} preview`,
  } : null);
}

function getProjectPreviewDimensions(project: Project) {
  return project.slug === "kalinga" ? { width: 940, height: 920 } : { width: 1200, height: 900 };
}

export function ProjectConsoleHero({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedPreviewSrc, setLoadedPreviewSrc] = useState<string | null>(null);
  const [failedPreviewSrc, setFailedPreviewSrc] = useState<string | null>(null);
  const preloadedPreviewSrcs = useRef(new Set<string>());
  const activeProject = projects[activeIndex];
  const previewImage = activeProject ? getProjectPreview(activeProject) : null;
  const isMobilePreview = activeProject?.slug === "instaham";
  const isDeviceCollage = activeProject?.slug === "stray-on-track";
  const isWidePreview = activeProject?.slug === "pop-hop";
  const previewDimensions = activeProject ? getProjectPreviewDimensions(activeProject) : null;

  const preloadProjectPreview = (project: Project) => {
    const preview = getProjectPreview(project);
    if (!preview || preloadedPreviewSrcs.current.has(preview.src)) return;

    preloadedPreviewSrcs.current.add(preview.src);
    const { width, height } = getProjectPreviewDimensions(project);
    const { props } = getImageProps({ src: preview.src, alt: "", width, height });
    const preloadImage = new window.Image();
    if (props.srcSet) preloadImage.srcset = props.srcSet;
    if (props.sizes) preloadImage.sizes = props.sizes;
    preloadImage.src = props.src;
  };

  if (!activeProject) return null;

  return (
    <div className="project-console-stage">
      <div className="project-console-wrap">
        <section className="project-console" aria-label="Interactive project console">
          <div className="project-console-topbar">
            <div className="console-window-mark" aria-hidden="true"><span /><span /><span /></div>
            <span className="console-path">gerald / selected-work</span>
            <span className="console-live"><i aria-hidden="true" /> PROJECT INDEX</span>
          </div>

          <div className="project-console-tabs" role="group" aria-label="Choose a project">
            {projects.map((project, index) => (
              <button
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? "console-project-tab is-active" : "console-project-tab"}
                key={project.slug}
                onClick={() => setActiveIndex(index)}
                onFocus={() => preloadProjectPreview(project)}
                onMouseEnter={() => preloadProjectPreview(project)}
                onPointerDown={() => preloadProjectPreview(project)}
                type="button"
              >
                <span className="console-tab-index">0{index + 1}</span>
                <span>{project.name}</span>
              </button>
            ))}
          </div>

          <div className="project-console-screen" aria-live="polite" aria-atomic="true">
            <div className={`console-preview-frame${isMobilePreview ? " console-preview-frame--mobile" : ""}${isWidePreview ? " console-preview-frame--wide" : ""}`}>
              {previewImage && previewDimensions ? (
                <>
                  {loadedPreviewSrc !== previewImage.src && (
                    <div className="console-preview-placeholder" role="status">
                      {failedPreviewSrc === previewImage.src ? `${activeProject.name} preview unavailable` : `Loading ${activeProject.name} preview`}
                    </div>
                  )}
                  <Image
                    className={`console-preview-image${loadedPreviewSrc === previewImage.src ? " is-loaded" : " is-loading"}${isMobilePreview ? " console-preview-image--mobile" : ""}${isDeviceCollage ? " console-preview-image--collage" : ""}${isWidePreview ? " console-preview-image--wide" : ""}`}
                    key={previewImage.src}
                    src={previewImage.src}
                    alt={previewImage.alt}
                    width={previewDimensions.width}
                    height={previewDimensions.height}
                    loading="eager"
                    onLoad={() => {
                      setLoadedPreviewSrc(previewImage.src);
                      setFailedPreviewSrc(null);
                    }}
                    onError={() => setFailedPreviewSrc(previewImage.src)}
                  />
                </>
              ) : (
                <div className="console-preview-placeholder" role="status">{activeProject.name} preview unavailable</div>
              )}
            </div>
            <div className="console-project-details">
              <div className="console-screen-heading" key={activeProject.slug}>
                <div>
                  <p className="console-project-kind"><span>SELECTED PROJECT</span><span>{activeProject.dates}</span></p>
                  <h2>{activeProject.name}<span className="console-title-period">.</span></h2>
                  <p className="console-project-category">{activeProject.kind}</p>
                </div>
                <span className="console-project-mark" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}</span>
              </div>
              <p className="console-project-description">{activeProject.description}</p>
              <div className="console-screen-bottom">
                <span className="console-tech-label">BUILT WITH</span>
                <TechnologyBadges className="console-tech-list" technologies={activeProject.technologies.slice(0, 4)} />
              </div>
              <Link className="console-project-details-link" href={`/projects#project-${activeProject.slug}`} aria-label={`View ${activeProject.name} project details`}>
                View project details <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="console-base" aria-hidden="true"><span /></div>
        </section>
        <p className="console-caption"><span>01 — 0{projects.length}</span> A few things I’ve been building</p>
      </div>

    </div>
  );
}
