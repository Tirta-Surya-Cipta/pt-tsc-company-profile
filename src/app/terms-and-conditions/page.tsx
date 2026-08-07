import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | PT Tirta Surya Cipta",
  description:
    "Terms and conditions governing the use of PT Tirta Surya Cipta's website, including acceptable use, intellectual property, request for quote terms, and disclaimers.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-[#F7F9F8] min-h-screen">
      {/* Header */}
      <section className="bg-[#071A14] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20 text-center">
          <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Terms and Conditions
          </h1>
          <p className="text-gray-400 text-sm">
            Last Updated: August 7, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 space-y-10 text-[#1E293B] text-[15px] leading-relaxed">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">1. Introduction</h2>
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the website operated by PT Tirta Surya Cipta (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). This website provides information about our industrial solutions, engineering services, and capabilities, and facilitates communication with prospective clients and partners.
            </p>
          </section>

          {/* 2. Acceptance of Terms */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">2. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our{" "}
              <Link href="/privacy-policy" className="text-[#1F6B45] font-semibold hover:underline">
                Privacy Policy
              </Link>
              . If you do not agree with any part of these Terms, you must discontinue use of this website immediately.
            </p>
          </section>

          {/* 3. Use of Website */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">3. Use of Website</h2>
            <p>
              This website is provided for informational and business communication purposes. You may browse the website, view our services and project information, and use the contact and Request for Quote forms to communicate with us. All use must be lawful and in compliance with these Terms.
            </p>
          </section>

          {/* 4. Permitted Use */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">4. Permitted Use</h2>
            <p className="mb-3">You are permitted to use this website for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>Viewing information about our services, capabilities, and projects</li>
              <li>Submitting genuine inquiries through our contact form</li>
              <li>Submitting legitimate Request for Quote submissions</li>
              <li>Accessing publicly available content for reference purposes</li>
            </ul>
          </section>

          {/* 5. Prohibited Activities */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">5. Prohibited Activities</h2>
            <p className="mb-3">
              You agree not to engage in any of the following activities when using this website:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>Attempting to gain unauthorized access to any part of the website, its systems, or related infrastructure</li>
              <li>Attempting to bypass, circumvent, or compromise authentication or security mechanisms</li>
              <li>Conducting brute-force attacks, credential stuffing, or automated login attempts</li>
              <li>Performing injection attacks, cross-site scripting, or other techniques intended to exploit vulnerabilities</li>
              <li>Uploading malicious files, malware, viruses, or harmful content</li>
              <li>Distributing spam, unsolicited communications, or fraudulent content through website forms</li>
              <li>Using automated tools, bots, scrapers, or crawlers in a manner that places excessive load on the website</li>
              <li>Attempting denial-of-service attacks or any action intended to disrupt website availability</li>
              <li>Extracting, harvesting, or collecting data from the website in an unauthorized manner</li>
              <li>Interfering with the proper operation or functionality of the website</li>
              <li>Using the website for any illegal, harmful, or unauthorized purpose</li>
            </ul>
            <p className="mt-3">
              We reserve the right to restrict or terminate access for users who violate these terms or engage in activities that threaten the security, integrity, or availability of the website.
            </p>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">6. Intellectual Property</h2>
            <p>
              The design, layout, logo, branding, text, images, graphics, and other content on this website are protected by intellectual property rights belonging to PT Tirta Surya Cipta or their respective owners. You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from this website without prior written consent from us.
            </p>
          </section>

          {/* 7. Website Content */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">7. Website Content</h2>
            <p>
              The information provided on this website, including descriptions of our services, capabilities, core business areas, and past projects, is presented for general informational purposes. While we strive to ensure accuracy, we do not warrant that all information is complete, current, or free from errors.
            </p>
          </section>

          {/* 8. Services and Core Business */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">8. Services and Core Business</h2>
            <p>
              Information regarding our industrial solutions, engineering services, technical services, electrical and control system solutions, and project portfolio is displayed on this website as general information. Specific service offerings, technical specifications, scope, pricing, and availability are subject to direct consultation and are not binding based solely on website content.
            </p>
          </section>

          {/* 9. Request for Quote */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">9. Request for Quote</h2>
            <p className="mb-3">
              Submitting a Request for Quote through this website is an expression of interest and does not constitute:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>A purchase order or commitment to purchase</li>
              <li>A binding contract or agreement between you and PT Tirta Surya Cipta</li>
              <li>A guarantee that the company will accept or fulfill the request</li>
            </ul>
            <p className="mt-3">
              Pricing, scope of work, timeline, technical specifications, payment terms, warranty provisions, and other contractual terms will only be confirmed through separate formal communication or written agreement between the parties. We reserve the right to request additional information, clarification, or documentation regarding your submission. We also reserve the right to decline any request at our sole discretion.
            </p>
          </section>

          {/* 10. User Submitted Information */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">10. User Submitted Information</h2>
            <p>
              By submitting information through forms on this website, you represent and warrant that the information you provide is accurate, truthful, and does not infringe upon the rights of any third party. You are solely responsible for the content of your submissions. We reserve the right to discard or refuse to process submissions that contain false, misleading, or inappropriate content.
            </p>
          </section>

          {/* 11. Accuracy of Information */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">11. Accuracy of Information</h2>
            <p>
              We make reasonable efforts to ensure that the information presented on this website is accurate and up to date. However, we do not guarantee that all information is always complete, current, or free from errors. Information may be updated or changed without prior notice.
            </p>
          </section>

          {/* 12. External Links */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">12. External Links</h2>
            <p>
              This website may contain links to external websites or resources that are not operated or controlled by us. We are not responsible for the content, accuracy, privacy practices, or availability of external websites. The inclusion of any link does not imply endorsement by PT Tirta Surya Cipta.
            </p>
          </section>

          {/* 13. Disclaimer */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">13. Disclaimer</h2>
            <p>
              This website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free from harmful components.
            </p>
          </section>

          {/* 14. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">14. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, PT Tirta Surya Cipta and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of this website, including but not limited to loss of data, revenue, or business opportunities, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* 15. Website Availability */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">15. Website Availability</h2>
            <p>
              We strive to maintain the availability of this website. However, the website may experience maintenance, downtime, technical issues, or service interruptions. We do not guarantee that the website will be available at all times and shall not be liable for any inability to access the website.
            </p>
          </section>

          {/* 16. Security and Abuse */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">16. Security and Abuse</h2>
            <p>
              You agree not to engage in any activity that may compromise the security, integrity, or availability of this website or its underlying infrastructure. Any unauthorized attempt to access, disrupt, or interfere with the website may result in legal action and/or referral to appropriate authorities.
            </p>
          </section>

          {/* 17. Changes to Terms */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">17. Changes to These Terms</h2>
            <p>
              We reserve the right to modify or update these Terms at any time. Changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. Your continued use of the website after any modifications constitutes acceptance of the updated Terms. We encourage you to review these Terms periodically.
            </p>
          </section>

          {/* 18. Governing Law */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">18. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Kabupaten Bekasi, Jawa Barat, Indonesia.
            </p>
          </section>

          {/* 19. Contact */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">19. Contact Information</h2>
            <p className="mb-3">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-[#F7F9F8] rounded-xl border border-gray-100 p-6 text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-[#071A14]">PT Tirta Surya Cipta</p>
              <p>Ruko Simprug No.B2-15, Sertajaya, Kec. Cikarang Timur, Kab. Bekasi, Jawa Barat 17530</p>
              <p>Phone: +62 851 5977 5365</p>
              <p>Email: admin@tirtasuryacipta.com</p>
            </div>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#1F6B45] font-semibold hover:text-[#071A14] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Homepage
          </Link>
        </div>
      </article>
    </main>
  );
}
