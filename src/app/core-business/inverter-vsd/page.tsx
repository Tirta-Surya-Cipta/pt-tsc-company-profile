import type { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["inverter-vsd"];

export const metadata: Metadata = {
  title: "Inverter & VSD Implementation Solutions | TSC",
  description:
    "Expert VSD inverter industrial implementation for process control, energy savings, motor drive integration, and building booster pumps in Indonesia.",
  keywords: [
    "VSD inverter industrial implementation",
    "variable speed drive integration",
    "inverter control panel Indonesia",
    "PT Tirta Surya Cipta",
  ],
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/core-business/inverter-vsd",
  },
  openGraph: {
    title: "Inverter & VSD Implementation Solutions | TSC",
    description:
      "Expert VSD inverter industrial implementation for process control, energy savings, motor drive integration, and building booster pumps in Indonesia.",
    url: "https://www.tirtasuryacipta.com/core-business/inverter-vsd",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Inverter / VSD Implementation",
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
      name: "Inverter & VSD Implementation",
      item: "https://www.tirtasuryacipta.com/core-business/inverter-vsd",
    },
  ],
};

export default function InverterVsdPage() {
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
      <ClientPage slug="inverter-vsd" />
    </>
  );
}
