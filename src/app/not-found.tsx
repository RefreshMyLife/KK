import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="flex flex-col items-center gap-12 max-w-3xl text-center">
        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-gibb uppercase tracking-tight leading-none">
          ЭТОЙ СТРАНИЦЫ
          <br />
          НЕ СУЩЕСТВУЕТ
        </h1>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          <Link href="/catalog" className="flex-1">
            <Button className="w-full bg-black text-white hover:bg-gray-800 h-14 px-8 text-base">
              Перейти в каталог
            </Button>
          </Link>
          <Link href="/auctions" className="flex-1">
            <Button
              variant="outline"
              className="w-full bg-white text-black border-gray-300 hover:bg-gray-50 h-14 px-8 text-base"
            >
              Перейти в аукционы
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
