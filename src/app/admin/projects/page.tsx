import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Search, Pencil, Trash2, FolderOpen } from "lucide-react";
import ProjectTable from "@/components/admin/projects/ProjectTable";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Projects
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage all company projects.
                    </p>
                </div>

                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#59D66F] px-5 py-2.5 text-sm font-semibold text-[#071A14] hover:bg-[#46c75c] transition"
                >
                    <Plus size={18} />
                    Add Project
                </Link>
            </div>

            {/* Search */}

            <div className="relative max-w-sm">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                />

                <input
                    placeholder="Search project..."
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 outline-none focus:border-[#59D66F]"
                />
            </div>

            <ProjectTable projects={projects} />

        </div>
    );
}