"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  displayOrder: number;
}

export default function PartnerSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.partners) {
          setPartners(data.partners);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Don't render if loading or no partners
  if (loading) {
    return (
      <section className="py-16 bg-[#F7F9F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase">
              OUR TECHNICAL PARTNERS
            </p>
          </div>
          <div className="flex justify-center items-center gap-5">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="px-8 py-5 bg-white rounded-xl border border-gray-100 w-[280px] h-[78px] animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <section className="py-16 bg-[#F7F9F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase">
            OUR TECHNICAL PARTNERS
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 flex-wrap">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center gap-5 px-8 py-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#59D66F]/30 transition-all w-full sm:w-auto min-w-[240px]"
            >
              <div className="w-[120px] h-[48px] relative shrink-0">
                <NextImage
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="120px"
                />
              </div>
              <div className="h-8 w-px bg-gray-100 shrink-0" />
              <p className="text-[#6B7280] text-xs leading-snug max-w-[120px]">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-[#6B7280] text-xs mt-7 max-w-xl mx-auto">
          We collaborate with selected technology partners to deliver reliable
          and fit-for-purpose industrial solutions.
        </p>
      </div>
    </section>
  );
}
