"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LaserScanner() {
  const laserRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (laserRef.current) {
      laserRef.current.position.z = Math.sin(t) * 2;
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 2 + Math.sin(t * 10);
    }
  });

  return (
    <group>
      {/* Scanning Object */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Laser Beam */}
      <mesh ref={laserRef} position={[0, 0, 2]}>
        <boxGeometry args={[4, 4, 0.02]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#aa0000" 
          emissive="#aa0000" 
          emissiveIntensity={2} 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function InspectionLab() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        <div className="glass px-4 py-2 font-mono text-xs text-primary">
          <span className="animate-pulse">●</span> LIVE INSPECTION: ACTIVE
        </div>
        <div className="glass px-4 py-2 font-mono text-xs text-zinc-400">
          TOLERANCE DEVIATION: <span className="text-green-500">±0.0001mm</span>
        </div>
      </div>

      <Canvas camera={{ position: [4, 2, 4], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <Environment preset="studio" />
        
        <PresentationControls global rotation={[0, 0.3, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} snap={true}>
           <LaserScanner />
        </PresentationControls>
      </Canvas>
      
      {/* HUD Elements */}
      <div className="pointer-events-none absolute inset-0 z-10 border border-primary/20">
        <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 border border-dashed border-zinc-700"></div>
        <div className="absolute left-4 bottom-4 font-mono text-xs text-zinc-500">SYS.CALIBRATION.OK</div>
        <div className="absolute right-4 bottom-4 font-mono text-xs text-zinc-500">CMM_LASER_v2.4</div>
      </div>
    </div>
  );
}
