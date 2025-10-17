"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
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
    <div className="relative flex items-center justify-end p-4 md:p-8">
      <div className="absolute w-[57px] h-[57px] z-[2] left-4.5 top-6 hidden sm:block">
        <Image
          src={"/img/logo-light.svg"}
          alt="light-logo"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src={"/img/contact/bg.png"}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative w-full max-w-6xl flex justify-end z-10">
        <div className="w-full lg:w-[50vw] lg:h-full bg-black text-white p-8 md:p-12 flex flex-col justify-between ">
          <div className="flex flex-col justify-between ">
            <h2 className="text-3xl md:text-4xl font-gibb mb-6">
              ОСТАВАЙТЕСЬ В КУРСЕ!
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Подписывайтесь на рассылку, чтобы первыми узнавать о самых
              интересных и выгодных предложениях!
            </p>

            <form
              onSubmit={handleSubmit}
              className="mb-12 text-sm sm:text-base"
            >
              <div className="flex gap-0 overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите Email"
                  className="flex-1 bg-zinc-800  text-white px-2  sm:px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-zinc-700 hover:bg-zinc-600 text-white px-2  sm:px-8 py-4 transition-colors font-medium"
                >
                  {isSubmitted ? "✓ Отправлено" : "Отправить"}
                </button>
              </div>
            </form>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-gray-500 uppercase text-sm mb-4 tracking-wider">
                  контакты
                </h3>
                <address className="not-italic space-y-1">
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
              </div>

              <div>
                <h3 className="text-gray-500 uppercase text-sm mb-4 tracking-wider">
                  часы работы
                </h3>
                <div>
                  <p>Ежедневно, 11:00–22:00</p>
                  <p className="text-gray-400">(кроме понедельников)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500">
              <div className="space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Политика конфиденциальности
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Условия использования материалов сайта
                </a>
              </div>
              <div className="text-right">
                <p>© 2009 — 2022 «Купить Картину»</p>
                <p>Все авторские права защищены.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
