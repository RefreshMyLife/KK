"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface RequestQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle?: string;
}

export default function RequestQuoteModal({
  open,
  onOpenChange,
  productTitle,
}: RequestQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Отправка заявки на сервер
    console.log("Отправка заявки:", formData);
    // Закрываем модалку после отправки
    onOpenChange(false);
    // Сброс формы
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[612px] p-0 gap-0 bg-white rounded-none !scale-100 !zoom-100 !data-[state=open]:zoom-in-100 !data-[state=closed]:zoom-out-100">
        {/* Кнопка закрытия */}
        <DialogClose className="absolute right-8 top-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <span className="sr-only">Закрыть</span>
        </DialogClose>

        {/* Заголовок */}
        <DialogHeader className="px-4 pt-12 pb-5 sm:px-16 sm:pt-16 sm:pb-10">
          <DialogTitle className="text-[32px] font-normal text-center tracking-[0.02em] leading-tight">
            ОСТАВЬТЕ ЗАЯВКУ
          </DialogTitle>
        </DialogHeader>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="px-4  pb-12 sm:px-16 sm:pb-16">
          <div className="space-y-4">
            {/* Поле ФИО */}
            <Input
              type="text"
              placeholder="ФИО"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="h-12 rounded-none border-gray-200 bg-[#F5F5F0] px-4 text-sm placeholder:text-gray-500"
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
              className="h-12 rounded-none border-gray-200 bg-[#F5F5F0] px-4 text-sm placeholder:text-gray-500"
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
              className="h-12 rounded-none border-gray-200 bg-[#F5F5F0] px-4 text-sm placeholder:text-gray-500"
            />

            {/* Кнопка отправки */}
            <Button
              type="submit"
              className="w-full h-12 rounded-none bg-black hover:bg-custom-gray-black text-white text-sm font-normal mt-6"
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
