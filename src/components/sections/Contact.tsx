import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { z } from "zod";
import { collectionQuery, type ContactOption } from "@/lib/portfolio";
import { submitMessage } from "@/lib/revdb.functions";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/lib/icons";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(150),
  message: z.string().trim().min(5, "Message is too short").max(3000),
});

const field =
  "glow w-full rounded-lg border border-edge bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ember/60 focus:outline-none";
const label = "mb-2 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground";

export function Contact() {
  const { data: options = [] } = useQuery(collectionQuery<ContactOption>("contactOptions"));
  const send = useServerFn(submitMessage);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const parsed = schema.safeParse({
      name: form.get("name") ?? "",
      email: form.get("email") ?? "",
      subject: form.get("subject") ?? "",
      message: form.get("message") ?? "",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await send({ data: { ...parsed.data, website: String(form.get("website") ?? "") } });
      if (res.ok) {
        setState("sent");
        formEl.reset();
      } else {
        setError(res.error ?? "Something went wrong.");
        setState("error");
      }
    } catch {
      setError("Couldn't send right now — please try again.");
      setState("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="09" title="Get in touch" />
      <div className="grid gap-8 md:grid-cols-12">
        <Stagger className="space-y-4 md:col-span-4">
          {options.map((option) => (
            <StaggerItem key={option.title} className="plate p-5">
              <div className="flex items-center gap-2">
                <Icon name={option.icon} size={14} className="text-ember" />
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{option.title}</p>
              </div>
              <p className="mt-1 font-display text-foreground">{option.value}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="md:col-span-8">
          <form onSubmit={handleSubmit} noValidate className="plate space-y-5 p-6">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>Name</label>
                <input id="name" name="name" maxLength={100} placeholder="Your name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className={label}>Email</label>
                <input id="email" name="email" type="email" maxLength={255} placeholder="you@company.com" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={label}>Subject</label>
              <input id="subject" name="subject" maxLength={150} placeholder="Project, role, collaboration…" className={field} />
            </div>
            <div>
              <label htmlFor="message" className={label}>Message</label>
              <textarea id="message" name="message" rows={5} maxLength={3000} placeholder="Tell me about your project…" className={`${field} resize-none`} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={state === "sending"}
                className="rounded-lg bg-ember px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:bg-ember/90 active:scale-[0.98] disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Send message"}
              </button>
              <AnimatePresence mode="wait">
                {state === "sent" ? (
                  <motion.p key="ok" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="font-mono text-[11px] uppercase tracking-wider text-ember">
                    Message received — I'll reply soon.
                  </motion.p>
                ) : state === "error" ? (
                  <motion.p key="err" role="alert" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="font-mono text-[11px] uppercase tracking-wider text-destructive">
                    {error}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
