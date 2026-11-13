"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealStep = {
  selector: string;
  duration?: number;
  y?: number;
  stagger?: number;
  position?: string;
};

gsap.registerPlugin(ScrollTrigger);

/** Content stays visible until its section enters view; context cleanup removes its triggers. */
export function useScrollReveal<T extends HTMLElement>(
  root: RefObject<T | null>,
  steps: readonly RevealStep[],
) {
  useEffect(() => {
    const element = root.current;
    if (!element) return;

    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    const context = gsap.context(() => {
      media = gsap.matchMedia();
      media.add(
        {
          mobile: "(max-width: 700px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          if (mediaContext.conditions?.reduce) return;

          const isMobile = mediaContext.conditions?.mobile;
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: element, start: "top 84%", once: true },
          });

          steps.forEach((step, index) => {
            timeline.fromTo(
              element.querySelectorAll<HTMLElement>(step.selector),
              { autoAlpha: 0, y: isMobile ? Math.min(step.y ?? 12, 8) : step.y ?? 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: isMobile ? Math.min(step.duration ?? 0.5, 0.42) : step.duration ?? 0.5,
                stagger: step.stagger,
                ease: "power2.out",
              },
              step.position ?? (index === 0 ? 0 : "-=0.22"),
            );
          });

        },
        element,
      );
    }, element);

    return () => {
      media?.revert();
      context.revert();
    };
  }, [root, steps]);
}
