import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import ClientGrid from "./ClientGrid";

export const revalidate = 0;

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
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
          <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 mt-1">
            Manage client logos displayed on the homepage.
          </p>
        </div>

        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#59D66F] px-5 py-2.5 text-sm font-semibold text-[#071A14] hover:bg-[#46c75c] transition"
        >
          <Plus size={18} />
          Add Client
        </Link>
      </div>

      {/* Client Grid */}
      <ClientGrid clients={clients} />
    </div>
  );
}
