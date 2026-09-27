import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/github";
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

export const getGithubRepos = createServerFn({ method: "GET" }).handler(async (): Promise<
  GithubRepo[]
> => {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const githubApiKey = process.env["GITHUB_API_KEY"];
  if (!lovableApiKey || !githubApiKey) return [];

  const response = await fetch(
    `${GATEWAY_URL}/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": githubApiKey,
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();
    console.error(`GitHub request failed [${response.status}]: ${body}`);
    return [];
  }

  const repos = (await response.json()) as Array<{
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    pushed_at: string;
    fork: boolean;
    archived: boolean;
    topics?: string[];
  }>;

  return repos
    .filter((repo) => !repo.fork && !repo.archived && repo.name.toLowerCase() !== GITHUB_USER)
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      updatedAt: repo.pushed_at,
      topics: repo.topics ?? [],
    }));
});
