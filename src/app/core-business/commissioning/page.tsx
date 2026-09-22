import type { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["commissioning"];

export const metadata: Metadata = {
  title: "Commissioning & Troubleshooting Services | TSC",
  description:
    "Professional industrial commissioning troubleshooting for control panels, drive systems, PLCs, and automated plant equipment in Indonesia.",
  keywords: [
    "industrial commissioning troubleshooting",
    "control panel commissioning",
    "VFD troubleshooting service",
    "PT Tirta Surya Cipta",
  ],
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/core-business/commissioning",
  },
  openGraph: {
    title: "Commissioning & Troubleshooting Services | TSC",
    description:
      "Professional industrial commissioning troubleshooting for control panels, drive systems, PLCs, and automated plant equipment in Indonesia.",
    url: "https://www.tirtasuryacipta.com/core-business/commissioning",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Commissioning & Troubleshooting",
  provider: {
    "@type": "Organization",
    name: "PT Tirta Surya Cipta",
    url: "https://www.tirtasuryacipta.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  description: pageData.hero.description,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.tirtasuryacipta.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Commissioning & Troubleshooting",
      item: "https://www.tirtasuryacipta.com/core-business/commissioning",
    },
  ],
};

export default function CommissioningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ClientPage slug="commissioning" />
    </>
  );
}
