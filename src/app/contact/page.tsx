import type { Metadata } from "next";
import ContactClientPage from "./ContactClientPage";

export const metadata: Metadata = {
  title: "Contact Us | PT Tirta Surya Cipta",
  description:
    "Get in touch with PT Tirta Surya Cipta for industrial automation inquiries, control panel integration, VSD support, and site technical service.",
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/contact",
  },
  openGraph: {
    title: "Contact Us | PT Tirta Surya Cipta",
    description:
      "Get in touch with PT Tirta Surya Cipta for industrial automation inquiries, control panel integration, VSD support, and site technical service.",
    url: "https://www.tirtasuryacipta.com/contact",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClientPage />;
}