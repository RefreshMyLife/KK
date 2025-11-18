import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import SubmitArtworkForm from "@/components/profile/submit-artwork/SubmitArtworkForm";
import SubmitArtworkInfo from "@/components/profile/submit-artwork/SubmitArtworkInfo";

export default function SubmitArtworkPage() {
  const breadcrumbItems = [
    { label: "Профиль", href: "/profile" },
    { label: "Предложить товар" },
  ];

  return (
    <div className="layout-wrapper  px-4 mb-8 mt-30 ">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col xl:flex-row gap-8 justify-center xl:justify-between  m-auto xl:m-none text-center xl:text-left">
        {/* Левая часть - Информация */}
        <aside className="flex-shrink-0 m-auto xl:m-0">
          <SubmitArtworkInfo />
        </aside>
        {/* Правая часть - Форма */}
        <div className="flex-1 flex justify-center">
          <SubmitArtworkForm />
        </div>
      </div>
    </div>
  );
}
