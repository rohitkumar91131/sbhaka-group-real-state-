import { BusinessGallery, type BusinessGalleryImage } from "./business-gallery";

const gallery: readonly BusinessGalleryImage[] = [
  { src: "/stones/gallery/01-marble-quarry-2.39x1.png", motion: "/stones/gallery/01-quarry-sunrise-drift.gif", motionWidth: 600, motionHeight: 252, alt: "Marble quarry in India at sunrise", width: 1939, height: 811 },
  { src: "/stones/gallery/02-stone-samples-1x1.png", motion: "/stones/gallery/02-marble-vein-reveal.gif", motionWidth: 440, motionHeight: 440, alt: "Marble, granite, Quartz and more samples showing natural variation", width: 1254, height: 1254 },
  { src: "/stones/gallery/03-marble-granite-yard-4x5.png", motion: "/stones/gallery/03-slab-yard-drift.gif", motionWidth: 360, motionHeight: 450, alt: "Rows of marble, granite, Quartz and more in a stone yard", width: 1122, height: 1402 },
  { src: "/stones/gallery/04-polished-stone-detail-2x3.png", alt: "Polished stone surface with distinctive natural veining", width: 1024, height: 1536 },
  { src: "/stones/gallery/05-marble-interior-16x9.png", alt: "Marble used in a refined contemporary interior", width: 1672, height: 941 },
  { src: "/stones/gallery/06-raw-stone-blocks-3x2.png", alt: "Raw natural stone blocks before cutting and finishing", width: 1536, height: 1024 },
  { src: "/stones/gallery/07-marble-veining-1x1.png", alt: "Close view of flowing marble veining", width: 1254, height: 1254 },
  { src: "/stones/gallery/08-marble-staircase-3x4.png", alt: "Marble staircase with carefully finished edges", width: 1086, height: 1448 },
  { src: "/stones/gallery/09-granite-slabs-detail-2x3.png", alt: "Granite slabs displaying their grain and finish", width: 1024, height: 1536 },
  { src: "/stones/gallery/10-stone-showroom-4x3.png", alt: "Natural stone selections presented in a showroom", width: 1448, height: 1086 },
];

const desktopColumns = [[1, 5, 9], [2, 3, 8], [0, 4, 6, 7]] as const;
const compactColumns = [[0, 2, 3, 5, 9], [1, 4, 6, 7, 8]] as const;

export function StonesGallery() {
  return <BusinessGallery
    gallery={gallery}
    title="A closer look at the character of natural stone."
    titleId="stones-gallery-title"
    desktopColumns={desktopColumns}
    compactColumns={compactColumns}
  />;
}
