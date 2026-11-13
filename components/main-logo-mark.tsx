type Props = { className?: string; backgroundFill?: string };

export function MainLogoMark({ className = "mark-svg main-mark", backgroundFill = "#fff" }: Props) {
  return <svg className={className} viewBox="0 0 700 700" aria-hidden="true">
    <circle className="main-background" cx="350" cy="350" r="326" fill={backgroundFill}/>
    <path className="line-draw main-chevron" pathLength={100} d="M195 370 L350 190 L505 370" stroke="#003b2c" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path className="line-draw main-wave" pathLength={100} d="M145 490 C230 420 280 450 350 495 S460 555 555 490" stroke="#c5a000" strokeWidth="16" strokeLinecap="round" fill="none"/>
    <circle className="line-draw main-outer" pathLength={100} cx="350" cy="350" r="330" transform="rotate(-90 350 350)" stroke="#003b2c" strokeWidth="7" fill="none"/>
    <circle className="line-draw main-inner" pathLength={100} cx="350" cy="350" r="310" transform="rotate(-90 350 350)" stroke="#c5a000" strokeWidth="3" fill="none"/>
  </svg>;
}
