"use client";

import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { PROFILE } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground">
              {PROFILE.name}
            </p>
            <p className="text-xs text-subtext mt-1">
              {PROFILE.role} · {PROFILE.specialization}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-subtext hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon width={18} height={18} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-subtext hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon width={18} height={18} />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="p-2 text-subtext hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs text-subtext">
            © {year} {PROFILE.name}. All rights reserved.
          </p>
        </div>

        <p className="text-center text-[10px] text-subtext/50 mt-8">
          Press Ctrl+` to open terminal mode
        </p>
      </div>
    </footer>
  );
}
