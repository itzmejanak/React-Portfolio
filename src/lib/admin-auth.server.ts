import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";

const COOKIE = "jd_admin";
const TTL = 60 * 60 * 8;
const enc = new TextEncoder();

const b64 = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf instanceof Uint8Array ? buf : new Uint8Array(buf))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

function secret() {
  const s = process.env["ADMIN_SESSION_SECRET"];
  if (!s) throw new Error("Session secret missing");
  return s;
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function hashPassword(password: string, saltB64?: string) {
  const salt = saltB64
    ? Uint8Array.from(atob(saltB64.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0))
    : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256);
  return { hash: b64(bits), salt: b64(salt) };
}

export async function verifyPassword(password: string, salt: string, hash: string) {
  const h = await hashPassword(password, salt);
  return safeEqual(h.hash, hash);
}

export async function startSession(username: string) {
  const payload = `${username}.${Math.floor(Date.now() / 1000) + TTL}`;
  const token = `${b64(enc.encode(payload))}.${await hmac(payload)}`;
  setCookie(COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: TTL });
}

export function endSession() {
  deleteCookie(COOKIE, { path: "/" });
}

export async function currentAdmin(): Promise<string | null> {
  const token = getCookie(COOKIE);
  if (!token) return null;
  const [p, sig] = token.split(".");
  if (!p || !sig) return null;
  let payload: string;
  try {
    payload = atob(p.replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    return null;
  }
  if (!safeEqual(await hmac(payload), sig)) return null;
  const idx = payload.lastIndexOf(".");
  const exp = Number(payload.slice(idx + 1));
  if (!exp || exp < Date.now() / 1000) return null;
  return payload.slice(0, idx);
}

export async function requireAdmin() {
  const who = await currentAdmin();
  if (!who) throw new Error("Unauthorized");
  return who;
}
