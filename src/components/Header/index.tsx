"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import SearchCommand from "../Search";
import { CartButton } from "./CartButton";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navLinks = [
    { name: "КАТАЛОГ", href: "/catalog" },
    { name: "АУКЦИОН", href: "/auctions" },
    { name: "ХУДОЖНИКИ", href: "/artists" },
    { name: "О ПРОЕКТЕ", href: "#" },
    { name: "НОВОСТИ", href: "/news" },
    { name: "КОНТАКТЫ", href: "/contacts" },
  ];

  const handleCloseMobileMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300); // Длительность анимации
  };

  // Предотвращаем hydration mismatch для счётчика корзины
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Показать при скролле вверх, скрыть при скролле вниз
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white shadow transition-transform duration-300 z-50 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src="/img/logo.svg"
              alt="Логотип"
              width={124}
              height={31}
              className="lg:w-[174px] lg:h-[43px]"
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-regular text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center">
              <SearchCommand />
            </div>

            {/* Cart Button with counter */}
            <div className="hidden md:block">
              <CartButton />
            </div>

            <button className="hidden md:block text-gray-700 hover:text-gray-900 transition-colors">
              <Image
                src={"/img/icons/heart.svg"}
                width={32}
                height={32}
                alt={""}
              />
            </button>

            {/* User Icon - Desktop only */}
            <button className="hidden md:block text-gray-700 hover:text-gray-900 transition-colors">
              <Image
                src={"/img/icons/user.svg"}
                width={32}
                height={32}
                alt={""}
              />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() =>
                mobileMenuOpen
                  ? handleCloseMobileMenu()
                  : setMobileMenuOpen(true)
              }
            >
              {mobileMenuOpen ? (
                <X className="w-10 h-10" />
              ) : (
                <Menu className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden h-[100vh] text-[24px] text-black border-t border-gray-200 py-4 px-4 transition-all duration-300 ${
              isClosing
                ? "animate-out slide-out-to-top"
                : "animate-in slide-in-from-top"
            }`}
          >
            <nav className="flex flex-col h-[100%] justify-between ">
              <div className="flex flex-col  space-y-6">
                {/* Search in Mobile Menu */}
                <div className="md:hidden [&_svg]:!w-[22px] [&_svg]:!h-[22px] [&_svg]:!opacity-100 [&_[data-slot=command-input-wrapper]]:!h-auto [&_[data-slot=command-input]]:!h-auto">
                  <SearchCommand
                    className="max-w-full opacity-100 "
                    inputClassName="!py-[14px] opacity-100"
                  />
                </div>

                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className=" font-medium  hover:text-gray-900 transition-colors animate-in slide-in-from-left duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={handleCloseMobileMenu}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className=" mb-40 flex flex-col  space-y-6">
                {/* Cart Link - Mobile only */}
                <a
                  href="/cart"
                  className=" font-medium text-gray-700 hover:text-gray-900 transition-colors animate-in slide-in-from-left duration-300  flex items-center gap-2"
                  style={{ animationDelay: `${navLinks.length * 50}ms` }}
                  onClick={handleCloseMobileMenu}
                >
                  КОРЗИНА
                  {mounted && totalItems > 0 && (
                    <span className="bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </a>

                {/* User Login Link - Mobile only */}
                <a
                  href="#"
                  className=" font-medium hover:text-gray-900 transition-colors animate-in slide-in-from-left duration-300   flex items-center gap-2"
                  style={{ animationDelay: `${navLinks.length * 50}ms` }}
                  onClick={handleCloseMobileMenu}
                >
                  ВОЙТИ В АККАУНТ
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
