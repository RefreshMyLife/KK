import { AboutSection } from "@/components/home/AboutSection/AboutSection";
import { AdvantagesSection } from "@/components/home/AdvantagesSection/AdvantagesSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import HeroSection from "@/components/home/HeroSection/HeroSection";
import NewsSection from "@/components/home/NewsSection/NewsSection";
import ProductSection from "@/components/home/ProductSection/ProductSections";
import { getLatestNews } from "@/services/news";
import { getPaintingsByCategory } from "@/services/product";

// ISR конфигурация: автоматическое обновление каждые 5 минут
// Главная страница содержит новости и слайдер, которые могут часто меняться
export const revalidate = 300; // 5 минут

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

export default async function Home() {
  // TODO: Интеграция WordPress слайдера
  // Для использования данных из WordPress нужно расширить ACF поля и адаптировать структуру данных
  // const { blocks, categoryMap } = await getMainPageWithCategories();

  // Получаем последние 3 новости из WordPress
  const newsItems = await getLatestNews(3);

  // Получаем картины из категорий WordPress (по 10 из каждой)
  const undergroundPaintings = await getPaintingsByCategory('underground', 10);
  const iconPaintings = await getPaintingsByCategory('ikonyi', 10);
  const sovietPaintings = await getPaintingsByCategory('sovetskaya-zhivopis', 10);

  return (
    <div className="layout-wrapper">
      <div className="full-width overflow-x-hidden">
        <HeroSection />
      </div>
      <ProductSection title="12 аукционов открыто" products={products} />
      <ProductSection title="Андерграунд" products={undergroundPaintings} />
      <ProductSection title="Иконы" products={iconPaintings} />
      <ProductSection
        title="СОВЕТСКАЯ ЖИВОПИСЬ И ГРАФИКА"
        products={sovietPaintings}
      />
      <div className="slider-overflow">
        <NewsSection newsItems={newsItems} title={"Новости"} />
      </div>
      <AboutSection />
      <AdvantagesSection />
      <div className="full-width overflow-x-hidden">
        <ContactSection />
      </div>
    </div>
  );
}
