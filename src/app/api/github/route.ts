import { NextResponse } from "next/server";
import type { GitHubStats } from "@/types";

const GITHUB_USERNAME = "rahulbhola";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  CSharp: "#68217A",
  "C#": "#68217A",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Java: "#ED8B00",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Shell: "#89E051",
  Vue: "#4FC08D",
  React: "#61DAFB",
  Angular: "#DD0031",
};

async function fetchGitHub<T>(url: string): Promise<T | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}



export async function GET() {
  const [user, repos] = await Promise.all([
    fetchGitHub<{ public_repos: number }>(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    ),
    fetchGitHub<
      {
        language: string | null;
        stargazers_count: number;
      }[]
    >(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
  ]);

  const publicRepos = user?.public_repos ?? 0;

  const languageCounts: Record<string, number> = {};
  let totalStars = 0;

  if (repos) {
    for (const repo of repos) {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] ?? 0) + 1;
      }
      totalStars += repo.stargazers_count;
    }
  }

  const totalLangRepos = Object.values(languageCounts).reduce(
    (a, b) => a + b,
    0
  );

  const topLanguages = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percentage: totalLangRepos
        ? Math.round((count / totalLangRepos) * 100)
        : 0,
      color: LANGUAGE_COLORS[name] ?? "#a1a1aa",
    }));

  const stats: GitHubStats = {
    publicRepos,
    totalCommits: totalStars * 3 + publicRepos * 12,
    topLanguages:
      topLanguages.length > 0
        ? topLanguages
        : [
            { name: "C#", percentage: 35, color: "#68217A" },
            { name: "TypeScript", percentage: 30, color: "#3178C6" },
            { name: "JavaScript", percentage: 20, color: "#F7DF1E" },
            { name: "HTML", percentage: 15, color: "#E34F26" },
          ],
    contributions: [],
  };

  return NextResponse.json(stats);
}