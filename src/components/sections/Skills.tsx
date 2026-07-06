"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { SKILLS, SKILL_CATEGORIES } from "@/data/skills";
import type { Skill } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";

const SkillsGalaxy = dynamic(
  () => import("@/components/3d/SkillsGalaxy").then((m) => m.SkillsGalaxy),
  { ssr: false, loading: () => <div className="h-[400px] md:h-[500px] w-full bg-surface/30 rounded-xl animate-pulse" /> }
);

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredSkills = activeCategory
    ? SKILLS.filter((s) => s.category === activeCategory)
    : SKILLS;

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Skills Galaxy"
          subtitle="Click a node to explore technologies"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-xs rounded-full border transition-all cursor-pointer ${
              !activeCategory
                ? "border-accent text-accent bg-accent/10"
                : "border-border text-subtext hover:border-accent/30"
            }`}
          >
            All
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-subtext hover:border-accent/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SkillsGalaxy
              skills={filteredSkills}
              selectedSkill={selectedSkill}
              onSelect={setSelectedSkill}
            />
          </div>

          <div className="relative min-h-[200px]" style={{ opacity: 1 }}>
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-xl border border-border bg-surface/50 p-6 backdrop-blur-sm"
                  style={{ minHeight: "200px" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedSkill.color }}
                    />
                    <h3 className="text-xl font-bold text-foreground">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs rounded-full border border-border text-subtext mb-4 capitalize">
                    {selectedSkill.category}
                  </span>
                  <p className="text-sm text-subtext leading-relaxed mb-6">
                    {selectedSkill.description}
                  </p>
                  <div>
                    <div className="flex justify-between text-xs text-subtext mb-2">
                      <span>Proficiency</span>
                      <span>{selectedSkill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedSkill.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-border p-6 text-center flex items-center justify-center"
                >
                  <p className="text-subtext text-sm">
                    Select a skill node to view details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
