"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCES } from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { createScrollAnimation } from "@/animations/gsap";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      // Ensure timeline items are visible immediately
      const items = timelineRef.current.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        (item as HTMLElement).style.opacity = "1";
      });
      
      // Try to add animations for visual enhancement
      items.forEach((item, i) => {
        createScrollAnimation(item as HTMLElement, { delay: i * 0.15 });
      });
    }
  }, []);

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="Professional journey in enterprise software"
        />

        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-secondary-accent to-transparent" />

          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="timeline-item relative pl-16 md:pl-20 pb-16 last:pb-0"
            >
              <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-[0_0_15px_rgba(0,229,255,0.5)]" />

              <motion.div
                whileHover={{ x: 4 }}
                className="rounded-xl border border-border bg-surface/50 p-6 md:p-8 backdrop-blur-sm hover:border-accent/20 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Briefcase size={20} className="text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {exp.company}
                    </h3>
                    <p className="text-accent font-medium">{exp.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4 text-sm text-subtext">
                  <span>{exp.period}</span>
                  {exp.client && (
                    <>
                      <span className="text-border">|</span>
                      <span className="text-secondary-accent font-medium">
                        {exp.client} Client
                      </span>
                    </>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {exp.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-sm text-subtext flex items-start gap-2"
                    >
                      <span className="text-accent mt-1.5 shrink-0">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full border border-border text-subtext bg-background/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
