import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import EditProfileForm from "@/components/profile/edit/EditProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Редактирование профиля | Купить Картину",
  description: "Редактирование личного профиля",
};

export default function EditProfilePage() {
  const breadcrumbItems = [
    { label: "Профиль", href: "/profile" },
    { label: "Редактирование" },
  ];

  return (
    <div className="layout-wrapper px-4 mb-8 mt-30">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="font-gibb text-[36px] leading-[1.11] uppercase tracking-tight mb-8 text-center md:text-left">
        Личный профиль
      </h1>

      <div className="flex justify-center">
        <EditProfileForm />
      </div>
    </div>
  );
}
