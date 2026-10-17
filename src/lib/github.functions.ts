import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/github";
const PUBLIC_GITHUB_URL = "https://api.github.com";
const GITHUB_USER = "itzmejanak";

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  updatedAt: string;
  topics: string[];
};

export const FALLBACK_GITHUB_REPOS: GithubRepo[] = [
  {
    name: "ForgeKit",
    description:
      "Turn Android into an extensible Linux development platform. ForgeKit embeds a real Termux-based POSIX runtime and adds native UI, secure .forge plugins, package management, persistent jobs, permissions, and lifecycle orchestration.",
    url: "https://github.com/itzmejanak/ForgeKit",
    language: "Kotlin",
    stars: 1,
    updatedAt: "2026-10-13T07:19:27Z",
    topics: ["android", "linux", "termux", "kotlin", "jetpack-compose"],
  },
  {
    name: "dnshero",
    description:
      "Open-source cross-platform DNS security manager with system tray integration, real-time latency benchmarking, and one-click provider switching for Linux, macOS, and Windows.",
    url: "https://github.com/itzmejanak/dnshero",
    language: "TypeScript",
    stars: 1,
    updatedAt: "2026-06-30T18:54:35Z",
    topics: ["tauri", "rust", "react", "dns"],
  },
  {
    name: "RevPlayer",
    description:
      "Modern media player application crafted with TypeScript and clean playback controls.",
    url: "https://github.com/itzmejanak/RevPlayer",
    language: "TypeScript",
    stars: 1,
    updatedAt: "2026-09-30T08:49:54Z",
    topics: ["typescript", "media-player"],
  },
  {
    name: "DEVALAYA-INFOSYS",
    description:
      "Enterprise web platform and engineering systems built with TypeScript and modern full-stack architecture.",
    url: "https://github.com/itzmejanak/DEVALAYA-INFOSYS",
    language: "TypeScript",
    stars: 1,
    updatedAt: "2025-12-14T11:52:58Z",
    topics: ["typescript", "fullstack"],
  },
  {
    name: "AITextTuner",
    description:
      "Windows desktop productivity suite for system-wide AI-powered text expansion, summarization, and custom prompt workflows.",
    url: "https://github.com/itzmejanak/AITextTuner",
    language: "C#",
    stars: 1,
    updatedAt: "2025-06-27T12:02:58Z",
    topics: ["csharp", "dotnet", "wpf", "ai"],
  },
  {
    name: "Rest-FrameWork",
    description:
      "Backend REST API services, authentication patterns, and data serialization workflows in Python.",
    url: "https://github.com/itzmejanak/Rest-FrameWork",
    language: "Python",
    stars: 1,
    updatedAt: "2025-02-03T04:34:36Z",
    topics: ["python", "django", "rest-api"],
  },
];

let repoCache: { ts: number; data: GithubRepo[] } | null = null;
const REPO_CACHE_TTL = 10 * 60 * 1000;

type RawGithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics?: string[];
};

function formatRepos(repos: RawGithubRepo[]): GithubRepo[] {
  const excluded = new Set([GITHUB_USER.toLowerCase(), "react-portfolio"]);
  return repos
    .filter((repo) => !repo.fork && !repo.archived && !excluded.has(repo.name.toLowerCase()))
    .slice(0, 6)
    .map((repo) => {
      const fallbackMatch = FALLBACK_GITHUB_REPOS.find(
        (f) => f.name.toLowerCase() === repo.name.toLowerCase(),
      );
      return {
        name: repo.name,
        description: repo.description || fallbackMatch?.description || null,
        url: repo.html_url,
        language: repo.language || fallbackMatch?.language || null,
        stars: repo.stargazers_count,
        updatedAt: repo.pushed_at,
        topics: repo.topics?.length ? repo.topics : (fallbackMatch?.topics ?? []),
      };
    });
}

export const getGithubRepos = createServerFn({ method: "GET" }).handler(async (): Promise<
  GithubRepo[]
> => {
  if (repoCache && Date.now() - repoCache.ts < REPO_CACHE_TTL) {
    return repoCache.data;
  }

  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const githubApiKey = process.env["GITHUB_API_KEY"];

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const response =
        lovableApiKey && githubApiKey
          ? await fetch(`${GATEWAY_URL}/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`, {
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${lovableApiKey}`,
                "X-Connection-Api-Key": githubApiKey,
              },
              signal: controller.signal,
            })
          : await fetch(`${PUBLIC_GITHUB_URL}/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`, {
              headers: {
                Accept: "application/vnd.github+json",
                "User-Agent": "janakdevkota-portfolio",
              },
              signal: controller.signal,
            });

      if (response.ok) {
        const raw = (await response.json()) as RawGithubRepo[];
        const formatted = formatRepos(raw);
        if (formatted.length > 0) {
          repoCache = { ts: Date.now(), data: formatted };
          return formatted;
        }
      }
    } finally {
      clearTimeout(timer);
    }
  } catch {
    // Fall back to cached or known repositories below
  }

  return repoCache?.data ?? FALLBACK_GITHUB_REPOS;
});
