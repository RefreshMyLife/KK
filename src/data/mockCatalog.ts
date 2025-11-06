import { Post } from '@/app/types/post';

export const mockCatalogCategories = [
  {
    id: '1',
    name: 'Русская живопись и графика XVII-XX вв.',
    slug: 'russkaya-zhivopis',
  },
  {
    id: '2',
    name: 'Предметы интерьера и антиквариат',
    slug: 'predmety-interiera',
  },
  {
    id: '3',
    name: 'Картины для интерьера ХХ-XXI в.',
    slug: 'kartiny-interiera',
  },
  {
    id: '4',
    name: 'Современная провокация',
    slug: 'sovremennaya-provokacia',
  },
  {
    id: '5',
    name: 'Советская живопись музейного значения',
    slug: 'sovetskaya-zhivopis',
  },
  {
    id: '6',
    name: 'Русское зарубежье',
    slug: 'russkoe-zarubezhie',
  },
  {
    id: '7',
    name: 'Авангардизм',
    slug: 'avangardizm',
  },
  {
    id: '8',
    name: 'Плакаты',
    slug: 'plakaty',
  },
  {
    id: '9',
    name: 'Книги',
    slug: 'knigi',
  },
];

export const mockCatalogProducts: Post[] = [
  {
    id: '1',
    title: 'ДУГАРЖАПОВ БАТО ДУГАРОВИЧ',
    slug: 'dugarzhapov-bato',
    link: '/product/dugarzhapov-bato',
    uri: '/product/dugarzhapov-bato',
    date: '2024-01-15',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/1a1a1a/white?text=Artwork+1',
        altText: 'ДУГАРЖАПОВ БАТО ДУГАРОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '1',
          databaseId: 1,
          name: 'Русская живопись',
          slug: 'russkaya-zhivopis',
          uri: '/category/russkaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '2',
    title: 'ДУГАРЖАПОВ БАТО ДУГАРОВИЧ',
    slug: 'dugarzhapov-bato-2',
    link: '/product/dugarzhapov-bato-2',
    uri: '/product/dugarzhapov-bato-2',
    date: '2024-01-14',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/2a2a2a/white?text=Artwork+2',
        altText: 'ДУГАРЖАПОВ БАТО ДУГАРОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '2',
          databaseId: 2,
          name: 'Предметы интерьера',
          slug: 'predmety-interiera',
          uri: '/category/predmety-interiera',
        },
      ],
    },
  },
  {
    id: '3',
    title: 'ИВАНОВ ПЕТР СЕРГЕЕВИЧ',
    slug: 'ivanov-petr',
    link: '/product/ivanov-petr',
    uri: '/product/ivanov-petr',
    date: '2024-01-13',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/3a3a3a/white?text=Artwork+3',
        altText: 'ИВАНОВ ПЕТР СЕРГЕЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '1',
          databaseId: 1,
          name: 'Русская живопись',
          slug: 'russkaya-zhivopis',
          uri: '/category/russkaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '4',
    title: 'СИДОРОВ АЛЕКСАНДР ИВАНОВИЧ',
    slug: 'sidorov-alexander',
    link: '/product/sidorov-alexander',
    uri: '/product/sidorov-alexander',
    date: '2024-01-12',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/4a4a4a/white?text=Artwork+4',
        altText: 'СИДОРОВ АЛЕКСАНДР ИВАНОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '3',
          databaseId: 3,
          name: 'Картины для интерьера',
          slug: 'kartiny-interiera',
          uri: '/category/kartiny-interiera',
        },
      ],
    },
  },
  {
    id: '5',
    title: 'КУЗНЕЦОВ МИХАИЛ ВАСИЛЬЕВИЧ',
    slug: 'kuznetsov-mikhail',
    link: '/product/kuznetsov-mikhail',
    uri: '/product/kuznetsov-mikhail',
    date: '2024-01-11',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/5a5a5a/white?text=Artwork+5',
        altText: 'КУЗНЕЦОВ МИХАИЛ ВАСИЛЬЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '1',
          databaseId: 1,
          name: 'Русская живопись',
          slug: 'russkaya-zhivopis',
          uri: '/category/russkaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '6',
    title: 'ПЕТРОВ НИКОЛАЙ АЛЕКСЕЕВИЧ',
    slug: 'petrov-nikolay',
    link: '/product/petrov-nikolay',
    uri: '/product/petrov-nikolay',
    date: '2024-01-10',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/6a6a6a/white?text=Artwork+6',
        altText: 'ПЕТРОВ НИКОЛАЙ АЛЕКСЕЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '5',
          databaseId: 5,
          name: 'Советская живопись',
          slug: 'sovetskaya-zhivopis',
          uri: '/category/sovetskaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '7',
    title: 'ВОЛКОВ ДМИТРИЙ ФЕДОРОВИЧ',
    slug: 'volkov-dmitry',
    link: '/product/volkov-dmitry',
    uri: '/product/volkov-dmitry',
    date: '2024-01-09',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/7a7a7a/white?text=Artwork+7',
        altText: 'ВОЛКОВ ДМИТРИЙ ФЕДОРОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '2',
          databaseId: 2,
          name: 'Предметы интерьера',
          slug: 'predmety-interiera',
          uri: '/category/predmety-interiera',
        },
      ],
    },
  },
  {
    id: '8',
    title: 'СОКОЛОВ АНДРЕЙ ВЛАДИМИРОВИЧ',
    slug: 'sokolov-andrey',
    link: '/product/sokolov-andrey',
    uri: '/product/sokolov-andrey',
    date: '2024-01-08',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/8a8a8a/white?text=Artwork+8',
        altText: 'СОКОЛОВ АНДРЕЙ ВЛАДИМИРОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '7',
          databaseId: 7,
          name: 'Авангардизм',
          slug: 'avangardizm',
          uri: '/category/avangardizm',
        },
      ],
    },
  },
  {
    id: '9',
    title: 'МОРОЗОВ ЕГОР ПАВЛОВИЧ',
    slug: 'morozov-egor',
    link: '/product/morozov-egor',
    uri: '/product/morozov-egor',
    date: '2024-01-07',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/9a9a9a/white?text=Artwork+9',
        altText: 'МОРОЗОВ ЕГОР ПАВЛОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '1',
          databaseId: 1,
          name: 'Русская живопись',
          slug: 'russkaya-zhivopis',
          uri: '/category/russkaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '10',
    title: 'НОВИКОВ СЕМЕН ПЕТРОВИЧ',
    slug: 'novikov-semen',
    link: '/product/novikov-semen',
    uri: '/product/novikov-semen',
    date: '2024-01-06',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/aaaaaa/white?text=Artwork+10',
        altText: 'НОВИКОВ СЕМЕН ПЕТРОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '2',
          databaseId: 2,
          name: 'Предметы интерьера',
          slug: 'predmety-interiera',
          uri: '/category/predmety-interiera',
        },
      ],
    },
  },
  {
    id: '11',
    title: 'БЕЛОВ СТАНИСЛАВ ИВАНОВИЧ',
    slug: 'belov-stanislav',
    link: '/product/belov-stanislav',
    uri: '/product/belov-stanislav',
    date: '2024-01-05',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/bababa/white?text=Artwork+11',
        altText: 'БЕЛОВ СТАНИСЛАВ ИВАНОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '3',
          databaseId: 3,
          name: 'Картины для интерьера',
          slug: 'kartiny-interiera',
          uri: '/category/kartiny-interiera',
        },
      ],
    },
  },
  {
    id: '12',
    title: 'ГРИГОРЬЕВ МАКСИМ АЛЕКСАНДРОВИЧ',
    slug: 'grigoriev-maxim',
    link: '/product/grigoriev-maxim',
    uri: '/product/grigoriev-maxim',
    date: '2024-01-04',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/cacaca/white?text=Artwork+12',
        altText: 'ГРИГОРЬЕВ МАКСИМ АЛЕКСАНДРОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '1',
          databaseId: 1,
          name: 'Русская живопись',
          slug: 'russkaya-zhivopis',
          uri: '/category/russkaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '13',
    title: 'КОЗЛОВ РОМАН СЕРГЕЕВИЧ',
    slug: 'kozlov-roman',
    link: '/product/kozlov-roman',
    uri: '/product/kozlov-roman',
    date: '2024-01-03',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/dadada/white?text=Artwork+13',
        altText: 'КОЗЛОВ РОМАН СЕРГЕЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '5',
          databaseId: 5,
          name: 'Советская живопись',
          slug: 'sovetskaya-zhivopis',
          uri: '/category/sovetskaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '14',
    title: 'ЛЕБЕДЕВ АРТЕМ НИКОЛАЕВИЧ',
    slug: 'lebedev-artem',
    link: '/product/lebedev-artem',
    uri: '/product/lebedev-artem',
    date: '2024-01-02',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/eaeaea/white?text=Artwork+14',
        altText: 'ЛЕБЕДЕВ АРТЕМ НИКОЛАЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '7',
          databaseId: 7,
          name: 'Авангардизм',
          slug: 'avangardizm',
          uri: '/category/avangardizm',
        },
      ],
    },
  },
  {
    id: '15',
    title: 'ПАВЛОВ ИГОРЬ ДМИТРИЕВИЧ',
    slug: 'pavlov-igor',
    link: '/product/pavlov-igor',
    uri: '/product/pavlov-igor',
    date: '2024-01-01',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/fafafa/white?text=Artwork+15',
        altText: 'ПАВЛОВ ИГОРЬ ДМИТРИЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '1',
          databaseId: 1,
          name: 'Русская живопись',
          slug: 'russkaya-zhivopis',
          uri: '/category/russkaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '16',
    title: 'ОРЛОВ ВИКТОР АНДРЕЕВИЧ',
    slug: 'orlov-viktor',
    link: '/product/orlov-viktor',
    uri: '/product/orlov-viktor',
    date: '2023-12-31',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/1b1b1b/white?text=Artwork+16',
        altText: 'ОРЛОВ ВИКТОР АНДРЕЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '2',
          databaseId: 2,
          name: 'Предметы интерьера',
          slug: 'predmety-interiera',
          uri: '/category/predmety-interiera',
        },
      ],
    },
  },
  {
    id: '17',
    title: 'СМИРНОВ ОЛЕГ ЮРЬЕВИЧ',
    slug: 'smirnov-oleg',
    link: '/product/smirnov-oleg',
    uri: '/product/smirnov-oleg',
    date: '2023-12-30',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/2b2b2b/white?text=Artwork+17',
        altText: 'СМИРНОВ ОЛЕГ ЮРЬЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '3',
          databaseId: 3,
          name: 'Картины для интерьера',
          slug: 'kartiny-interiera',
          uri: '/category/kartiny-interiera',
        },
      ],
    },
  },
  {
    id: '18',
    title: 'ТИМОФЕЕВ ЛЕОНИД МИХАЙЛОВИЧ',
    slug: 'timofeev-leonid',
    link: '/product/timofeev-leonid',
    uri: '/product/timofeev-leonid',
    date: '2023-12-29',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/3b3b3b/white?text=Artwork+18',
        altText: 'ТИМОФЕЕВ ЛЕОНИД МИХАЙЛОВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '1',
          databaseId: 1,
          name: 'Русская живопись',
          slug: 'russkaya-zhivopis',
          uri: '/category/russkaya-zhivopis',
        },
      ],
    },
  },
  {
    id: '19',
    title: 'ЗАХАРОВ ДЕНИС ВАЛЕРЬЕВИЧ',
    slug: 'zakharov-denis',
    link: '/product/zakharov-denis',
    uri: '/product/zakharov-denis',
    date: '2023-12-28',
    excerpt: 'История одной работы',
    featuredImage: {
      node: {
        sourceUrl: 'https://placehold.co/400x500/4b4b4b/white?text=Artwork+19',
        altText: 'ЗАХАРОВ ДЕНИС ВАЛЕРЬЕВИЧ',
        mediaDetails: {
          width: 400,
          height: 500,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: '5',
          databaseId: 5,
          name: 'Советская живопись',
          slug: 'sovetskaya-zhivopis',
          uri: '/category/sovetskaya-zhivopis',
        },
      ],
    },
  },
];
