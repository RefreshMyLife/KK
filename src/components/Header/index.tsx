"use client";
import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import Image from "next/image";
import SearchCommand from "../Search";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navLinks = [
    { name: "КАТАЛОГ", href: "#" },
    { name: "АУКЦИОН", href: "#" },
    { name: "О ПРОЕКТЕ", href: "#" },
    { name: "НОВОСТИ", href: "#" },
    { name: "КОНТАКТЫ", href: "#" },
  ];

  return (
    <header className="w-full bg-white">
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4">
          {/* Logo */}
          <Image src="/img/logo.svg" alt="Логотип" width={174} height={43} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-regular text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center">
              <SearchCommand />
            </div>

            {/* Mobile Search Icon */}
            <button
              className="md:hidden  text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              {mobileSearchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            {/* Cart Icon */}
            <button className="text-gray-700 hover:text-gray-900 relative transition-colors">
              <Image
                src={"/img/icons/shopping-cart.svg"}
                width={32}
                height={32}
                alt={""}
              />
            </button>

            {/* User Icon */}
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden w-full pb-4 animate-in slide-in-from-top duration-300 flex justify-center">
            <SearchCommand />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 px-4 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
