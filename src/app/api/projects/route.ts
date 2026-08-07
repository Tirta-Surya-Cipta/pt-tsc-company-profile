import { NextResponse } from "next/server";
import { projectService } from "@/server/services/project.service";
import { verifyAdmin } from "@/server/auth/verify-admin";
import { clampInt } from "@/lib/security";

export const dynamic = "force-dynamic";

/**
 * Route handler for /api/projects
 */

// GET /api/projects
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawTake = searchParams.get("take");
    const rawSkip = searchParams.get("skip");

    const take = rawTake ? clampInt(parseInt(rawTake, 10), 1, 100) : undefined;
    const skip = rawSkip ? clampInt(parseInt(rawSkip, 10), 0, 10000) : undefined;

    const projects = await projectService.getAllProjects({ take, skip });
    
    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    console.error("[PROJECTS_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    await verifyAdmin();

    const body = await request.json();
    const newProject = await projectService.createProject(body);

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    if (error.message && error.message.includes("already exists")) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists" },
        { status: 409 }
      );
    }
    console.error("[PROJECTS_POST_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 400 }
    );
  }
}
