"use client";

import { useRef } from "react";
import site from "../lib.json";
import { ContactForm } from "./contact-form";
import { useScrollReveal } from "./use-scroll-reveal";

const revealSteps = [
  { selector: ".contact-copy", duration: 0.48, y: 10 },
  { selector: ".contact-form", duration: 0.5, y: 12 },
] as const;

export function ContactSection() {
  const contact = site.contact;
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, revealSteps);

  return (
    <section ref={root} className="contact-section" id={contact.id} aria-labelledby="contact-heading">
      <div className="wrap contact-inner">
        <div className="contact-copy">
          <h2 id="contact-heading">{contact.heading}</h2>
          <p>{contact.intro}</p>
        </div>
        <ContactForm contact={contact} divisions={site.divisions.items.map(({ name }) => name)} />
      </div>
    </section>
  );
}
