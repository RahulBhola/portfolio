"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/section-heading";

function CertCard({
  cert,
  index,
}: {
  cert: (typeof CERTIFICATIONS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 20,
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
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4 + index, ease: "easeInOut" }}
        className="relative rounded-2xl border border-border bg-surface/50 overflow-hidden backdrop-blur-sm hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.06)] h-full flex flex-col"
      >
        {cert.image && (
          <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          </div>
        )}
        
        <div className="p-6 md:p-6 flex flex-col flex-grow">
          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-80 transition-opacity">
            <Award size={48} className="text-gray-800" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-accent/10 text-accent border border-accent/20 mb-3 w-fit">
              {cert.badge}
            </span>
            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
              {cert.name}
            </h3>
            <p className="text-sm text-subtext mb-1 line-clamp-2">{cert.issuer}</p>
            <p className="text-xs text-subtext/60 mb-4">{cert.year}</p>
            
            {cert.certificateUrl && (
              <a
                href={cert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors mt-auto w-fit"
              >
                View Certificate
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-secondary-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Certifications"
          subtitle="Industry-recognized credentials"
        />

        <div
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          style={{ perspective: "800px" }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
