import React from "react";
import AuctionGallery from "@/components/auction/AuctionGallery";
import AuctionInfo from "@/components/auction/AuctionInfo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AuctionDetails } from "@/app/types";
import ProductSection from "@/components/home/ProductSection/ProductSections";

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Временные моковые данные для демонстрации
  // TODO: заменить на реальный API запрос когда будет готов бэкенд
  const auction: AuctionDetails = {
    id: "auction-demo-1",
    title: "ПЕЙЗАЖИ РУССКОЙ ГЛУБИНКИ",
    slug: slug,
    price: 0, // Для аукциона цена определяется ставками
    artist: "Художник неизвестен",
    material: "Бумага, тушь, кисть",
    size: "52×64",
    country: "Россия",
    year: "1894",
    excerpt:
      "В основе творчества автора лежит интерес к восточным мифам, культурным традициям и философии. Многие работы посвящены восточной мудрости и красоте природы морского пейзажа легендарного восточного мира.",
    content: "",
    uri: `/auctions/${slug}`,
    link: `/auctions/${slug}`,
    featuredImage: {
      node: {
        id: "auction-img-1",
        sourceUrl: "/img/card/product.png",
        altText: "Пейзажи русской глубинки",
        mediaDetails: {
          width: 800,
          height: 600,
        },
      },
    },
    gallery: [
      {
        id: "auction-gallery-1",
        sourceUrl: "/img/card/example.png",
        altText: "Детализация 1",
        mediaDetails: {
          width: 800,
          height: 600,
        },
      },
      {
        id: "auction-gallery-2",
        sourceUrl: "/img/card/product.png",
        altText: "Детализация 2",
        mediaDetails: {
          width: 800,
          height: 600,
        },
      },
    ],
    categories: {
      nodes: [
        {
          id: "cat-auction-1",
          databaseId: 1,
          name: "Пейзажи русской глубинки",
          slug: "russian-landscape",
          uri: "/category/russian-landscape",
        },
      ],
    },
    // Данные аукциона
    endDate: new Date(
      Date.now() + 23 * 3600 * 1000 + 34 * 60 * 1000 + 1 * 1000
    ).toISOString(), // Через 23:34:01
    commission: 18,
    currentBid: 0,
    status: "active",
  };

  // Похожие работы (моковые данные)
  const relatedProducts = [
    {
      title: "ДУГАРЖАПОВ \n БАТО ДУГАРОВИЧ",
      subtitle: "«история одной работы»",
      price: "300 000 000 ₽",
      details: "Бумага, тушь, кисть",
      size: "52×64",
      country: "Россия",
      year: "1894",
      imageUrl: "/img/card/example.png",
      slug: "1",
    },
    {
      title: "ДУГАРЖАПОВ БАТО ДУГАРОВИЧ",
      subtitle: "«история одной работы»",
      price: "300 000 000 ₽",
      details: "Бумага, тушь, кисть",
      size: "52×64",
      country: "Россия",
      year: "1894",
      imageUrl: "/img/card/example.png",
      slug: "2",
    },
    {
      title: "ДУГАРЖАПОВ БАТО ДУГАРОВИЧ",
      subtitle: "«история одной работы»",
      price: "300 000 000 ₽",
      details: "Бумага, тушь, кисть",
      size: "52×64",
      country: "Россия",
      year: "1894",
      imageUrl: "/img/card/example.png",
      slug: "3",
    },
    {
      title: "ДУГАРЖАПОВ БАТО ДУГАРОВИЧ",
      subtitle: "«история одной работы»",
      price: "300 000 000 ₽",
      details: "Бумага, тушь, кисть",
      size: "52×64",
      country: "Россия",
      year: "1894",
      imageUrl: "/img/card/example.png",
      slug: "4",
    },
    {
      title: "ДУГАРЖАПОВ БАТО ДУГАРОВИЧ",
      subtitle: "«история одной работы»",
      price: "300 000 000 ₽",
      details: "Бумага, тушь, кисть",
      size: "52×64",
      country: "Россия",
      year: "1894",
      imageUrl: "/img/card/example.png",
      slug: "5",
    },
  ];

  const breadcrumbItems = [
    { label: "Аукционы", href: "/auctions" },
    ...(auction.categories?.nodes && auction.categories.nodes.length > 0
      ? [
          {
            label: auction.categories.nodes[0].name,
            href: auction.categories.nodes[0].uri,
          },
        ]
      : []),
    { label: auction.title },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <div className="py-8">
        {/* Хлебные крошки */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Основной контент */}
        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          {/* Галерея изображений и информация */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr]  align-center gap-3 lg:gap-5">
            {/* Галерея слева */}
            <div>
              {auction.featuredImage && (
                <AuctionGallery
                  mainImage={auction.featuredImage.node}
                  gallery={auction.gallery}
                  title={auction.title}
                />
              )}
            </div>

            {/* Информация об аукционе справа */}
            <div>
              <AuctionInfo auction={auction} />
            </div>
          </div>
        </div>
      </div>

      {/* Похожие работы */}
      <ProductSection
        title="ПОХОЖИЕ РАБОТЫ АВТОРА"
        products={relatedProducts}
      />
    </div>
  );
}

// Генерация метаданных для SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // TODO: получить данные аукциона из API
  return {
    title: "Аукцион: Пейзажи русской глубинки",
    description: "Участвуйте в аукционе на произведение искусства",
  };
}
