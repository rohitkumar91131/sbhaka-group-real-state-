import Image from "next/image";

export function BrandMark({ footer = false }: { footer?: boolean }) {
  return <Image className={footer ? "brand-symbol footer-symbol" : "brand-symbol"} src="/logo.png" alt="" aria-hidden="true" width={40} height={40} />;
}
