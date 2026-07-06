"use client";

import { motion } from "framer-motion";
import { Building2, Clock, Cloud, Layers } from "lucide-react";
import { ABOUT_STATS, ABOUT_TEXT } from "@/data/about";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const ICON_MAP = {
  clock: Clock,
  building: Building2,
  cloud: Cloud,
  layers: Layers,
} as const;

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Building enterprise solutions that scale"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6 }}
            className="text-foreground text-base md:text-lg leading-relaxed"
            style={{ minHeight: "auto" }}
          >
            {ABOUT_TEXT}
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            {ABOUT_STATS.map((stat) => {
              const Icon = ICON_MAP[stat.icon as keyof typeof ICON_MAP];
              return (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="group hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.05)] h-full">
                    <CardContent className="p-6 flex flex-col items-start justify-center h-full min-h-[140px]">
                      <Icon
                        size={24}
                        className="text-accent mb-4 group-hover:scale-110 transition-transform"
                      />
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-sm text-foreground font-medium mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
