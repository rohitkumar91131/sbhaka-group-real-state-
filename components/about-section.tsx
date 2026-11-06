import site from "../lib.json";

export function AboutSection() {
  return <section className="about about-preview"><div className="wrap about-inner"><p className="about-label">{site.about.label}</p><div className="about-text">
    <h2>{site.landing.aboutPreviewHeading}</h2>
    <p>{site.landing.aboutPreviewText}</p>
    <a className="about-preview-link" href={site.landing.aboutPreviewHref}>{site.landing.aboutPreviewLink}<span aria-hidden="true"> ↗</span></a>
  </div></div></section>;
}
