import { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Избранное - Kupitcartinu",
  description: "Избранные произведения искусства",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
