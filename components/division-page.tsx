import type { Division } from "../lib/site-data";
import site from "../lib.json";
import { AnimatedWords } from "./animated-words";

export function DivisionPage({ division }: { division: Division }) {
  return <main className="division-detail"><div className="wrap division-detail-inner">
    <a className="division-back-link" href={site.navigationText.divisionBackHref}>← {site.navigationText.divisionBackLink}</a>
    <h1><AnimatedWords text={division.heading} /></h1>
    <p className="division-summary"><AnimatedWords text={division.summary} /></p>
    <div className="division-copy">{division.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
  </div></main>;
}
