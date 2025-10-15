import { AboutSection } from "@/components/home/AboutSection/AboutSection";
import { AdvantagesSection } from "@/components/home/AdvantagesSection/AdvantagesSection";
import ContactSection from "@/components/home/ContactSection/ContactSection";
import HeroSection from "@/components/home/HeroSection/HeroSection";
import NewsSection from "@/components/home/NewsSection/NewsSection";
import ProductSection from "@/components/home/ProductSection/ProductSections";

const newsItem = {
  title:
    "Открытие персональной выставки Пензенских художников Андрея и Арины Уделовых",
  nameOfTitle: "Статья об искусстве",
  date: "10 сентября",
  imageUrl: "/img/news/example.png",
};
const newsItems = [
  {
    title:
      "Открытие персональной выставки Пензенских художников Андрея и Арины Уделовых",
    nameOfTitle: "Статья об искусстве",
    date: "10 сентября",
    imageUrl: "/img/news/example.png",
  },
  {
    title:
      "Открытие персональной выставки Пензенских художников Андрея и Арины Уделовых",
    nameOfTitle: "Статья об искусстве",
    date: "10 сентября",
    imageUrl: "/img/news/example.png",
  },
  {
    title:
      "Открытие персональной выставки Пензенских художников Андрея и Арины Уделовых",
    nameOfTitle: "Статья об искусстве",
    date: "10 сентября",
    imageUrl: "/img/news/example.png",
  },
];
const products = [
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
export default function Home() {
  return (
    <div className="font-sans  ">
      <div className="full-width overflow-x-hidden">
        <HeroSection />
      </div>
      <ProductSection title="12 аукционов открыто" products={products} />
      <ProductSection title="Андерграунд" products={products} />
      <ProductSection title="Иконы" products={products} />
      <ProductSection
        title="СОВЕТСКАЯ ЖИВОПИСЬ И ГРАФИКА"
        products={products}
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
