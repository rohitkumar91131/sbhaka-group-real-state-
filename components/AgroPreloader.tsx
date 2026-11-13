"use client";

import { BrandDefs, PreloaderShell, type PreloaderProps } from "./PreloaderShell";

export default function AgroPreloader(props: PreloaderProps) {
  return <PreloaderShell {...props} label="Loading Shabka Agro">
    <svg className="mark-svg agro-mark" viewBox="0 0 1000 800" aria-hidden="true">
      <BrandDefs id="agro" />
      <defs><clipPath id="agro-reveal"><rect className="agro-reveal-rect" x="0" y="0" width="1000" height="800"/></clipPath></defs>
      <g clipPath="url(#agro-reveal)">
        <g fill="url(#agro-green)">
          <path d="M235 568 Q385 520 590 612 Q465 590 285 666Z"/><path d="M250 632 Q430 575 650 633 Q455 655 310 718Z"/>
          <path d="M310 715 Q510 618 735 635 Q610 710 420 767Z"/><path d="M435 766 Q640 627 833 614 Q744 771 547 775Z"/>
          <path d="M719 472 Q675 416 610 420 Q630 487 719 493Z"/><path d="M719 428 Q709 348 758 307 Q787 384 719 452Z"/>
          <path d="M723 535 Q771 464 840 473 Q812 532 723 550Z"/>
        </g>
        <path d="M716 582 Q715 484 719 365" fill="none" stroke="#006548" strokeWidth="10"/>
        <path d="M590 635 Q720 555 905 604 L695 673Z" fill="url(#agro-gold)"/>
        <path d="M853 575 Q906 413 839 195" fill="none" stroke="url(#agro-gold)" strokeWidth="12"/>
        <g fill="url(#agro-gold)">
          <path d="M872 530 Q907 455 965 403 Q949 490 872 551Z"/><path d="M871 440 Q813 423 792 374 Q866 377 887 441Z"/>
          <path d="M860 370 Q904 305 890 260 Q842 295 860 370Z"/><path d="M845 315 Q777 300 755 249 Q828 253 861 318Z"/>
          <path d="M829 254 Q857 188 827 142 Q803 198 829 254Z"/><path d="M807 214 Q742 204 720 162 Q781 162 820 227Z"/>
        </g>
      </g>
      <g className="agro-tractor" fill="none" stroke="#00543d" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
        <path d="M300 540 H502 L527 570 H312 M337 540 L350 451 H437 L477 539 M369 453 L365 529 M435 453 L458 531 M475 539 V485 L509 471 L511 543"/>
        <circle cx="354" cy="570" r="51" fill="#00543d"/><circle cx="354" cy="570" r="21" fill="#050505" stroke="none"/>
        <circle cx="492" cy="574" r="30" fill="#00543d"/><circle cx="492" cy="574" r="12" fill="#050505" stroke="none"/>
      </g>
      <g className="agro-sun" fill="none" stroke="url(#agro-gold)" strokeLinecap="round">
        <path d="M398 356 Q503 152 608 356" strokeWidth="24"/>
        <path d="M503 157 V117 M437 175 L413 137 M568 175 L592 137 M391 237 L349 217 M614 237 L656 217 M369 314 L332 307 M637 314 L674 307" strokeWidth="15"/>
      </g>
      <path className="line-draw agro-circle" pathLength={100} d="M696 82 C492 22 285 172 229 360 C170 552 285 735 465 767 C642 803 812 705 858 570" fill="none" stroke="url(#agro-green)" strokeWidth="43" strokeLinecap="round"/>
    </svg>
  </PreloaderShell>;
}
