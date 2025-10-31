import React from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getProductBySlug } from "@/services/product";
import { ProductDetails } from "@/app/types";
import ProductSection from "@/components/home/ProductSection/ProductSections";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Временно используем моковые данные, пока WordPress API не настроен
  const fetchedProduct = await getProductBySlug(slug);
  const products = [
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
    },
  ];
  // Если продукт не найден, используем демо-данные
  const product: ProductDetails = fetchedProduct || {
    id: "demo-1",
    title: "ГЛЕБОВ ФЕДОР ПЕТРОВИЧ",
    slug: slug,
    price: 420000,
    artist: "Глебов Федор Петрович",
    material: "бумага, гуашь, масло",
    size: "82×64",
    country: "Россия",
    year: "1984",
    excerpt: "Живописная работа советского художника",
    content:
      "<p>Прекрасная работа советского художника Федора Петровича Глебова. Картина написана в 1984 году и изображает морской пейзаж на берегу Чёрного моря.</p>",
    uri: `/product/${slug}`,
    link: `/product/${slug}`,
    featuredImage: {
      node: {
        id: "img-1",
        sourceUrl: "/img/card/product.png",
        altText: "У Чёрного моря",
        mediaDetails: {
          width: 800,
          height: 600,
        },
      },
    },
    categories: {
      nodes: [
        {
          id: "cat-1",
          databaseId: 1,
          name: "У Чёрного моря",
          slug: "black-sea",
          uri: "/category/black-sea",
        },
      ],
    },
  };

  const breadcrumbItems = [
    { label: "Каталог", href: "/catalog" },
    ...(product.categories?.nodes && product.categories.nodes.length > 0
      ? [
          {
            label: product.categories.nodes[0].name,
            href: product.categories.nodes[0].uri,
          },
        ]
      : []),
    { label: product.title },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <div className=" mx-auto  py-8 max-w-7xl">
        {/* Хлебные крошки */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
          {/* Галерея изображений */}
          <div className="order-1">
            {product.featuredImage && (
              <ProductGallery
                mainImage={product.featuredImage.node}
                gallery={product.gallery}
                title={product.title}
              />
            )}
          </div>

          {/* Информация о товаре */}
          <div className="order-2">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      <ProductSection title="ПОХОЖИЕ РАБОТЫ АВТОРА" products={products} />
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
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Товар не найден",
    };
  }

  return {
    title: product.title,
    description: product.excerpt || `Купить ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.excerpt,
      images: product.featuredImage
        ? [{ url: product.featuredImage.node.sourceUrl }]
        : [],
    },
  };
}
