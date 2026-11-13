import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import site from "../../lib.json";
import { AboutPageContent } from "../../components/about-page-content";

export const metadata: Metadata = { title: `${site.about.label} | ${site.brand.name}`, description: site.about.heading };

export default function AboutPage() {
  return <><SiteHeader /><AboutPageContent /><SiteFooter /></>;
}
