import type { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["upgrade-retrofit"];

export const metadata: Metadata = {
  title: "System Upgrade & Retrofit Services | TSC",
  description:
    "Industrial system upgrade retrofit optimization for legacy control panels, PLC modernization, drive retrofits, and plant efficiency gains.",
  keywords: [
    "system upgrade retrofit optimization",
    "control panel retrofit Indonesia",
    "PLC modernization service",
    "PT Tirta Surya Cipta",
  ],
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/core-business/upgrade-retrofit",
  },
  openGraph: {
    title: "System Upgrade & Retrofit Services | TSC",
    description:
      "Industrial system upgrade retrofit optimization for legacy control panels, PLC modernization, drive retrofits, and plant efficiency gains.",
    url: "https://www.tirtasuryacipta.com/core-business/upgrade-retrofit",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Upgrade, Retrofit & Optimization",
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
      name: "Upgrade, Retrofit & Optimization",
      item: "https://www.tirtasuryacipta.com/core-business/upgrade-retrofit",
    },
  ],
};

export default function UpgradeRetrofitPage() {
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
      <ClientPage slug="upgrade-retrofit" />
    </>
  );
}
