import type { Metadata } from "next";
import AboutClientPage from "./AboutClientPage";

export const metadata: Metadata = {
  title: "About Us | PT Tirta Surya Cipta",
  description:
    "Learn about PT Tirta Surya Cipta, an industrial automation solution provider specializing in control panels, VSD implementation, and site engineering.",
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/about",
  },
  openGraph: {
    title: "About Us | PT Tirta Surya Cipta",
    description:
      "Learn about PT Tirta Surya Cipta, an industrial automation solution provider specializing in control panels, VSD implementation, and site engineering.",
    url: "https://www.tirtasuryacipta.com/about",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClientPage />;
}