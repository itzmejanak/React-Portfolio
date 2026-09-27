import { useMemo, useRef, useState } from "react";
import { StackField } from "./StackField";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, Send } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { collectionQuery, type Achievement, type Client, type ContactOption, type Experience, type Profile, type Project, type Service, type Skill, type WhyChooseMe } from "@/lib/portfolio";
import { getGithubRepos } from "@/lib/github.functions";
import { submitMessage } from "@/lib/revdb.functions";
import { Icon } from "@/lib/icons";
import { PortraitStage } from "@/components/portrait/PortraitStage";
import kathaPreview from "@/assets/projects/katha.webp";
import client1 from "@/assets/client-1.jpeg";
import client2 from "@/assets/client-2.jpeg";
import client3 from "@/assets/client-3.jpeg";
import client4 from "@/assets/client-4.jpeg";
import client5 from "@/assets/client-5.jpeg";

const clientImages: Record<string, string> = { client1, client2, client3, client4, client5, "client-1": client1, "client-2": client2, "client-3": client3, "client-4": client4, "client-5": client5 };
const verifiedReviews = (clients: Client[]) => clients.filter(client => client.name?.trim() && client.review?.trim() && !/lorem ipsum|dolor sit amet/i.test(client.review));
const messageSchema = z.object({ name: z.string().trim().min(1, "Name is required").max(100), email: z.string().trim().email("Enter a valid email").max(255), subject: z.string().trim().max(150), message: z.string().trim().min(5, "Message is too short").max(3000) });
const fieldClass = "w-full border-b border-edge bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ember";

function Chapter({ number, title, aside }: { number: string; title: string; aside?: string }) {
  return <div className="chapter-head"><span className="chapter-number">CHAPTER / {number}</span><span className="chapter-rule" /><span className="chapter-caption">{aside ?? title}</span></div>;
}

function Entrance({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function AboutChapter() {
  const { data: profiles = [] } = useQuery(collectionQuery<Profile>("profile"));
  const { data: achievements = [] } = useQuery(collectionQuery<Achievement>("achievements"));
  const profile = profiles[0];
  return <section id="about" className="home-chapter about-chapter"><PortraitStage scene="about" mode="scroll" />
    <div className="home-wrap"><Chapter number="01" title="About" aside="The person behind the work" />
      <div className="about-layout">
        <Entrance className="about-main"><p className="section-overline">ABOUT / JANAK DEVKOTA</p><h2 className="about-title">Beyond <em>the code.</em></h2><p className="about-lead">{profile?.tagline}</p><p className="about-bio">{profile?.bio}</p></Entrance>
        <Entrance className="about-aside" delay={0.15}><span className="aside-index">01 / PROFILE</span>{profile && <dl><div><dt>LOCATION</dt><dd>{profile.location}</dd></div><div><dt>EDUCATION</dt><dd>{profile.education}</dd></div><div><dt>BEYOND CODE</dt><dd>{profile.interests}</dd></div></dl>}<ArrowDownRight size={30} strokeWidth={1} aria-hidden="true" /></Entrance>
      </div>
      <div className="achievement-strip">{achievements.map((item, i) => <Entrance key={`${item.title}-${i}`} className="achievement"><span className="achievement-value">{item.value}{item.suffix ?? ""}</span><span className="achievement-label">{item.title}</span></Entrance>)}</div>
    </div><span className="ghost-index" aria-hidden="true">01</span>
  </section>;
}

function ProjectVisual({ project }: { project: Project }) {
  const image = project.image || (project.slug === "katha" ? kathaPreview : undefined);
  return <div className={`project-visual ${["forgekit", "dnshero"].includes(project.slug) ? "project-visual-contain" : ""}`}>{image ? <img src={image} alt={`${project.title} project preview`} loading="lazy" /> : <div className="project-type-art"><span className="project-art-mark">{project.category}</span><strong>{project.title}</strong><span className="project-art-index">{String(project.id).padStart(2, "0")} / WORK</span></div>}<span className="project-visual-shade" /></div>;
}

function WorkChapter() {
  const { data: projects = [] } = useQuery(collectionQuery<Project>("projects"));
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))], [projects]);
  const visible = [...(filter === "All" ? projects : projects.filter(p => p.category === filter))].sort((a, b) => a.id - b.id);
  const flagged = visible.filter(p => p.featured).sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.id - b.id);
  const featured = flagged.length ? flagged : visible.slice(0, 2);
  const rest = visible.filter(p => !featured.includes(p));
   return <section id="work" className="home-chapter work-chapter"><PortraitStage scene="work" mode="scroll" /><div className="home-wrap"><Chapter number="02" title="Selected work" aside="Selected work / archive" /><Entrance className="work-heading"><h2>Selected <em>work.</em></h2><p>{String(visible.length).padStart(2, "0")} projects <ArrowDownRight size={18} aria-hidden="true" /></p></Entrance>
    <div className="work-filter" role="group" aria-label="Filter projects">{categories.map(category => <Button key={category} type="button" variant="ghost" aria-pressed={filter === category} onClick={() => setFilter(category)} className={`work-filter-button ${filter === category ? "is-active" : ""}`}>{category}</Button>)}</div>
    <div className="featured-grid">{featured.map((project, i) => <Entrance className={`featured-project ${i === 1 ? "featured-offset" : ""}`} key={project.slug} delay={i * 0.12}><Link to="/projects/$slug" params={{ slug: project.slug }} className="project-link"><ProjectVisual project={project} /><div className="project-meta"><div><span>{String(i + 1).padStart(2, "0")} / {project.category}</span><h3>{project.title}</h3><p>{project.description}</p></div><ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" /></div></Link><div className="project-stack">{project.stack?.slice(0, 4).map(s => <span key={s}>{s}</span>)}</div></Entrance>)}</div>
    {rest.length > 0 && <div className="project-archive"><span className="archive-label">MORE FROM THE ARCHIVE / {String(rest.length).padStart(2,"0")}</span>{rest.map((project, i) => <Link key={project.slug} to="/projects/$slug" params={{ slug: project.slug }} className="archive-row"><span>{String(i + 3).padStart(2,"0")}</span><strong>{project.title}</strong><span className="archive-category">{project.category}</span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div>}
  </div></section>;
}

function ExperienceChapter() {
  const { data = [] } = useQuery(collectionQuery<Experience>("experience"));
  const items = [...data].sort((a,b) => a.order - b.order);
  return <section id="experience" className="home-chapter experience-chapter"><PortraitStage scene="experience" mode="scroll" /><div className="home-wrap"><Chapter number="03" title="Experience" aside="Where I've built" /><div className="chapter-split"><Entrance><p className="section-overline">THE JOURNEY</p><h2 className="chapter-title">Where ideas <em>became real.</em></h2><Link to="/experience" className="chapter-route-link">Full experience <ArrowUpRight size={18} /></Link></Entrance><div className="experience-list">{items.map((job,i) => <Entrance key={`${job.company}-${i}`} className="experience-row"><span className="row-index">0{i+1} / {job.period}</span><div><h3>{job.role}</h3><p>{job.company} <span>— {job.location}</span></p><ul>{job.points?.slice(0,2).map(point => <li key={point}>{point}</li>)}</ul></div><ArrowUpRight size={22} strokeWidth={1} aria-hidden="true" /></Entrance>)}</div></div></div></section>;
}

function ApproachChapter() {
  const { data: items = [] } = useQuery(collectionQuery<WhyChooseMe>("whyChooseMe"));
  return <section className="home-chapter approach-chapter"><div className="home-wrap"><Chapter number="04" title="Approach" aside="Why choose me" /><Entrance className="approach-intro"><p className="section-overline">WHY CHOOSE ME</p><h2 className="chapter-title">Good work is <em>intentional.</em></h2></Entrance><div className="approach-list">{items.map((item,i) => <Entrance key={item.title} className="approach-row"><span className="row-index">{String(i+1).padStart(2,"0")}</span><h3>{item.title}</h3><Icon name={item.icon} size={25} className="text-ember" /></Entrance>)}</div></div></section>;
}

function CapabilityChapter() {
  const { data: groups = [] } = useQuery(collectionQuery<Skill>("skills"));
  const { data: services = [] } = useQuery(collectionQuery<Service>("services"));
  return <section id="skill" className="home-chapter capability-chapter"><div className="home-wrap"><Chapter number="05" title="Skills & services" aside="Tools / capabilities" /><div className="chapter-split"><Entrance className="capability-intro"><p className="section-overline">THE TOOLKIT</p><h2 className="chapter-title">What I <em>bring.</em></h2><p>From the first idea to the final detail.</p><StackField names={groups.flatMap(g => g.data?.map(d => d.skill) ?? [])} /></Entrance><div className="skills-index">{groups.map((group,i) => <Entrance key={group.title} className="skill-group"><span className="row-index">{String(i+1).padStart(2,"0")} / {group.title}</span><div>{group.data?.map(entry => <span key={entry.skill} title={entry.level}>{entry.skill}<small>{entry.level}</small></span>)}</div></Entrance>)}</div></div>
    <div id="services" className="services-band"><Entrance className="services-heading"><span className="section-overline">SERVICES</span><h2>How we can <em>build together.</em></h2></Entrance><div className="service-list">{services.map((service,i) => <Entrance key={service.name} className="service-row"><span className="row-index">S / {String(i+1).padStart(2,"0")}</span><div><h3>{service.name}</h3><p>{service.description?.replace(/^`/, "")}</p></div><Icon name={service.icon} size={24} className="text-ember" /></Entrance>)}</div></div>
  </div></section>;
}

function GithubChapter() {
  const fetchRepos = useServerFn(getGithubRepos);
  const { data: repos = [] } = useQuery({ queryKey: ["github", "repos"], queryFn: () => fetchRepos(), staleTime: 10 * 60 * 1000 });
  if (!repos.length) return null;
  return <section id="github" className="home-chapter github-chapter"><div className="home-wrap"><Chapter number="06" title="GitHub" aside="Live from GitHub" /><div className="chapter-split"><Entrance><Github size={28} strokeWidth={1.5} className="text-ember" aria-hidden="true" /><h2 className="chapter-title">Still <em>building.</em></h2><p className="chapter-note">Latest from GitHub</p></Entrance><div className="github-list">{repos.map((repo,i) => <Entrance key={`${repo.name}-${i}`}><a href={repo.url} target="_blank" rel="noreferrer" className="github-row"><span className="row-index">{repo.language ?? "REPO"} / {new Date(repo.updatedAt).toLocaleDateString(undefined,{ month: "short", year: "numeric" })}</span><strong>{repo.name}</strong><p>{repo.description ?? "No description yet."}</p><span className="github-stars">★ {repo.stars}</span><ArrowUpRight size={18} aria-hidden="true" /></a></Entrance>)}</div></div></div></section>;
}

function VoicesChapter() {
  const { data: clients = [] } = useQuery(collectionQuery<Client>("clients"));
  const reviews = verifiedReviews(clients);
  const [active,setActive] = useState(0);
  const current = reviews[Math.min(active,reviews.length - 1)];
  if (!current) return null;
  return <section id="testimonials" className="home-chapter voices-chapter"><div className="home-wrap"><Chapter number="07" title="Testimonials" aside="Words from clients" /><Entrance><p className="section-overline">WHAT CLIENTS SAY</p><blockquote>“{current.review?.replace(/^`\s*/, "")}”</blockquote><div className="voice-bottom"><div className="voice-person"><img src={clientImages[current.image] ?? client1} alt="" /><span>{current.name}</span></div><div className="voice-controls">{reviews.map((client,i) => <Button key={`${client.name}-${i}`} type="button" variant="ghost" size="icon" onClick={() => setActive(i)} aria-label={`Show review from ${client.name}`} aria-pressed={active === i} className="voice-button">{String(i+1).padStart(2,"0")}</Button>)}</div></div></Entrance></div></section>;
}

function ContactChapter() {
  const { data: options = [] } = useQuery(collectionQuery<ContactOption>("contactOptions"));
  const { data: clients = [] } = useQuery(collectionQuery<Client>("clients"));
  const send = useServerFn(submitMessage);
  const [state,setState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error,setError] = useState("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const formEl = event.currentTarget; const form = new FormData(formEl);
    const parsed = messageSchema.safeParse({ name: form.get("name") ?? "", email: form.get("email") ?? "", subject: form.get("subject") ?? "", message: form.get("message") ?? "" });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check the form."); setState("error"); return; }
    setState("sending");
    try { const res = await send({ data: { ...parsed.data, website: String(form.get("website") ?? "") } }); if (res.ok) { setState("sent"); formEl.reset(); } else { setError(res.error ?? "Something went wrong."); setState("error"); } }
    catch { setError("Couldn't send right now — please try again."); setState("error"); }
  }
  return <section id="contact" className="home-chapter contact-chapter"><PortraitStage scene="contact" mode="entry" /><div className="home-wrap"><Chapter number={verifiedReviews(clients).length ? "08" : "07"} title="Contact" aside="The next conversation" /><Entrance className="contact-heading"><p className="section-overline">HAVE SOMETHING IN MIND?</p><h2>Let's make <em>it real.</em></h2><ArrowDownRight size={52} strokeWidth={1} aria-hidden="true" /></Entrance><div className="contact-layout"><div className="contact-details">{options.map(option => <div key={option.title}><span><Icon name={option.icon} size={15} /> {option.title}</span><strong>{option.value}</strong></div>)}</div><form onSubmit={handleSubmit} noValidate className="editorial-form"><input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /><div className="form-pair"><label>01 / YOUR NAME<input name="name" maxLength={100} placeholder="Your name" className={fieldClass} /></label><label>02 / EMAIL<input name="email" type="email" maxLength={255} placeholder="you@company.com" className={fieldClass} /></label></div><label>03 / SUBJECT<input name="subject" maxLength={150} placeholder="Project, role, collaboration…" className={fieldClass} /></label><label>04 / YOUR MESSAGE<textarea name="message" rows={4} maxLength={3000} placeholder="Tell me about your project…" className={`${fieldClass} resize-y`} /></label><div className="form-footer"><Button type="submit" disabled={state === "sending"} className="send-button">{state === "sending" ? "Sending…" : "Send message"}<Send size={16} /></Button>{state === "sent" && <p role="status">Message received — I'll reply soon.</p>}{state === "error" && <p role="alert" className="text-destructive">{error}</p>}</div></form></div></div></section>;
}

export function HomeEditorial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const y = useTransform(eased, [0,1], [0,-120]);
  return <div ref={ref} className="home-editorial"><motion.div className="home-depth-line" style={{ y }} aria-hidden="true" /><AboutChapter /><WorkChapter /><ExperienceChapter /><ApproachChapter /><CapabilityChapter /><GithubChapter /><VoicesChapter /><ContactChapter /></div>;
}
