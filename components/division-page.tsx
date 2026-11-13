"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Division } from "../lib/site-data";
import site from "../lib.json";
import { AnimatedWords } from "./animated-words";
import { useScrollReveal } from "./use-scroll-reveal";
import { RealEstateGallery } from "./real-estate-gallery";

const revealSteps = [
  { selector: ".division-back-link", duration: 0.35, y: 6 },
  { selector: ".real-estate-hero-visual", duration: 0.68, y: 10, position: "-=0.3" },
  { selector: ".real-estate-title-line-inner, h1:not(.real-estate-title)", duration: 0.5, y: 12, stagger: 0.08 },
  { selector: ".division-summary", duration: 0.45, y: 8 },
  { selector: ".real-estate-copy p", duration: 0.48, y: 8, triggerEach: true },
  { selector: ".division-copy:not(.real-estate-copy) p", duration: 0.48, y: 8, stagger: 0.07 },
] as const;

export function DivisionPage({ division }: { division: Division }) {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);
  const isRealEstate = division.slug === "real-estate";

  return <main ref={root} className={`division-detail${isRealEstate ? " division-detail-real-estate" : ""}`}>
    {isRealEstate ? <>
      <section className="real-estate-hero wrap">
        <div className="real-estate-hero-copy">
          <a className="division-back-link" href={site.navigationText.divisionBackHref}>← {site.navigationText.divisionBackLink}</a>
          <h1 className="real-estate-title" aria-label={division.heading}>{[
            division.heading.split(/\s+/).slice(0, 2).join(" "),
            division.heading.split(/\s+/).slice(2, 4).join(" "),
            division.heading.split(/\s+/).slice(4).join(" "),
          ].filter(Boolean).map((line) => <span className="real-estate-title-line" aria-hidden="true" key={line}>
            <span className="real-estate-title-line-inner">{line}</span>
          </span>)}</h1>
          <p className="division-summary"><AnimatedWords text={division.summary} /></p>
        </div>
        <div className="real-estate-hero-visual">
          <picture className="real-estate-hero-picture">
            <source media="(max-width: 520px)" srcSet="/real%20state%20images/hero%20image/mobile.png" width={1938} height={811} />
            <Image
              src="/real%20state%20images/hero%20image/desktop.png"
              alt="A contemporary stone home framed by mature trees and a landscaped garden"
              fill
              priority
              sizes="(max-width: 520px) 100vw, (max-width: 860px) 90vw, 48vw"
            />
          </picture>
        </div>
      </section>
      <div className="real-estate-copy wrap division-copy">
        {division.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <RealEstateGallery />
    </> : <div className="wrap division-detail-inner">
      <a className="division-back-link" href={site.navigationText.divisionBackHref}>← {site.navigationText.divisionBackLink}</a>
      <h1><AnimatedWords text={division.heading} /></h1>
      <p className="division-summary"><AnimatedWords text={division.summary} /></p>
      <div className="division-copy">{division.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>}
  </main>;
}
