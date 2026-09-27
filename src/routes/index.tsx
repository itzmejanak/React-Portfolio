import { createFileRoute } from "@tanstack/react-router";
import { ScrollyHero } from "@/components/sections/ScrollyHero";
import { HomeEditorial } from "@/components/sections/HomeEditorial";

const title = "Janak Devkota — Fullstack Web Developer";
const description =
  "Portfolio of Janak Devkota, a fullstack web and software developer building resilient web systems, APIs and Android apps.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

function Home() {
  return (
    <>
      <ScrollyHero />
      <HomeEditorial />
    </>
  );
}
