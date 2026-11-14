"use client";

import { useRef } from "react";
import Image from "next/image";
import site from "../lib.json";
import { useScrollReveal } from "./use-scroll-reveal";
import { imageBlurData } from "./image-blur-data";

const divisions = [
  {
    name: "Shabka Real Estate",
    description: "Land dealing, residential and commercial construction, built on transparency and long-term trust.",
    label: "Explore Real Estate",
    href: "/divisions/real-estate",
    icon: "/business%20sectioon%20icon/shabka%20real%20state%20icon.png",
    iconAlt: "",
  },
  {
    name: "Shabka Impex",
    description: "Sourcing and moving products across sectors, connecting India with wider markets.",
    label: "Explore Impex",
    href: "/divisions/impex",
    icon: "/business%20sectioon%20icon/shabka%20impex%20icon.png",
    iconAlt: "",
  },
  {
    name: "Shabka Agro",
    description: "Sustainable farming and agro-business, growing local potential with care for land and people.",
    label: "Explore Agro",
    href: "/divisions/agro",
    icon: "/business%20sectioon%20icon/shabka%20agro%20icon.png",
    iconAlt: "",
  },
  {
    name: "Shabka Stones",
    description: "Fine marble and granite sourced from India’s mines for homes, commercial spaces, and lasting builds.",
    label: "Explore Stones",
    href: "/divisions/stones",
    icon: "/business%20sectioon%20icon/shabka%20stones.png",
    iconAlt: "",
  },
] as const;

const revealSteps = [
  { selector: ".about-story-eyebrow", duration: 0.45, y: 8 },
  { selector: ".about-story-title", duration: 0.58, y: 12, position: "-=0.16" },
  { selector: ".about-story-intro", duration: 0.52, y: 10 },
  { selector: ".about-story-image", duration: 0.7, y: 8, position: "-=0.18" },
  { selector: ".about-story-copy p", duration: 0.48, y: 8, triggerEach: true },
  { selector: ".about-business-card", duration: 0.5, y: 10, stagger: 0.13, triggerEach: true },
  { selector: ".about-story-closing > *", duration: 0.48, y: 8, stagger: 0.1, triggerEach: true },
] as const;

export function AboutPageContent() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);
  const paragraphs = site.about.paragraphs;

  return <main ref={root} className="about-story">
    <section className="about-story-hero wrap">
      <div className="about-story-hero-copy">
        <p className="about-story-eyebrow">One Family. Four Ventures. One Standard.</p>
        <h1 className="about-story-title">A Family Business. A Promise of Trust.</h1>
        <p className="about-story-intro">{paragraphs[0]}</p>
      </div>
      <figure className="about-story-image">
        <picture className="about-story-picture">
          <source media="(max-width: 760px)" srcSet="/about/about-hero-mobile.webp" width={1939} height={811} />
          <Image
            src="/about/about-hero-desktop.webp"
            alt="An old banyan tree overlooking a golden Indian valley at sunrise"
            fill
            priority
            sizes="(max-width: 760px) 100vw, (max-width: 1180px) 44vw, 520px"
            placeholder="blur"
            blurDataURL={imageBlurData["/about/about-hero-desktop.webp"]}
          />
        </picture>
      </figure>
    </section>

    <div className="about-story-copy wrap">
      <p>{paragraphs[1]}</p>
    </div>

    <section className="about-businesses wrap" aria-labelledby="about-businesses-title">
      <h2 id="about-businesses-title">One family. Four ways of building.</h2>
      <div className="about-business-grid">
        {divisions.map((division) => <article className="about-business-card" key={division.href}>
          <Image className="about-business-icon" src={division.icon} alt={division.iconAlt} aria-hidden="true" width={1536} height={1024} sizes="56px" />
          <h3>{division.name}</h3>
          <p>{division.description}</p>
          <a href={division.href}>{division.label} <span aria-hidden="true">→</span></a>
        </article>)}
      </div>
    </section>

    <div className="about-story-copy about-story-remaining wrap">
      {paragraphs.slice(2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>

    <section className="about-story-closing wrap" aria-label="Our shared promise">
      <p className="about-story-closing-main">We move forward the way we always have: together.</p>
      <p className="about-story-closing-support">With our clients, our partners, and our family.</p>
      <p className="about-story-motto">Local Roots. Global Routes.</p>
    </section>
  </main>;
}
