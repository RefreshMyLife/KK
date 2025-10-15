import React from "react";
import Image from "next/image";
interface AdvantagesItem {
  title: string;
  imageUrl: string;
  text: string;
}

export const AdvantagesItem = ({ title, imageUrl, text }: AdvantagesItem) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center text-center">
      <Image src={imageUrl} alt={""} width={50} height={50} />
      <div className="space-y-1.5">
        <h4 className="text-lg">{title}</h4>
        <p className="text-base text-custom-gray-dark">{text}</p>
      </div>
    </div>
  );
};
