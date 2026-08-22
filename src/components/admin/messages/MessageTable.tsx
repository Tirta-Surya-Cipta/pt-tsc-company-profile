"use client";

import Link from "next/link";
import { AdminMessage } from "@/types";
import { MessageTypeBadge } from "./MessageTypeBadge";
import { ChevronRight } from "lucide-react";

export function MessageTable({ messages }: { messages: AdminMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 py-16 text-center shadow-sm">
        <p className="text-gray-500 font-medium">No messages found.</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Sender</th>
              <th className="px-6 py-4 font-semibold">Subject</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <MessageTypeBadge type={msg.type} />
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">{msg.fullName}</p>
                  <a href={`mailto:${msg.email}`} className="text-xs text-[#1F6B45] hover:underline block">
                    {msg.email}
                  </a>
                  {msg.companyName && msg.companyName !== "-" && (
                    <p className="text-xs text-slate-500">{msg.companyName}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-700 max-w-xs truncate">{msg.subject}</p>
                  {msg.serviceType && (
                    <p className="text-xs text-slate-500">{msg.serviceType}</p>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/messages/${msg.type.toLowerCase()}/${msg.id}`}
                    className="inline-flex items-center gap-1 text-[#1F6B45] hover:text-[#59D66F] font-semibold text-sm transition"
                  >
                    View <ChevronRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {messages.map((msg) => (
          <div key={msg.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <MessageTypeBadge type={msg.type} />
                <p className="font-bold text-slate-900 mt-2">{msg.fullName}</p>
                <a href={`mailto:${msg.email}`} className="text-xs text-[#1F6B45] hover:underline block">
                  {msg.email}
                </a>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">
                {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-700 line-clamp-1">{msg.subject}</p>
            </div>
            <Link
              href={`/admin/messages/${msg.type.toLowerCase()}/${msg.id}`}
              className="inline-flex items-center justify-center w-full py-2 bg-gray-50 text-[#1F6B45] rounded-lg text-sm font-semibold border border-gray-100"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
