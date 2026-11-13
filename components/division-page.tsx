"use client";

import { useRef } from "react";
import type { Division } from "../lib/site-data";
import site from "../lib.json";
import { AnimatedWords } from "./animated-words";
import { useScrollReveal } from "./use-scroll-reveal";

const revealSteps = [
  { selector: ".division-back-link", duration: 0.35, y: 6 },
  { selector: "h1", duration: 0.5, y: 12 },
  { selector: ".division-summary", duration: 0.45, y: 8 },
  { selector: ".division-copy p", duration: 0.48, y: 8, stagger: 0.07 },
] as const;

export function DivisionPage({ division }: { division: Division }) {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);
  return <main ref={root} className="division-detail"><div className="wrap division-detail-inner">
    <a className="division-back-link" href={site.navigationText.divisionBackHref}>← {site.navigationText.divisionBackLink}</a>
    <h1><AnimatedWords text={division.heading} /></h1>
    <p className="division-summary"><AnimatedWords text={division.summary} /></p>
    <div className="division-copy">{division.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
  </div></main>;
}
