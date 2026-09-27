import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Work", to: "/", hash: "work" },
  { label: "Experience", to: "/experience" },
  { label: "Services", to: "/", hash: "services" },
  { label: "Apps", to: "/apps" },
  { label: "E-Books", to: "/e-books" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 xl:max-w-7xl">
        <Link to="/" className="min-w-0 truncate font-display text-lg font-bold text-foreground">
          JANAK<span className="text-ember">.</span>DEVKOTA
        </Link>

        <nav className="hidden items-center gap-1 font-mono text-[11px] uppercase lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              {...("hash" in link ? { hash: link.hash } : {})}
              className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="contact"
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
          {open ? <FaTimes size={20} /> : <HiMenu size={22} />}
        </Button>
      </div>

      {open ? (
        <nav id="site-mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-4 py-4 font-mono text-[11px] uppercase sm:px-6 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              {...("hash" in link ? { hash: link.hash } : {})}
              onClick={() => setOpen(false)}
              className="block py-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block bg-ember px-4 py-3 font-semibold text-primary-foreground"
          >
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
