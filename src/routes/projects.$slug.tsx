import { projectImage } from "@/lib/project-images";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { collectionQuery, type Project } from "@/lib/portfolio";
import { Reveal, Skeleton, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PortraitStage } from "@/components/portrait/PortraitStage";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const title = `${name} — Project by Janak Devkota`;
    const description = `Case study of ${name}: stack, highlights and live links, built by Janak Devkota.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const { data: projects = [], isLoading } = useQuery(collectionQuery<Project>("projects"));
  if (isLoading) return <div className="mx-auto max-w-6xl px-6 py-24"><Skeleton className="h-96" /></div>;
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">Project not found</h1>
        <Link to="/" hash="work" className="mt-6 inline-block font-mono text-[11px] uppercase tracking-wider text-ember">← Back to work</Link>
      </div>
    );
  }
  const next = projects[(idx + 1) % projects.length];
  return <ProjectView project={project} next={next} />;
}

function ProjectView({ project, next }: { project: Project; next: Project | undefined }) {
  return (
    <article>
       <div className="project-intro relative overflow-hidden border-b border-border">
         <PortraitStage scene="project" />
         <div className="project-intro-content relative mx-auto max-w-6xl px-6 py-28 md:py-40">
          <Link to="/" hash="work" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-ember">← All work</Link>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
            {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-full font-display text-5xl font-bold tracking-tight text-foreground break-words sm:text-6xl lg:text-8xl"
          >
            {project.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6 max-w-[56ch] text-lg text-muted-foreground text-pretty">
            {project.description}
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links?.map((l, i) => (
               <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
                 className={i === 0 ? "bg-ember px-5 py-3 font-display font-semibold text-primary-foreground hover:bg-ember/90" : "border border-edge px-5 py-3 font-display font-semibold text-foreground hover:border-ember/50"}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {projectImage(project.slug, project.image) && <div className="mx-auto max-w-6xl px-6 pt-16"><img src={projectImage(project.slug, project.image)} alt={`${project.title} project preview`} className="w-full object-contain" loading="lazy" /></div>}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading index="01" title="Highlights" />
           <Stagger className="border-t border-edge">
            {project.points?.map((pt, i) => (
               <StaggerItem key={pt} className="flex gap-4 border-b border-edge py-6">
                <span className="font-mono text-[11px] text-ember">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-muted-foreground text-pretty">{pt}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal delay={0.1} className="lg:col-span-4">
           <div className="border-t border-edge py-6 lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ember">Stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack?.map((s) => (
                 <span key={s} className="border border-edge px-3 py-1 font-mono text-[11px] text-foreground">{s}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {next && next.slug !== project.slug ? (
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="group block border-t border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Next project</p>
              <p className="mt-2 font-display text-4xl font-bold text-foreground transition-colors group-hover:text-ember md:text-6xl">{next.title}</p>
            </div>
            <span className="font-display text-4xl text-ember transition-transform group-hover:translate-x-2">→</span>
          </div>
        </Link>
      ) : null}
    </article>
  );
}
