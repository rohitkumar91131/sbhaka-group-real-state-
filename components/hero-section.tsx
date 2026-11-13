"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import site from "../lib.json";
import { AnimatedReveal, AnimatedWords } from "./animated-words";
import { HeroArt } from "./hero-art";

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const hero = site.hero;
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    const context = gsap.context(() => {
      media = gsap.matchMedia();
      media.add(
        { mobile: "(max-width: 700px)", reduce: "(prefers-reduced-motion: reduce)" },
        (conditions) => {
          if (conditions.conditions?.reduce) return;
          const distance = conditions.conditions?.mobile ? 8 : 16;
          const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
          timeline.fromTo(".hero-image-title .animated-reveal", { autoAlpha: 0, y: distance }, { autoAlpha: 1, y: 0, duration: 0.56 });
          timeline.fromTo(".hero-art", { autoAlpha: 0, scale: 0.985 }, { autoAlpha: 1, scale: 1, duration: 0.72 }, "-=0.34");
          timeline.fromTo(".hero-subtitle", { autoAlpha: 0, y: distance * 0.7 }, { autoAlpha: 1, y: 0, duration: 0.48 }, "-=0.46");
          timeline.fromTo(".hero-description", { autoAlpha: 0, y: distance * 0.65 }, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.08 }, "-=0.28");
          timeline.fromTo(".hero-ctas > *", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.08 }, "-=0.22");
        },
        element,
      );
    }, element);
    return () => {
      media?.revert();
      context.revert();
    };
  }, []);

  return <section ref={root} className="hero" id="home-hero"><div className="hero-inner"><div className="hero-copy">
    <h1 className="hero-image-title"><AnimatedReveal><Image src={hero.headingImage.src} alt={hero.headingImage.alt} width={hero.headingImage.width} height={hero.headingImage.height} priority sizes="(max-width: 860px) 90vw, 42vw" /></AnimatedReveal></h1>
    <p className="hero-subtitle"><AnimatedWords text={hero.subtitle} /></p>
    {hero.paragraphs.map((paragraph) => <p className="hero-description" key={paragraph}>{paragraph}</p>)}
    <div className="hero-ctas">{hero.actions.map((action) => <a key={action.href} className={action.style === "primary" ? "btn-primary" : "btn-ghost"} href={action.href}>{action.label}</a>)}</div>
  </div><div className="hero-art"><HeroArt desktop={hero.images.desktop} mobile={hero.images.mobile} animated={hero.images.animated} alt={hero.images.alt} /></div></div></section>;
}
