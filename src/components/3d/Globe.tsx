"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const INDIA_LAT = 20.5937;
const INDIA_LNG = 78.9629;
const USA_LAT = 37.0902;
const USA_LNG = -95.7129;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function LocationMarker({
  lat,
  lng,
  color,
  radius,
}: {
  lat: number;
  lng: number;
  color: string;
  radius: number;
}) {
  const position = latLngToVector3(lat, lng, radius + 0.02);
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    ref.current.scale.setScalar(scale);
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight color={color} intensity={2} distance={1} />
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

export function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current || isDragging) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        setIsDragging(true);
        dragRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerMove={(e) => {
        if (!isDragging || !groupRef.current) return;
        const deltaX = e.clientX - dragRef.current.x;
        const deltaY = e.clientY - dragRef.current.y;
        groupRef.current.rotation.y += deltaX * 0.005;
        groupRef.current.rotation.x += deltaY * 0.005;
        dragRef.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#0a1628"
          metalness={0.4}
          roughness={0.6}
          wireframe={false}
        />
      </Sphere>

      <Sphere args={[1.52, 32, 32]}>
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>

      <LocationMarker
        lat={INDIA_LAT}
        lng={INDIA_LNG}
        color="#00E5FF"
        radius={1.5}
      />
      <LocationMarker
        lat={USA_LAT}
        lng={USA_LNG}
        color="#7C3AED"
        radius={1.5}
      />
    </group>
  );
}
