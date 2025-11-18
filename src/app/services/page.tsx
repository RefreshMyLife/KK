import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServiceCardProps } from "@/components/services/ServiceCard";

// Temporary mock data for services
const services: ServiceCardProps[] = [
  {
    title: "Перевозка картин",
    description:
      "Растаможки старинных картин - важный этап в создании защищенной ценной художественной истории, которую необходимо бережно сохранить для будущих поколений.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Перевозка картин",
    description:
      "Реставрация старинных картин - важный этап в создании защищенной ценной художественной истории, которую необходимо бережно сохранить для будущих поколений.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Перевозка картин",
    description:
      "Реставрация старинных картин - важный этап в создании защищенной ценной художественной истории, которую необходимо бережно сохранить для будущих поколений.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Оценка произведений",
    description:
      "Профессиональная оценка произведений искусства для страхования, продажи или инвестиционных целей от сертифицированных экспертов.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Реставрация",
    description:
      "Полный комплекс реставрационных работ для сохранения и восстановления художественных произведений любой сложности.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Консультации",
    description:
      "Экспертные консультации по вопросам коллекционирования, инвестиций в искусство и управления частными коллекциями.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Аукционные услуги",
    description:
      "Организация и проведение онлайн и офлайн аукционов с полным юридическим сопровождением сделок.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Страхование",
    description:
      "Комплексное страхование произведений искусства при транспортировке, хранении и экспонировании.",
    imageUrl: "/img/card/example.png",
  },
  {
    title: "Хранение",
    description:
      "Безопасное хранение произведений искусства в специализированных хранилищах с климат-контролем.",
    imageUrl: "/img/card/example.png",
  },
];

const breadcrumbItems = [{ label: "Главная", href: "/" }, { label: "Услуги" }];

export default function ServicesPage() {
  return (
    <div className="layout-wrapper min-h-screen mt-25">
      {/* Breadcrumbs */}
      <div className="pt-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="font-gibb text-4xl font-normal uppercase text-black">
          Услуги
        </h1>
      </div>

      {/* Hero Section */}
      <div className="full-width overflow-x-hidden">
        <ServicesHero />
      </div>

      {/* Services Grid */}
      <ServicesGrid services={services} />
    </div>
  );
}
