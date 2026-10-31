"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function IconMesh({ active, type }: { active: boolean; type: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      if (active) {
        meshRef.current.rotation.y += 0.05;
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  // A generic procedural shape representing an industry
  let geometry;
  switch (type) {
    case "Aerospace":
      geometry = <coneGeometry args={[1, 2, 4]} />;
      break;
    case "Medical":
      geometry = <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />;
      break;
    case "Automotive":
      geometry = <torusGeometry args={[1, 0.4, 16, 32]} />;
      break;
    default:
      geometry = <boxGeometry args={[1.5, 1.5, 1.5]} />;
  }

  return (
    <Float speed={2} rotationIntensity={active ? 2 : 0.5} floatIntensity={active ? 2 : 1}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {geometry}
        <meshStandardMaterial 
          color={active ? "#aa0000" : "#9ca3af"} 
          metalness={0.9} 
          roughness={0.1}
          emissive={active ? "#aa0000" : "#000000"}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

const INDUSTRIES = [
  "Aerospace",
  "Automotive",
  "Medical",
  "Robotics",
  "Oil & Gas",
  "Electronics"
];

export default function Industries3D() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="flex flex-col justify-center p-12">
        <h2 className="mb-8 font-mono text-sm font-bold uppercase tracking-widest text-primary">Select Sector</h2>
        <div className="flex flex-col gap-4">
          {INDUSTRIES.map((ind, idx) => (
            <button
              key={ind}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`text-left text-3xl font-bold uppercase transition-all ${
                activeIdx === idx ? "text-white scale-105 origin-left" : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative h-full w-full bg-zinc-900/50">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <Environment preset="studio" />
          <PresentationControls global rotation={[0, -0.2, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]}>
            <IconMesh active={true} type={INDUSTRIES[activeIdx]} />
          </PresentationControls>
        </Canvas>
      </div>
    </div>
  );
}
