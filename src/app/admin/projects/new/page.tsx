import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectForm from "@/components/admin/projects/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">

      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Add Project
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new company project.
        </p>
      </div>

      <ProjectForm mode="create" />

    </div>
  );
}