"use client";

import { PreloaderShell, type PreloaderProps } from "./PreloaderShell";
import { MainLogoMark } from "./main-logo-mark";

export default function MainLogoPreloader(props: PreloaderProps) {
  return <PreloaderShell {...props} label="Loading Shabka">
    <MainLogoMark />
  </PreloaderShell>;
}
