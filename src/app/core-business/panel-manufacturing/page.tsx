import type { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["panel-manufacturing"];

export const metadata: Metadata = {
  title: "Control Panel Manufacturing & Integration | TSC",
  description:
    "Custom control panel manufacturing integration, assembly, and testing. Built to strict quality standards for industrial drives, MCC, and PLC automation.",
  keywords: [
    "control panel manufacturing integration",
    "industrial control panel fabrication",
    "MCC panel assembly",
    "PT Tirta Surya Cipta",
  ],
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/core-business/panel-manufacturing",
  },
  openGraph: {
    title: "Control Panel Manufacturing & Integration | TSC",
    description:
      "Custom control panel manufacturing integration, assembly, and testing. Built to strict quality standards for industrial drives, MCC, and PLC automation.",
    url: "https://www.tirtasuryacipta.com/core-business/panel-manufacturing",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Panel Manufacturing & Integration",
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
      name: "Panel Manufacturing",
      item: "https://www.tirtasuryacipta.com/core-business/panel-manufacturing",
    },
  ],
};

export default function PanelManufacturingPage() {
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
      <ClientPage slug="panel-manufacturing" />
    </>
  );
}
