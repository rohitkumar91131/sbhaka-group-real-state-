import { BusinessGallery, type BusinessGalleryImage } from "./business-gallery";

const gallery: readonly BusinessGalleryImage[] = [
  { src: "/real%20state%20images/gallery%20images/01-land-plot-aerial.png", motion: "/real%20state%20images/gallery%20images/motion-01-land-drift.gif", motionWidth: 420, motionHeight: 240, alt: "Aerial view of a cleared land plot bordered by trees", width: 1672, height: 941 },
  { src: "/real%20state%20images/gallery%20images/02-foundation-rebar.png", alt: "Reinforcement steel prepared for a building foundation", width: 1122, height: 1402 },
  { src: "/real%20state%20images/gallery%20images/03-completed-home.png", motion: "/real%20state%20images/gallery%20images/motion-02-home-reveal.gif", motionWidth: 320, motionHeight: 400, alt: "Completed modern home set among mature trees and planting", width: 1086, height: 1448 },
  { src: "/real%20state%20images/gallery%20images/04-planning-materials.png", motion: "/real%20state%20images/gallery%20images/motion-03-plan-detail.gif", motionWidth: 360, motionHeight: 360, alt: "Architectural site plan and material samples arranged on a table", width: 1254, height: 1254 },
  { src: "/real%20state%20images/gallery%20images/05-development-aerial.png", alt: "Aerial view of a development road running through green land", width: 1536, height: 1024 },
  { src: "/real%20state%20images/gallery%20images/06-stone-craft-detail.png", alt: "Close detail of carefully laid natural stonework", width: 1024, height: 1536 },
  { src: "/real%20state%20images/gallery%20images/07-courtyard-home.png", alt: "A shaded home courtyard surrounded by trees and garden planting", width: 1448, height: 1086 },
  { src: "/real%20state%20images/gallery%20images/08-construction-column.png", alt: "A concrete column under construction with timber formwork", width: 1122, height: 1402 },
  { src: "/real%20state%20images/gallery%20images/09-architecture-detail.png", alt: "Stone façade and deep roofline of a contemporary home", width: 1254, height: 1254 },
  { src: "/real%20state%20images/gallery%20images/10-community-at-dusk.png", alt: "A residential community and tree-lined road at dusk", width: 1672, height: 941 },
];

const desktopColumns = [[1, 5, 9], [2, 3, 8], [0, 4, 6, 7]] as const;
const compactColumns = [[0, 2, 3, 5, 9], [1, 4, 6, 7, 8]] as const;

export function RealEstateGallery() {
  return <BusinessGallery
    gallery={gallery}
    title="Land, homes, and the details that bring them to life."
    titleId="real-estate-gallery-title"
    desktopColumns={desktopColumns}
    compactColumns={compactColumns}
  />;
}
