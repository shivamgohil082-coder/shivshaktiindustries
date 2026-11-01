"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stage, Html } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

function MechanicalLug({ wireframe, exploded }: { wireframe: boolean; exploded: boolean }) {
  const group = useRef<THREE.Group>(null);
  
  // Aluminum Material
  const aluMaterial = <meshStandardMaterial metalness={0.9} roughness={0.2} color="#cccccc" wireframe={wireframe} />;
  
  // Steel Material (for bolts)
  const steelMaterial = <meshStandardMaterial metalness={0.8} roughness={0.3} color="#999999" wireframe={wireframe} />;

  // Copper Material (for wire)
  const copperMaterial = <meshStandardMaterial metalness={1} roughness={0.4} color="#b87333" wireframe={wireframe} />;

  return (
    <group ref={group} rotation={[0, Math.PI / 4, 0]}>
      {/* Main Barrel */}
      <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
        {aluMaterial}
      </mesh>

      {/* Flattened Terminal End */}
      <mesh position={[1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.4, 1.2]} />
        {aluMaterial}
      </mesh>
      {/* Rounded end of the terminal */}
      <mesh position={[1.75, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
        {aluMaterial}
      </mesh>
      {/* The hole (simulated as a dark cylinder if not using CSG, or just a torus rim) */}
      <mesh position={[1.75, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.42, 32]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Hex Bolts */}
      <group position={[-0.5, exploded ? 1.5 : 0.8, 0]}>
        {/* Bolt Head */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.4, 6]} />
          {steelMaterial}
        </mesh>
        {/* Bolt Shaft */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
          {steelMaterial}
        </mesh>
        <Html position={[0, 0.8, 0]}>
          <div className="flex items-center gap-2">

            
          </div>
        </Html>
      </group>

      <group position={[-1.5, exploded ? 1.5 : 0.8, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.4, 6]} />
          {steelMaterial}
        </mesh>
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
          {steelMaterial}
        </mesh>
      </group>

      {/* Stranded Copper Wire entering the barrel */}
      <group position={[exploded ? -4 : -3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Central Core */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.1, 3, 16]} />
          {copperMaterial}
        </mesh>
        {/* Outer Strands */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[Math.cos((i / 12) * Math.PI * 2) * 0.2, 0, Math.sin((i / 12) * Math.PI * 2) * 0.2]}
            castShadow receiveShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
            {copperMaterial}
          </mesh>
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <mesh
            key={`outer-${i}`}
            position={[Math.cos((i / 18) * Math.PI * 2) * 0.4, 0, Math.sin((i / 18) * Math.PI * 2) * 0.4]}
            castShadow receiveShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
            {copperMaterial}
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function ProductViewer() {
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);

  return (
    <div className="relative h-[360px] sm:h-[460px] md:h-[560px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="absolute right-3 top-3 z-10 flex flex-wrap sm:flex-col gap-1.5 justify-end">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`glass px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase rounded-lg transition ${wireframe ? "bg-primary text-white" : "text-zinc-400 hover:text-white"}`}
        >
          Wireframe
        </button>
        <button
          onClick={() => setExploded(!exploded)}
          className={`glass px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase rounded-lg transition ${exploded ? "bg-primary text-white" : "text-zinc-400 hover:text-white"}`}
        >
          Exploded View
        </button>
        <button
          onClick={() => setShowDimensions(!showDimensions)}
          className={`glass px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase rounded-lg transition ${showDimensions ? "bg-primary text-white" : "text-zinc-400 hover:text-white"}`}
        >
          Dimensions
        </button>
      </div>

      <Canvas shadows camera={{ position: [6, 4, 6], fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.4} />
        <Environment preset="studio" />
        
        <Stage intensity={0.5} environment="city" adjustCamera={false}>
          <MechanicalLug wireframe={wireframe} exploded={exploded} />
        </Stage>

        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.24} />
      </Canvas>
      
      {showDimensions && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8">
           <div className="h-full w-full border-2 border-dashed border-primary/30 relative">
             <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-xs text-primary">Y: 45mm</span>
             <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-primary">X: 180mm</span>
           </div>
        </div>
      )}
    </div>
  );
}
