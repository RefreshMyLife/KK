"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartSummaryProps {
  totalPrice: number;
  totalItems: number;
}

export const CartSummary = ({ totalPrice, totalItems }: CartSummaryProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Отправка заявки на сервер
    console.log("Отправка заявки:", formData);
    // Сброс формы
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="bg-white   p-6  pt-0 rounded-none sticky top-24">
      {/* Итого */}
      <div className="mb-8">
        <h2 className="text-2xl font-normal mb-2 uppercase">Итого</h2>

        <div className="flex justify-between">
          <div className="flex justify-between text-lg">
            <span className="">{totalItems} товара</span>
          </div>

          <div className="">
            <span>{formatPrice(totalPrice)} ₽</span>
          </div>
        </div>
      </div>

      {/* Форма заявки */}
      <div className="border-t border-custom-gray-dark pt-8">
        <h3 className="text-[24px] font-gibb mb-5 text-center uppercase leading-normal">
          Для покупки
          <br />
          оставьте заявку
        </h3>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Поле ФИО */}
          <Input
            type="text"
            placeholder="ФИО"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12 rounded-none  border-none  bg-[#F3F3F3] px-4 text-sm placeholder:text-gray-500"
          />

          {/* Поле E-mail */}
          <Input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="h-12  border-none rounded-none bg-[#F3F3F3] px-4 text-sm placeholder:text-gray-500"
          />

          {/* Поле Номер телефона */}
          <Input
            type="tel"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
            className="h-12  border-none rounded-none bg-[#F3F3F3] px-4 text-sm placeholder:text-gray-500"
          />

          {/* Кнопка отправки */}
          <Button
            type="submit"
            className="w-full h-12 rounded-none bg-black hover:bg-gray-800 text-white text-sm font-normal mt-6"
          >
            Отправить
          </Button>

          {/* Текст согласия */}
          <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">
            Нажимая кнопку &quot;Отправить&quot; вы соглашаетесь на обработку
            персональных данных в соответствии с{" "}
            <a href="#" className="underline hover:text-gray-600">
              пользовательским соглашением
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
