import React from "react";
import Image from "next/image";
export const AboutSection = () => {
  return (
    <div className="my-16 bg-white">
      <div className=" mx-auto  ">
        {/* Header */}
        <h1 className="text-[40px] font-gibb text-center mb-12">О ПРОЕКТЕ</h1>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div>
            <div className="w-full ">
              <Image
                src={"/img/about.jpg"}
                alt={"about"}
                width={1000}
                height={1000}
              />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-[24px]  font-gibb leading-tight">
              WWW.KUPITKARTINU.RU – СОВРЕМЕННЫЙ ПОРТАЛ, ПОЗВОЛЯЮЩИЙ ПОКУПАТЬ ИЛИ
              ПРОДАВАТЬ ПРОИЗВЕДЕНИЯ ИЗОБРАЗИТЕЛЬНОГО ИСКУССТВА.
            </h2>

            <p className="text-gray-700 leading-relaxed">
              На нашем сайте Вы сможете подобрать картину, которая сделает
              неповторимым Ваш интерьер или положит начало семейной коллекции
              живописи. Вниманию коллекционеров мы предлагаем специальный
              раздел: Живопись 19-н. 20 вв. музейного и коллекционного значения;
              произведения коллекционного значения более поздних периодов
              содержатся в разделах Советская живопись и Андерграунд,
              современная живопись. Зарегистрированные пользователи также могут
              выставлять на продажу произведения из собственных коллекций.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
