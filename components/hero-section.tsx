import site from "../lib.json";

export function HeroSection() {
  const hero = site.hero;
  return <section className="hero" id={hero.id}><div className="wrap hero-inner"><div className="hero-copy">
    <div className="eyebrow-row"><span className="dash" /><span>{hero.location}</span></div>
    <h1>{hero.titleBefore}<em>{hero.titleEmphasis}</em>{hero.titleAfter}</h1>
    <p className="lede">{hero.description}</p>
    <div className="hero-ctas">{hero.actions.map((action) => <a key={action.href} className={action.style === "primary" ? "btn-primary" : "btn-ghost"} href={action.href}>{action.label}</a>)}</div>
  </div><div className="hero-art"><svg viewBox="0 0 480 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={site.metadata.description} dangerouslySetInnerHTML={{ __html: hero.illustration }} /></div></div></section>;
}
