import { MetadataRoute } from "next";
import { projectRepository } from "@/server/repositories/project.repository";

/**
 * Next.js XML Sitemap generation containing static public routes, core business services, and dynamic projects
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.tirtasuryacipta.com";

  // Priority static routes
  const mainRoutes = [
    { route: "", priority: 1.0, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Core business service pages (high priority business landing pages)
  const coreBusinessRoutes = [
    "/core-business/electrical-control",
    "/core-business/panel-manufacturing",
    "/core-business/technical-service",
    "/core-business/commissioning",
    "/core-business/inverter-vsd",
    "/core-business/upgrade-retrofit",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Dynamic project routes from database repository
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await projectRepository.findAll();
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch projects for sitemap:", error);
  }

  return [...mainRoutes, ...coreBusinessRoutes, ...projectRoutes];
}
