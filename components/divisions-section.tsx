import site from "../lib.json";
import { DivisionCard } from "./division-card";
import { AnimatedWords } from "./animated-words";

export function DivisionsSection() {
  return <section className="divisions" id={site.divisions.id} aria-labelledby="divisions-heading"><div className="wrap"><div className="div-head"><h2 id="divisions-heading"><AnimatedWords text={site.divisions.heading} /></h2><p>{site.divisions.description}</p></div><div className="div-grid">{site.divisions.items.map((item) => <DivisionCard item={item} key={item.id} />)}</div></div></section>;
}
