"use client";

import * as React from "react";
import { submitQuoteRequest } from "@/actions/inbox";
import { toast } from "sonner";
import { MapPin, Mail, Phone, Clock, Loader2, MessageCircle, ArrowRight, CheckCircle2, Check, HelpCircle, Wrench, Shield, Cpu, Headphones, AlertCircle } from "lucide-react";
import Link from "next/link";
import { FadeUp } from "@/components/shared/FadeUp";
import CtaBanner from '@/components/shared/CtaBanner';

export default function ContactPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
      const res = await submitQuoteRequest(formData);
      setStatus(res);
      if (res.success) {
        toast.success(res.message || "Pesan berhasil dikirim!");
        formElement.reset();
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (err: any) {
      const errorMsg = err.message || "Terjadi kesalahan koneksi. Silakan coba lagi.";
      setStatus({ error: errorMsg });
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 bg-[#071A14] overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-gradient-to-l from-[#59D66F] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Text */}
          <div className="flex-1 text-white">
            <FadeUp>
              <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">CONTACT US</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                Let’s Discuss Your Industrial Automation Requirements
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                Talk to our team about automation systems, panel integration, inverter implementation, commissioning support, or technical service requirements. Whether you're planning a new installation or improving an existing system, we're ready to help.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold hover:bg-[#4bc45e] transition-colors">
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <a href="https://wa.me/6285159775365" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#59D66F]/50 text-[#59D66F] text-sm font-bold hover:bg-[#59D66F]/10 transition-colors">
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right Images (Mosaic) */}
          <div className="flex-1 w-full relative h-[400px]">
            <FadeUp delay={200} className="w-full h-full">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
                <div className="col-span-2 row-span-1 rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/about-hero.webp')" }} />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/vfd.webp')" }} />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/mining.webp')" }} />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ INFO CARDS ══ */}
      <section className="py-12 bg-[#F7F9F8] -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <FadeUp delay={100} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-[#59D66F]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#DDE9E2]/50 flex items-center justify-center shrink-0 border border-[#2E8B57]/20">
                <MapPin size={20} className="text-[#1F6B45]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">Workshop / Office</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">
                  Ruko simprug No.B2-15, Sertajaya, Kec. Cikarang Timur, Kab. Bekasi, Jawa Barat, 17530
                </p>
                <a
                  href="https://maps.google.com/?q=Ruko+simprug+No.B2-15,+Sertajaya,+Kec.+Cikarang+Timur,+Kab.+Bekasi,+Jawa+Barat,+17530"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1F6B45] text-xs font-semibold mt-3 inline-block hover:underline"
                >
                  View on Maps →
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={150} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-[#59D66F]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#DDE9E2]/50 flex items-center justify-center shrink-0 border border-[#2E8B57]/20">
                <Mail size={20} className="text-[#1F6B45]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">Official Email</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-3">
                  admin@tscindo.net
                </p>
                <a href="mailto:admin@tscindo.net" className="text-[#1F6B45] text-xs font-semibold inline-block hover:underline">Send Email →</a>
              </div>
            </FadeUp>

            <FadeUp delay={200} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-[#59D66F]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#DDE9E2]/50 flex items-center justify-center shrink-0 border border-[#2E8B57]/20">
                <Phone size={20} className="text-[#1F6B45]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">Call / WhatsApp</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-3">
                  +62 851 5977 5365
                </p>
                <a href="https://wa.me/6285159775365" className="text-[#1F6B45] text-xs font-semibold inline-block hover:underline">Chat on WhatsApp →</a>
              </div>
            </FadeUp>

            <FadeUp delay={250} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-[#59D66F]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#DDE9E2]/50 flex items-center justify-center shrink-0 border border-[#2E8B57]/20">
                <Clock size={20} className="text-[#1F6B45]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">Business Hour</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-3">
                  Monday - Friday<br />08.30 - 17.30 WIB (UTC+7)
                </p>
                <p className="text-[#1E293B] text-[10px] italic leading-tight">Project coordination & support response available by arrangement.</p>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══ FORM & INFO SECTION ══ */}
      <section className="py-16 bg-[#F7F9F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Left Form Area */}
            <FadeUp className="flex-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm" id="quote">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Send Us a Message</h2>
                <p className="text-[#6B7280] text-sm mb-8 leading-relaxed max-w-lg">
                  Tell us about your inquiry, project challenge, or support requirement. Our team will review your message and respond through the most relevant contact channel.
                </p>

                {/* Indikator UI Success / Error */}
                {status?.success && (
                  <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3 text-green-800 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="font-semibold">Success!</p>
                      <p>{status.message}</p>
                    </div>
                  </div>
                )}
                {status?.error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <p className="font-semibold">Error!</p>
                      <p>{status.error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Full Name <span className="text-red-500">*</span></label>
                      <input
                        name="fullName"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Company Name</label>
                      <input
                        name="companyName"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Email Address <span className="text-red-500">*</span></label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Phone / WhatsApp</label>
                      <input
                        name="phone"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Service / Inquiry Type</label>
                      <select
                        name="serviceType"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 appearance-none text-[#1E293B]"
                        defaultValue="Automation System"
                      >
                        <option value="Automation System">Automation System</option>
                        <option value="Panel Integration">Panel Integration</option>
                        <option value="Inverter / VSD">Inverter / VSD</option>
                        <option value="Technical Service">Technical Service</option>
                        <option value="Lain-lain">Other / Lain-lain</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Message / Project Notes <span className="text-red-500">*</span></label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 resize-none"
                      placeholder="Please describe your inquiry or project requirement in detail..."
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="contactConsent" name="consent" required className="w-4 h-4 rounded border-gray-300 text-[#59D66F] focus:ring-[#59D66F]" />
                    <label htmlFor="contactConsent" className="text-xs text-[#6B7280]">I agree to be contacted regarding this inquiry</label>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full md:w-auto px-8 py-3 bg-[#59D66F] text-[#071A14] font-bold text-sm rounded-lg hover:bg-[#4bc45e] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                      Submit Your Request
                    </button>
                  </div>
                </form>
              </div>
            </FadeUp>

            {/* Right Info Area */}
            <div className="lg:w-1/3 flex flex-col gap-6">

              <FadeUp delay={100} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1F6B45] flex items-center justify-center shrink-0">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B] text-base leading-tight">What can you contact us about?</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Automation system discussion and technical consultation",
                    "Panel manufacturing and integration inquiries",
                    "Inverter / VSD implementation support",
                    "Commissioning and troubleshooting coordination",
                    "General business and partnership"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#6B7280]">
                      <Check size={16} className="text-[#59D66F] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeUp>

              {/* What happens next? */}
              <FadeUp delay={150} className="bg-[#F7F9F8] rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1F6B45] flex items-center justify-center shrink-0">
                    <HelpCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B] text-base leading-tight">What happens next?</h3>
                  </div>
                </div>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px before:h-[80%] before:w-0.5 before:bg-[#59D66F]">
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/20 flex items-center justify-center shrink-0 z-10 text-[#1F6B45] text-xs font-bold">01</div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] text-xs mb-0.5">We Review Your Inquiry</h4>
                      <p className="text-[11px] text-[#6B7280] leading-relaxed">Our team reviews the details of your inquiry and technical requirements.</p>
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/20 flex items-center justify-center shrink-0 z-10 text-[#1F6B45] text-xs font-bold">02</div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] text-xs mb-0.5">Identify Contact Person</h4>
                      <p className="text-[11px] text-[#6B7280] leading-relaxed">Our team identifies the relevant engineer or specialist for your request.</p>
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/20 flex items-center justify-center shrink-0 z-10 text-[#1F6B45] text-xs font-bold">03</div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] text-xs mb-0.5">We Get Back to You</h4>
                      <p className="text-[11px] text-[#6B7280] leading-relaxed">We respond for discussion, clarification, or next steps via your preferred contact channel.</p>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={200} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#DDE9E2] flex items-center justify-center shrink-0 border border-[#2E8B57]/20">
                    <CheckCircle2 size={20} className="text-[#1F6B45]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B] text-base leading-tight">Need pricing or a project proposal?</h3>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                  If you already have a project scope, technical requirement, or site request, use our quote request form for a more structured project discussion.
                </p>
                <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#59D66F] text-[#1E293B] text-sm font-semibold hover:bg-[#59D66F] transition-colors w-full justify-center">
                  Go to Request a Quote <ArrowRight size={14} />
                </Link>
              </FadeUp>

            </div>

          </div>
        </div>
      </section>

      {/* ══ WHY TSC ══ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-10">WHY COMPANIES REACH OUT TO TSC</p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wrench, title: "Practical Engineering Discussion", desc: "We focus on practical industrial requirements, system reliability, and implementation feasibility." },
              { icon: Headphones, title: "Responsive Technical Coordination", desc: "We help coordinate project discussion, troubleshooting, and support requirements with the relevant team." },
              { icon: Shield, title: "Long-Term System Support", desc: "From implementation to after-sales support, we aim to build dependable long-term working relationship." },
              { icon: Cpu, title: "Integration-Focused Approach", desc: "Our work spans electrical control, panel integration, inverter system, and industrial automation support." }
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 100} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F7F9F8] border-2 border-gray-100 flex items-center justify-center mb-4 text-[#1F6B45]">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-[#1E293B] text-sm mb-2">{item.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed px-2">{item.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Have a Project Requirement to Discuss?"
        subtext="If you already have a defined scope, technical requirement, or planned upgrade, submit a quote request and our team wil review your project needs."
        primaryLabel="Request a Quote →"
      />

    </main>
  );
}