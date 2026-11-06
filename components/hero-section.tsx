import Image from "next/image";
import site from "../lib.json";
import { AnimatedReveal, AnimatedWords } from "./animated-words";
import { HeroArt } from "./hero-art";

export function HeroSection() {
  const hero = site.hero;
  return <section className="hero" id={hero.id}><div className="wrap hero-inner"><div className="hero-copy">
    <h1 className="hero-image-title"><AnimatedReveal><Image src={hero.headingImage.src} alt={hero.headingImage.alt} width={hero.headingImage.width} height={hero.headingImage.height} priority sizes="(max-width: 860px) 90vw, 42vw" /></AnimatedReveal></h1>
    <p className="hero-subtitle"><AnimatedWords text={hero.subtitle} /></p>
    {hero.paragraphs.map((paragraph) => <p className="hero-description" key={paragraph}>{paragraph}</p>)}
    <div className="hero-ctas">{hero.actions.map((action) => <a key={action.href} className={action.style === "primary" ? "btn-primary" : "btn-ghost"} href={action.href}>{action.label}</a>)}</div>
  </div><div className="hero-art"><HeroArt desktop={hero.images.desktop} mobile={hero.images.mobile} animated={hero.images.animated} alt={hero.images.alt} /></div></div></section>;
}
