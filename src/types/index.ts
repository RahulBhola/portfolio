export interface Skill {
  id: string;
  name: string;
  category: "backend" | "frontend" | "database" | "cloud";
  description: string;
  level: number;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  image?: string | { src: string; height: number; width: number };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  client?: string;
  technologies: string[];
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  badge: string;
  image?: string | { src: string; height: number; width: number };
  certificateUrl?: string;
}

export interface GitHubStats {
  publicRepos: number;
  totalCommits: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  contributions?: { date: string; count: number }[];
}

export interface AboutStat {
  label: string;
  value: string;
  icon: string;
}
