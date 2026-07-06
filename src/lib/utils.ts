import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(href: string) {
  if (href.startsWith("#")) {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.open(href, "_blank");
  }
}
