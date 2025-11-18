import { ArtworkStatusType } from "@/components/profile/my-artworks/ArtworkListItem";

export interface MockArtwork {
  id: string;
  image: string;
  artist: string;
  title: string;
  price: string;
  material: string;
  size: string;
  country: string;
  year: string;
  status: ArtworkStatusType;
}

export const mockArtworks: MockArtwork[] = [
  {
    id: "1",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    price: "250 000 ₽",
    material: "Бумага, тушь, кисть",
    size: "52x64",
    country: "Россия",
    year: "1894",
    status: "moderation",
  },
  {
    id: "2",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    price: "250 000 ₽",
    material: "Бумага, тушь, кисть",
    size: "52x64",
    country: "Россия",
    year: "1894",
    status: "rejected",
  },
  {
    id: "3",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    price: "250 000 ₽",
    material: "Бумага, тушь, кисть",
    size: "52x64",
    country: "Россия",
    year: "1894",
    status: "published",
  },
  {
    id: "4",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    price: "250 000 ₽",
    material: "Бумага, тушь, кисть",
    size: "52x64",
    country: "Россия",
    year: "1894",
    status: "in_process",
  },
  {
    id: "5",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    price: "250 000 ₽",
    material: "Бумага, тушь, кисть",
    size: "52x64",
    country: "Россия",
    year: "1894",
    status: "sold",
  },
];
