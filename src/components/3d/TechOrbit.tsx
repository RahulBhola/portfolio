"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const TECH_ICONS = [
  { label: "C#", color: "#68217A" },
  { label: ".NET", color: "#512BD4" },
  { label: "Azure", color: "#0078D4" },
  { label: "Angular", color: "#DD0031" },
  { label: "React", color: "#61DAFB" },
  { label: "SQL", color: "#CC2927" },
];

interface OrbitItemProps {
  label: string;
  color: string;
  radius: number;
  speed: number;
  offset: number;
}

function OrbitItem({ label, color, radius, speed, offset }: OrbitItemProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.5) * 0.3;
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          className="px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap"
          style={{
            color,
            background: "rgba(5,5,5,0.8)",
            border: `1px solid ${color}40`,
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

export function TechOrbit() {
  return (
    <group>
      {TECH_ICONS.map((tech, i) => (
        <OrbitItem
          key={tech.label}
          label={tech.label}
          color={tech.color}
          radius={2.2 + (i % 2) * 0.3}
          speed={0.3 + i * 0.05}
          offset={(i / TECH_ICONS.length) * Math.PI * 2}
        />
      ))}
    </group>
  );
}
