"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  X,
} from "lucide-react";

function decodeEntities(str?: string): string {
  if (!str) return "";
  return str
    .replace(/&amp;#x2F;/gi, "/")
    .replace(/&#x2F;/gi, "/")
    .replace(/&amp;amp;/gi, "&")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'");
}

export interface ExpandableProduct {
  id: number | string;
  name: string;
  slug?: string;
  category: string;
  material?: string;
  process?: string;
  tolerance?: string;
  description?: string;
  image: string;
  applications?: string;
  specs?: string;
  dimensions?: string;
  weight?: string;
}

interface ExpandableProductGalleryProps {
  products: ExpandableProduct[];
  title?: string;
  subtitle?: string;
}

export default function ExpandableProductGallery({
  products,
  title = "Precision Engineering Gallery",
  subtitle = "Click on any component to expand full engineering specifications, micro-tolerances, and custom manufacturing capabilities.",
}: ExpandableProductGalleryProps) {
  // Category filtering
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [modalProduct, setModalProduct] = useState<ExpandableProduct | null>(null);

  // References for smooth auto-scrolling
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Derive unique categories from products with counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const categories = useMemo(() => {
    const keys = Object.keys(categoryCounts).filter((k) => k !== "All").sort();
    return ["All", ...keys];
  }, [categoryCounts]);

  // Filter products by selected category - ALL 16 included when "All" is active
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  // Auto-scroll active card into view when activeIndex changes
  useEffect(() => {
    const activeCard = cardRefs.current[activeIndex];
    if (activeCard && containerRef.current) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }

    const activeMobileCard = mobileCardRefs.current[activeIndex];
    if (activeMobileCard && mobileContainerRef.current) {
      activeMobileCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? filteredProducts.length - 1 : prev - 1
    );
  }, [filteredProducts.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredProducts.length);
  }, [filteredProducts.length]);

  // Click-only activation: cards move and expand upon click
  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(index);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  if (!filteredProducts.length) {
    return null;
  }

  const flexTransitionClass =
    "transition-[flex,width,min-width] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const imageTransitionClass = "transition-transform duration-1000 ease-out";
  const mobileTransitionClass =
    "transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-neutral-950 to-secondary text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 rounded-3xl my-12 border border-white/10 shadow-2xl">
      {/* Background ambient glowing gradients */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles size={13} className="text-orange-400 animate-pulse" />
              Interactive Component Showcase &bull; {filteredProducts.length} Precision Products
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              {title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Sequential Step Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-full">
              <button
                onClick={handlePrev}
                aria-label="Previous component"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-600 hover:text-white text-gray-300 transition-all flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-mono font-bold text-gray-400 px-2 select-none">
                {String(activeIndex + 1).padStart(2, "0")} / {String(filteredProducts.length).padStart(2, "0")}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next component"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-600 hover:text-white text-gray-300 transition-all flex items-center justify-center"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Switcher with Counts */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={`cat-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-black/30 text-white" : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Expandable Image Gallery Container */}
      <div
        className="max-w-7xl mx-auto"
      >
        {/* Desktop / Tablet: Horizontal Flex Expandable Gallery - MOVES AND EXPANDS ON CLICK */}
        <div
          ref={containerRef}
          role="tablist"
          aria-label="Expandable Component Cards"
          className="hidden md:flex flex-row gap-2.5 lg:gap-3 h-[560px] lg:h-[620px] w-full items-stretch select-none overflow-x-auto scrollbar-none pb-2 pt-1"
        >
          {filteredProducts.map((product, index) => {
            const isActive = activeIndex === index;
            const numberLabel = String(index + 1).padStart(2, "0");
            const itemKey = `desktop-card-${product.id ?? index}-${product.name}`;

            return (
              <div
                key={itemKey}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                aria-expanded={isActive}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  flex: isActive ? 6 : 1,
                }}
                className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer ${flexTransitionClass} border ${
                  isActive
                    ? "min-w-[420px] lg:min-w-[500px] xl:min-w-[560px] border-orange-500/70 shadow-2xl shadow-black/80 ring-2 ring-orange-500/30 shrink-0"
                    : "min-w-[50px] lg:min-w-[62px] xl:min-w-[70px] border-white/10 hover:border-orange-500/40 opacity-75 hover:opacity-100 hover:shadow-lg shrink-0"
                } bg-neutral-900`}
              >
                {/* Background Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  loading={index < 3 ? "eager" : "lazy"}
                  fill
                  sizes="(max-width: 1024px) 90vw, 70vw"
                  className={`absolute inset-0 h-full w-full object-cover ${imageTransitionClass} ${
                    isActive ? "scale-105" : "scale-100 group-hover:scale-105"
                  }`}
                />

                {/* Ambient dark gradient overlays for contrast and text legibility */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20 transition-opacity duration-700 ${
                    isActive ? "opacity-95" : "opacity-85 group-hover:opacity-75"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-28" />

                {/* COLLAPSED STATE: Shows Index Number + Vertical Label + Click Indicator */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col justify-between items-center py-5 px-2 z-10 pointer-events-none">
                    <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-full flex items-center justify-center font-mono text-xs font-black bg-black/70 backdrop-blur-md text-gray-300 border border-white/20 group-hover:border-orange-500/60 group-hover:text-orange-400 group-hover:scale-105 transition-all">
                      {numberLabel}
                    </div>

                    <div className="flex flex-col items-center">
                      <span
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                        className="text-[11px] lg:text-xs font-bold uppercase tracking-widest text-gray-300/80 group-hover:text-white whitespace-nowrap line-clamp-1 max-h-56 overflow-hidden mb-2 transition-colors"
                      >
                        {product.name}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-bold text-orange-400 uppercase tracking-tighter">
                        Click
                      </span>
                    </div>
                  </div>
                )}

                {/* EXPANDED STATE - TOP BADGES */}
                {isActive && (
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-full flex items-center justify-center font-mono text-xs font-black bg-orange-600 text-white shadow-lg shadow-orange-600/40 scale-110 transition-all">
                      {numberLabel}
                    </div>

                    <div className="flex items-center gap-2 transition-all duration-700 animate-fadeIn">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-gray-300">
                        <Layers size={13} className="text-gray-400" />
                        {decodeEntities(product.category) || "CNC Machined"}
                      </span>
                    </div>
                  </div>
                )}

                {/* EXPANDED STATE - BOTTOM CONTENT */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col justify-end z-10 animate-fadeIn">
                    <div className="space-y-4 max-w-2xl">
                      {/* Sub-badge / Process */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-orange-600/90 text-white text-[11px] font-black uppercase tracking-wider shadow">
                          {decodeEntities(product.process || product.category || "Precision CNC")}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-2xl lg:text-3xl font-black uppercase text-white tracking-tight leading-tight group-hover:text-orange-400 transition-colors">
                        {decodeEntities(product.name)}
                      </h3>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View: Fluid Vertical Expandable Accordion with all 16 items - MOVES AND EXPANDS ON TAP/CLICK */}
        <div
          ref={mobileContainerRef}
          className="flex md:hidden flex-col gap-2.5 max-h-[720px] overflow-y-auto pr-1 scrollbar-none w-full"
        >
          {filteredProducts.map((product, index) => {
            const isActive = activeIndex === index;
            const numberLabel = String(index + 1).padStart(2, "0");
            const mobileItemKey = `mobile-card-${product.id ?? index}-${product.name}`;

            return (
              <div
                key={mobileItemKey}
                ref={(el) => {
                  mobileCardRefs.current[index] = el;
                }}
                onClick={() => handleCardClick(index)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer ${mobileTransitionClass} border ${
                  isActive
                    ? "h-[390px] border-orange-500/70 shadow-2xl ring-2 ring-orange-500/20 shrink-0"
                    : "h-[64px] border-white/10 hover:border-white/25 shrink-0"
                } bg-neutral-900`}
              >
                {/* Background Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  fill
                  sizes="90vw"
                  className={`absolute inset-0 h-full w-full object-cover ${imageTransitionClass} ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

                {/* Collapsed State Header on Mobile */}
                {!isActive ? (
                  <div className="relative h-full flex items-center justify-between px-4 z-10">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-black/60 border border-white/20 text-orange-400 font-mono text-xs font-bold flex items-center justify-center">
                        {numberLabel}
                      </div>
                      <span className="text-sm font-bold text-white line-clamp-1">
                        {decodeEntities(product.name)}
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400 shrink-0" />
                  </div>
                ) : (
                  /* Expanded Content on Mobile */
                  <div className="relative h-full flex flex-col justify-between p-5 z-10 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-8 rounded-full bg-orange-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow">
                        {numberLabel}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                          {decodeEntities(product.process || product.category)}
                        </span>
                        <h3 className="text-lg font-black uppercase text-white leading-tight line-clamp-2 mt-0.5">
                          {decodeEntities(product.name)}
                        </h3>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Indicator Dots for all products - CLICK TO MOVE */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-2xl mx-auto mt-8">
          {filteredProducts.map((p, idx) => (
            <button
              key={`nav-dot-${p.id ?? idx}-${idx}`}
              onClick={() => handleCardClick(idx)}
              title={p.name}
              aria-label={`Go to product ${idx + 1}: ${p.name}`}
              className={`h-2.5 transition-all duration-500 rounded-full cursor-pointer ${
                activeIndex === idx
                  ? "w-8 bg-orange-500 shadow-md shadow-orange-500/50"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Specifications Modal */}
      {modalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setModalProduct(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-neutral-900 border border-white/15 p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalProduct(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-black">
                <Image
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  fill
                  sizes="64px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  {modalProduct.category || "CNC Component"}
                </span>
                <h3 className="text-xl font-black uppercase text-white leading-snug">
                  {decodeEntities(modalProduct.name)}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
              {modalProduct.tolerance && (
                <div key="spec-tolerance" className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-gray-400 font-semibold mb-1">Micro-Tolerance</span>
                  <span className="font-mono font-bold text-orange-400 text-sm">
                    {decodeEntities(modalProduct.tolerance)}
                  </span>
                </div>
              )}
              {modalProduct.material && (
                <div key="spec-material" className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-gray-400 font-semibold mb-1">Standard Materials</span>
                  <span className="font-medium text-gray-200">
                    {decodeEntities(modalProduct.material)}
                  </span>
                </div>
              )}
              {modalProduct.process && (
                <div key="spec-process" className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-gray-400 font-semibold mb-1">Machining Process</span>
                  <span className="font-medium text-gray-200">
                    {decodeEntities(modalProduct.process)}
                  </span>
                </div>
              )}
              {modalProduct.dimensions && (
                <div key="spec-dimensions" className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-gray-400 font-semibold mb-1">Dimensions Range</span>
                  <span className="font-medium text-gray-200">
                    {modalProduct.dimensions}
                  </span>
                </div>
              )}
            </div>

            {modalProduct.description && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs text-gray-300 leading-relaxed">
                <span className="block font-bold text-white mb-1 uppercase tracking-wider">
                  Technical Overview:
                </span>
                {modalProduct.description}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setModalProduct(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Close
              </button>
              <Link
                href={`/contact?product=${encodeURIComponent(modalProduct.name)}`}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all"
              >
                Request Quotation <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
