import { projectImage } from "@/lib/project-images";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { collectionQuery, type Project } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Skeleton } from "@/components/motion/Reveal";

export function ProjectCover({ project, className = "" }: { project: Project; className?: string }) {
  const img = projectImage(project.slug, project.image);
  if (img) {
    return <img src={img} alt={project.title} loading="lazy" className={`w-full object-cover ${className}`} />;
  }
  return (
    <div className={`relative flex w-full items-end overflow-hidden bg-panel p-5 ${className}`}>
      <div className="absolute -right-10 -top-10 size-48 rounded-full bg-ember/25 blur-3xl transition-transform duration-700 group-hover:scale-150" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
      <span className="relative font-display text-3xl font-bold tracking-tight text-foreground/90">{project.title}</span>
    </div>
  );
}

export function Projects() {
  const { data: projects = [], isLoading } = useQuery(collectionQuery<Project>("projects"));
  const [filter, setFilter] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [projects],
  );
  const visible = (filter === "All" ? projects : projects.filter((p) => p.category === filter)).sort((a, b) => a.id - b.id);

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="06" title="Selected work" />
      <div className="mb-8 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className="relative rounded-full border border-edge px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {category === filter ? (
              <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-ember" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            ) : null}
            <span className={`relative ${category === filter ? "font-semibold text-primary-foreground" : ""}`}>{category}</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      ) : (
        <motion.div layout className="grid gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.article
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group tilt plate overflow-hidden"
              >
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
                  <ProjectCover project={project} className="aspect-[16/10]" />
                  <div className="p-5">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ember">{project.category}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-1 line-clamp-3 text-sm text-muted-foreground text-pretty">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack?.slice(0, 4).map((s) => (
                        <span key={s} className="rounded-full bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-ember transition-transform group-hover:translate-x-1">
                      Case study →
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
