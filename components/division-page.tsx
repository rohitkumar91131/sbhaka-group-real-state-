"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Division } from "../lib/site-data";
import site from "../lib.json";
import { AnimatedWords } from "./animated-words";
import { useScrollReveal } from "./use-scroll-reveal";
import { RealEstateGallery } from "./real-estate-gallery";
import { ImpexGallery } from "./impex-gallery";
import { AgroGallery } from "./agro-gallery";

const revealSteps = [
  { selector: ".division-back-link", duration: 0.35, y: 6 },
  { selector: ".business-hero-visual", duration: 0.68, y: 10, position: "-=0.3" },
  { selector: ".business-title-line-inner, h1:not(.business-title)", duration: 0.5, y: 12, stagger: 0.08 },
  { selector: ".division-summary", duration: 0.45, y: 8 },
  { selector: ".business-copy p", duration: 0.48, y: 8, triggerEach: true },
  { selector: ".division-copy:not(.business-copy) p", duration: 0.48, y: 8, stagger: 0.07 },
] as const;

const divisionVisuals = {
  "real-estate": {
    desktop: "/real%20state%20images/hero%20image/desktop.png",
    mobile: "/real%20state%20images/hero%20image/mobile.png",
    alt: "A contemporary stone home framed by mature trees and a landscaped garden",
    lineBreaks: [2, 4],
  },
  impex: {
    desktop: "/impex%20images/hero/desktop.png",
    mobile: "/impex%20images/hero/mobile.png",
    alt: "Aerial view of cargo ships and containers at an international port at sunset",
    lineBreaks: [3, 5],
  },
  agro: {
    desktop: "/agro%20images/hero/desktop.png",
    mobile: "/agro%20images/hero/mobile.png",
    alt: "Sunrise over a green cultivated field",
    lineBreaks: [3, 5],
  },
} as const;

export function DivisionPage({ division }: { division: Division }) {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);
  const photoPage = division.slug in divisionVisuals
    ? divisionVisuals[division.slug as keyof typeof divisionVisuals]
    : null;
  const titleLines: string[] = [];
  if (photoPage) {
    const words = division.heading.split(/\s+/);
    let start = 0;
    for (const end of [...photoPage.lineBreaks, words.length]) {
      titleLines.push(words.slice(start, end).join(" "));
      start = end;
    }
  }

  return <main ref={root} className={`division-detail${photoPage ? " division-detail-business" : ""}`}>
    {photoPage ? <>
      <section className="business-hero wrap">
        <div className="business-hero-copy">
          <a className="division-back-link" href={site.navigationText.divisionBackHref}>← {site.navigationText.divisionBackLink}</a>
          <h1 className="business-title" aria-label={division.heading}>{titleLines.map((line) => <span className="business-title-line" aria-hidden="true" key={line}>
            <span className="business-title-line-inner">{line}</span>
          </span>)}</h1>
          <p className="division-summary"><AnimatedWords text={division.summary} /></p>
        </div>
        <div className="business-hero-visual">
          <picture className="business-hero-picture">
            <source media="(max-width: 520px)" srcSet={photoPage.mobile} width={1938} height={811} />
            <Image
              src={photoPage.desktop}
              alt={photoPage.alt}
              fill
              priority
              sizes="(max-width: 520px) 100vw, (max-width: 860px) 90vw, 48vw"
            />
          </picture>
        </div>
      </section>
      <div className="business-copy wrap division-copy">
        {division.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {division.slug === "real-estate" && <RealEstateGallery />}
      {division.slug === "impex" && <ImpexGallery />}
      {division.slug === "agro" && <AgroGallery />}
    </> : <div className="wrap division-detail-inner">
      <a className="division-back-link" href={site.navigationText.divisionBackHref}>← {site.navigationText.divisionBackLink}</a>
      <h1><AnimatedWords text={division.heading} /></h1>
      <p className="division-summary"><AnimatedWords text={division.summary} /></p>
      <div className="division-copy">{division.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>}
  </main>;
}
