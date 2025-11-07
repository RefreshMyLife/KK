import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import NewsClient from "./NewsClient";
import { Metadata } from "next";
import { mockNews } from "@/data/mockNews";
import ContactSection from "@/components/ContactSection/ContactSection";

export const metadata: Metadata = {
  title: "Новости | Аукцион произведений искусства",
  description: "Актуальные новости мира искусства и аукционных торгов",
};

export default function NewsPage() {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Новости" },
  ];

  return (
    <div className="layout-wrapper mt-30">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Заголовок страницы */}
      <h1 className="font-gibb text-4xl  uppercase mb-12">Новости</h1>

      {/* Клиентский компонент с новостями и пагинацией */}
      <NewsClient news={mockNews} />

      <ContactSection />
    </div>
  );
}
