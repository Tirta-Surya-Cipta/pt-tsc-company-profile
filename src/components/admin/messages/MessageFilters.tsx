"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Search } from "lucide-react";

export function MessageFilters({
  counts,
}: {
  counts: { all: number; contact: number; quote: number };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "ALL";
  const currentSearch = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState(currentSearch);

  const updateFilters = useCallback(
    (type: string, search: string) => {
      const params = new URLSearchParams();
      if (type && type !== "ALL") params.set("type", type);
      if (search) params.set("search", search);
      router.push(`/admin/messages?${params.toString()}`);
    },
    [router]
  );

  const handleTypeChange = (type: string) => {
    updateFilters(type, searchValue);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(currentType, searchValue);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Type Filters */}
        {(
          [
            { label: "All", value: "ALL", count: counts.all },
            { label: "Contact", value: "CONTACT", count: counts.contact },
            { label: "Quote", value: "QUOTE", count: counts.quote },
          ] as const
        ).map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleTypeChange(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              currentType === filter.value
                ? "bg-[#1F6B45] text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSearch}
        className="relative w-full sm:w-auto min-w-[250px]"
      >
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search name, company, email..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#59D66F] focus:border-transparent transition"
        />
      </form>
    </div>
  );
}
