import type { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["electrical-control"];

export const metadata: Metadata = {
  title: "Electrical & Control System Engineering | TSC",
  description:
    "Custom electrical control system engineering for industrial processes. Safe, scalable, and reliable design, integration, and deployment in Indonesia.",
  keywords: [
    "electrical control system engineering",
    "industrial control design",
    "PLC automation Indonesia",
    "PT Tirta Surya Cipta",
  ],
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/core-business/electrical-control",
  },
  openGraph: {
    title: "Electrical & Control System Engineering | TSC",
    description:
      "Custom electrical control system engineering for industrial processes. Safe, scalable, and reliable design, integration, and deployment in Indonesia.",
    url: "https://www.tirtasuryacipta.com/core-business/electrical-control",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Electrical & Control System Engineering",
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
      name: "Electrical & Control Engineering",
      item: "https://www.tirtasuryacipta.com/core-business/electrical-control",
    },
  ],
};

export default function ElectricalControlPage() {
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
      <ClientPage slug="electrical-control" />
    </>
  );
}
