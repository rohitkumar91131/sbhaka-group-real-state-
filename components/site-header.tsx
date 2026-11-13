"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import site from "../lib.json";
import { BrandMark } from "./brand-mark";
import { ResponsiveNavigation } from "./responsive-navigation";

export function SiteHeader() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;

    const updateScrollState = () => {
      const isScrolled = window.scrollY > 8;
      if (element.classList.contains("is-scrolled") !== isScrolled) {
        element.classList.toggle("is-scrolled", isScrolled);
      }

      const intro = document.getElementById(site.hero.id);
      const introBounds = intro?.getBoundingClientRect();
      const isIntroVisible = Boolean(
        introBounds && introBounds.bottom > 0 && introBounds.top < window.innerHeight,
      );
      if (element.classList.contains("is-logo-intro-visible") !== isIntroVisible) {
        element.classList.toggle("is-logo-intro-visible", isIntroVisible);
      }
      const brand = element.querySelector<HTMLAnchorElement>(".brand");
      if (brand && brand.inert !== isIntroVisible) brand.inert = isIntroVisible;
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    const context = gsap.context(() => {
      media = gsap.matchMedia();
      media.add(
        {
          mobile: "(max-width: 860px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (conditions) => {
          if (conditions.conditions?.reduce) return;

          const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
          timeline.fromTo(
            ".brand-symbol, .brand-copy",
            { autoAlpha: 0, y: -6 },
            { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.07 },
          );

          if (conditions.conditions?.mobile) {
            timeline.fromTo(
              ".nav-toggle",
              { autoAlpha: 0, y: -5 },
              { autoAlpha: 1, y: 0, duration: 0.28 },
              "-=0.14",
            );
            return;
          }

          timeline.fromTo(
            ".site-nav > a:not(.contact-link)",
            { autoAlpha: 0, y: -6 },
            { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.045 },
            "-=0.12",
          );
          timeline.fromTo(
            ".site-nav .contact-link",
            { autoAlpha: 0, y: -5 },
            { autoAlpha: 1, y: 0, duration: 0.3 },
            "-=0.1",
          );
          timeline.fromTo(
            ".nav-contact-accent",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.24, ease: "power2.out" },
            "-=0.12",
          );
        },
        element,
      );
    }, element);

    return () => {
      media?.revert();
      context.revert();
    };
  }, []);

  return <header ref={root} className="site-header"><div className="header-inner">
    <a className="brand" href={site.header.homeHref} aria-label={`${site.brand.name} home`}><BrandMark /><span className="brand-copy"><span className="brand-name">{site.brand.name}</span><span className="brand-sub">{site.brand.legalName}</span></span></a>
    <ResponsiveNavigation items={site.header.navigation} />
  </div></header>;
}
