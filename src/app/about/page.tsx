"use client";

import { FadeUp } from "@/components/shared/FadeUp";
import { CapabilitiesGrid } from "@/components/capabilities/CapabilitiesGrid";
import { ServiceProcess } from "@/components/capabilities/ServiceProcess";
import CtaBanner from '@/components/shared/CtaBanner';
import { Settings, Zap, Headphones, Target, Shield, CheckCircle2, MessageCircle, ArrowRight, Eye, Target as TargetMission } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 bg-[#071A14] overflow-hidden min-h-[85vh] flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/90 via-[#071A14]/80 to-[#071A14]/30 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/about-hero.webp')" }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 items-center w-full">
          <div className="flex-1 text-white">
            <FadeUp>
              <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">ABOUT US</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                PT Tirta Surya Cipta
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mb-10">
                PT Tirta Surya Cipta (TSC) is an industrial solution provider specializing in automation systems, control panel manufacturing, inverter & VSD, and electrical installations. We are commited to deliver high-quality solutions that improve productivity and support industrial growth.
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1F6B45]/40 border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                    <Settings size={18} className="text-[#59D66F]" />
                  </div>
                  <span className="text-sm font-semibold text-white max-w-[120px] leading-snug">Automation &<br />Control Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1F6B45]/40 border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                    <Zap size={18} className="text-[#59D66F]" />
                  </div>
                  <span className="text-sm font-semibold text-white max-w-[120px] leading-snug">VSD / Inverter<br />Implementation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1F6B45]/40 border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                    <Headphones size={18} className="text-[#59D66F]" />
                  </div>
                  <span className="text-sm font-semibold text-white max-w-[120px] leading-snug">Technical Support<br />& Commissioning</span>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="flex-1 w-full hidden lg:block">
            {/* Kept empty on purpose so the background image shows through, or we could add a floating image if available. */}
          </div>
        </div>
      </section>

      {/* ══ COMPANY OVERVIEW & VISION/MISSION ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

          <FadeUp className="flex flex-col">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Company Overview</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-5 leading-tight">
              Delivering Industrial Automation Solutions Built Around Reliability and Long-Term Performance
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-8">
              Our expertise combines engineering experience, technical capability, and a commitment to quality to deliver reliable solutions that improve industrial performance.
            </p>
            <div>
              <Link href="#capabilities" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1F6B45] text-white text-sm font-semibold hover:bg-[#1a5a3a] transition-colors mb-10">
                Our Capabilities <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
              {[
                { icon: Target, label: "Customer Focused" },
                { icon: Shield, label: "Quality Driven" },
                { icon: Settings, label: "Solution Oriented" },
                { icon: CheckCircle2, label: "Long-term Partnership" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <item.icon size={28} className="text-[#1F6B45] stroke-[1.5px]" />
                  <span className="text-xs font-semibold text-[#1E293B]">{item.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <div className="flex flex-col gap-6">
            <FadeUp delay={100} className="bg-[#F7F9F8] p-8 rounded-2xl border border-gray-100 flex gap-6">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#59D66F]/40 flex items-center justify-center shrink-0 shadow-sm">
                <Eye size={26} className="text-[#1F6B45]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E293B] mb-2">Our Vision</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  To become a leading industrial solution provider in Indonesia for drives, automation, system integration, and technical services.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={200} className="bg-[#F7F9F8] p-8 rounded-2xl border border-gray-100 flex gap-6">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#59D66F]/40 flex items-center justify-center shrink-0 shadow-sm">
                <TargetMission size={26} className="text-[#1F6B45]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E293B] mb-2">Our Mission</h3>
                <ul className="text-[#6B7280] text-sm leading-relaxed space-y-2 list-disc pl-4">
                  <li>To deliver reliable and efficient industrial solutions for our customers</li>
                  <li>To provide strong engineering support and responsive technical service</li>
                  <li>To build long-term customer partnerships through trust, quality, and performance</li>
                  <li>To continuously improve our capability in industrial drive and automation technology</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ DIRECTOR MESSAGE ══ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 items-center">
          <FadeUp className="flex-1 w-full relative h-[400px] rounded-2xl overflow-hidden bg-gray-100">
            {/* Placeholder for director image */}
            <div className="absolute inset-0 bg-[url('/images/about-director.webp')] bg-cover bg-center" />
          </FadeUp>
          <div className="flex-1">
            <FadeUp delay={150}>
              <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">DIRECTOR MESSAGE</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-6 leading-tight">
                Committed to excellence,<br />Focused on Your Success
              </h2>
              <blockquote className="text-[#6B7280] text-base leading-relaxed italic border-l-4 border-[#59D66F] pl-5 py-1 mb-8">
                "Our commitment has always been to deliver solutions that truly solve our client's challenges. We believe that engineering is not just about technology, but it is about understanding needs, creating value, and building long-term partnership.
                <br /><br />
                We will continue to invest in our people, technology, and processes so we can provide solutions you can rely on, today and in the future."
              </blockquote>
              <div>
                <h4 className="text-[#1F6B45] font-bold text-lg">Rizky Rachmadi</h4>
                <p className="text-[#6B7280] text-sm font-medium">Director</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES ══ */}
      <section id="capabilities" className="py-24 bg-[#071A14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Left Column: Heading */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <FadeUp>
                <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">Capabilities</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                  End-to-End<br />Industrial Solutions
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  We provide comprehensive solutions across a wide range of industrial applications, backed by strong engineering expertise.
                </p>
                <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#59D66F] bg-[#59D66F] text-[#071A14] text-sm font-semibold hover:bg-transparent hover:text-[#59D66F] transition-colors self-start">
                  View All Capabilities <ArrowRight size={14} />
                </Link>
              </FadeUp>
            </div>

            {/* Right Column: Cards Grid */}
            <div className="lg:col-span-2 border border-[#2E8B57]/30 rounded-2xl overflow-hidden bg-[#071A14]/50">
              <CapabilitiesGrid />
            </div>

          </div>
        </div>
      </section>

      {/* ══ SERVICE PROCESS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="text-center mb-16">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">OUR SERVICE PROCESS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">A Structured Approach. Consistent Results.</h2>
          </FadeUp>

          <ServiceProcess />
        </div>
      </section>

      <CtaBanner
        heading="Let’s Build Reliable Solutions for Your Industry"
        subtext="We’re ready to understand your needs and deliver the right automation and electrical solutions for your operations."
      />
    </main>
  );
}