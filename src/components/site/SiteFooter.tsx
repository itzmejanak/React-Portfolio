import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type Profile, type SocialHandle } from "@/lib/portfolio";
import { Icon } from "@/lib/icons";

const linkCls = "text-muted-foreground transition-colors hover:text-ember";

export function SiteFooter() {
  const { data: socials = [] } = useQuery(collectionQuery<SocialHandle>("social_links"));
  const { data: profiles } = useQuery(collectionQuery<Profile>("profile"));
  const profile = profiles?.[0];
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const isHome = pathname === "/";

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div className="col-span-2 max-lg:mb-1 lg:col-span-1">
          <p className="font-display text-lg font-bold tracking-tight text-foreground">
            JANAK<span className="text-ember">.</span>DEVKOTA
          </p>
          <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
            {profile?.tagline}
          </p>
          {!isHome && profile ? (
            <p className="mt-3 break-words font-mono text-[11px] text-muted-foreground">
              <a href={`mailto:${profile.email}`} className="hover:text-ember">
                {profile.email}
              </a>{" "}
              ·{" "}
              <a href={`tel:${profile.phone}`} className="hover:text-ember">
                {profile.phone}
              </a>
            </p>
          ) : (
            <p className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="size-1.5 rounded-full bg-ember" aria-hidden="true" />
              {profile?.headline ?? "Full-Stack Engineer"} · {profile?.location ?? "Pokhara, Nepal"}
            </p>
          )}
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ember">Explore</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" hash="work" className={linkCls}>
                Selected work
              </Link>
            </li>
            <li>
              <Link to="/experience" className={linkCls}>
                Experience
              </Link>
            </li>
            <li>
              <Link to="/apps" className={linkCls}>
                Android apps
              </Link>
            </li>
            <li>
              <Link to="/e-books" className={linkCls}>
                Free e-books
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ember">Connect</p>
          <ul className="space-y-2.5 text-sm">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2.5 ${linkCls}`}
                >
                  <Icon name={social.icon} size={14} />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border px-4 py-6 font-mono text-[11px] text-muted-foreground sm:px-6">
        <span>
          © {new Date().getFullYear()} {profile?.name ?? "Janak Devkota"}. Engineered end to end.
        </span>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className=" uppercase tracking-wider transition-colors hover:text-ember"
          >
            Back to top ↑
          </button>
          <Link to="/admin" className="uppercase tracking-wider transition-colors hover:text-ember">
            Admin
          </Link>
        </span>
      </div>
    </footer>
  );
}
