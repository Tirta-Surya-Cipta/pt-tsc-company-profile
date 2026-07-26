import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CtaBanner from '@/components/shared/CtaBanner';
import {
  Activity, Users, Clock, Monitor,
  MessageSquare, ArrowRight,
  Wrench, Settings, Headphones, Handshake, Building2,
} from 'lucide-react';

export const revalidate = 0;

const stats = [
  { icon: Activity, value: '15+', label: 'Projects Delivered' },
  { icon: Clock, value: '24/7', label: 'Technical Support Availability' },
  { icon: Users, value: '2', label: 'Technology Partners' },
  { icon: Monitor, value: '10+', label: 'Industrial Application Supported' },
];

const commitments = [
  { icon: Wrench, title: 'Practical Engineering Discussion', desc: 'Solution designed around real operational requirements rather than one-size-fits-all approaches.' },
  { icon: Settings, title: 'Quality Execution', desc: 'Careful implementation, testing, and commissioning to ensure dependable system performance.' },
  { icon: Headphones, title: 'Responsive Technical Support', desc: 'Providing technical assistance and troubleshooting throughout project implementation and beyond.' },
  { icon: Handshake, title: 'Long-Term Partnership', desc: 'Building lasting relationship through reliability, transparency, and consistent engineering support.' },
];

const tagColors: Record<string, string> = {
  'Building Utilities': 'text-emerald-600 bg-emerald-50',
  'Water Treatment': 'text-blue-600 bg-blue-50',
  'Manufacturing': 'text-amber-600 bg-amber-50',
};

export default async function ProjectsAllPage() {
  const projects = await prisma.project.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[480px] flex items-center bg-[#071A14] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/about-hero.webp')", mixBlendMode: 'luminosity' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/95 via-[#071A14]/70 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-3 opacity-0 animate-[fadeUp_0.5s_ease_0.1s_forwards]">PROJECTS</p>
              <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]">Our Projects</h1>
              <div className="w-12 h-1 bg-[#59D66F] rounded mb-4 opacity-0 animate-[fadeUp_0.6s_ease_0.25s_forwards]" />
              <p className="text-gray-300 text-sm leading-relaxed opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
                Explore our project experience across industrial and utility sectors. Each project reflects our commitment to quality engineering, reliable system integration, and long-term operational performance.
              </p>
            </div>
            <div className="w-full lg:w-auto opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]">
              <div className="grid grid-cols-2 gap-4 bg-[#0d1f17]/80 backdrop-blur-sm border border-[#1F6B45]/30 rounded-2xl p-6">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#2E8B57]/50 bg-[#1F6B45]/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#59D66F]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[#59D66F] font-bold text-xl leading-none">{value}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5 leading-snug">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
            <div className="max-w-md">
              <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">ALL PROJECTS</p>
              <h2 className="text-[#1E293B] text-3xl font-bold mb-3">Our Selected Project</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Browse our complete portfolio of completed projects. Every project reflects our commitment to quality engineering, reliable system integration, and long-term operational performance.
              </p>
            </div>
            <div className="shrink-0 w-full lg:w-[280px] border border-gray-100 rounded-xl p-5 shadow-sm bg-white">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#DDE9E2] flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-[#1F6B45]" />
                </div>
                <div>
                  <p className="text-[#1E293B] text-sm font-semibold">Have a project in mind?</p>
                  <p className="text-[#6B7280] text-xs">Let's discuss the right solution for you</p>
                </div>
              </div>
              <Link href="/quote" className="inline-flex items-center gap-1.5 text-[#1F6B45] text-sm font-semibold hover:gap-3 transition-all">
                Request a Quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 text-[#6B7280]">
              <Building2 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => {
                const thumb = project.thumbnailImage;
                const tag = project.applicationType ?? project.services ?? 'Project';
                return (
                  <div
                    key={project.id}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#59D66F]/40 hover:shadow-lg transition-all duration-300 flex flex-col"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden bg-[#DDE9E2]">
                      {thumb ? (
                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${thumb}')` }} />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1F6B45] to-[#071A14] opacity-80" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className={`inline-block self-start text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded mb-3 ${tagColors[tag] ?? 'text-[#1F6B45] bg-[#DDE9E2]'}`}>
                        {tag}
                      </span>
                      <h3 className="text-[#1E293B] font-bold text-base leading-snug mb-2">{project.title}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed flex-1 line-clamp-3">{project.overview}</p>
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <Building2 size={13} className="text-[#6B7280]" />
                          <div>
                            <p className="text-[#6B7280] text-[10px]">Industry</p>
                            <p className="text-[#1E293B] text-xs font-semibold">{project.industryType ?? '—'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Settings size={13} className="text-[#6B7280]" />
                          <div>
                            <p className="text-[#6B7280] text-[10px]">Service</p>
                            <p className="text-[#1E293B] text-xs font-semibold">{project.services ?? '—'}</p>
                          </div>
                        </div>
                      </div>
                      <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 mt-4 text-[#1F6B45] text-sm font-semibold hover:gap-3 transition-all">
                        View Project <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══ ENGINEERING COMMITMENT ══ */}
      <section className="py-16 bg-[#F7F9F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">OUR ENGINEERING COMMITMENT</p>
            <h2 className="text-[#1E293B] text-3xl sm:text-4xl font-bold">Practical Engineering. Reliable Solutions.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#DDE9E2] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} className="text-[#1F6B45]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[#1E293B] font-bold text-sm mb-1.5">{title}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
              heading="Ready to Discuss Your Next Project?"
              subtext="Whether you need a booster pump upgrade, motor control integration, or a broader automation solution, our team is ready to help."
              primaryLabel="Request a Quote →"
            />
    </main>
  );
}