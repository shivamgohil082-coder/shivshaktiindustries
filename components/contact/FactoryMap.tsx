"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Box, Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Truck() {
  const truckRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (truckRef.current) {
      // Simple loop animation for the truck driving around
      const t = clock.getElapsedTime() * 0.5;
      truckRef.current.position.x = Math.sin(t) * 4;
      truckRef.current.position.z = 2;
    }
  });

  return (
    <group ref={truckRef}>
      {/* Cab */}
      <mesh position={[0.6, 0.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#aa0000" />
      </mesh>
      {/* Trailer */}
      <mesh position={[-0.2, 0.3, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

export default function FactoryMap() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <Canvas shadows camera={{ position: [5, 5, 8], fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.4} />
        <directionalLight castShadow position={[5, 10, 5]} intensity={1} shadow-mapSize={[1024, 1024]} />
        <Environment preset="city" />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        {/* Factory Building */}
        <group position={[0, 1, -2]}>
          <Box args={[6, 2, 4]} castShadow receiveShadow>
            <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
          </Box>
          <Html position={[0, 2.5, 0]} center>
            <div className="glass px-3 py-1 font-bold text-white shadow-lg whitespace-nowrap">
              GLOBAL HQ
            </div>
          </Html>
        </group>

        <Truck />

        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
