"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Globe } from "./Globe";
import { TechOrbit } from "./TechOrbit";
import { Particles } from "./Particles";
import { useIsMobile } from "@/hooks/useMediaQuery";

function SceneContent({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 6 : 5]} fov={50} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#00E5FF" />
      <pointLight position={[3, -2, -4]} intensity={0.3} color="#7C3AED" />

      <Globe />
      {!isMobile && <TechOrbit />}
      <Particles count={isMobile ? 200 : 600} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export function HeroScene() {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
