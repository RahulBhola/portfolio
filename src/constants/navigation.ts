export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
] as const;

export const TERMINAL_COMMANDS = {
  about: "#about",
  skills: "#skills",
  projects: "#projects",
  resume: "/resume.pdf",
  contact: "#contact",
  experience: "#experience",
  certifications: "#certifications",
  github: "#github",
  help: "help",
  clear: "clear",
} as const;
