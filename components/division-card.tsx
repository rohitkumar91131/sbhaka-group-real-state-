import Image from "next/image";
import type { Division } from "../lib/site-data";

export function DivisionCard({ item }: { item: Division }) {
  return <article className={`div-card ${item.theme}${item.featured ? " featured" : ""}`} id={item.id}>
    <div><div className="div-icon"><Image src={item.icon} alt={item.iconAlt} width={1536} height={1024} sizes="88px" /></div><h3>{item.name}</h3><p>{item.summary}</p></div>
    <a className="div-link" href={item.href}>{item.linkLabel}<span aria-hidden="true"> ↗</span></a>
  </article>;
}
