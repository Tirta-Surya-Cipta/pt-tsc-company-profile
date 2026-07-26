import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Search, Users } from "lucide-react";
import PartnerGrid from "./PartnerGrid";

export const revalidate = 0;

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "asc" },
    ],
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Partners</h1>
          <p className="text-slate-500 mt-1">
            Manage technology partners displayed on the homepage.
          </p>
        </div>

        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#59D66F] px-5 py-2.5 text-sm font-semibold text-[#071A14] hover:bg-[#46c75c] transition"
        >
          <Plus size={18} />
          Add Partner
        </Link>
      </div>

      {/* Partner Grid */}
      <PartnerGrid partners={partners} />
    </div>
  );
}
