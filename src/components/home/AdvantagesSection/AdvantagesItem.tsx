import React from "react";
import Image from "next/image";
interface AdvantagesItem {
  title: string;
  imageUrl: string;
  text: string;
}

export const AdvantagesItem = ({ title, imageUrl, text }: AdvantagesItem) => {
  return (
    <div className="flex flex-col items-center text-center gap-1.5  p-4 max-w-xs mx-auto">
      <Image src={imageUrl} alt="" width={50} height={50} className="mb-4" />
      <div className="flex flex-col  items-center justify-between">
        <h4 className="text-lg font-semibold  ">{title}</h4>
        <p className="text-base text-custom-gray-dark">{text}</p>
      </div>
    </div>
  );
};
