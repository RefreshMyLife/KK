import ProfileContent from "@/components/profile/main/ProfileContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет | Купить Картину",
  description: "Личный кабинет пользователя",
};

// Временные данные для демонстрации
const mockUserData = {
  name: "Константин Петров",
  avatarUrl: "/img/profile/avatar-placeholder.png",
  stats: {
    itemsSold: 12,
    auctionParticipations: 4,
  },
};

export default function ProfilePage() {
  return (
    <ProfileContent
      initialName={mockUserData.name}
      avatarUrl={mockUserData.avatarUrl}
      stats={mockUserData.stats}
    />
  );
}
