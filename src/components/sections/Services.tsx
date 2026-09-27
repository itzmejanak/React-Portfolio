import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type Service } from "@/lib/portfolio";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Icon } from "@/lib/icons";

export function Services() {
  const { data: services = [] } = useQuery(collectionQuery<Service>("services"));

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="05" title="Services" />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {services.map((service, i) => (
          <StaggerItem key={service.name} className="tilt plate p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] text-ember">
                S/{String(i + 1).padStart(2, "0")}
              </span>
              <Icon name={service.icon} size={20} className="text-ember" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">{service.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              {service.description?.replace(/^`/, "")}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
