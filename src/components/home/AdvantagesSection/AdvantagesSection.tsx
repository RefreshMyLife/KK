import React from "react";
import { AdvantagesItem } from "./AdvantagesItem";

export const AdvantagesSection = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-16 py-16 px-4 md:px-16">
      <h3 className="text-2xl md:text-3xl text-center">
        Преимущества сотрудничества с нами
      </h3>
      <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center md:justify-between w-full">
        <div className="flex flex-col gap-8 justify-center items-center text-center flex-1 min-w-[250px]">
          <AdvantagesItem
            imageUrl="/img/advantages/1.svg"
            title="Самая большая база на рынке"
            text="В нашем каталоге представлены картины в различных стилях и техниках, антиквариат и другие произведения искусства"
          />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center text-center flex-1 min-w-[250px]">
          <AdvantagesItem
            imageUrl="/img/advantages/2.svg"
            title="Собственный аукцион"
            text="Обеспечиваем честное ведение торгов, справедливую конкуренцию и равные права для всех участников аукционов"
          />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center text-center flex-1 min-w-[250px]">
          <AdvantagesItem
            imageUrl="/img/advantages/3.svg"
            title="Галерея в центре Москвы"
            text="Вы можете ознакомиться с аукционными произведениями искусства в нашей галерее по адресу: г. Москва, ул. Пречистенка, 30/2"
          />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center text-center flex-1 min-w-[250px]">
          <AdvantagesItem
            imageUrl="/img/advantages/4.svg"
            title="Участие из любой точки мира"
            text="Для того, чтобы продать или приобрести произведение искусства, вам нужен лишь компьютер и доступ в интернет"
          />
        </div>
      </div>
    </div>
  );
};
