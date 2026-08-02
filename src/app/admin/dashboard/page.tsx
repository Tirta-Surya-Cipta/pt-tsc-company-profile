import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify } from "jsonwebtoken";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { messageService } from "@/server/services/message.service";
import {
  FolderOpen,
  Users,
  MessageSquare,
  Plus,
  ArrowRight,
  Clock,
  LogOut,
} from "lucide-react";

// ─── Auth ─────────────────────────────────────────────────────────────────────
async function getAdminUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    
    if (!token) return null;
    
    const secret = process.env.AUTH_SECRET;
    if (!secret) return null;
    
    const payload = verify(token, secret) as {
      id: string;
      email: string;
      role: string;
    };
    return payload;
  } catch (error) {
    return null;
  }
}

export const dynamic = "force-dynamic";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function AdminDashboardPage() {
  const user = await getAdminUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  // Tarik data dari DB
  const [projects, messages, partners] = await Promise.all([
    prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    messageService.getAllMessages(),
    prisma.partner.count(),
  ]);

  const recentMessages = messages.slice(0, 5);

  const totalProjects = await prisma.project.count({
    where: { deletedAt: null },
  });
  
  const totalContacts = await prisma.contactMessage.count();
  const totalQuotes = await prisma.quoteRequest.count();
  const totalMessagesCount = totalContacts + totalQuotes;

  const stats = [
    { label: "Total Projects", value: totalProjects, icon: FolderOpen, color: "text-[#1F6B45]", bg: "bg-[#DDE9E2]", href: "/admin/projects" },
    { label: "Partners", value: partners, icon: Users, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/partners" },
    { label: "Total Messages", value: totalMessagesCount, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50", href: "/admin/messages", subtext: `${totalContacts} Contact • ${totalQuotes} Quote` },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Top bar */}
      <div className="bg-[#071A14] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg">TSC<span className="text-[#59D66F]"></span></span>
            <span className="text-gray-500 text-sm">/ Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user.email}</span>
            <form action="/api/admin/logout" method="POST">
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
                <LogOut size={14} /> Logout
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#1E293B] text-2xl font-bold">Dashboard</h1>
          <p className="text-[#6B7280] text-sm mt-1">Welcome back, {user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg, href, subtext }) => (
            <Link key={label} href={href} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-[#59D66F]/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon size={16} className={color} />
                </div>
                <ArrowRight size={14} className="text-gray-300" />
              </div>
              <p className="text-[#1E293B] text-2xl font-bold">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
              {subtext && <p className="text-[#1F6B45] bg-[#DDE9E2]/50 inline-block px-2 py-0.5 rounded text-[10px] mt-2 font-bold">{subtext}</p>}
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/admin/projects/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold hover:bg-[#4bc45e] transition-colors">
            <Plus size={15} /> Add Project
          </Link>
          <Link href="/admin/partners/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-[#1E293B] text-sm font-semibold hover:border-[#59D66F]/40 transition-colors">
            <Plus size={15} /> Add Partner
          </Link>
          <Link href="/admin/messages" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-[#1E293B] text-sm font-semibold hover:border-[#59D66F]/40 transition-colors">
            <MessageSquare size={15} /> View Messages
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-[#1E293B] font-bold text-sm">Recent Projects</h2>
              <Link href="/admin/projects" className="text-[#1F6B45] text-xs font-semibold hover:underline">
                View all
              </Link>
            </div>
            {projects.length === 0 ? (
              <div className="px-5 py-10 text-center text-[#6B7280] text-sm">
                No projects yet. <Link href="/admin/projects/new" className="text-[#1F6B45] font-semibold">Add one</Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {projects.map((project: any) => (
                  <li key={project.id}>
                    <Link href={`/admin/projects/${project.id}/edit`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-[#DDE9E2] overflow-hidden shrink-0">
                        {project.thumbnailImage && (
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${project.thumbnailImage}')` }}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1E293B] text-sm font-semibold truncate">{project.title}</p>
                        <p className="text-[#6B7280] text-xs">{project.location ?? "—"}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-[#1E293B] font-bold text-sm">Recent Messages</h2>
              <Link href="/admin/messages" className="text-[#1F6B45] text-xs font-semibold hover:underline">
                View all
              </Link>
            </div>
            {recentMessages.length === 0 ? (
              <div className="px-5 py-10 text-center text-[#6B7280] text-sm">
                No messages yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {recentMessages.map((msg: any) => (
                  <li key={msg.id}>
                    <Link href={`/admin/messages/${msg.type.toLowerCase()}/${msg.id}`} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#DDE9E2] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#1F6B45] text-xs font-bold">
                          {msg.fullName ? msg.fullName.charAt(0).toUpperCase() : "?"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[#1E293B] text-sm font-semibold truncate">{msg.fullName}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${msg.type === 'CONTACT' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {msg.type}
                          </span>
                        </div>
                        <p className="text-[#6B7280] text-xs truncate">{msg.subject}</p>
                        <p className="text-gray-400 text-[10px] mt-0.5 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}