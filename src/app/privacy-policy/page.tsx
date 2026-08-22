import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | PT Tirta Surya Cipta",
  description:
    "Learn how PT Tirta Surya Cipta collects, uses, and protects information submitted through our website and contact forms.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.tirtasuryacipta.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | PT Tirta Surya Cipta",
    description:
      "Learn how PT Tirta Surya Cipta collects, uses, and protects information submitted through our website and contact forms.",
    url: "https://www.tirtasuryacipta.com/privacy-policy",
    siteName: "PT Tirta Surya Cipta",
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#F7F9F8] min-h-screen">
      {/* Header */}
      <section className="bg-[#071A14] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20 text-center">
          <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            LEGAL
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Privacy Policy
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
              PT Tirta Surya Cipta (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates this website to provide information about our industrial solutions, engineering services, and to facilitate communications with prospective clients and partners. This Privacy Policy explains how we collect, use, store, and protect information that you provide through this website.
            </p>
            <p className="mt-3">
              By accessing or using this website, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the practices described herein, please refrain from using this website.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">2. Information We Collect</h2>
            <p className="mb-3">
              We may collect information that you voluntarily provide when using forms on this website, including but not limited to:
            </p>

            <h3 className="text-base font-semibold text-[#1F6B45] mt-5 mb-2">a. Contact Form</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Subject of inquiry</li>
              <li>Service type of interest</li>
              <li>Message content</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1F6B45] mt-5 mb-2">b. Request for Quote Form</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>Full name</li>
              <li>Company name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Subject or project description</li>
              <li>Industry type</li>
              <li>Project location</li>
              <li>Timeline requirements</li>
              <li>Budget range</li>
              <li>Preferred contact method</li>
              <li>Services requested</li>
              <li>Additional information or project details</li>
              <li>File attachments (if provided)</li>
            </ul>
          </section>

          {/* 3. Automatically Collected Information */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">3. Technical Information</h2>
            <p>
              Certain technical information may be processed by our hosting and infrastructure providers as part of operating and securing this website. This may include standard web server logs and request metadata. We do not operate third-party analytics or advertising tracking tools on this website.
            </p>
          </section>

          {/* 4. How We Use Information */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">4. How We Use Information</h2>
            <p className="mb-3">We use the information you provide for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>Responding to your contact inquiries and messages</li>
              <li>Processing and responding to Request for Quote submissions</li>
              <li>Communicating with prospective customers regarding services and projects</li>
              <li>Understanding project requirements and scope</li>
              <li>Providing requested information about our services and capabilities</li>
              <li>Managing customer and prospect communications</li>
              <li>Maintaining website security and preventing abuse or malicious activity</li>
              <li>Ensuring proper website functionality</li>
              <li>Administrative and internal record-keeping purposes</li>
            </ul>
          </section>

          {/* 5. Request for Quote */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">5. Request for Quote</h2>
            <p>
              Information submitted through our Request for Quote form is used to understand your project requirements, evaluate the scope of potential work, and enable our team to contact you regarding your request. Submitting a Request for Quote does not automatically create a contract, agreement, or obligation on either party.
            </p>
          </section>

          {/* 6. File Attachments */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">6. File Attachments</h2>
            <p>
              If you submit file attachments through the Request for Quote form, such files may be processed and stored using our cloud infrastructure and third-party storage provider as necessary to facilitate the review of your submission.
            </p>
          </section>

          {/* 7. Data Storage */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">7. Data Storage</h2>
            <p>
              Information submitted through this website may be stored in databases and infrastructure services used to operate and maintain the website. We take reasonable measures to ensure that data is stored securely and accessed only as necessary to fulfill the purposes described in this Privacy Policy.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">8. Data Retention</h2>
            <p>
              We retain information for as long as reasonably necessary for the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by applicable law. If you wish to request deletion of your submitted information, please contact us using the details provided at the end of this policy.
            </p>
          </section>

          {/* 9. Data Sharing */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">9. Data Sharing and Third-Party Providers</h2>
            <p className="mb-3">
              We do not sell your personal information to third parties. However, your information may be processed by trusted service providers that assist us in operating this website, including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>Hosting and deployment provider</li>
              <li>Database and infrastructure provider</li>
              <li>Cloud storage and media processing provider</li>
              <li>Email delivery service provider</li>
            </ul>
            <p className="mt-3">
              These service providers are engaged solely to support the operation of the website and are expected to handle data in accordance with their respective privacy and security practices.
            </p>
          </section>

          {/* 10. Email Communication */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">10. Email Communication</h2>
            <p>
              When you submit a contact inquiry or Request for Quote, we may use the information provided to send email notifications to our internal team for the purpose of processing your request. Your contact information may be used to follow up and communicate with you regarding your inquiry or request.
            </p>
          </section>

          {/* 11. Data Security */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">11. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to help protect information submitted through this website against unauthorized access, alteration, disclosure, or destruction. However, no method of data transmission or storage is completely secure, and we cannot guarantee absolute security of your information.
            </p>
          </section>

          {/* 12. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">12. Cookies and Session Mechanisms</h2>
            <p>
              This website uses cookies and session mechanisms for authentication and security purposes related to administrative functions. These are essential for the secure operation of the website and are not used for advertising, marketing, or third-party tracking purposes.
            </p>
          </section>

          {/* 13. Third-Party Links */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">13. Third-Party Links</h2>
            <p>
              This website may contain links to external websites or services that are not operated by us. We are not responsible for the content, privacy practices, or policies of any third-party websites. We encourage you to review the privacy policies of any external sites you visit.
            </p>
          </section>

          {/* 14. User Rights */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">14. Your Rights</h2>
            <p>
              Depending on applicable law in your jurisdiction, you may have certain rights regarding the personal information you have provided to us, including the right to access, correct, or request deletion of your information. To exercise any such rights, please contact us using the information provided below.
            </p>
          </section>

          {/* 15. Children's Privacy */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">15. Children&apos;s Privacy</h2>
            <p>
              This website is not directed at or intended for use by children under the age of 18. We do not knowingly collect personal information from children. If you believe that a child has provided us with personal information, please contact us so that we can take appropriate steps.
            </p>
          </section>

          {/* 16. Changes */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">16. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 17. Contact Information */}
          <section>
            <h2 className="text-xl font-bold text-[#071A14] mb-4">17. Contact Information</h2>
            <p className="mb-3">
              If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal information, please contact us:
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
