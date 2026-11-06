"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export function AnimatedWords({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        element.querySelectorAll<HTMLElement>(".animated-word"),
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.035,
          ease: "power2.out",
          clearProps: "all",
        },
      );
    }, element);

    return () => context.revert();
  }, []);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span ref={root} className="animated-words" aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <span className="animated-word" aria-hidden="true">{word}</span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export function AnimatedReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", clearProps: "all" },
      );
    }, element);

    return () => context.revert();
  }, []);

  return <span ref={root} className="animated-reveal">{children}</span>;
}
