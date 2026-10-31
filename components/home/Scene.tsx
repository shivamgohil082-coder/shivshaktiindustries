"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SpliceConnector() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Use standard window scroll
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Interpolate rotation and position based on scroll progress
      const targetRotationY = progress * Math.PI * 4;
      const targetPositionY = -progress * 15 + 2;
      const targetRotationX = Math.sin(progress * Math.PI) * 0.5;

      // Smoothly interpolate towards target
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetPositionY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
    }
  });

  const aluMaterial = <meshStandardMaterial metalness={0.9} roughness={0.2} color="#cccccc" />;
  const steelMaterial = <meshStandardMaterial metalness={0.8} roughness={0.3} color="#999999" />;
  const copperMaterial = <meshStandardMaterial metalness={1} roughness={0.4} color="#b87333" />;
  const insulationMaterial = <meshStandardMaterial metalness={0.1} roughness={0.8} color="#111111" />;

  return (
    <group ref={group} position={[0, 2, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        
        {/* Main Splice Barrel */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 4, 32]} />
          {aluMaterial}
        </mesh>
        
        {/* Hex Bolts */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 1, 6]} />
            {steelMaterial}
          </mesh>
          <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 1, 6]} />
            {steelMaterial}
          </mesh>
        </group>

        {/* Cable Left */}
        <group position={[0, -2, 0]}>
          {/* Stranded Copper */}
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.4, 2, 16]} />
            {copperMaterial}
          </mesh>
          {/* Insulation */}
          <mesh position={[0, -2.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 3, 32]} />
            {insulationMaterial}
          </mesh>
        </group>

        {/* Cable Right */}
        <group position={[0, 2, 0]}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.4, 2, 16]} />
            {copperMaterial}
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 3, 32]} />
            {insulationMaterial}
          </mesh>
        </group>

        {/* Electrical Arc Particles around the joint */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 12) * Math.PI * 2) * 1.5,
              Math.sin((i / 12) * Math.PI * 4) * 2,
              Math.sin((i / 12) * Math.PI * 2) * 1.5,
            ]}
          >
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-zinc-950 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 25]} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow color="#aa0000" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} castShadow color="#ffffff" />
        
        <Environment preset="studio" />
        
        <Sparkles count={200} scale={12} size={2} speed={0.4} color="#00ffff" opacity={0.5} />

        <SpliceConnector />
      </Canvas>
    </div>
  );
}
