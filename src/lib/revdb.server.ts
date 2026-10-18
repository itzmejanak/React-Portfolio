import fallbackData from "./portfolio-fallback.json";

const BASE = "https://rev-database-v2.vercel.app/api";
const DEFAULT_PORTFOLIO_KEY = "bWRjM202MXVyZ3J4ZXBnOTdvbDoxNzUzMDQxNDQ3NzE1";
const CACHE_TTL_MS = 60 * 1000;
const memoryCache = new Map<string, { ts: number; data: unknown[] }>();

function headers() {
  const key = process.env["REVDB_API_KEY"] || DEFAULT_PORTFOLIO_KEY;
  return { "x-api-key": key, "content-type": "application/json", accept: "application/json" };
}

function getFallback<T>(db: string, name: string): T[] {
  if (db !== "portfolio") return [];
  const rows = (fallbackData as Record<string, unknown>)[name];
  return Array.isArray(rows) ? (rows as T[]) : [];
}

async function call(path: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: headers(),
      signal: init.signal ?? controller.signal,
    });
    const text = await res.text();
    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
    return { ok: res.ok, status: res.status, json: json as Record<string, unknown> | null };
  } finally {
    clearTimeout(timer);
  }
}

export type RevRecord = Record<string, unknown> & { id?: string };

export async function rdList<T = RevRecord>(db: string, name: string): Promise<T[]> {
  const cacheKey = `${db}:${name}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data as T[];
  }

  try {
    const r = await call(`/collections/${encodeURIComponent(name)}?db=${encodeURIComponent(db)}`);
    if (r.status === 404) {
      const fb = getFallback<T>(db, name);
      if (fb.length > 0) return fb;
      return [];
    }
    if (!r.ok) throw new Error(`Backend error ${r.status}`);
    const data = r.json?.["data"];
    const rows = Array.isArray(data) ? (data as T[]) : [];
    if (rows.length > 0 || db !== "portfolio") {
      memoryCache.set(cacheKey, { ts: Date.now(), data: rows });
      return rows;
    }
    return getFallback<T>(db, name);
  } catch {
    if (cached) return cached.data as T[];
    if (db === "portfolio") return getFallback<T>(db, name);
    return [];
  }
}

/** Append one record, creating the collection if it does not exist yet. */
export async function rdAppend(db: string, name: string, record: RevRecord) {
  memoryCache.delete(`${db}:${name}`);
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
  memoryCache.set(`${db}:${name}`, { ts: Date.now(), data: records });
  const r = await call(`/collections/${encodeURIComponent(name)}?db=${encodeURIComponent(db)}`, {
    method: "PUT",
    body: JSON.stringify({ data: records }),
  });
  if (!r.ok) {
    memoryCache.delete(`${db}:${name}`);
    throw new Error(`Backend error ${r.status}`);
  }
}
