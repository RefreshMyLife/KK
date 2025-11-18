import Link from "next/link";

export default function NotFound() {
  return (
    <div className="layout-wrapper mt-30 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="font-gibb text-4xl uppercase mb-4">
        Новость не найдена
      </h1>
      <p className="text-gray-600 mb-8">
        К сожалению, запрошенная новость не существует или была удалена.
      </p>
      <Link
        href="/news"
        className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
      >
        Вернуться к новостям
      </Link>
    </div>
  );
}
