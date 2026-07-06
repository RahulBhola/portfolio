"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, GitCommit, FolderGit2 } from "lucide-react";
import { PROFILE } from "@/data/profile";
import type { GitHubStats } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function GitHub() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        {
          icon: FolderGit2,
          label: "Repositories",
          value: stats.publicRepos.toString(),
        },
        {
          icon: GitCommit,
          label: "Commits",
          value: stats.totalCommits.toString(),
        },
        {
          icon: GitBranch,
          label: "Top Language",
          value: stats.topLanguages[0]?.name ?? "N/A",
        },
      ]
    : [];

  return (
    <section id="github" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="GitHub Activity"
          subtitle={`@${PROFILE.github} · Open source contributions`}
        />

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-surface/50 animate-pulse"
              />
            ))}
          </div>
        ) : stats ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {statCards.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="hover:border-accent/20 transition-colors h-full">
                    <CardContent className="p-6 flex items-center gap-4 h-full min-h-[100px]">
                      <stat.icon size={24} className="text-accent flex-shrink-0" />
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                        <p className="text-sm text-subtext">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {stats.topLanguages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface/50 hover:border-accent/30 transition-colors"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-sm text-foreground">{lang.name}</span>
                  <span className="text-xs text-subtext">
                    {lang.percentage}%
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-subtext">
            Unable to load GitHub stats. Visit{" "}
            <a
              href={`${PROFILE.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              github.com/{PROFILE.github}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
