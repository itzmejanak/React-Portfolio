import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type WhyChooseMe as WhyItem } from "@/lib/portfolio";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Icon } from "@/lib/icons";

export function WhyChooseMe() {
  const { data: items = [] } = useQuery(collectionQuery<WhyItem>("whyChooseMe"));

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="03" title="Why choose me" />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {items.map((item, i) => (
          <StaggerItem key={item.title} className="tilt plate p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon name={item.icon} size={20} className="text-ember" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
