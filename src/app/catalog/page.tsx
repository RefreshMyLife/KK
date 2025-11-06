import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import CatalogList from "@/components/catalog/CatalogList";
import { mockCatalogProducts, mockCatalogCategories } from "@/data/mockCatalog";

export const metadata: Metadata = {
  title: "Каталог | Kunstkamera",
  description: "Каталог произведений искусства",
};

export default function CatalogPage() {
  return (
    <div className="ml-5 pt-32 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
      />

      {/* Каталог с фильтрами */}
      <CatalogList
        products={mockCatalogProducts}
        categories={mockCatalogCategories}
      />
    </div>
  );
}
