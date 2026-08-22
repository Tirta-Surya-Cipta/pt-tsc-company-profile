'use client';
import { submitQuoteRequest } from "@/actions/inbox";
import Link from 'next/link';
import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CtaBanner from '@/components/shared/CtaBanner';
import PartnerSection from '@/components/shared/PartnerSection';
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Activity,
  Users,
  Clock,
  Monitor,
  Zap,
  Settings,
  Shield,
  Wrench,
  BarChart2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  MapPin,
} from 'lucide-react';
import { Metadata } from "next";



// ─── Scroll Animation Hook ───────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { icon: Activity, value: '15+', label: 'Projects Delivered' },
  { icon: Users, value: '2', label: 'Technology Partners' },
  { icon: Clock, value: '24/7', label: 'Technical Support Availability' },
  { icon: Monitor, value: '10+', label: 'Industrial Application Supported' },
];

const services = [
  { slug: 'electrical-control', tag: 'ELECTRICAL & CONTROL', title: 'Electrical and Control System Engineering', icon: Zap, image: '/images/home-electrical.webp', desc: 'We design reliable electrical and control systems tailored to industrial process requirements, ensuring safe, efficient, and scalable operations.' },
  { slug: 'panel-manufacturing', tag: 'PANEL MANUFACTURING', title: 'Panel Manufacturing & Integration', icon: Settings, image: '/images/home-panel.webp', desc: 'We manufacture and integrate control panels with precision, combining quality assembly, functional testing, and site-ready deployments.' },
  { slug: 'technical-service', tag: 'TECHNICAL SERVICE', title: 'Technical Service & Long-Term Support', icon: Shield, image: '/images/home-technical.webp', desc: 'We deliver responsive technical service and long-term support to help maintain peak performance and minimize downtime.' },
  { slug: 'commissioning', tag: 'COMMISSIONING', title: 'Commisioning & Troubleshooting', icon: Wrench, image: '/images/home-commissioning.webp', desc: 'We provide on-site commissioning and troubleshooting services to ensure smooth system startup and continuous reliability.' },
  { slug: 'inverter-vsd', tag: 'INVERTER & VSD SOLUTION', title: 'Inverter / VSD Implementation for Industrial Systems', icon: BarChart2, image: '/images/home-inverter.webp', desc: 'We implement inverter and VSD solutions to improve energy efficiency, process control, and equipment performance across industrial application.' },
  { slug: 'upgrade-retrofit', tag: 'UPGRADE & OPTIMIZATION', title: 'Upgrade, Retrofit, and Optimization of Existing Systems', icon: RefreshCw, image: '/images/home-upgrade.webp', desc: 'We upgrade and optimize existing installations to enhance reliability, extend equipment life, and improve overall system.' },
];

const reasons = [
  { icon: CheckCircle2, title: 'Proven Expertise', desc: 'Deep knowledge and experience across various industries and applications.' },
  { icon: Shield, title: 'Quality Assurance', desc: 'Committed to international standards and best practices in every project.' },
  { icon: Zap, title: 'End-to-End Solutions', desc: 'From product supply to commissioning and after-sales support.' },
  { icon: Clock, title: '24/7 Technical Support', desc: 'Responsive support to ensure optimal performance and minimal downtime.' },
  { icon: Users, title: 'Long-term Partnership', desc: 'Building lasting relationships based on trust, integrity, and results.' },
];

const ctaFeatures = [
  { icon: MapPin, title: 'Consultation & Site Survey', desc: 'We assess your needs on-site' },
  { icon: BarChart2, title: 'Engineering & Solution Design', desc: 'Tailored to your operational goals' },
  { icon: Activity, title: 'Support & After-Sales Service', desc: 'Reliable support for long-term operations' },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>

      {/* ══ HERO ══ */}
      <section className="relative min-h-[92vh] flex flex-col justify-center bg-[#071A14] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/home-hero.webp')", mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/95 via-[#071A14]/60 to-[#071A14]/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-0 pt-20">
          <p className="text-[#59D66F] text-xs font-bold tracking-[0.2em] uppercase mb-5 opacity-0 animate-[fadeUp_0.5s_ease_0.1s_forwards]">
            Industrial Automation Specialists
          </p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] max-w-2xl mb-5 opacity-0 animate-[fadeUp_0.6s_ease_0.25s_forwards]">
            Industrial Automation Solutions for Higher Efficiency and Reliable Operations
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8 opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]">
            We deliver integrated industrial solutions, from control systems to field services, built for performance, reliability, and long-term value.
          </p>
          <div className="flex flex-wrap gap-3 opacity-0 animate-[fadeUp_0.6s_ease_0.5s_forwards]">
            <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold hover:bg-[#4bc45e] transition-colors">
              Request a Quote
            </Link>
            <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#59D66F] text-[#59D66F] text-sm font-bold hover:bg-[#59D66F]/10 transition-colors">
              Explore Solutions
            </Link>
          </div>
        </div>

        <div className="pb-16" />
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="relative z-30 -mt-12 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-[#0d1f17] rounded-[32px] border border-[#1F6B45]/30 shadow-2xl shadow-black/40 flex flex-col sm:flex-row items-stretch overflow-hidden opacity-0 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={label} className="flex-1 flex items-center gap-4 px-7 py-5 relative">
              {i < stats.length - 1 && (
                <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-[#1F6B45]/30" />
              )}
              <div className="w-12 h-12 rounded-full border border-[#2E8B57]/50 bg-[#1F6B45]/20 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-[#59D66F]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[#59D66F] font-bold text-2xl leading-none tracking-tight">{value}</p>
                <p className="text-gray-300 text-xs mt-1 leading-snug">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="text-center mb-12">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">OUR CORE BUSINESS</p>
            <h2 className="text-[#1E293B] text-3xl sm:text-4xl font-bold mb-4">End-to-End Industrial Automation Solutions</h2>
            <p className="text-[#6B7280] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              From engineering and panel integration to commissioning and long-term support, we provide practical solutions tailored to your industrial needs.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(({ slug, tag, title, desc, icon: Icon, image }, i) => (
              <FadeUp key={title} delay={i * 70}>
                <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#59D66F]/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* image area */}
                  <div className="relative h-44 bg-[#DDE9E2] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 saturate-75 contrast-80 brightness-90"
                      style={{ backgroundImage: `url('${image}')` }}
                    />
                    {/* fallback gradient jika foto belum ada */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#DDE9E2]/60 to-[#b8d0bc]/0" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <Icon size={16} className="text-[#1F6B45]" />
                    </div>
                  </div>
                  {/* card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[#59D66F] text-[10px] font-bold tracking-[0.15em] uppercase mb-2">{tag}</p>
                    <h3 className="text-[#1E293B] font-bold text-base leading-snug mb-2">{title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed flex-1">{desc}</p>
                    <Link href={`/core-business/${slug}`} className="inline-flex items-center gap-2 mt-4 text-[#1E293B] text-sm font-semibold group/btn">
                      <span className="w-6 h-6 rounded-full border-2 border-[#1E293B]/30 flex items-center justify-center group-hover/btn:border-[#1F6B45] group-hover/btn:bg-[#1F6B45] transition-all">
                        <ChevronRight size={12} className="group-hover/btn:text-white transition-colors" />
                      </span>
                      Learn More
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY TSC ══ */}
      <section className="py-20 bg-[#F7F9F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="text-center mb-14">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">WHY INDUSTRIAL TEAMS WORK WITH TSC</p>
            <h2 className="text-[#1E293B] text-3xl sm:text-4xl font-bold">Reliable Solutions. Stronger Operations.</h2>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
            {reasons.map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 80}>
                <div className={`flex flex-col items-center text-center px-5 py-6 ${i < reasons.length - 1 ? 'lg:border-r border-gray-200' : ''}`}>
                  <div className="w-16 h-16 rounded-full border-2 border-[#2E8B57]/25 flex items-center justify-center mb-4">
                    <Icon size={26} className="text-[#1F6B45]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#1E293B] font-bold text-sm mb-2">{title}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECT ══ */}
      <section className="py-20 bg-[#F7F9F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeUp className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDE9E2] text-[#1F6B45] text-[11px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#59D66F] animate-pulse" />
              Featured Project
            </span>
          </FadeUp>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">

            {/* Banner image */}
            <FadeUp>
              <div className="group relative h-64 sm:h-80 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-110 transition-transform duration-700 saturate-60"
                  style={{ backgroundImage: "url('/images/booster-pump-home.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A14]/80 via-[#071A14]/30 to-transparent" />
                <div className="absolute bottom-5 left-6 flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#59D66F]/20 border border-[#59D66F]/40 text-[#59D66F] text-xs font-semibold backdrop-blur-sm">Building Utility</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm">VSD / Automation</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm">2025</span>
                </div>
              </div>
            </FadeUp>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

              {/* Left */}
              <FadeUp className="p-7 flex flex-col justify-between gap-6">
                <div>
                  <h2 className="text-[#1E293B] text-xl sm:text-2xl font-bold leading-snug mb-3">
                    Booster Pump System Upgrade & Automation
                  </h2>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    Upgrade and automation of an existing building water supply system to improve pressure stability, pump reliability, and operational efficiency.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '3 UNIT', label: 'Vertical Multistage Pumps' },
                    { value: 'AUTO', label: 'Pump Control System' },
                    { value: 'SS 304', label: 'Piping & Manifold' },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-[#F7F9F8] rounded-xl p-4 text-center border border-gray-100">
                      <p className="text-[#1F6B45] font-bold text-2xl leading-none mb-1">{value}</p>
                      <p className="text-[#6B7280] text-[11px] leading-snug">{label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/projects/booster-pump-system-upgrade"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1F6B45] border border-[#59D66F] text-white text-sm font-semibold hover:bg-[#59D66F] hover:text-[#1E293B] transition-colors self-start"
                >
                  View Project Details <ArrowRight size={16} />
                </Link>
              </FadeUp>

              {/* Right */}
              <FadeUp delay={120} className="p-7 flex flex-col gap-4">
                <div className="flex gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={15} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-[#1E293B] text-sm leading-relaxed">Existing booster pumps required frequent manual adjustment and provided limited control during changing water demand, affecting pressure stability and operational reliability.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Settings size={15} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-[#1E293B] text-sm leading-relaxed">Upgraded the system with a three-pump configuration, stainless steel piping and manifold integration, pressure monitoring, and an automated control panel for pump sequencing and system operation.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-[#DDE9E2]/50 border border-[#2E8B57]/20">
                  <div className="w-9 h-9 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} className="text-[#1F6B45]" />
                  </div>
                  <div>
                    <p className="text-[#1F6B45] text-xs font-bold uppercase tracking-wider mb-2">Result</p>
                    <ul className="flex flex-col gap-1.5">
                      {['More stable water pressure', 'Improved pump operation and system reliability', 'Reduced dependence on manual intervention'].map(r => (
                        <li key={r} className="flex items-start gap-2 text-sm text-[#1E293B]">
                          <span className="text-[#59D66F] font-bold shrink-0 mt-0.5">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PARTNERS ══ */}
      <PartnerSection />

      <CtaBanner
        heading="Ready to Optimize Your Industrial Systems?"
        subtext="Whether you need a system upgrade, automation solution, commissioning support, or technical consultation, our team is ready to help."
      />

    </main>
  );
}