"use client";

import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  label: string;
  href: string;
  icons?: string[];
}

const menuItems: MenuItem[] = [
  {
    label: "мои картины",
    href: "/profile/my-artworks",
    icons: [
      "/img/profile/my-arts.png",
      "/img/profile/my-arts.png",
      "/img/profile/my-arts.png",
    ],
  },
  {
    label: "История ставок",
    href: "/profile/bid-history",
  },
  {
    label: "Предложить товар",
    href: "/profile/submit-artwork",
  },
];

export default function ProfileMenu() {
  return (
    <nav className="flex flex-col w-full">
      {menuItems.map((item, index) => (
        <div key={item.href}>
          {/* Пункт меню */}
          <Link
            href={item.href}
            className="flex flex-col gap-[6px] p-5 md:relative md:flex md:items-center md:p-0 w-full group md:h-[118px]"
          >
            {/* Текст и стрелка */}
            <div className="flex justify-between items-center w-full md:absolute md:left-5 md:top-5 md:right-5 md:w-auto">
              <span className="font-gibb text-xl leading-[1.1] uppercase transition-opacity group-hover:opacity-70">
                {item.label}
              </span>
              <span className="font-gibb text-2xl leading-[1.1] uppercase transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>

            {/* Иконки (если есть) - максимум 3 */}
            {item.icons && item.icons.length > 0 && (
              <div className="flex items-center gap-2 md:absolute md:left-5 md:top-[52px]">
                {item.icons.slice(0, 3).map((icon, idx) => (
                  <div
                    key={idx}
                    className="relative w-[65px] h-[55px] bg-[#F5F5F5] flex items-center justify-center"
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={54}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </Link>

          {/* Разделитель */}
          {index < menuItems.length - 1 && (
            <div className="w-full h-px bg-[#D9D9D9]" />
          )}
        </div>
      ))}
    </nav>
  );
}
