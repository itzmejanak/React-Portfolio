import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type Client } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site/SectionHeading";
import client1 from "@/assets/client-1.jpeg";
import client2 from "@/assets/client-2.jpeg";
import client3 from "@/assets/client-3.jpeg";
import client4 from "@/assets/client-4.jpeg";
import client5 from "@/assets/client-5.jpeg";

const clientImages: Record<string, string> = {
  client1,
  client2,
  client3,
  client4,
  client5,
  "client-1": client1,
  "client-2": client2,
  "client-3": client3,
  "client-4": client4,
  "client-5": client5,
};

export function Testimonials() {
  const { data: clients = [] } = useQuery(collectionQuery<Client>("clients"));
  const [active, setActive] = useState(0);

  if (clients.length === 0) return null;
  const current = clients[Math.min(active, clients.length - 1)]!;

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="08" title="What clients say" />
      <div className="tilt plate p-8 md:p-12">
        <p className="font-display text-2xl leading-snug text-foreground text-balance md:text-3xl">
          “{current.review?.replace(/^`\s*/, "")}”
        </p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={clientImages[current.image] ?? client1}
              alt={current.name}
              className="size-12 rounded-full object-cover outline outline-1 -outline-offset-1 outline-border"
            />
            <div>
              <p className="font-display font-semibold text-foreground">{current.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Client
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {clients.map((client, i) => (
              <button
                key={client.name}
                type="button"
                aria-label={`Show review from ${client.name}`}
                onClick={() => setActive(i)}
                className={`size-2 rounded-full transition-colors ${
                  i === active ? "bg-ember" : "bg-edge"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
