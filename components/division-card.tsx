import type { Division } from "../lib/site-data";

export function DivisionCard({ item }: { item: Division }) {
  return <article className={`div-card ${item.theme}${item.featured ? " featured" : ""}`} id={item.id}>
    <div><div className="div-icon"><svg viewBox="0 0 34 34" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: item.icon }} /></div><h3>{item.name}</h3><p>{item.description}</p></div>
    <a className="div-link" href={item.href}>{item.linkLabel}<span aria-hidden="true"> ↗</span></a>
  </article>;
}
