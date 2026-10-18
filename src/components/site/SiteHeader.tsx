import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const links = [
  { label: "About", to: "/", hash: "about" },
  { label: "Work", to: "/", hash: "work" },
  { label: "Experience", to: "/experience" },
  { label: "Skills", to: "/", hash: "skill" },
  { label: "Services", to: "/", hash: "services" },
  { label: "Apps", to: "/apps" },
  { label: "E-Books", to: "/e-books" },
] as const;

function scrollToHashIfHome(pathname: string, hash?: string) {
  if (pathname === "/" && hash) {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (st) => st.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-[1320px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => {
            setOpen(false);
            if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="min-w-0 truncate font-display text-lg font-bold tracking-tight text-foreground"
        >
          JANAK<span className="text-ember">.</span>DEVKOTA
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 font-mono text-[11px] uppercase tracking-wider lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              {...("hash" in link ? { hash: link.hash } : {})}
              {...(!("hash" in link) ? { activeProps: { className: "text-ember" } } : {})}
              onClick={() => scrollToHashIfHome(pathname, "hash" in link ? link.hash : undefined)}
              className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="contact"
            onClick={() => scrollToHashIfHome(pathname, "contact")}
            className="ml-2 bg-ember px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-ember/90"
          >
            Contact
          </Link>
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          {open ? <FaTimes size={18} /> : <HiMenu size={22} />}
        </Button>
      </div>

      {open ? (
        <nav
          id="site-mobile-menu"
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background/98 px-4 py-4 font-mono text-[11px] uppercase tracking-wider backdrop-blur-lg sm:px-6 lg:hidden"
        >
          <div className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                {...("hash" in link ? { hash: link.hash } : {})}
                onClick={() => {
                  setOpen(false);
                  scrollToHashIfHome(pathname, "hash" in link ? link.hash : undefined);
                }}
                {...(!("hash" in link) ? { activeProps: { className: "text-ember" } } : {})}
                className="block border-b border-border/50 py-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/"
            hash="contact"
            onClick={() => {
              setOpen(false);
              scrollToHashIfHome(pathname, "contact");
            }}
            className="mt-4 inline-flex w-full items-center justify-center bg-ember px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-ember/90 sm:w-auto"
          >
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
