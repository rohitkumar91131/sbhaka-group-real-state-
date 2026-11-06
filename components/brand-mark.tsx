import site from "../lib.json";

export function BrandMark({ footer = false }: { footer?: boolean }) {
  return <svg className={footer ? "brand-symbol footer-symbol" : "brand-symbol"} viewBox="0 0 48 48" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: site.brand.logo }} />;
}
