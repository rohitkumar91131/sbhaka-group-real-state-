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
  { src: "/stones/gallery/01-marble-living-room-1x1.png", alt: "Marble flooring and finishes in a contemporary living room", width: 1254, height: 1254 },
  { src: "/stones/gallery/02-gray-stone-wall-4x5.png", alt: "Gray natural stone wall with a fine textured finish", width: 1122, height: 1402 },
  { src: "/stones/gallery/03-marble-living-room-16x9.png", alt: "Marble surfaces bringing warmth to a modern living room", width: 1672, height: 941 },
  { src: "/stones/gallery/04-grand-marble-lobby-2.39x1.png", alt: "Expansive lobby finished with polished marble", width: 1939, height: 811 },
  { src: "/stones/gallery/05-marble-foyer-9x16.png", alt: "Marble finishes in a bright residential foyer", width: 941, height: 1672 },
  { src: "/stones/gallery/06-quartz-kitchen-16x9.png", alt: "Quartz countertops in a contemporary kitchen", width: 1672, height: 941 },
  { src: "/stones/gallery/07-backlit-onyx-4x5.png", alt: "Translucent onyx panel illuminated from behind", width: 1122, height: 1402 },
];

const desktopColumns = [[1, 5, 9, 13, 15], [2, 6, 10, 12, 14], [0, 3, 4, 7, 8, 11]] as const;
const compactColumns = [[0, 2, 4, 6, 8, 10, 12, 14], [1, 3, 5, 7, 9, 11, 13, 15]] as const;

export function StonesGallery() {
  return <BusinessGallery
    gallery={gallery}
    title="A closer look at the character of natural stone."
    titleId="stones-gallery-title"
    desktopColumns={desktopColumns}
    compactColumns={compactColumns}
  />;
}
