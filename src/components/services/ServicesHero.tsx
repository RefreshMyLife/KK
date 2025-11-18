import Image from "next/image";

export function ServicesHero() {
  return (
    <section className="relative h-[336px] w-full overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/img/services/services-hero-bg.png"
          alt="Services background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-[446px] text-center">
          <div className="mx-auto mb-3 max-w-[328px]">
            <h1 className="font-gibb text-2xl font-normal uppercase leading-[1.1] text-black">
              Предоставляем больше 10 услуг
            </h1>
          </div>
          <p className="text-lg leading-[1.1] text-black opacity-80">
            На современном рынке изобразительного искусства онлайн-аукционы
            становятся все более популярным способом для коллекционеров и
            любителей живописи приобретать значимые произведения.
          </p>
        </div>
      </div>
    </section>
  );
}
