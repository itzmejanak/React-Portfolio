import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type Profile } from "@/lib/portfolio";
import { PageBanner, SectionHeading } from "@/components/site/SectionHeading";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { Reveal } from "@/components/motion/Reveal";

const title = "Experience — Janak Devkota";
const description =
  "Janak Devkota's professional experience: full-stack engineering at Everest Technologies and Devalaya Infosys, education and skills.";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { data: profiles } = useQuery(collectionQuery<Profile>("profile"));
  const p = profiles?.[0];
  return (
    <>
       <PageBanner eyebrow="Career — Timeline" title="Where I've been building." scene="experience" {...(p?.bio ? { description: p.bio } : {})} />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading index="01" title="Experience" />
        <ExperienceTimeline />
      </section>
      {p ? (
         <section className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading index="02" title="Education" />
           <Reveal className="border-t border-edge py-8">
            <p className="font-display text-xl font-semibold text-foreground">{p.education}</p>
            <p className="mt-2 text-sm text-muted-foreground">{p.coursework}</p>
          </Reveal>
        </section>
      ) : null}
      <Skills />
    </>
  );
}
