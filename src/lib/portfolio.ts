import { queryOptions } from "@tanstack/react-query";
import { getCollection, type PUBLIC_COLLECTIONS } from "./revdb.functions";

export type Collection = (typeof PUBLIC_COLLECTIONS)[number];

export function collectionQuery<T = Record<string, unknown>>(name: Collection) {
  return queryOptions({
    queryKey: ["portfolio", name],
    queryFn: async () => (await getCollection({ data: { name } })) as T[],
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export type Profile = {
  name: string;
  headline: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  coursework: string;
  github: string;
  linkedin: string;
  website: string;
  interests: string;
};
export type Experience = {
  order: number;
  role: string;
  company: string;
  period: string;
  location: string;
  stack: string[];
  points: string[];
};
export type HeroCopy = { order: number; eyebrow: string; title: string; subtitle: string };
export type Tab = { name: string; id: string };
export type WhyChooseMe = { title: string; icon: string; link?: string };
export type Service = { name: string; icon: string; description: string };
export type Skill = { title: string; data: { skill: string; level: string }[] };
export type Project = {
  id: number;
  slug: string;
  title: string;
  image?: string;
  category: string;
  stack: string[];
  description: string;
  points: string[];
  links: { label: string; url: string }[];
};
export type Client = { image: string; name: string; review: string };
export type ContactOption = { title: string; value: string; icon: string };
export type Achievement = { value: number; suffix?: string; title: string };
export type SocialHandle = { name: string; icon: string; link?: string };
export type FooterGroup = { title: string; routes?: { name: string; id: string }[] };
export type AppItem = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  details?: string;
  link?: string;
};
export type PdfItem = {
  imgSrc: string;
  altText?: string;
  discount?: string;
  itemName: string;
  oldPrice?: string;
  newPrice?: string;
  downloadLink?: string;
};
