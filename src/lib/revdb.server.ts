const BASE = "https://rev-database-v2.vercel.app/api";

function headers() {
  const key = process.env["REVDB_API_KEY"];
  if (!key) throw new Error("Backend key is not configured");
  return { "x-api-key": key, "content-type": "application/json", accept: "application/json" };
}

async function call(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, { ...init, headers: headers() });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json: json as Record<string, unknown> | null };
}

export type RevRecord = Record<string, unknown> & { id?: string };

export async function rdList<T = RevRecord>(db: string, name: string): Promise<T[]> {
  const r = await call(`/collections/${encodeURIComponent(name)}?db=${encodeURIComponent(db)}`);
  if (r.status === 404) return [];
  if (!r.ok) throw new Error(`Backend error ${r.status}`);
  const data = r.json?.["data"];
  return Array.isArray(data) ? (data as T[]) : [];
}

/** Append one record, creating the collection if it does not exist yet. */
export async function rdAppend(db: string, name: string, record: RevRecord) {
  const r = await call(`/collections/${encodeURIComponent(name)}?db=${encodeURIComponent(db)}`, {
    method: "POST",
    body: JSON.stringify(record),
  });
  if (r.ok) return;
  if (r.status === 404 || r.status === 400) {
    const existing = await rdList(db, name).catch(() => []);
    if (existing.length === 0) {
      const c = await call(`/collections`, {
        method: "POST",
        body: JSON.stringify({ name, db, database: db, data: [record] }),
      });
      if (c.ok) return;
    }
  }
  throw new Error(`Backend error ${r.status}`);
}

export async function rdReplace(db: string, name: string, records: RevRecord[]) {
  const r = await call(`/collections/${encodeURIComponent(name)}?db=${encodeURIComponent(db)}`, {
    method: "PUT",
    body: JSON.stringify(records),
  });
  if (!r.ok) throw new Error(`Backend error ${r.status}`);
}
