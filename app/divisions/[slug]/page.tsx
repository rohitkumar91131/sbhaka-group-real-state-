import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionPage } from "../../../components/division-page";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";
import AgroPreloader from "../../../components/AgroPreloader";
import ConstructionsPreloader from "../../../components/ConstructionsPreloader";
import ImpexPreloader from "../../../components/ImpexPreloader";
import site from "../../../lib.json";

export function generateStaticParams() {
  return site.divisions.items.map((division) => ({ slug: division.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const division = site.divisions.items.find((item) => item.slug === params.slug);
  return division ? { title: `${division.name} | ${site.brand.name}`, description: division.summary } : {};
}

export default function DivisionDetailPage({ params }: { params: { slug: string } }) {
  const division = site.divisions.items.find((item) => item.slug === params.slug);
  if (!division) notFound();
  const preloader = params.slug === "agro"
    ? <AgroPreloader />
    : params.slug === "impex"
      ? <ImpexPreloader />
      : <ConstructionsPreloader />;
  return <>{preloader}<SiteHeader /><DivisionPage division={division} /><SiteFooter /></>;
}
