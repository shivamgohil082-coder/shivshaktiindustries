"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Spindle() {
  const spindleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (spindleRef.current) {
      spindleRef.current.rotation.y += 0.5; // Fast rotation
    }
  });

  return (
    <group ref={spindleRef}>
      {/* Spindle Body */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.4, 2, 32]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#1a1a1a" />
      </mesh>
      {/* Tool */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.1, 1, 32]} />
        <meshStandardMaterial metalness={1} roughness={0.2} color="#9ca3af" />
      </mesh>
    </group>
  );
}

function Stock() {
  return (
    <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[3, 1, 2]} />
      <meshStandardMaterial metalness={0.8} roughness={0.3} color="#aa0000" />
    </mesh>
  );
}

const SERVICES = [
  { id: "01", title: "5-Axis CNC Milling", desc: "Complex geometries machined in a single setup for absolute precision." },
  { id: "02", title: "CNC Turning & Live Tooling", desc: "High-speed lathes equipped with live tooling for complete part production." },
  { id: "03", title: "Wire EDM", desc: "Micro-machining with electrical discharge for materials too hard for conventional cutting." },
  { id: "04", title: "Surface Finishing", desc: "Anodizing, passivating, and polishing to aerospace-grade aesthetic and functional standards." }
];

export default function ServiceTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (timelineRef.current) {
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any, i) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top center+=200",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Timeline */}
      <div ref={timelineRef} className="flex flex-col gap-12 border-l-2 border-zinc-800 pl-8 ml-4">
        {SERVICES.map((service, idx) => (
          <div key={idx} className="timeline-item relative">
            <div className="absolute -left-10 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-zinc-950"></div>
            <span className="mb-2 block font-mono text-sm font-bold text-primary">{service.id}</span>
            <h3 className="mb-4 text-2xl font-bold uppercase text-white">{service.title}</h3>
            <p className="text-zinc-400">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* 3D Machining Visualization */}
      <div className="sticky top-32 h-[600px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <Canvas camera={{ position: [4, 2, 4], fov: 45 }}>
          <color attach="background" args={["#0a0a0a"]} />
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 10, 5]} intensity={2} color="#ffffff" castShadow />
          <Environment preset="studio" />
          
          <PresentationControls global rotation={[0, 0.3, 0]} polar={[-0.2, 0.2]} azimuth={[-1, 1]}>
            <Spindle />
            <Stock />
            <Sparkles count={50} scale={2} size={4} speed={2} position={[0, -1, 0]} color="#ff9900" />
          </PresentationControls>
        </Canvas>
        <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-xs text-primary">
          FEED RATE: 12000 RPM<br />
          TOOLPATH: ACTIVE
        </div>
      </div>
    </div>
  );
}
