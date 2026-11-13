"use client";

import { useRef } from "react";
import site from "../lib.json";
import { DivisionCard } from "./division-card";
import { AnimatedWords } from "./animated-words";
import { useScrollReveal } from "./use-scroll-reveal";

const revealSteps = [
  { selector: ".div-head h2, .div-head > p", duration: 0.48, y: 10 },
  { selector: ".div-card", duration: 0.52, y: 16, stagger: 0.1 },
] as const;

export function DivisionsSection() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);
  return <section ref={root} className="divisions" id={site.divisions.id} aria-labelledby="divisions-heading"><div className="wrap"><div className="div-head"><h2 id="divisions-heading"><AnimatedWords text={site.divisions.heading} /></h2><p>{site.divisions.description}</p></div><div className="div-grid">{site.divisions.items.map((item) => <DivisionCard item={item} key={item.id} />)}</div></div></section>;
}
