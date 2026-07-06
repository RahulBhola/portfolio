"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Skill } from "@/types";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (skill: Skill | null) => void;
}

function SkillNode({ skill, position, isSelected, onSelect }: SkillNodeProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const scale = isSelected ? 1.4 : hovered ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(isSelected ? null : skill);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <Html
        center
        distanceFactor={6}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          className="px-2 py-1 rounded-md text-[9px] font-semibold whitespace-nowrap transition-all"
          style={{
            color: isSelected || hovered ? skill.color : "#a1a1aa",
            background: "rgba(5,5,5,0.85)",
            border: `1px solid ${skill.color}${isSelected ? "80" : "30"}`,
          }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function GalaxyContent({
  skills,
  selectedSkill,
  onSelect,
}: {
  skills: Skill[];
  selectedSkill: Skill | null;
  onSelect: (skill: Skill | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const positions = skills.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    const radius = 2.5;
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi) * 0.5,
      radius * Math.cos(phi),
    ] as [number, number, number];
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#00E5FF" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#7C3AED" />

      {skills.map((skill, i) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          position={positions[i]}
          isSelected={selectedSkill?.id === skill.id}
          onSelect={onSelect}
        />
      ))}

      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </group>
  );
}

interface SkillsGalaxyProps {
  skills: Skill[];
  selectedSkill: Skill | null;
  onSelect: (skill: Skill | null) => void;
}

export function SkillsGalaxy({
  skills,
  selectedSkill,
  onSelect,
}: SkillsGalaxyProps) {
  const isMobile = useIsMobile();

  return (
    <div className="h-[400px] md:h-[500px] w-full">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, isMobile ? 5 : 4], fov: 50 }}
        gl={{ antialias: !isMobile, alpha: true }}
      >
        <Suspense fallback={null}>
          <GalaxyContent
            skills={skills}
            selectedSkill={selectedSkill}
            onSelect={onSelect}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
