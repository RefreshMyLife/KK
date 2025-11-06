import Link from "next/link";
import Image from "next/image";
import { Post } from "@/app/types/post";

interface CatalogProductCardProps {
  product: Post;
}

export default function CatalogProductCard({
  product,
}: CatalogProductCardProps) {
  const imageUrl =
    product.featuredImage?.node.sourceUrl ||
    "https://placehold.co/400x500/e5e5e5/gray?text=No+Image";

  // Извлекаем дополнительные данные (в реальном проекте это будет из ACF полей)
  const artist = product.title;
  const subtitle = product.excerpt || "История одной работы";
  const technique = "Бумага, масло"; // Мок данные
  const size = "92×64"; // Мок данные
  const country = "Россия"; // Мок данные
  const year = "1984"; // Мок данные
  const price = "300 000 000 ₽"; // Мок данные

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block group cursor-pointer"
    >
      {/* Изображение */}
      <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.featuredImage?.node.altText || artist}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Информация */}
      <div className="space-y-2">
        {/* Подзаголовок */}
        <p className="text-[12px] text-gray-500 uppercase tracking-wide">
          {subtitle}
        </p>

        {/* Имя художника */}
        <h3 className="text-[16px] font-bold text-gray-900 uppercase leading-tight group-hover:underline">
          {artist}
        </h3>

        {/* Характеристики */}
        <div className="text-[13px] text-gray-600 space-y-0.5">
          <p>{technique}</p>
          <p>
            {size} • {country} • {year}
          </p>
        </div>

        {/* Цена */}
        <p className="text-[16px] font-bold text-gray-900 pt-1">{price}</p>
      </div>
    </Link>
  );
}
