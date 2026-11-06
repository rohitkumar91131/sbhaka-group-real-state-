import Image from "next/image";
import site from "../lib.json";

export function HeroSection() {
  const hero = site.hero;
  return <section className="hero" id={hero.id}><div className="wrap hero-inner"><div className="hero-copy">
    <h1>{hero.titleBefore}<em>{hero.titleEmphasis}</em>{hero.titleAfter}</h1>
    <p className="hero-subtitle">{hero.subtitle}</p>
    {hero.paragraphs.map((paragraph) => <p className="hero-description" key={paragraph}>{paragraph}</p>)}
    <div className="hero-ctas">{hero.actions.map((action) => <a key={action.href} className={action.style === "primary" ? "btn-primary" : "btn-ghost"} href={action.href}>{action.label}</a>)}</div>
  </div><div className="hero-art"><picture className="hero-picture">
    <source media="(max-width: 520px)" srcSet={hero.images.mobile} width={1940} height={811} />
    <Image src={hero.images.desktop} alt={hero.images.alt} width={1254} height={1254} priority sizes="(max-width: 860px) 90vw, 42vw" />
  </picture></div></div></section>;
}
