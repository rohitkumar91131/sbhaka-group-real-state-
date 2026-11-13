"use client";

import { useRef } from "react";
import site from "../lib.json";
import { AnimatedWords } from "./animated-words";
import { useScrollReveal } from "./use-scroll-reveal";

const revealSteps = [
  { selector: ".about-label, .about-text h2", duration: 0.52, y: 12 },
  { selector: ".about-text > p", duration: 0.55, y: 10 },
  { selector: ".about-preview-link", duration: 0.35, y: 6 },
] as const;

export function AboutSection() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);
  return <section ref={root} className="about about-preview"><div className="wrap about-inner"><p className="about-label">{site.about.label}</p><div className="about-text">
    <h2><AnimatedWords text={site.landing.aboutPreviewHeading} /></h2>
    <p>{site.landing.aboutPreviewText}</p>
    <a className="about-preview-link" href={site.landing.aboutPreviewHref}>{site.landing.aboutPreviewLink}<span aria-hidden="true"> ↗</span></a>
  </div></div></section>;
}
