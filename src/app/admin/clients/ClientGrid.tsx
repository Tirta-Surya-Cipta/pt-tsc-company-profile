"use client";

import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Building2, GripVertical } from "lucide-react";

interface ClientGridProps {
  clients: Client[];
}

export default function ClientGrid({ clients }: ClientGridProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        alert(data.error || "Failed to delete client");
      }
    } catch (err) {
      alert("Failed to delete client");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <Building2 size={28} className="text-blue-400" />
        </div>
        <h3 className="text-slate-900 font-semibold text-lg mb-1">
          No clients yet
        </h3>
        <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
          Add your first client. Client logos will appear on the homepage in the
          &quot;Our Clients&quot; section.
        </p>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#59D66F] px-5 py-2.5 text-sm font-bold text-[#071A14] hover:bg-[#46c75c] transition-colors"
        >
          Add Client
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-[#59D66F]/30 transition-all group"
        >
          {/* Logo */}
          <div className="h-36 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100">
            <img
              src={client.logoUrl}
              alt={client.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 text-sm truncate">
              {client.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <GripVertical size={12} className="text-slate-400" />
              <span className="text-xs text-slate-400">
                Order: {client.displayOrder}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <Link
                href={`/admin/clients/${client.id}/edit`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <Pencil size={12} /> Edit
              </Link>

              {confirmId === client.id ? (
                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={() => handleDelete(client.id)}
                    disabled={deletingId === client.id}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors"
                  >
                    {deletingId === client.id ? "Deleting..." : "Confirm"}
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(client.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors ml-auto"
                >
                  <Trash2 size={12} /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
