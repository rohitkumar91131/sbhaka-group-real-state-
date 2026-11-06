import site from "../lib.json";

export function AboutSection() {
  return <section className="about" id={site.about.id}><div className="wrap about-inner"><h2 className="about-label">{site.about.label}</h2><div className="about-text">
    {site.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    <p className="motto">{site.about.motto}</p>
  </div></div></section>;
}
