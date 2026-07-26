import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import ProjectForm from "@/components/admin/projects/ProjectForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: Props) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project || project.deletedAt) {
    notFound();
  }

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
          Edit Project
        </h1>

        <p className="mt-2 text-slate-500">
          Update project information and media.
        </p>
      </div>

      <ProjectForm
        mode="edit"
        projectId={project.id}
        initialData={{
          title: project.title,
          slug: project.slug,
          overview: project.overview,
          location: project.location,
          projectYear:
            project.projectYear.toString(),
          industryType:
            project.industryType,
          applicationType:
            project.applicationType,
          projectType:
            project.projectType,
          services: project.services,
          challenge: project.challenge,
          solution: project.solution,
          result: project.result,
          highlights:
            project.highlights,
          thumbnailImage:
            project.thumbnailImage,
          galleryImages:
            project.galleryImages,
        }}
      />

    </div>
  );
}