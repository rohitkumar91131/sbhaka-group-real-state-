import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import site from "../../lib.json";

export const metadata: Metadata = { title: `${site.about.label} | ${site.brand.name}`, description: site.about.heading };

export default function AboutPage() {
  return <><SiteHeader /><main className="division-detail about-page"><div className="wrap division-detail-inner">
    <h1>{site.about.heading}</h1>
    <div className="division-copy">{site.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    <p className="about-motto">{site.about.motto}</p>
  </div></main><SiteFooter /></>;
}
