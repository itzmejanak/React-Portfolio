import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageBanner } from "@/components/site/SectionHeading";
import { Skeleton, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { collectionQuery, type AppItem } from "@/lib/portfolio";

const title = "Android Apps — Janak Devkota";
const description =
  "A catalogue of Android apps and utilities curated and shared by Janak Devkota, free to download.";

export const Route = createFileRoute("/apps")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppsPage,
});

function AppsPage() {
  const { data: apps = [], isLoading } = useQuery(collectionQuery<AppItem>("appData"));

  return (
    <>
      <PageBanner eyebrow={`Catalogue — ${apps.length} apps`} title="Android apps" description="Tools and utilities I use and recommend, with direct download links." scene="apps" />
     <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {isLoading ? <div className="grid gap-5 sm:grid-cols-2">{[0,1,2,3].map((i) => <Skeleton key={i} className="h-40" />)}</div> : null}
      <Stagger className="editorial-index grid md:grid-cols-2 md:gap-x-12">
        {apps.map((app, index) => (
          <StaggerItem key={app.id} className="editorial-index-item grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-3 py-7 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-5">
            <img
              src={app.imgSrc}
              alt={app.title}
              loading="lazy"
              className="size-14 object-contain sm:size-16"
            />
            <div className="min-w-0"><span className="font-mono text-[10px] text-ember">{String(index + 1).padStart(2, "0")}</span><h2 className="mt-2 font-display text-2xl font-semibold text-foreground">{app.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">{app.description}</p>
            {app.details ? (
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">{app.details}</p>
            ) : null}</div>
            {app.link ? (
              <a
                href={app.link}
                target="_blank"
                rel="noreferrer"
                className="col-start-2 inline-block w-fit font-mono text-[11px] uppercase text-ember hover:underline"
              >
                Download →
              </a>
            ) : null}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
    </>
  );
}
