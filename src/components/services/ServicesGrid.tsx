import { ServiceCard, ServiceCardProps } from "./ServiceCard";

interface ServicesGridProps {
  services: ServiceCardProps[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
}
