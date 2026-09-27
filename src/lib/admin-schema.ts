import type { PUBLIC_COLLECTIONS } from "./revdb.functions";

type Name = (typeof PUBLIC_COLLECTIONS)[number];

export type FieldDef =
  | { key: string; label: string; type: "text" | "textarea" | "number" | "url" | "image" | "bool"; help?: string }
  | { key: string; label: string; type: "list"; help?: string }
  | { key: string; label: string; type: "objlist"; fields: { key: string; label: string }[]; help?: string };

export type SectionDef = {
  label: string;
  single?: boolean;
  titleKey: string;
  fields: FieldDef[];
};

const icon = { key: "icon", label: "Icon (as stored)", type: "text", help: "Icon markup/name used by the site." } as const;

/** Field definitions match the keys stored in the live database. */
export const SECTIONS: Record<Name, SectionDef> = {
  profile: {
    label: "Profile",
    single: true,
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "headline", label: "Headline", type: "text" },
      { key: "tagline", label: "Tagline", type: "textarea" },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "education", label: "Education", type: "text" },
      { key: "coursework", label: "Coursework", type: "textarea" },
      { key: "interests", label: "Interests", type: "text" },
      { key: "github", label: "GitHub URL", type: "url" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "website", label: "Website URL", type: "url" },
    ],
  },
  hero_copy: {
    label: "Opening lines",
    titleKey: "title",
    fields: [
      { key: "order", label: "Order", type: "number" },
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ],
  },
  experience: {
    label: "Experience",
    titleKey: "role",
    fields: [
      { key: "order", label: "Order", type: "number" },
      { key: "role", label: "Role", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "period", label: "Period", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "stack", label: "Tech stack", type: "list" },
      { key: "points", label: "Highlights", type: "list" },
    ],
  },
  projects: {
    label: "Projects",
    titleKey: "title",
    fields: [
      { key: "featured", label: "Featured on home (top slots)", type: "bool" },
      { key: "order", label: "Featured order", type: "number", help: "Lower shows first among featured." },
      { key: "id", label: "Number (sort order)", type: "number" },
      { key: "title", label: "Title", type: "text" },
      { key: "slug", label: "URL slug", type: "text", help: "Used in /projects/<slug>." },
      { key: "category", label: "Category", type: "text" },
      { key: "image", label: "Image URL", type: "image" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "stack", label: "Tech stack", type: "list" },
      { key: "points", label: "Highlights", type: "list" },
      { key: "links", label: "Links", type: "objlist", fields: [{ key: "label", label: "Label" }, { key: "url", label: "URL" }] },
    ],
  },
  skills: {
    label: "Skills",
    titleKey: "title",
    fields: [
      { key: "title", label: "Group title", type: "text" },
      { key: "data", label: "Skills", type: "objlist", fields: [{ key: "skill", label: "Skill" }, { key: "level", label: "Level" }] },
    ],
  },
  services: {
    label: "Services",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      icon,
    ],
  },
  whyChooseMe: {
    label: "What I bring",
    titleKey: "title",
    fields: [{ key: "title", label: "Title", type: "text" }, { key: "link", label: "Link", type: "text" }, icon],
  },
  achievements: {
    label: "Achievements",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "value", label: "Value", type: "number" },
      { key: "suffix", label: "Suffix (e.g. +)", type: "text" },
    ],
  },
  clients: {
    label: "Reviews",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "image", label: "Photo URL", type: "image" },
      { key: "review", label: "Review", type: "textarea" },
    ],
  },
  contactOptions: {
    label: "Contact options",
    titleKey: "title",
    fields: [{ key: "title", label: "Title", type: "text" }, { key: "value", label: "Value", type: "text" }, icon],
  },
  social_links: {
    label: "Social links",
    titleKey: "name",
    fields: [{ key: "name", label: "Name", type: "text" }, { key: "link", label: "Link", type: "url" }, icon],
  },
  appData: {
    label: "Apps",
    titleKey: "title",
    fields: [
      { key: "id", label: "Number", type: "number" },
      { key: "title", label: "Title", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "imgSrc", label: "Icon image URL", type: "image" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "details", label: "Details", type: "textarea" },
      { key: "link", label: "Download link", type: "url" },
    ],
  },
  pdfData: {
    label: "E-books",
    titleKey: "itemName",
    fields: [
      { key: "id", label: "Number", type: "number" },
      { key: "itemName", label: "Title", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "imgSrc", label: "Cover image URL", type: "image" },
      { key: "altText", label: "Image description", type: "text" },
      { key: "oldPrice", label: "Old price", type: "text" },
      { key: "newPrice", label: "New price", type: "text" },
      { key: "discount", label: "Discount", type: "text" },
      { key: "downloadLink", label: "Download link", type: "url" },
    ],
  },
  footer: {
    label: "Footer",
    titleKey: "title",
    fields: [
      { key: "title", label: "Group title", type: "text" },
      { key: "routes", label: "Links", type: "objlist", fields: [{ key: "name", label: "Name" }, { key: "id", label: "Target (section id)" }] },
    ],
  },
  tabs: {
    label: "Tabs",
    titleKey: "name",
    fields: [{ key: "name", label: "Name", type: "text" }, { key: "id", label: "Id", type: "text" }],
  },
};

export const SYSTEM_KEYS = new Set(["createdAt", "updatedAt"]);
