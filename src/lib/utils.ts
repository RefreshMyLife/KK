import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Удаляет все <img> теги из HTML строки
 * @param html - HTML контент с возможными изображениями
 * @returns HTML контент без изображений
 */
export function removeImagesFromHtml(html: string): string {
  if (!html) return '';

  // Удаляем все <img> теги (включая самозакрывающиеся и с атрибутами)
  return html.replace(/<img[^>]*>/gi, '');
}
