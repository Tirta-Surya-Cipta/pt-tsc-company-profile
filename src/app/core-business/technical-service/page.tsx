import type { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["technical-service"];

export const metadata: Metadata = {
  title: "Industrial Technical Support & Field Service | TSC",
  description:
    "Responsive industrial technical support service, site maintenance, troubleshooting, and long-term service agreements for control & drive systems.",
  keywords: [
    "industrial technical support service",
    "automation field support Indonesia",
    "VSD inverter maintenance",
    "PT Tirta Surya Cipta",
  ],
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/core-business/technical-service",
  },
  openGraph: {
    title: "Industrial Technical Support & Field Service | TSC",
    description:
      "Responsive industrial technical support service, site maintenance, troubleshooting, and long-term service agreements for control & drive systems.",
    url: "https://www.tirtasuryacipta.com/core-business/technical-service",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Technical Service & Long-Term Support",
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
      name: "Technical Service",
      item: "https://www.tirtasuryacipta.com/core-business/technical-service",
    },
  ],
};

export default function TechnicalServicePage() {
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
      <ClientPage slug="technical-service" />
    </>
  );
}
