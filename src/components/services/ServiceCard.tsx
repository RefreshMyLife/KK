import Image from "next/image";

export interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-[#F5F5F5]">
      {/* Image Container */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-4 font-gibb text-xl font-normal uppercase leading-tight text-black">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-black opacity-70">
          {description}
        </p>
      </div>
    </div>
  );
}
