"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AboutData } from "../data";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface AboutServiceProps {
  data: AboutData;
}

export default function AboutService({ data }: AboutServiceProps) {
  const { ref, visible } = useInView(0.08);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`mb-8 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            ABOUT THIS SERVICE
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content */}
          <div className={`space-y-5 transition-all duration-700 ease-out delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E293B] leading-tight">
              {data.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-[#59D66F] pl-4">
              {data.description}
            </p>
            <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
              {data.paragraph}
            </div>
          </div>

          {/* Right: Image + Feature Cards */}
          <div className={`space-y-6 transition-all duration-700 ease-out delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Large Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4="
              />

            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="bg-[#F7F9F8] border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-[#59D66F]/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Icon size={16} className="text-[#1F6B45]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#1E293B] leading-tight">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
