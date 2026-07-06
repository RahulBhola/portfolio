"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { PROJECTS } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full"
    >
      <div
        className={`relative rounded-2xl border border-border bg-surface/50 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(0,229,255,0.08)] h-full flex flex-col`}
      >
        <div
          className={`h-56 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex-shrink-0`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : null}
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {!project.image && (
              <div className="grid grid-cols-2 gap-3 p-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs rounded-lg bg-background/60 border border-border/50 text-foreground backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>

        <div className="p-6 md:p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-subtext leading-relaxed mb-3 flex-grow line-clamp-2">
            {project.description}
          </p>

          {project.features && (
            <ul className="space-y-1 mb-4 text-xs">
              {project.features.slice(0, 2).map((feature) => (
                <li
                  key={feature}
                  className="text-xs text-subtext flex items-center gap-2 line-clamp-1"
                >
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-2 mt-auto">
            {project.liveUrl && (
              <Button
                variant="default"
                size="sm"
                onClick={() => window.open(project.liveUrl, "_blank")}
              >
                <ExternalLink size={14} />
                Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <GitHubIcon width={14} height={14} />
                GitHub
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="Enterprise applications and full-stack solutions"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
