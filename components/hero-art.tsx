"use client";

import Image from "next/image";
import { useState } from "react";

type HeroArtProps = {
  desktop: string;
  mobile: string;
  animated: string;
  alt: string;
};

export function HeroArt({ desktop, mobile, animated, alt }: HeroArtProps) {
  const [animationReady, setAnimationReady] = useState(false);

  return (
    <div className={`hero-art-media${animationReady ? " is-ready" : ""}`}>
      <picture className="hero-picture">
        <source media="(max-width: 520px)" srcSet={mobile} width={1940} height={811} />
        <Image src={desktop} alt={animationReady ? "" : alt} aria-hidden={animationReady} width={1254} height={1254} priority sizes="(max-width: 860px) 90vw, 42vw" />
      </picture>
      <Image
        className="hero-art-gif"
        src={animated}
        alt=""
        aria-hidden="true"
        width={421}
        height={415}
        unoptimized
        onLoad={() => {
          if (window.matchMedia("(min-width: 521px) and (max-width: 900px)").matches) {
            setAnimationReady(true);
          }
        }}
      />
    </div>
  );
}
