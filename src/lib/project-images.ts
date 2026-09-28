import dnsheroFeature from "@/assets/projects/dnshero-feature.png";
import forgekitFeature from "@/assets/projects/forgekit-feature.png";

const bundled: Record<string, string> = { dnshero: dnsheroFeature, forgekit: forgekitFeature };

/** Lovable-only asset paths (/__l5e/) don't exist on other hosts, so use the bundled copy. */
export function projectImage(slug: string, image?: string) {
  if (image && image.includes("/__l5e/")) return bundled[slug] ?? image;
  return image || bundled[slug];
}
