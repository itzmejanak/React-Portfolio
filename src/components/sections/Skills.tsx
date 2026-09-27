import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type Skill } from "@/lib/portfolio";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

const levelWidth: Record<string, string> = {
  Experienced: "92%",
  Advanced: "84%",
  Intermediate: "70%",
  Basic: "52%",
};

export function Skills() {
  const { data: groups = [] } = useQuery(collectionQuery<Skill>("skills"));

  return (
    <section id="skill" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="04" title="Skills by category" />
       <Stagger className="editorial-index grid gap-x-10 md:grid-cols-2">
        {groups.map((group) => (
           <StaggerItem key={group.title} className="editorial-index-item py-7">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {group.title}
            </p>
            <div className="space-y-4">
              {group.data?.map((entry) => (
                <div key={entry.skill}>
                  <div className="mb-1 flex justify-between font-mono text-[11px]">
                    <span className="text-foreground">{entry.skill}</span>
                    <span className="text-ember">{entry.level}</span>
                  </div>
                   <div className="h-1.5 bg-border">
                    <motion.div
                       className="h-full bg-ember"
                      initial={{ width: 0 }}
                      whileInView={{ width: levelWidth[entry.level] ?? "60%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
