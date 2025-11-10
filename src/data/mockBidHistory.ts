export type BidStatusType = "no_bid" | "won" | "outbid" | "active";

export interface BidHistoryItem {
  id: string;
  image: string;
  artist: string;
  title: string;
  lastBid: string;
  minPrice: string;
  step: string;
  status: BidStatusType;
  artworkId?: string;
  // Дополнительные поля для модального окна
  medium?: string; // Материал (Бумага, тушь, кисть)
  dimensions?: string; // Размеры (52x64)
  country?: string; // Страна (Россия)
  year?: string; // Год (1894)
  lastBidder?: string; // Имя последнего участника торгов
}

export const mockBidHistory: BidHistoryItem[] = [
  {
    id: "1",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "250 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "no_bid",
  },
  {
    id: "2",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "250 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "won",
  },
  {
    id: "3",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "100 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "outbid",
    artworkId: "123",
    medium: "Бумага, тушь, кисть",
    dimensions: "52x64",
    country: "Россия",
    year: "1894",
    lastBidder: "Арина",
  },
  {
    id: "4",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "100 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "active",
  },
  {
    id: "5",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "11 000 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "outbid",
    artworkId: "124",
  },
  {
    id: "6",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "150 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "active",
  },
  {
    id: "7",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "200 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "won",
  },
  {
    id: "8",
    image: "/img/profile/my-arts.png",
    artist: "Дугаржапов Бато Дугарович",
    title: "«История одной работы»",
    lastBid: "180 000 ₽",
    minPrice: "300 000 ₽",
    step: "5 000 ₽",
    status: "outbid",
    artworkId: "125",
  },
];
