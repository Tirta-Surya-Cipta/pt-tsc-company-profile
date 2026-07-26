"use client";

import { FadeUp } from "@/components/shared/FadeUp";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteProcess } from "@/components/quote/QuoteProcess";
import { FileText, Users, Headphones, CheckCircle2, Shield, Settings, Activity, MessageCircle, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function QuotePage() {
  return (
    <main>
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 bg-[#071A14] overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A14] via-[#071A14]/80 to-[#071A14]/30 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-white">
            <FadeUp>
              <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">REQUEST A QUOTE</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                Tell Us About Your Project We'll Get Back to You with Solution.
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mb-10">
                Fill in the form below with your project details and requirements. Our engineering team will review your information and respond with the most relevant solution and next steps.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1F6B45]/40 border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                    <FileText size={14} className="text-[#59D66F]" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-snug">Detailed Engineering<br />Review</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1F6B45]/40 border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                    <Users size={14} className="text-[#59D66F]" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-snug">Practical & Reliable<br />Solutions</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1F6B45]/40 border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                    <Headphones size={14} className="text-[#59D66F]" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-snug">Responsive Follow-<br />up & Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1F6B45]/40 border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                    <Shield size={14} className="text-[#59D66F]" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-snug">Long-Term Project<br />Partnership</span>
                </div>
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

      {/* ══ FORM & INFO SECTION ══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Left: Form */}
            <FadeUp className="flex-[2]">
              <QuoteForm />
            </FadeUp>

            {/* Right: Info Panels */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Timeline Info */}
              <FadeUp delay={100} className="bg-[#F7F9F8] rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <h3 className="font-bold text-[#1E293B] text-base mb-6">What happens next?</h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#59D66F] before:to-transparent">

                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/20 flex items-center justify-center shrink-0 z-10 text-[#1F6B45] text-xs font-bold">01</div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] text-sm mb-1">We Review Your Request</h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">Our engineering team will review your project information and requirements carefully.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/20 flex items-center justify-center shrink-0 z-10 text-[#1F6B45] text-xs font-bold">02</div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] text-sm mb-1">We Analyze & Recommend</h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">We identify the best solution approach, scope of work, and technical considerations.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/20 flex items-center justify-center shrink-0 z-10 text-[#1F6B45] text-xs font-bold">03</div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] text-sm mb-1">We Get Back to You</h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">We respond through your preferred contact method with recommendations, next steps, and possible options.</p>
                    </div>
                  </div>

                </div>
              </FadeUp>

              {/* Checklist Info */}
              <FadeUp delay={150} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <h3 className="font-bold text-[#1E293B] text-base mb-4 leading-tight">Information that helps us provide accurate solutions</h3>
                <ul className="space-y-3">
                  {[
                    "System or equipment to be automated or upgraded",
                    "Existing challenges or issues",
                    "Project objectives / expected outcomes",
                    "Site conditions or installation environment",
                    "Preferred brands or technical preferences",
                    "Timeline or target completion"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#6B7280] leading-relaxed">
                      <Check size={14} className="text-[#59D66F] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeUp>

              {/* Contact Alt 1 */}
              <FadeUp delay={200} className="bg-[#DDE9E2]/30 rounded-2xl border border-[#2E8B57]/20 p-6 sm:p-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white border border-[#2E8B57]/20 flex items-center justify-center shrink-0 shadow-sm">
                  <FileText size={20} className="text-[#1F6B45]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] text-sm mb-2">Not sure about the scope yet?</h3>
                  <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
                    No problem. Contact our team first and we'll help you define your requirements.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1F6B45]/30 text-[#1F6B45] text-xs font-semibold hover:bg-white transition-colors bg-white/50">
                    Contact Us First <ArrowRight size={12} />
                  </Link>
                </div>
              </FadeUp>

              {/* Contact Alt 2 */}
              <FadeUp delay={250} className="bg-[#DDE9E2]/30 rounded-2xl border border-[#2E8B57]/20 p-6 sm:p-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white border border-[#2E8B57]/20 flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle size={20} className="text-[#1F6B45]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] text-sm mb-2">Prefer quick discussion?</h3>
                  <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
                    Chat with our team on WhatsApp for immediate conversation.
                  </p>
                  <a href="https://wa.me/6285159775365" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1F6B45]/30 text-[#1F6B45] text-xs font-semibold hover:bg-white transition-colors bg-white/50">
                    <MessageCircle size={12} /> Chat on WhatsApp
                  </a>
                </div>
              </FadeUp>

            </div>

          </div>
        </div>
      </section>

      {/* ══ WHY REQUEST A QUOTE ══ */}
      <section className="py-20 bg-[#F7F9F8] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">WHY REQUEST A QUOTE FROM TSC</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-12">Practical Engineering. Reliable Solutions. Long-Term Support.</h2>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { icon: Settings, title: "Engineering Expertise", desc: "We deliver practical and reliable engineering solutions tailored to your application" },
              { icon: Users, title: "Experienced Team", desc: "Our team has experience across various industrial systems and technologies" },
              { icon: Activity, title: "End-to-End Support", desc: "From design, integration, implementation to commissioning & support" },
              { icon: Shield, title: "Quality & Safety Focused", desc: "We follow engineering standards and best practices for every project" },
              { icon: CheckCircle2, title: "Long-Term Partnership", desc: "We build long-term relationships based on trust, performance, and integrity" }
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 100} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-4 shadow-sm text-[#1F6B45]">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[#1E293B] text-sm mb-2 leading-tight">{item.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed px-1">{item.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR PROJECT PROCESS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="text-center mb-14">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">OUR PROJECT PROCESS</p>
          </FadeUp>
          <QuoteProcess />
        </div>
      </section>
    </main>
  );
}
