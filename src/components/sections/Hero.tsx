import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { animate, useInView } from "motion/react";
import { collectionQuery, type Achievement, type Profile } from "@/lib/portfolio";
import { Reveal, Skeleton, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Hero() {
  const { data: achievements = [] } = useQuery(collectionQuery<Achievement>("achievements"));
  const { data: profiles, isLoading } = useQuery(collectionQuery<Profile>("profile"));
  const profile = profiles?.[0];

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-ember/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="01" title="About" />
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            {isLoading || !profile ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <>
                <p className="font-display text-2xl font-semibold leading-snug text-foreground text-balance md:text-3xl">
                  {profile.tagline}
                </p>
                <p className="mt-6 text-muted-foreground text-pretty">{profile.bio}</p>
              </>
            )}
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5">
            {profile ? (
              <dl className="plate divide-y divide-border">
                {[
                  ["Education", profile.education],
                  ["Location", profile.location],
                  ["Beyond code", profile.interests],
                ].map(([k, v]) => (
                  <div key={k} className="p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-ember">{k}</dt>
                    <dd className="mt-1 text-sm text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Skeleton className="h-56" />
            )}
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-4">
          {achievements.map((item, i) => (
            <StaggerItem key={item.title} className="bg-background p-6">
              <p className={`font-display text-4xl font-bold ${i === 0 ? "text-ember" : "text-foreground"}`}>
                <Counter value={item.value} suffix={item.suffix ?? ""} />
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{item.title}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
