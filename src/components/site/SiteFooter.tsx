import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type Profile, type SocialHandle } from "@/lib/portfolio";
import { Icon } from "@/lib/icons";

const linkCls = "text-muted-foreground transition-colors hover:text-ember";

export function SiteFooter() {
  const { data: socials = [] } = useQuery(collectionQuery<SocialHandle>("social_links"));
  const { data: profiles } = useQuery(collectionQuery<Profile>("profile"));
  const profile = profiles?.[0];

  return (
    <footer className="border-t border-border">
       <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-display font-bold text-foreground">
            JANAK<span className="text-ember">.</span>DEVKOTA
          </p>
          <p className="mt-2 max-w-[34ch] text-sm text-muted-foreground">{profile?.tagline}</p>
          {profile ? (
             <p className="mt-3 break-words font-mono text-[11px] text-muted-foreground">
              {profile.email} · {profile.phone}
            </p>
          ) : null}
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/experience" className={linkCls}>Experience</Link></li>
            <li><Link to="/" hash="work" className={linkCls}>Selected work</Link></li>
            <li><Link to="/apps" className={linkCls}>Android apps</Link></li>
            <li><Link to="/e-books" className={linkCls}>Free e-books</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Connect</p>
          <ul className="space-y-2 text-sm">
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.link || "#"} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${linkCls}`}>
                  <Icon name={social.icon} size={14} />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
       <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 border-t border-border px-4 py-6 font-mono text-[11px] text-muted-foreground sm:px-6 lg:flex-row">
        <span>© {new Date().getFullYear()} {profile?.name ?? "Janak Devkota"}</span>
         <span className="flex flex-wrap gap-x-4 gap-y-2">
          <span>{profile?.location}</span>
          <Link to="/admin" className="transition-colors hover:text-ember">Admin</Link>
        </span>
      </div>
    </footer>
  );
}
