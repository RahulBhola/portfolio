import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { Hero } from "@/components/sections/Hero";

const About = dynamic(() =>
  import("@/components/sections/About").then((m) => m.About)
);
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((m) => m.Experience)
);
const Skills = dynamic(() =>
  import("@/components/sections/Skills").then((m) => m.Skills)
);
const Projects = dynamic(() =>
  import("@/components/sections/Projects").then((m) => m.Projects)
);
const Certifications = dynamic(() =>
  import("@/components/sections/Certifications").then((m) => m.Certifications)
);
const GitHub = dynamic(() =>
  import("@/components/sections/GitHub").then((m) => m.GitHub)
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact)
);

function SectionFallback() {
  return <div className="h-32" />;
}

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GitHub />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </Providers>
  );
}
