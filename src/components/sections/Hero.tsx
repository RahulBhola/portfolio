"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, FolderOpen, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { scrollToSection } from "@/lib/utils";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-background" /> }
);

export function Hero() {
  const nameParts = PROFILE.name.toUpperCase().split(" ");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-[1]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm md:text-base text-accent font-medium tracking-widest uppercase"
          >
            {PROFILE.specialization}
          </motion.p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
            {nameParts.map((part, i) => (
              <motion.span
                key={part}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block bg-gradient-to-r from-foreground via-foreground to-subtext bg-clip-text text-transparent"
              >
                {part}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-lg md:text-xl text-foreground font-medium">
              {PROFILE.role}
            </p>
            <p className="text-base md:text-lg text-subtext">
              {PROFILE.subtitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-sm text-subtext/80 max-w-xl mx-auto"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <MagneticButton
              variant="default"
              size="lg"
              onClick={() => window.open(PROFILE.resumeUrl, "_blank")}
            >
              <Download size={18} />
              Download Resume
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection("#projects")}
            >
              <FolderOpen size={18} />
              View Projects
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#contact")}
            >
              <Mail size={18} />
              Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-subtext/60 tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
