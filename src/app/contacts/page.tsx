import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Контакты | Купить Картину",
  description: "Контактная информация и реквизиты компании Купить Картину",
};

export default function ContactsPage() {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Контакты" },
  ];

  return (
    <div className="relative layout-wrapper py-30 min-h-screen">
      {/* Декоративное изображение */}
      <div className="absolute top-0 right-0 w-1/2 h-full -z-10 hidden md:block">
        <Image
          src="/img/contact/decorate.png"
          alt="decorate"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      <div className="relative z-10">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="text-4xl  font-gibb  mb-8">КОНТАКТЫ</h1>

        <div className="flex flex-col gap-12 md:gap-16 max-w-2xl">
          {/* Как с нами связаться */}
          <div>
            <h2 className="text-2xl  mb-4">КАК С НАМИ СВЯЗАТЬСЯ</h2>

            <div className="space-y-2 mb-4">
              <div>
                <a
                  href="https://yandex.ru/maps/?text=Москва,+Пречистенка+30/2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-blue-600 hover:underline transition-colors"
                >
                  Москва, Пречистенка 30/2
                </a>
              </div>

              <div>
                <a
                  href="tel:+74955876485"
                  className="text-lg hover:text-blue-600 transition-colors"
                >
                  +7 495 587-64-85
                </a>
              </div>

              <div>
                <a
                  href="mailto:info@kupitkartinu.ru"
                  className="text-lg hover:text-blue-600 transition-colors"
                >
                  info@kupitkartinu.ru
                </a>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="flex gap-3 mt-6">
              <Link
                href="#"
                className=" flex items-center justify-center"
                aria-label="Telegram"
              >
                <Image
                  src="/img/icons/social/dark/telegram.svg"
                  alt="Telegram"
                  width={32}
                  height={32}
                />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center "
                aria-label="VK"
              >
                <Image
                  src="/img/icons/social/dark/vk.svg"
                  alt="VK"
                  width={33}
                  height={32}
                />
              </Link>
              <Link
                href="#"
                className=" flex items-center justify-center"
                aria-label="YouTube"
              >
                <Image
                  src="/img/icons/social/dark/youtube.svg"
                  alt="YouTube"
                  width={43}
                  height={32}
                />
              </Link>
            </div>
          </div>

          {/* Реквизиты */}
          <div>
            <h2 className="text-2xl font-gibb mb-4">РЕКВИЗИТЫ</h2>

            <div className="space-y-3 text-base">
              <div>
                <span className="font-medium">
                  Индивидуальный предприниматель
                </span>
                <br />
                <span>Малкина Наталья Геннадьевна</span>
              </div>

              <div className="space-y-1 mt-4">
                <p>
                  <span className="text-gray-600">ИНН</span> 770472804496
                </p>
                <p>
                  <span className="text-gray-600">ОГРНИП</span> 312500127700031
                </p>
                <p>
                  <span className="text-gray-600">Банк</span> ОАО «Альфа -банк»
                </p>
                <p>
                  <span className="text-gray-600">БИК</span> 044525593
                </p>
                <p>
                  <span className="text-gray-600">К/с</span>{" "}
                  30101810200000000593
                </p>
                <p>
                  <span className="text-gray-600">Р/с</span>{" "}
                  40802810602300001154
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
