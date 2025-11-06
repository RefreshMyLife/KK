import { Auction } from '@/app/types/auction';

// Категории для аукционов
export const mockAuctionCategories = [
  {
    id: 'auction-cat-1',
    name: 'Живопись',
    slug: 'zhivopis',
  },
  {
    id: 'auction-cat-2',
    name: 'Графика',
    slug: 'grafika',
  },
  {
    id: 'auction-cat-3',
    name: 'Скульптура',
    slug: 'skulptura',
  },
  {
    id: 'auction-cat-4',
    name: 'Антиквариат',
    slug: 'antikvariat',
  },
];

// Генерация даты окончания (от 1 часа до 7 дней)
const getRandomEndDate = (hoursMin: number, hoursMax: number): string => {
  const hours = Math.floor(Math.random() * (hoursMax - hoursMin + 1)) + hoursMin;
  return new Date(Date.now() + hours * 3600 * 1000).toISOString();
};

// Генерация текущей ставки
const getRandomBid = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mockAuctions: Auction[] = [
  {
    id: 'auction-1',
    title: 'Пейзаж у реки',
    slug: 'peizazh-u-reki',
    link: '/auctions/peizazh-u-reki',
    uri: '/auctions/peizazh-u-reki',
    price: 0,
    artist: 'Шишкин Иван Иванович',
    material: 'Холст, масло',
    size: '80×100',
    country: 'Россия',
    year: '1892',
    excerpt: 'Великолепный пейзаж русского мастера XIX века',
    featuredImage: {
      node: {
        id: 'auction-img-1',
        sourceUrl: 'https://placehold.co/600x800/2d5016/white?text=Landscape+1',
        altText: 'Пейзаж у реки',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-1',
          databaseId: 1,
          name: 'Живопись',
          slug: 'zhivopis',
          uri: '/category/zhivopis',
        },
      ],
    },
    endDate: getRandomEndDate(12, 48), // 12-48 часов
    currentBid: getRandomBid(500000, 2000000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 20) + 5,
  },
  {
    id: 'auction-2',
    title: 'Натюрморт с цветами',
    slug: 'natyurmort-s-cvetami',
    link: '/auctions/natyurmort-s-cvetami',
    uri: '/auctions/natyurmort-s-cvetami',
    price: 0,
    artist: 'Левитан Исаак Ильич',
    material: 'Холст, масло',
    size: '60×80',
    country: 'Россия',
    year: '1895',
    excerpt: 'Изысканный натюрморт в классическом стиле',
    featuredImage: {
      node: {
        id: 'auction-img-2',
        sourceUrl: 'https://placehold.co/600x800/4a1a2d/white?text=Still+Life+1',
        altText: 'Натюрморт с цветами',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-1',
          databaseId: 1,
          name: 'Живопись',
          slug: 'zhivopis',
          uri: '/category/zhivopis',
        },
      ],
    },
    endDate: getRandomEndDate(6, 24), // 6-24 часа
    currentBid: getRandomBid(300000, 1000000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 15) + 3,
  },
  {
    id: 'auction-3',
    title: 'Портрет молодой женщины',
    slug: 'portret-molodoj-zhenshchiny',
    link: '/auctions/portret-molodoj-zhenshchiny',
    uri: '/auctions/portret-molodoj-zhenshchiny',
    price: 0,
    artist: 'Репин Илья Ефимович',
    material: 'Холст, масло',
    size: '70×90',
    country: 'Россия',
    year: '1888',
    excerpt: 'Выразительный портрет кисти великого мастера',
    featuredImage: {
      node: {
        id: 'auction-img-3',
        sourceUrl: 'https://placehold.co/600x800/1a3a4a/white?text=Portrait+1',
        altText: 'Портрет молодой женщины',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-1',
          databaseId: 1,
          name: 'Живопись',
          slug: 'zhivopis',
          uri: '/category/zhivopis',
        },
      ],
    },
    endDate: getRandomEndDate(72, 168), // 3-7 дней
    currentBid: getRandomBid(2000000, 5000000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 30) + 10,
  },
  {
    id: 'auction-4',
    title: 'Морской пейзаж',
    slug: 'morskoj-peizazh',
    link: '/auctions/morskoj-peizazh',
    uri: '/auctions/morskoj-peizazh',
    price: 0,
    artist: 'Айвазовский Иван Константинович',
    material: 'Холст, масло',
    size: '90×120',
    country: 'Россия',
    year: '1870',
    excerpt: 'Величественный морской пейзаж легендарного мариниста',
    featuredImage: {
      node: {
        id: 'auction-img-4',
        sourceUrl: 'https://placehold.co/600x800/1a4a5a/white?text=Seascape+1',
        altText: 'Морской пейзаж',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-1',
          databaseId: 1,
          name: 'Живопись',
          slug: 'zhivopis',
          uri: '/category/zhivopis',
        },
      ],
    },
    endDate: getRandomEndDate(48, 96), // 2-4 дня
    currentBid: getRandomBid(5000000, 10000000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 50) + 20,
  },
  {
    id: 'auction-5',
    title: 'Графический лист "Зима"',
    slug: 'graficheskij-list-zima',
    link: '/auctions/graficheskij-list-zima',
    uri: '/auctions/graficheskij-list-zima',
    price: 0,
    artist: 'Врубель Михаил Александрович',
    material: 'Бумага, тушь, перо',
    size: '40×50',
    country: 'Россия',
    year: '1896',
    excerpt: 'Редкая графическая работа из частной коллекции',
    featuredImage: {
      node: {
        id: 'auction-img-5',
        sourceUrl: 'https://placehold.co/600x800/2a2a2a/white?text=Graphics+1',
        altText: 'Графический лист "Зима"',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-2',
          databaseId: 2,
          name: 'Графика',
          slug: 'grafika',
          uri: '/category/grafika',
        },
      ],
    },
    endDate: getRandomEndDate(24, 72), // 1-3 дня
    currentBid: getRandomBid(200000, 800000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 12) + 5,
  },
  {
    id: 'auction-6',
    title: 'Бронзовая скульптура "Всадник"',
    slug: 'bronzovaya-skulptura-vsadnik',
    link: '/auctions/bronzovaya-skulptura-vsadnik',
    uri: '/auctions/bronzovaya-skulptura-vsadnik',
    price: 0,
    artist: 'Лансере Евгений Александрович',
    material: 'Бронза, литье',
    size: 'Высота 45 см',
    country: 'Россия',
    year: '1910',
    excerpt: 'Изящная бронзовая скульптура начала XX века',
    featuredImage: {
      node: {
        id: 'auction-img-6',
        sourceUrl: 'https://placehold.co/600x800/3a2a1a/white?text=Sculpture+1',
        altText: 'Бронзовая скульптура "Всадник"',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-3',
          databaseId: 3,
          name: 'Скульптура',
          slug: 'skulptura',
          uri: '/category/skulptura',
        },
      ],
    },
    endDate: getRandomEndDate(36, 84), // 1.5-3.5 дня
    currentBid: getRandomBid(1000000, 3000000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 18) + 8,
  },
  {
    id: 'auction-7',
    title: 'Антикварные часы с маятником',
    slug: 'antikvarnyje-chasy',
    link: '/auctions/antikvarnyje-chasy',
    uri: '/auctions/antikvarnyje-chasy',
    price: 0,
    artist: 'Мастерская Фаберже',
    material: 'Бронза, позолота, эмаль',
    size: 'Высота 65 см',
    country: 'Россия',
    year: '1905',
    excerpt: 'Роскошные каминные часы из мастерской Фаберже',
    featuredImage: {
      node: {
        id: 'auction-img-7',
        sourceUrl: 'https://placehold.co/600x800/4a3a1a/white?text=Antique+1',
        altText: 'Антикварные часы с маятником',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-4',
          databaseId: 4,
          name: 'Антиквариат',
          slug: 'antikvariat',
          uri: '/category/antikvariat',
        },
      ],
    },
    endDate: getRandomEndDate(60, 120), // 2.5-5 дней
    currentBid: getRandomBid(3000000, 8000000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 25) + 12,
  },
  {
    id: 'auction-8',
    title: 'Зимний пейзаж с избами',
    slug: 'zimnij-peizazh-s-izbami',
    link: '/auctions/zimnij-peizazh-s-izbami',
    uri: '/auctions/zimnij-peizazh-s-izbami',
    price: 0,
    artist: 'Саврасов Алексей Кондратьевич',
    material: 'Холст, масло',
    size: '75×95',
    country: 'Россия',
    year: '1875',
    excerpt: 'Трогательный зимний пейзаж русской провинции',
    featuredImage: {
      node: {
        id: 'auction-img-8',
        sourceUrl: 'https://placehold.co/600x800/3a4a5a/white?text=Winter+1',
        altText: 'Зимний пейзаж с избами',
        mediaDetails: {
          width: 600,
          height: 800,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: 'auction-cat-1',
          databaseId: 1,
          name: 'Живопись',
          slug: 'zhivopis',
          uri: '/category/zhivopis',
        },
      ],
    },
    endDate: getRandomEndDate(18, 48), // 18-48 часов
    currentBid: getRandomBid(1500000, 4000000),
    commission: 18,
    status: 'active',
    bidCount: Math.floor(Math.random() * 22) + 10,
  },
];
