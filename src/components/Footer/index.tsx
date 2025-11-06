"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    }
  };
  return (
    <footer className="relative sm:bg-black text-lg text-custom-gray-dark pt-7.5 px-4 md:px-7.5 pb-8">
      <div className=" sm:hidden absolute inset-0 z-0">
        <Image
          src={"/img/contact/bg.png"}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 p-4 bg-black">
        <div className=" relative sm:hidden flex flex-col bg-black justify-between  z-10">
          <h2 className="text-4xl text-white  font-gibb mb-[6px]">
            ОСТАВАЙТЕСЬ В КУРСЕ!
          </h2>
          <p className="text-custom-dark-light mb-6 text-lg">
            Подписывайтесь на рассылку, чтобы первыми узнавать о самых
            интересных и выгодных предложениях!
          </p>

          <form
            onSubmit={handleSubmit}
            className="text-base sm:text-base mb-16"
          >
            <div className="flex gap-0 overflow-hidden">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите Email"
                className="flex-1 bg-zinc-800  text-white px-1  sm:px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-1  sm:px-8 py-4 transition-colors font-medium"
              >
                {isSubmitted ? "✓ Отправлено" : "Отправить"}
              </button>
            </div>
          </form>
        </div>

        <div className=" relative mx-auto bg-black z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-[2fr_1.5fr_2fr_1fr]  gap-8 md:gap-12 md:gap-y-8 lg:gap-x-27">
            {/* Левая колонка - Логотип и часы работы */}
            <div className="hidden sm:block">
              <Link href="/" className="inline-block mb-10">
                <Image
                  src="/img/logo-footer.svg"
                  alt="Kupit Kartinu"
                  width={360}
                  height={90}
                  className="w-auto h-auto"
                />
              </Link>
              <div>
                <h3 className="text-white mb-5">Часы работы</h3>
                <p className="text-base leading-relaxed">
                  Ежедневно, 11:00 — 22:00
                  <br />
                  (кроме понедельников)
                </p>
              </div>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-custom-gray-dark text-base sm:text-white mb-4 sm:mb-5">
                Контакты
              </h3>
              <div className="space-y-3 text-lg">
                <address className="text-white sm:text-custom-gray-dark sm:text-base not-italic space-y-1 mb-6">
                  <p>
                    <a
                      href="https://yandex.ru/maps/?text=Москва,+Пречистенка+30/2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-blue-600"
                    >
                      Москва, Пречистенка 30/2
                    </a>
                  </p>
                  <p>
                    <a href="tel:+74955076485">+7&nbsp;495&nbsp;507-64-85</a>
                  </p>
                  <p>
                    <a href="mailto:info@kupitkartinu.ru">
                      info@kupitkartinu.ru
                    </a>
                  </p>
                </address>

                <div className="sm:hidden">
                  <h3 className="text-gray-dark  text-base mb-4">
                    Часы работы
                  </h3>
                  <p className="text-lg text-white leading-relaxed">
                    Ежедневно, 11:00 — 22:00
                    <br />
                    (кроме понедельников)
                  </p>
                </div>

                {/* Социальные сети */}
                <div className="flex gap-3 mt-8 mb-3 sm:my-8">
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-out"
                    aria-label="Telegram"
                  >
                    <Image
                      src="/img/icons/social/telegram.svg"
                      alt="telegram"
                      width={32}
                      height={32}
                      className="w-auto h-auto transition-transform duration-300"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-out"
                    aria-label="VK"
                  >
                    <Image
                      src="/img/icons/social/vk.svg"
                      alt="vk"
                      width={32}
                      height={32}
                      className="w-auto h-auto transition-transform duration-300"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-out"
                    aria-label="YouTube"
                  >
                    <Image
                      src="/img/icons/social/youtube.svg"
                      alt="youtube"
                      width={32}
                      height={32}
                      className="w-auto h-auto transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Реквизиты */}
                <div className="space-y-1 text-base hidden sm:block">
                  <p>ИНН: 9703021385</p>
                  <p>ОГРН: 1207700425602</p>
                  <p>КПП: 770301001</p>
                </div>
              </div>
            </div>

            {/* Каталог */}
            <div className="hidden sm:block">
              <h3 className="text-white mb-4">Каталог</h3>
              <nav className="space-y-2 text-base">
                <Link href="#" className="block hover:text-white transition">
                  Русская живопись и графика XVII-XX вв.
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Книги
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Предметы интерьера и антиквариат
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Картины для интерьера XIX-XX в.
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Андеграунд
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Плакаты
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Современные произведения
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Русское зарубежье
                </Link>
              </nav>
            </div>

            {/* О проекте */}
            <div className="hidden sm:block">
              <h3 className="text-white mb-4">О проекте</h3>
              <nav className="space-y-2 text-base">
                <Link href="#" className="block hover:text-white transition">
                  Аукционы
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Новости
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Услуги
                </Link>
                <Link href="#" className="block hover:text-white transition">
                  Контакты
                </Link>
              </nav>
            </div>

            <Image
              src="/img/logo-light.svg"
              alt="logo"
              width={360}
              height={90}
              className="w-auto h-auto sm:hidden"
            />

            <div className=" flex flex-col md:flex-row justify-between items-start md:items-center gap- text-xs">
              <div className="flex flex-col gap-1.5  ">
                <Link
                  href="#"
                  className="hover:text-white transition text-base text-[#5E5E5E]"
                >
                  Политика конфиденциальности
                </Link>
                <Link
                  href="#"
                  className="hover:text-white transition text-base text-[#5E5E5E]"
                >
                  Условия использования материалов сайта
                </Link>
                <div className="sm:hidden text-base sm:text-xs text-[#5E5E5E]">
                  <p>
                    © 2009 — 2025 «Купить Картину» <br />
                    Все авторские права защищены.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-base  text-[#5E5E5E]">
              <p>
                © 2009 — 2025 «Купить Картину» <br />
                Все авторские права защищены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
