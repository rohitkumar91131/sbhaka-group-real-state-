"use client";

import { useRef } from "react";
import site from "../lib.json";
import { AnimatedWords } from "./animated-words";
import { useScrollReveal } from "./use-scroll-reveal";

const revealSteps = [
  { selector: "h1", duration: 0.52, y: 12 },
  { selector: ".division-copy p", duration: 0.48, y: 8, stagger: 0.06 },
  { selector: ".about-motto", duration: 0.42, y: 8 },
] as const;

export function AboutPageContent() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);

  return <main ref={root} className="division-detail about-page"><div className="wrap division-detail-inner">
    <h1><AnimatedWords text={site.about.heading} /></h1>
    <div className="division-copy">{site.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    <p className="about-motto">{site.about.motto}</p>
  </div></main>;
}
