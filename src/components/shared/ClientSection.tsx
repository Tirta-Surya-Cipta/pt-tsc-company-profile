"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import NextImage from "next/image";
import { Shield } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
  displayOrder: number;
}

const ITEMS_PER_PAGE = 8;
const AUTO_SLIDE_INTERVAL = 5000;

export default function ClientSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.clients) {
          setClients(data.clients);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(clients.length / ITEMS_PER_PAGE));

  // Auto-slide
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, AUTO_SLIDE_INTERVAL);
  }, [totalPages]);

  useEffect(() => {
    if (totalPages > 1) {
      startAutoSlide();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalPages, startAutoSlide]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    startAutoSlide();
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-[#F7F9F8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              OUR CLIENTS
            </p>
            <div className="h-10 w-80 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-4 w-96 bg-gray-100 rounded animate-pulse mx-auto" />
          </div>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="px-8 py-5 bg-white rounded-xl border border-gray-100 w-[140px] h-[72px] animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (clients.length === 0) return null;

  // Current page items
  const startIdx = currentPage * ITEMS_PER_PAGE;
  const currentItems = clients.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <section className="py-20 bg-[#F7F9F8] relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#59D66F]/[0.03] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#1F6B45]/[0.03] translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#1F6B45]/30" />
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.25em] uppercase">
              OUR CLIENTS
            </p>
            <span className="h-px w-8 bg-[#1F6B45]/30" />
          </div>
          <h2 className="text-[#1E293B] text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We work with industry leaders and forward-thinking companies to keep
            their water systems running at their best.
          </p>
        </div>

        {/* Logo Grid / Carousel */}
        <div className="relative">
          <div
            className="flex flex-wrap justify-center items-center gap-4 transition-opacity duration-500"
            key={currentPage}
          >
            {currentItems.map((client, i) => (
              <div
                key={client.id}
                className="group flex items-center justify-center px-7 py-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#59D66F]/30 transition-all duration-300 min-w-[130px] h-[72px]"
                style={{
                  animation: `fadeSlideUp 0.4s ease ${i * 50}ms both`,
                }}
              >
                <div className="w-[100px] h-[40px] relative">
                  <NextImage
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    sizes="100px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentPage
                    ? "w-8 h-2.5 bg-[#1E293B]"
                    : "w-2.5 h-2.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#DDE9E2] flex items-center justify-center shrink-0">
              <Shield size={18} className="text-[#1F6B45]" />
            </div>
            <div>
              <p className="text-[#1E293B] text-xs font-bold tracking-wider uppercase">
                Partner for Long-Term Reliability
              </p>
              <p className="text-[#6B7280] text-xs mt-0.5">
                Let&apos;s build a more efficient and sustainable water system,
                together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
