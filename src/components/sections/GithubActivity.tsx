import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getGithubRepos } from "@/lib/github.functions";
import { SectionHeading } from "@/components/site/SectionHeading";

export function GithubActivity() {
  const fetchRepos = useServerFn(getGithubRepos);
  const { data: repos = [] } = useQuery({
    queryKey: ["github", "repos"],
    queryFn: () => fetchRepos(),
    staleTime: 10 * 60 * 1000,
  });

  if (repos.length === 0) return null;

  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading index="07" title="Latest from GitHub" />
      <div className="grid gap-5 md:grid-cols-3">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="tilt plate flex flex-col p-6"
          >
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
              <span className="text-ember">{repo.language ?? "Repo"}</span>
              <span className="text-muted-foreground">
                {new Date(repo.updatedAt).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{repo.name}</h3>
            <p className="mt-2 line-clamp-4 text-sm text-muted-foreground text-pretty">
              {repo.description ?? "No description yet."}
            </p>
            <span className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              ★ {repo.stars}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
