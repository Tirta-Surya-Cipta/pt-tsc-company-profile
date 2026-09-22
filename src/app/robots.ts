import { MetadataRoute } from "next";

/**
 * Search Engine crawler configuration (robots.txt generation)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/quote",
        "/privacy-policy",
        "/terms-and-conditions",
      ],
    },
    sitemap: "https://www.tirtasuryacipta.com/sitemap.xml",
  };
}
