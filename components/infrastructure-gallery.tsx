import { BusinessGallery, type BusinessGalleryImage } from "./business-gallery";

const gallery: readonly BusinessGalleryImage[] = [
  { src: "/infrastructure/gallery/Paving%20a%20new%20highway%20through%20red%20earth-5.png", alt: "A new highway taking shape through red earth", width: 1939, height: 811 },
  { src: "/infrastructure/gallery/Gloved%20hands%20tying%20bridge%20deck%20reinforcement-2.png", alt: "A construction worker securing bridge deck reinforcement", width: 1122, height: 1402 },
  { src: "/infrastructure/gallery/Looking%20Up%20Through%20Flared%20Pier%20Formwork-3.png", alt: "Looking up through formwork around a bridge pier", width: 1254, height: 1254 },
  { src: "/infrastructure/gallery/River%20bridge%20construction%20in%20morning%20haze-4.png", alt: "A bridge under construction above a river in morning haze", width: 1672, height: 941 },
  { src: "/infrastructure/gallery/Vibratory%20Roller%20Compacting%20a%20Graded%20Road%20Base-1.png", alt: "A road roller compacting a graded road base", width: 1536, height: 1024 },
  { src: "/infrastructure/gallery/Hillside%20Road%20Stone%20Wall%20Construction-6.png", alt: "Stone retaining wall supporting a hillside road", width: 1086, height: 1448 },
  { src: "/infrastructure/gallery/Precast%20stormwater%20drain%20under%20construction-7.png", alt: "Precast stormwater drainage works on a construction site", width: 1448, height: 1086 },
  { src: "/infrastructure/gallery/Surveying%20the%20roadway%20in%20eastern%20India-8.png", alt: "Surveying a roadway in eastern India", width: 941, height: 1672 },
  { src: "/infrastructure/gallery/Rural%20Box%20Culvert%20Under%20Construction-9.png", alt: "A rural box culvert under construction", width: 1402, height: 1122 },
  { src: "/infrastructure/gallery/Dawn%20at%20an%20Irrigation%20Canal%20Worksite-10.png", alt: "An irrigation canal worksite at dawn", width: 1774, height: 887 },
];

const desktopColumns = [[1, 5, 7], [2, 3, 4], [0, 6, 8, 9]] as const;
const compactColumns = [[0, 1, 3, 4, 8], [2, 5, 6, 7, 9]] as const;

export function InfrastructureGallery() {
  return <BusinessGallery
    gallery={gallery}
    title="Building the connections communities depend on."
    titleId="infrastructure-gallery-title"
    desktopColumns={desktopColumns}
    compactColumns={compactColumns}
  />;
}
