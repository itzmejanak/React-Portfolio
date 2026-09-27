import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll } from "motion/react";
import { collectionQuery, type Experience } from "@/lib/portfolio";
import { Reveal, Skeleton } from "@/components/motion/Reveal";

export function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  const { data = [], isLoading } = useQuery(collectionQuery<Experience>("experience"));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const items = [...data].sort((a, b) => a.order - b.order);

  return (
    <div ref={ref} className="relative pl-8 md:pl-12">
      {isLoading ? <Skeleton className="h-64" /> : null}
      <div className="absolute left-2 top-0 h-full w-px bg-border md:left-4" />
      <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-2 top-0 h-full w-px origin-top bg-ember md:left-4" />
      <div className="space-y-12">
        {items.map((job) => (
          <Reveal key={job.company}>
            <div className="relative">
                 <span className="absolute -left-[30px] top-2 size-3 bg-ember ring-4 ring-background md:-left-[38px]" />
              <p className="font-mono text-[11px] uppercase tracking-wider text-ember">
                {job.period} · {job.location}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground">{job.role}</h3>
              <p className="font-display text-lg text-muted-foreground">{job.company}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.stack?.map((s) => (
                   <span key={s} className="border border-edge px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-2">
                {(compact ? job.points?.slice(0, 3) : job.points)?.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-muted-foreground text-pretty">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-ember" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
