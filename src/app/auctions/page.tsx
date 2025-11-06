import { Metadata } from "next";
import AuctionList from "@/components/auction/AuctionList";
import { mockAuctions, mockAuctionCategories } from "@/data/mockAuctions";
import { auctionSlides } from "@/data/auctionSlides";
import ContentSlider from "@/components/shared/Slider/ContentSlider";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import ContactSection from "@/components/ContactSection/ContactSection";

export const metadata: Metadata = {
  title: "Аукционы | Купить Картину",
  description:
    "Участвуйте в аукционах произведений искусства. Делайте ставки на уникальные работы русских и зарубежных художников.",
};

export default function AuctionsPage() {
  return (
    <>
      {/* Breadcrumbs на белом фоне над слайдером */}
      <div className="pt-20 lg:pt-24 px-4 md:px-8 lg:px-12 bg-white">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Аукционы" }]}
        />
      </div>

      {/* Content Slider */}
      <ContentSlider slides={auctionSlides} minHeight="calc(100vh - 140px)" />

      <div className="container m-auto pt-16 pb-16">
        {/* Список аукционов с фильтрами */}
        <div id="list">
          <AuctionList
            auctions={mockAuctions}
            categories={mockAuctionCategories}
          />
        </div>
      </div>
      <div className="full-width overflow-x-hidden">
        <ContactSection />
      </div>
    </>
  );
}
