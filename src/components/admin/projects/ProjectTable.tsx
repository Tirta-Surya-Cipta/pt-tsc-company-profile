"use client";

import Link from "next/link";
import { Pencil, Trash2, FolderOpen } from "lucide-react";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectTableProps {
    projects: Project[];
}

export default function ProjectTable({
    projects,
}: ProjectTableProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to move this project to trash?")) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            
            const result = await response.json();
            
            if (result.success) {
                router.refresh();
            } else {
                alert(result.error || "Failed to delete project");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting the project.");
        } finally {
            setDeletingId(null);
        }
    };

    if (projects.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white py-20">
                <div className="flex flex-col items-center gap-4">
                    <FolderOpen
                        size={42}
                        className="text-slate-300"
                    />

                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-slate-800">
                            No Projects Yet
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Click "Add Project" to create your first project.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full">

                <thead className="bg-slate-50">
                    <tr className="text-left text-sm text-slate-500">

                        <th className="px-6 py-4">
                            Project
                        </th>

                        <th className="px-6 py-4">
                            Industry
                        </th>

                        <th className="px-6 py-4">
                            Year
                        </th>

                        <th className="px-6 py-4">
                            Application
                        </th>

                        <th className="px-6 py-4">
                            Updated
                        </th>

                        <th className="px-6 py-4 text-center">
                            Action
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {projects.map((project) => (
                        <tr
                            key={project.id}
                            className="border-t hover:bg-slate-50 transition"
                        >
                            <td className="px-6 py-5">
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        {project.location}
                                    </p>
                                </div>
                            </td>

                            <td className="px-6 py-5">
                                {project.industryType}
                            </td>

                            <td className="px-6 py-5">
                                {project.projectYear}
                            </td>

                            <td className="px-6 py-5">
                                {project.applicationType}
                            </td>

                            <td className="px-6 py-5">
                                {new Date(project.updatedAt).toLocaleDateString()}
                            </td>

                            <td className="px-6 py-5">
                                <div className="flex justify-center gap-2">

                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100"
                                    >
                                        <Pencil size={18} />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        disabled={deletingId === project.id}
                                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}