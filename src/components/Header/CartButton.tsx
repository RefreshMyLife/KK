"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export const CartButton = () => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <Link
      href="/cart"
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
      aria-label="Корзина"
    >
      <ShoppingCart className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in fade-in zoom-in duration-200">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
};
