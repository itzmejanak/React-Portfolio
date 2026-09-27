import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminCollection, adminSaveCollection, type PUBLIC_COLLECTIONS } from "@/lib/revdb.functions";
import { SECTIONS, SYSTEM_KEYS, type FieldDef } from "@/lib/admin-schema";
import { Skeleton } from "@/components/motion/Reveal";

type Name = (typeof PUBLIC_COLLECTIONS)[number];
type Row = Record<string, unknown>;

const input =
  "w-full border border-edge bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ember focus:outline-none";
const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground";
const btn = "border border-edge px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:border-ember hover:text-foreground disabled:opacity-40";

export function CollectionEditor({ name }: { name: Name }) {
  const def = SECTIONS[name];
  const get = useServerFn(adminCollection);
  const save = useServerFn(adminSaveCollection);
  const qc = useQueryClient();
  const { data, isLoading, isError } = useQuery({ queryKey: ["admin", "content", name], queryFn: () => get({ data: { name } }) });

  const [rows, setRows] = useState<Row[]>([]);
  const [dirty, setDirty] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [mode, setMode] = useState<"form" | "json">("form");
  const [json, setJson] = useState("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!data) return;
    const clean = (data as Row[]).map((r) => Object.fromEntries(Object.entries(r).filter(([k]) => !SYSTEM_KEYS.has(k))));
    setRows(clean);
    setJson(JSON.stringify(clean, null, 2));
    setDirty(false);
    setOpen(def.single ? 0 : null);
    setMsg(null);
  }, [data, def.single]);

  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  function update(next: Row[]) {
    setRows(next);
    setJson(JSON.stringify(next, null, 2));
    setDirty(true);
    setMsg(null);
  }

  function switchMode(m: "form" | "json") {
    if (m === mode) return;
    if (m === "form") {
      try {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed) || parsed.some((x) => typeof x !== "object" || x === null || Array.isArray(x))) throw new Error();
        setRows(parsed);
      } catch {
        setMsg({ kind: "err", text: "JSON is invalid — fix it before switching back to the form." });
        return;
      }
    }
    setMode(m);
  }

  async function onSave() {
    let records = rows;
    if (mode === "json") {
      try {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed) || parsed.some((x) => typeof x !== "object" || x === null || Array.isArray(x)))
          throw new Error("Must be a list of objects: [ {...}, {...} ]");
        records = parsed;
      } catch (e) {
        setMsg({ kind: "err", text: `Not saved. ${e instanceof Error ? e.message : "Invalid JSON"}` });
        return;
      }
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await save({ data: { name, records } });
      if (!res.ok) throw new Error(res.error);
      setRows(records);
      setDirty(false);
      setMsg({ kind: "ok", text: "Saved. The site now shows these changes." });
      qc.invalidateQueries({ queryKey: ["portfolio", name] });
      qc.invalidateQueries({ queryKey: ["admin", "content", name] });
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof Error && e.message ? e.message : "Save failed." });
    } finally {
      setBusy(false);
    }
  }

  const blank = useMemo(() => {
    const r: Row = {};
    for (const f of def.fields) r[f.key] = f.type === "list" || f.type === "objlist" ? [] : f.type === "number" ? 0 : f.type === "bool" ? false : "";
    return r;
  }, [def]);

  if (isLoading) return <Skeleton className="h-96" />;
  if (isError) return <p className="text-muted-foreground">Couldn't load this section.</p>;

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j]!, next[i]!];
    update(next);
    setOpen(open === i ? j : open === j ? i : open);
  };

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-1 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-edge bg-background/95 px-1 py-3 backdrop-blur">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold text-foreground">{def.label}</h2>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {rows.length} item{rows.length === 1 ? "" : "s"} {dirty ? <span className="text-ember">· unsaved changes</span> : null}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex border border-edge">
            {(["form", "json"] as const).map((m) => (
              <button key={m} type="button" onClick={() => switchMode(m)}
                className={`px-3 py-2 font-mono text-[11px] uppercase tracking-wider ${mode === m ? "bg-ember text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {m}
              </button>
            ))}
          </div>
          {dirty ? <button type="button" className={btn} onClick={() => { if (data) { setMode("form"); const clean = (data as Row[]).map((r) => Object.fromEntries(Object.entries(r).filter(([k]) => !SYSTEM_KEYS.has(k)))); setRows(clean); setJson(JSON.stringify(clean, null, 2)); setDirty(false); setMsg(null); } }}>Discard</button> : null}
          <button type="button" onClick={onSave} disabled={!dirty || busy}
            className="bg-ember px-5 py-2 font-display text-sm font-semibold text-primary-foreground hover:bg-ember/90 disabled:opacity-40">
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {msg ? <p role="status" className={`mb-5 border-l-2 px-3 py-2 text-sm ${msg.kind === "ok" ? "border-ember text-foreground" : "border-destructive text-destructive"}`}>{msg.text}</p> : null}

      {mode === "json" ? (
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Advanced: edit the raw list. It is checked before saving.</p>
          <textarea value={json} onChange={(e) => { setJson(e.target.value); setDirty(true); setMsg(null); }} spellCheck={false}
            className={`${input} h-[65vh] font-mono text-[12px] leading-relaxed`} aria-label="JSON editor" />
        </div>
      ) : def.single ? (
        rows[0] ? <RecordForm fields={def.fields} row={rows[0]} onChange={(r) => update([r, ...rows.slice(1)])} /> : (
          <button type="button" className={btn} onClick={() => { update([blank]); setOpen(0); }}>Create {def.label}</button>
        )
      ) : (
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="border border-edge">
              <div className="flex items-center gap-3 p-3">
                <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} className="min-w-0 flex-1 truncate text-left font-display text-foreground hover:text-ember">
                  {String(r[def.titleKey] ?? "") || <span className="text-muted-foreground">Untitled</span>}
                  {r["featured"] === true ? <span className="ml-2 font-mono text-[10px] uppercase text-ember">featured</span> : null}
                </button>
                <div className="flex shrink-0 gap-1">
                  <button type="button" aria-label="Move up" className={btn} disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                  <button type="button" aria-label="Move down" className={btn} disabled={i === rows.length - 1} onClick={() => move(i, 1)}>↓</button>
                  <button type="button" className={`${btn} max-sm:hidden`} onClick={() => { const n = [...rows]; n.splice(i + 1, 0, structuredClone(r)); update(n); }}>Duplicate</button>
                  <button type="button" className={`${btn} hover:border-destructive hover:text-destructive`} onClick={() => { if (confirm("Delete this item? It is removed when you press Save.")) { update(rows.filter((_, k) => k !== i)); setOpen(null); } }}>Delete</button>
                </div>
              </div>
              {open === i ? (
                <div className="border-t border-edge p-4">
                  <RecordForm fields={def.fields} row={r} onChange={(nr) => update(rows.map((x, k) => (k === i ? nr : x)))} />
                </div>
              ) : null}
            </div>
          ))}
          <button type="button" className={`${btn} mt-3`} onClick={() => { update([...rows, structuredClone(blank)]); setOpen(rows.length); }}>+ Add item</button>
        </div>
      )}
    </div>
  );
}

function RecordForm({ fields, row, onChange }: { fields: FieldDef[]; row: Row; onChange: (r: Row) => void }) {
  const known = new Set(fields.map((f) => f.key));
  const extras = Object.keys(row).filter((k) => !known.has(k) && !SYSTEM_KEYS.has(k));
  const set = (k: string, v: unknown) => onChange({ ...row, [k]: v });
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={f.type === "textarea" || f.type === "list" || f.type === "objlist" || f.type === "image" ? "sm:col-span-2" : ""}>
          <Field def={f} value={row[f.key]} onChange={(v) => set(f.key, v)} />
        </div>
      ))}
      {extras.map((k) => (
        <div key={k} className="sm:col-span-2">
          <span className={label}>{k} (other stored field)</span>
          {typeof row[k] === "object" && row[k] !== null ? (
            <pre className="overflow-auto border border-edge p-3 font-mono text-[11px] text-muted-foreground">{JSON.stringify(row[k], null, 2)} <br />Edit in JSON mode.</pre>
          ) : (
            <input className={input} value={String(row[k] ?? "")} onChange={(e) => set(k, typeof row[k] === "number" ? Number(e.target.value) : e.target.value)} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ def, value, onChange }: { def: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const id = `f-${def.key}-${Math.random().toString(36).slice(2, 7)}`;
  const help = def.help ? <p className="mt-1 text-[11px] text-muted-foreground">{def.help}</p> : null;

  if (def.type === "bool")
    return (
      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="size-5 accent-[var(--color-ember)]" />
        <span className="text-sm text-foreground">{def.label}</span>
        {help}
      </label>
    );

  if (def.type === "list") {
    const arr = Array.isArray(value) ? (value as unknown[]).map(String) : [];
    return (
      <div>
        <span className={label}>{def.label}</span>
        <div className="space-y-2">
          {arr.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input className={input} value={v} onChange={(e) => onChange(arr.map((x, k) => (k === i ? e.target.value : x)))} />
              <button type="button" aria-label="Remove" className={btn} onClick={() => onChange(arr.filter((_, k) => k !== i))}>×</button>
            </div>
          ))}
          <button type="button" className={btn} onClick={() => onChange([...arr, ""])}>+ Add</button>
        </div>
        {help}
      </div>
    );
  }

  if (def.type === "objlist") {
    const arr = Array.isArray(value) ? (value as Row[]) : [];
    return (
      <div>
        <span className={label}>{def.label}</span>
        <div className="space-y-2">
          {arr.map((o, i) => (
            <div key={i} className="flex flex-wrap gap-2 sm:flex-nowrap">
              {def.fields.map((sf) => (
                <input key={sf.key} aria-label={sf.label} placeholder={sf.label} className={input} value={String(o?.[sf.key] ?? "")}
                  onChange={(e) => onChange(arr.map((x, k) => (k === i ? { ...x, [sf.key]: e.target.value } : x)))} />
              ))}
              <button type="button" aria-label="Remove" className={btn} onClick={() => onChange(arr.filter((_, k) => k !== i))}>×</button>
            </div>
          ))}
          <button type="button" className={btn} onClick={() => onChange([...arr, Object.fromEntries(def.fields.map((sf) => [sf.key, ""]))])}>+ Add</button>
        </div>
        {help}
      </div>
    );
  }

  const str = value === undefined || value === null ? "" : String(value);
  return (
    <div>
      <label htmlFor={id} className={label}>{def.label}</label>
      {def.type === "textarea" ? (
        <textarea id={id} rows={4} className={input} value={str} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} className={input} type={def.type === "number" ? "number" : def.type === "url" || def.type === "image" ? "url" : "text"} value={str}
          onChange={(e) => onChange(def.type === "number" ? (e.target.value === "" ? undefined : Number(e.target.value)) : e.target.value)} />
      )}
      {def.type === "image" && str ? <img src={str} alt="" className="mt-2 h-24 w-auto border border-edge object-contain" /> : null}
      {help}
    </div>
  );
}
