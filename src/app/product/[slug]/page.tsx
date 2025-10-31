import React from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getProductBySlug } from "@/services/product";
import { ProductDetails } from "@/app/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Временно используем моковые данные, пока WordPress API не настроен
  const fetchedProduct = await getProductBySlug(slug);

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
    content: "<p>Прекрасная работа советского художника Федора Петровича Глебова. Картина написана в 1984 году и изображает морской пейзаж на берегу Чёрного моря.</p>",
    uri: `/product/${slug}`,
    link: `/product/${slug}`,
    featuredImage: {
      node: {
        id: "img-1",
        sourceUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Хлебные крошки */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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

        {/* Полное описание */}
        {product.content && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Описание</h2>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}
      </div>
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
