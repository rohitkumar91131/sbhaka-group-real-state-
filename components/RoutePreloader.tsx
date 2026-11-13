"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AgroPreloader from "./AgroPreloader";
import ConstructionsPreloader from "./ConstructionsPreloader";
import ImpexPreloader from "./ImpexPreloader";
import MainLogoPreloader from "./MainLogoPreloader";

function getPreloader(pathname: string | null) {
  if (pathname === "/divisions/agro") return AgroPreloader;
  if (pathname === "/divisions/impex") return ImpexPreloader;
  if (pathname === "/divisions/real-estate") return ConstructionsPreloader;
  if (pathname === "/") return MainLogoPreloader;
  return null;
}

export default function RoutePreloader() {
  const pathname = usePathname();
  const [InitialPreloader] = useState(() => getPreloader(pathname));
  const [visible, setVisible] = useState(Boolean(InitialPreloader));

  if (!InitialPreloader || !visible) return null;

  return <InitialPreloader onComplete={() => setVisible(false)} />;
}
