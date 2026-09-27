import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  adminLogin,
  adminLogout,
  adminSetup,
  adminStatus,
  listMessages,
  updateMessage,
  PUBLIC_COLLECTIONS,
  type MessageRow,
} from "@/lib/revdb.functions";
import { Skeleton } from "@/components/motion/Reveal";
import { CollectionEditor } from "@/components/admin/CollectionEditor";
import { SECTIONS } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Janak Devkota" },
      { name: "description", content: "Private admin area for reviewing contact messages." },
      { property: "og:title", content: "Admin — Janak Devkota" },
      { property: "og:description", content: "Private admin area." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const field =
  "w-full rounded-lg border border-edge bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ember/60 focus:outline-none";

function AdminPage() {
  const status = useServerFn(adminStatus);
  const { data, isLoading, refetch } = useQuery({ queryKey: ["admin", "status"], queryFn: () => status() });

  if (isLoading || !data) return <div className="mx-auto max-w-md px-6 py-32"><Skeleton className="h-64" /></div>;
  if (!data.user) return <AuthForm mode={data.hasAdmin ? "login" : "setup"} onDone={() => refetch()} />;
  return <Dashboard user={data.user} onLogout={() => refetch()} />;
}

function AuthForm({ mode, onDone }: { mode: "login" | "setup"; onDone: () => void }) {
  const login = useServerFn(adminLogin);
  const setup = useServerFn(adminSetup);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const username = String(f.get("username") ?? "").trim();
    const password = String(f.get("password") ?? "");
    if (username.length < 3 || password.length < 8) {
      setErr("Username needs 3+ characters and password 8+.");
      return;
    }
    if (mode === "setup" && password !== String(f.get("confirm") ?? "")) {
      setErr("Passwords don't match.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const res = await (mode === "login" ? login : setup)({ data: { username, password } });
      if (res.ok) onDone();
      else setErr(res.error ?? "Failed");
    } catch {
      setErr("Invalid input or server error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-6 py-28">
      <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="plate space-y-5 p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">Admin</p>
        <h1 className="font-display text-3xl font-bold text-foreground">{mode === "login" ? "Sign in" : "Create the first admin"}</h1>
        {mode === "setup" ? (
          <p className="text-sm text-muted-foreground">No admin exists yet. This setup locks itself after the first account is created.</p>
        ) : null}
        <input name="username" autoComplete="username" placeholder="Username" className={field} maxLength={40} />
        <input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="Password" className={field} maxLength={200} />
        {mode === "setup" ? <input name="confirm" type="password" autoComplete="new-password" placeholder="Confirm password" className={field} /> : null}
        {err ? <p role="alert" className="font-mono text-[11px] text-destructive">{err}</p> : null}
        <button disabled={busy} className="w-full rounded-lg bg-ember px-5 py-3 font-display font-semibold text-primary-foreground hover:bg-ember/90 disabled:opacity-60">
          {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create admin"}
        </button>
      </motion.form>
    </section>
  );
}

function Dashboard({ user, onLogout }: { user: string; onLogout: () => void }) {
  const logout = useServerFn(adminLogout);
  const qc = useQueryClient();
  const [tab, setTab] = useState<"messages" | "content">("messages");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
       <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1">
         <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">Admin · {user}</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Dashboard</h1>
        </div>
         <div className="flex shrink-0 flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
          {(["messages", "content"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="relative rounded-full border border-edge px-4 py-2 text-muted-foreground">
              {tab === t ? <motion.span layoutId="admintab" className="absolute inset-0 rounded-full bg-ember" /> : null}
              <span className={`relative ${tab === t ? "text-primary-foreground" : ""}`}>{t}</span>
            </button>
          ))}
               <button
            onClick={async () => {
              await logout();
              qc.removeQueries({ queryKey: ["admin"] });
              onLogout();
            }}
            className="ml-2 px-3 py-2 text-muted-foreground hover:text-ember"
          >
            Log out
          </button>
        </div>
      </div>
      {tab === "messages" ? <Messages /> : <Content />}
    </section>
  );
}

function Messages() {
  const list = useServerFn(listMessages);
  const update = useServerFn(updateMessage);
  const { data = [], isLoading, refetch, isError } = useQuery({ queryKey: ["admin", "messages"], queryFn: () => list() });
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const rows = useMemo(() => {
    const s = q.toLowerCase();
    return (data as MessageRow[]).filter((m) => !s || `${m.name} ${m.email} ${m.subject} ${m.message}`.toLowerCase().includes(s));
  }, [data, q]);
  const unread = (data as MessageRow[]).filter((m) => m.status !== "read").length;

  async function act(id: string, action: "read" | "unread" | "delete") {
    await update({ data: { id, action } });
    refetch();
  }

  if (isLoading) return <Skeleton className="h-80" />;
  if (isError) return <p className="text-muted-foreground">Couldn't load messages.</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {data.length} messages · <span className="text-ember">{unread} unread</span>
        </p>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search messages…" className={`${field} max-w-xs`} />
      </div>
      {rows.length === 0 ? (
        <div className="plate p-10 text-center text-muted-foreground">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {rows.map((m) => (
            <motion.div layout key={m.id} className="plate overflow-hidden">
              <button
                onClick={() => {
                  setOpen(open === m.id ? null : m.id);
                  if (m.status !== "read") act(m.id, "read");
                }}
                 className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-1 p-4 text-left sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-5"
              >
                <span className={`size-2 shrink-0 rounded-full ${m.status === "read" ? "bg-border" : "bg-ember"}`} />
                <div className="min-w-0 flex-1">
                  <p className={`truncate font-display ${m.status === "read" ? "text-muted-foreground" : "font-semibold text-foreground"}`}>
                    {m.subject} — {m.name}
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">{m.email}</p>
                </div>
                 <span className="col-start-2 font-mono text-[10px] text-muted-foreground sm:col-start-3">
                  {m.receivedAt ? new Date(m.receivedAt).toLocaleString() : ""}
                </span>
              </button>
              <AnimatePresence>
                {open === m.id ? (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border">
                    <div className="p-5">
                      <p className="whitespace-pre-wrap text-sm text-foreground">{m.message}</p>
                      <div className="mt-5 flex gap-4 font-mono text-[11px] uppercase tracking-wider">
                        <a href={`mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent("Re: " + m.subject)}`} className="text-ember hover:underline">Reply</a>
                        <button onClick={() => act(m.id, "unread")} className="text-muted-foreground hover:text-foreground">Mark unread</button>
                        <button
                          onClick={() => {
                            if (confirm("Delete this message?")) act(m.id, "delete");
                          }}
                          className="text-destructive hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function Content() {
  const [name, setName] = useState<(typeof PUBLIC_COLLECTIONS)[number]>("profile");
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <nav aria-label="Sections" className="flex flex-wrap gap-1 md:col-span-3 md:flex-col md:border-r md:border-edge md:pr-4">
        {PUBLIC_COLLECTIONS.map((c) => (
          <button key={c} type="button" onClick={() => setName(c)}
            className={`border-l-2 px-3 py-2 text-left text-sm ${c === name ? "border-ember bg-secondary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {SECTIONS[c].label}
          </button>
        ))}
      </nav>
      <div className="min-w-0 md:col-span-9">
        <CollectionEditor key={name} name={name} />
      </div>
    </div>
  );
}
