import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ApplicationAreas } from "@/components/projects/ApplicationAreas";
import { AlertTriangle, Settings, CheckCircle2, ArrowRight } from "lucide-react";
import CtaBanner from '@/components/shared/CtaBanner';

export const revalidate = 0;

export default async function ProjectsPage() {
  // Fetch dari database
  const projects = await prisma.project.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });

  // Featured project = project pertama
  const featured = projects[0] ?? null;
  const featuredThumbnail = featured?.thumbnailImage ?? null;

  return (
    <main>
      {/* ══ HERO ══ */}
      <section className="relative pt-28 lg:pt-36 bg-[#06100D] overflow-hidden flex flex-col justify-between min-h-[620px] lg:min-h-[720px]">
        {/* Right-side absolute background image for desktop/tablet */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[45%] lg:w-[55%] h-full hidden md:block select-none pointer-events-none z-0">
          <div
            className="w-full h-full bg-cover bg-center mix-blend-luminosity opacity-40 lg:opacity-50"
            style={{ backgroundImage: "url('/images/vfd.webp')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#06100D_0%,rgba(6,16,13,0.96)_25%,rgba(6,16,13,0.72)_48%,rgba(6,16,13,0.25)_72%,rgba(6,16,13,0.05)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-center py-12 lg:py-20">
          <div className="max-w-[660px] md:max-w-[55%] lg:max-w-[50%] flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <span className="text-[#86EFA0] text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase">
                OUR PROJECTS & APPLICATION AREAS
              </span>
              <span className="h-px w-8 bg-[#86EFA0]/40 hidden sm:block" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.0] text-[#F5F7F6] tracking-tight mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '250ms' }}>
              Projects &<br />Application Areas
            </h1>

            {/* Description */}
            <p className="text-[#A8B3AE] text-base sm:text-[18px] leading-relaxed max-w-[540px] mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
              A track record of industrial automation and electrical solutions delivered with a strong engineering approach, practical execution, and reliable performance outcomes.
            </p>

            {/* CTA */}
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: '550ms' }}>
              <a
                href="#gallery"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#86EFA0]/20 bg-[#0A1713]/40 text-[#86EFA0] text-sm font-semibold hover:border-[#86EFA0]/50 hover:bg-[#86EFA0]/10 transition-all duration-300"
              >
                Explore Our Projects
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Mobile Industrial Image Block */}
            <div className="block md:hidden opacity-0 animate-fade-up mt-8" style={{ animationDelay: '650ms' }}>
              <div className="w-full h-[220px] rounded-xl overflow-hidden border border-[#86EFA0]/15 relative bg-[#0A1713]">
                <div
                  className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-60"
                  style={{ backgroundImage: "url('/images/vfd.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06100D] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics bar integrated at the bottom of the hero */}
        <div className="relative z-10 w-full border-t border-[#86EFA0]/10 bg-[#06100D]/80 backdrop-blur-sm opacity-0 animate-fade-up" style={{ animationDelay: '750ms' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 lg:py-6">
            <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
              <div className="flex-1 flex flex-col md:flex-row md:items-baseline lg:items-center gap-1 md:gap-2">
                <span className="text-[#86EFA0] text-2xl lg:text-[28px] font-semibold leading-none">15+</span>
                <span className="text-[#A8B3AE] text-[11px] lg:text-[12px] font-normal leading-tight">Projects Completed</span>
              </div>
              <div className="hidden md:block h-6 w-px bg-[#86EFA0]/15" />
              <div className="flex-1 flex flex-col md:flex-row md:items-baseline lg:items-center gap-1 md:gap-2">
                <span className="text-[#86EFA0] text-2xl lg:text-[28px] font-semibold leading-none">10+</span>
                <span className="text-[#A8B3AE] text-[11px] lg:text-[12px] font-normal leading-tight">Years Experience</span>
              </div>
              <div className="hidden md:block h-6 w-px bg-[#86EFA0]/15" />
              <div className="flex-1 flex flex-col md:flex-row md:items-baseline lg:items-center gap-1 md:gap-2">
                <span className="text-[#86EFA0] text-2xl lg:text-[28px] font-semibold leading-none">98%</span>
                <span className="text-[#A8B3AE] text-[11px] lg:text-[12px] font-normal leading-tight">Client Satisfaction</span>
              </div>
              <div className="hidden md:block h-6 w-px bg-[#86EFA0]/15" />
              <div className="flex-1 flex flex-col md:flex-row md:items-baseline lg:items-center gap-1 md:gap-2">
                <span className="text-[#86EFA0] text-2xl lg:text-[28px] font-semibold leading-none">Multiple</span>
                <span className="text-[#A8B3AE] text-[11px] lg:text-[12px] font-normal leading-tight">Industries Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECT ══ */}
      {featured && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-10 border-b border-gray-100 pb-8">
              <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">FEATURED PROJECT</p>
              <h2 className="text-[#1E293B] text-2xl sm:text-4xl font-bold leading-tight max-w-3xl">
                {featured.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="w-full rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] relative shadow-sm border border-gray-100">
                {featuredThumbnail && (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${featuredThumbnail}')` }} />
                )}
              </div>

              <div className="flex flex-col gap-5">
                <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-amber-600 text-xs font-bold mb-1.5 uppercase">Challenge (Problem)</h4>
                    <p className="text-[#1E293B] text-sm leading-relaxed">{featured.challenge}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center shrink-0">
                    <Settings size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-blue-600 text-xs font-bold mb-1.5 uppercase">Our Solution</h4>
                    <p className="text-[#1E293B] text-sm leading-relaxed">{featured.solution ?? "—"}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#2E8B57]/20 bg-[#DDE9E2]/40 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#2E8B57]/30 bg-[#DDE9E2]/60 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} className="text-[#1F6B45]" />
                  </div>
                  <div>
                    <h4 className="text-[#1F6B45] text-xs font-bold mb-1.5 uppercase">Project Info</h4>
                    <ul className="flex flex-col gap-1 text-sm text-[#1E293B]">
                      <li className="flex items-start gap-2"><span className="text-[#59D66F] font-bold mt-0.5">•</span> Location: {featured.location ?? "—"}</li>
                      <li className="flex items-start gap-2"><span className="text-[#59D66F] font-bold mt-0.5">•</span> Status: COMPLETED</li>
                      {featured.services && <li className="flex items-start gap-2"><span className="text-[#59D66F] font-bold mt-0.5">•</span> Service: {featured.services}</li>}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/projects/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1F6B45] text-white text-sm font-semibold hover:bg-[#59D66F] hover:text-[#071A14] transition-colors self-start"
                >
                  View Project Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ PROJECT GALLERY ══ */}
      <section className="py-20 bg-[#F7F9F8]" id="gallery">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">PROJECT GALLERY</p>
              <h2 className="text-[#1E293B] text-3xl font-bold">Selected Projects</h2>
            </div>
            <Link href="/projects/all" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-[#1E293B] text-sm font-semibold hover:bg-white transition-colors shadow-sm bg-white">
              View All Projects <ArrowRight size={14} />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 text-[#6B7280]">
              <p className="text-sm">No projects yet. Add one from the admin dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const thumb = project.thumbnailImage;
                const tag = project.applicationType ?? project.services ?? "Project";
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col hover:border-[#59D66F]/50 hover:shadow-md transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="h-48 bg-[#DDE9E2] w-full relative overflow-hidden">
                      {thumb ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url('${thumb}')` }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1F6B45] to-[#071A14] opacity-80" />
                      )}
                    </div>
                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-[#59D66F] text-[10px] font-bold tracking-[0.1em] uppercase mb-1.5 line-clamp-1">{tag}</span>
                      <h3 className="font-bold text-[#1E293B] text-base leading-snug mb-3 line-clamp-2">{project.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 flex-1">{project.overview}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DDE9E2] text-[#1F6B45]`}>
                          COMPLETED
                        </span>
                        <ArrowRight size={14} className="text-[#1F6B45] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══ APPLICATION AREAS ══ */}
      <section className="py-24 bg-[#071A14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">APPLICATION AREAS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">Systems and Application We Support</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our automation, motor control, and electrical solutions are designed to support a wide range of industrial systems and utility applications.
            </p>
          </div>
          <ApplicationAreas />
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <CtaBanner
        heading="Ready to Discuss Your Next Project?"
        subtext="Whether you need a booster pump upgrade, motor control integration, or a broader automation solution, our team is ready to help."
        primaryLabel="Request a Quote →"
      />
    </main>
  );
}