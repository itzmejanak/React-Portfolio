import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { rdAppend, rdList, rdReplace } from "./revdb.server";
import { currentAdmin, endSession, hashPassword, requireAdmin, startSession, verifyPassword } from "./admin-auth.server";

const PORTFOLIO = "portfolio";
const ADMIN_DB = "admin";

type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

export const PUBLIC_COLLECTIONS = [
  "profile",
  "experience",
  "hero_copy",
  "social_links",
  "tabs",
  "whyChooseMe",
  "services",
  "skills",
  "projects",
  "clients",
  "contactOptions",
  "achievements",
  "footer",
  "appData",
  "pdfData",
] as const;

export const getCollection = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ name: z.enum(PUBLIC_COLLECTIONS) }).parse(d))
  .handler(async ({ data }) => {
    const rows = await rdList(PORTFOLIO, data.name);
    return rows.map(({ createdAt: _c, updatedAt: _u, ...rest }) => rest) as unknown as Array<Record<string, JsonValue>>;
  });

/* ---------------- Contact form ---------------- */

const hits = new Map<string, number[]>();
const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(150).default(""),
  message: z.string().trim().min(5, "Message is too short").max(3000),
  website: z.string().max(0).optional().default(""),
});

export const submitMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => messageSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for") ?? "anon";
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
    if (recent.length >= 5) return { ok: false, error: "Too many messages — please try again later." };
    hits.set(ip, [...recent, now]);
    await rdAppend(ADMIN_DB, "messages", {
      name: data.name,
      email: data.email,
      subject: data.subject || "(no subject)",
      message: data.message,
      status: "unread",
      receivedAt: new Date().toISOString(),
    });
    return { ok: true };
  });

/* ---------------- Admin ---------------- */

type AdminRow = { username: string; hash: string; salt: string; createdAt?: string };
const credSchema = z.object({
  username: z.string().trim().min(3).max(40).regex(/^[a-zA-Z0-9_.-]+$/),
  password: z.string().min(8).max(200),
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const admins = await rdList<AdminRow>(ADMIN_DB, "admins");
  return { hasAdmin: admins.length > 0, user: await currentAdmin() };
});

export const adminSetup = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => credSchema.parse(d))
  .handler(async ({ data }) => {
    const admins = await rdList<AdminRow>(ADMIN_DB, "admins");
    if (admins.length > 0) return { ok: false, error: "An admin already exists." };
    const { hash, salt } = await hashPassword(data.password);
    await rdAppend(ADMIN_DB, "admins", { username: data.username, hash, salt, role: "admin" });
    await startSession(data.username);
    return { ok: true };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => credSchema.parse(d))
  .handler(async ({ data }) => {
    const admins = await rdList<AdminRow>(ADMIN_DB, "admins");
    const row = admins.find((a) => a.username === data.username);
    if (!row || !(await verifyPassword(data.password, row.salt, row.hash))) {
      return { ok: false, error: "Invalid username or password." };
    }
    await startSession(row.username);
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  endSession();
  return { ok: true };
});

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read";
  receivedAt: string;
};

export const listMessages = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const rows = await rdList<MessageRow>(ADMIN_DB, "messages");
  return rows.sort((a, b) => (b.receivedAt ?? "").localeCompare(a.receivedAt ?? ""));
});

export const updateMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().min(1).max(200), action: z.enum(["read", "unread", "delete"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const rows = await rdList<MessageRow>(ADMIN_DB, "messages");
    const next =
      data.action === "delete"
        ? rows.filter((r) => r.id !== data.id)
        : rows.map((r) => (r.id === data.id ? { ...r, status: data.action } : r));
    await rdReplace(ADMIN_DB, "messages", next);
    return { ok: true };
  });

export const adminCollection = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ name: z.enum(PUBLIC_COLLECTIONS) }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    return (await rdList(PORTFOLIO, data.name)) as unknown as Array<Record<string, JsonValue>>;
  });

export const adminSaveCollection = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        name: z.enum(PUBLIC_COLLECTIONS),
        records: z.array(z.record(z.string(), z.unknown())).max(500),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const clean = data.records.map(({ createdAt: _c, updatedAt: _u, ...rest }) => rest);
    try {
      await rdReplace(PORTFOLIO, data.name, clean);
      return { ok: true as const };
    } catch (e) {
      console.error("save failed", data.name, e);
      return { ok: false as const, error: "The backend rejected the save. Please try again." };
    }
  });
