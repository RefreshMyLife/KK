import { Product } from './product';

export interface Auction extends Product {
  // Данные аукциона
  endDate: string; // Дата окончания аукциона (ISO string)
  currentBid?: number; // Текущая ставка
  commission?: number; // Комиссия в процентах (например, 18)
  minBid?: number; // Минимальная ставка
  bidCount?: number; // Количество ставок

  // Статус аукциона
  status?: 'active' | 'ended' | 'upcoming';
}

export interface AuctionDetails extends Auction {
  content?: string;
  relatedAuctions?: Auction[]; // Похожие аукционы
}
