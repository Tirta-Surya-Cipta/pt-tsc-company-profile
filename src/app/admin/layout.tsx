import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify } from "jsonwebtoken";

import {
    LayoutDashboard,
    FolderOpen,
    Users,
    MessageSquare,
    LogOut,
} from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();

    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
        redirect("/admin/login");
    }

    let user: any;

    try {
        user = verify(
            token,
            process.env.AUTH_SECRET!
        );
    } catch {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Header */}

            <header className="sticky top-0 z-50 border-b bg-[#071A14] text-white">

                <div className="mx-auto flex h-16 items-center justify-between px-8">

                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2"
                    >
                        <span className="text-3xl font-bold">
                            TSC
                        </span>

                        <span className="text-gray-400">
                            /
                        </span>

                        <span className="text-gray-300">
                            Admin
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">

                        <span className="text-sm text-gray-300">
                            {user.email}
                        </span>

                        <form action="/api/admin/logout" method="POST">
                            <button className="flex items-center gap-2 text-sm hover:text-red-300 transition">
                                <LogOut size={17} />
                                Logout
                            </button>
                        </form>

                    </div>

                </div>

            </header>

            {/* Body */}

            <div className="mx-auto flex">

                {/* Sidebar */}

                <aside className="w-64 border-r bg-white min-h-[calc(100vh-64px)]">

                    <nav className="space-y-1 p-5">

                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-[#59D66F]/10 hover:text-[#1F6B45]"
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/projects"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-[#59D66F]/10 hover:text-[#1F6B45]"
                        >
                            <FolderOpen size={20} />
                            Projects
                        </Link>

                        <Link
                            href="/admin/partners"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-[#59D66F]/10 hover:text-[#1F6B45]"
                        >
                            <Users size={20} />
                            Partners
                        </Link>

                        <Link
                            href="/admin/messages"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-[#59D66F]/10 hover:text-[#1F6B45]"
                        >
                            <MessageSquare size={20} />
                            Messages
                        </Link>

                    </nav>

                </aside>

                {/* Content */}

                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}