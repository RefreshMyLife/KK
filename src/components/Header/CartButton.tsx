"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export const CartButton = () => {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Предотвращаем hydration mismatch - рендерим счётчик только на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/cart"
      className="relative text-gray-700 hover:text-gray-900 transition-colors"
      aria-label="Корзина"
    >
      <Image
        src={"/img/icons/shopping-cart.svg"}
        width={32}
        height={32}
        alt={""}
      />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center animate-in fade-in zoom-in duration-200">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
};
