import type { Metadata } from "next";
import QuoteClientPage from "./QuoteClientPage";

export const metadata: Metadata = {
  title: "Request a Quote | PT Tirta Surya Cipta",
  description:
    "Request a project quote for industrial automation, control panel manufacturing, VSD implementation, or field engineering services.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/quote",
  },
  openGraph: {
    title: "Request a Quote | PT Tirta Surya Cipta",
    description:
      "Request a project quote for industrial automation, control panel manufacturing, VSD implementation, or field engineering services.",
    url: "https://www.tirtasuryacipta.com/quote",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

export default function QuotePage() {
  return <QuoteClientPage />;
}
