import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CtaBanner from '@/components/shared/CtaBanner';
import ProjectHeroGallery from './ProjectHeroGallery';
import {
    ArrowLeft, ArrowRight, Calendar, MapPin,
    Building2, Settings, CheckCircle2, AlertCircle,
    Lightbulb, ChevronRight, Activity, BarChart2,
} from 'lucide-react';

export const revalidate = 0;

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const project = await prisma.project.findFirst({
        where: { slug, deletedAt: null },
    });

    if (!project) notFound();

    const related = await prisma.project.findMany({
        where: { NOT: { slug }, deletedAt: null },
        take: 4,
        orderBy: { createdAt: 'desc' },
    });

    const thumbnail = project.thumbnailImage;
    const gallery = project.galleryImages || [];
    const tag = project.applicationType ?? project.services ?? 'Project';

    const infoRows = [
        { label: 'Industry', icon: Building2, value: project.industryType ?? '—' },
        { label: 'Application', icon: Settings, value: project.applicationType ?? '—' },
        { label: 'Service', icon: Settings, value: project.services ?? '—' },
        { label: 'Location', icon: MapPin, value: project.location ?? '—' },
        { label: 'Completion Year', icon: Calendar, value: project.projectYear?.toString() ?? '—' },
        { label: 'Project Type', icon: Activity, value: project.projectType ?? '—' },
        { label: 'Status', icon: CheckCircle2, value: 'COMPLETED' },
    ];

    return (
        <main>
            {/* ══ HERO ══ */}
            <section className="relative bg-[#071A14] overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left */}
                        <div className="flex flex-col justify-center">
                            <span className="inline-block text-[#59D66F] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 opacity-0 animate-[fadeUp_0.5s_ease_0.1s_forwards]">
                                {tag}
                            </span>
                            <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight mb-3 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]">
                                {project.title}
                            </h1>
                            <div className="w-12 h-1 bg-[#59D66F] rounded mb-5 opacity-0 animate-[fadeUp_0.5s_ease_0.25s_forwards]" />
                            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
                                {project.overview}
                            </p>
                            <div className="grid grid-cols-2 gap-4 opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]">
                                {[
                                    { icon: Calendar, label: 'Project Year', value: project.projectYear?.toString() ?? '—' },
                                    { icon: Building2, label: 'Industry', value: project.industryType ?? '—' },
                                    { icon: MapPin, label: 'Location', value: project.location ?? '—' },
                                    { icon: Settings, label: 'Service', value: project.services ?? '—' },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#1F6B45]/30 border border-[#2E8B57]/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <Icon size={13} className="text-[#59D66F]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-[10px] uppercase tracking-wider">{label}</p>
                                            <p className="text-white text-sm font-medium leading-snug">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/projects/all" className="inline-flex items-center gap-2 mt-8 text-gray-400 text-sm hover:text-[#59D66F] transition-colors opacity-0 animate-[fadeUp_0.5s_ease_0.5s_forwards]">
                                <ArrowLeft size={14} /> Back to Projects
                            </Link>
                        </div>

                        {/* Right: Interactive Hero Gallery */}
                        <ProjectHeroGallery thumbnail={thumbnail} gallery={gallery} />
                    </div>
                </div>
            </section>

            {/* ══ CONTENT ══ */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
                        {/* Left */}
                        <div>
                            <h2 className="text-[#1E293B] text-2xl font-bold mb-2">Project Overview</h2>
                            <div className="w-10 h-1 bg-[#59D66F] rounded mb-5" />
                            <p className="text-[#6B7280] text-sm leading-relaxed mb-10">{project.overview}</p>

                            <div className="flex flex-col gap-6">
                                {/* Challenge */}
                                {project.challenge && (
                                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                                            <div className="w-9 h-9 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                                                <AlertCircle size={16} className="text-red-500" />
                                            </div>
                                            <h3 className="text-[#1E293B] font-bold text-base">The Challenge</h3>
                                        </div>
                                        <div className="px-5 py-4 text-sm text-[#6B7280] leading-relaxed">
                                            {project.challenge}
                                        </div>
                                        <div className="flex justify-center py-1 text-gray-200">↓</div>
                                    </div>
                                )}

                                {/* Solution */}
                                {project.solution && (
                                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                                            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                                                <Lightbulb size={16} className="text-amber-500" />
                                            </div>
                                            <h3 className="text-[#1E293B] font-bold text-base">Our Solution</h3>
                                        </div>
                                        <div className="px-5 py-4 text-sm text-[#6B7280] leading-relaxed">
                                            {project.solution}
                                        </div>
                                        <div className="flex justify-center py-1 text-gray-200">↓</div>
                                    </div>
                                )}

                                {/* Result */}
                                {project.result && (
                                    <div className="border border-[#2E8B57]/20 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2E8B57]/10 bg-[#DDE9E2]/30">
                                            <div className="w-9 h-9 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={16} className="text-[#1F6B45]" />
                                            </div>
                                            <h3 className="text-[#1E293B] font-bold text-base">The Results</h3>
                                        </div>
                                        <div className="px-5 py-4 text-sm text-[#6B7280] leading-relaxed">
                                            {project.result}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right sidebar */}
                        <div className="flex flex-col gap-5">
                            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <h3 className="text-[#1E293B] font-bold text-base">Project Information</h3>
                                    <div className="w-8 h-0.5 bg-[#59D66F] rounded mt-1" />
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {infoRows.map(({ label, icon: Icon, value }) => (
                                        <div key={label} className="flex items-start gap-3 px-5 py-3">
                                            <Icon size={14} className="text-[#6B7280] mt-0.5 shrink-0" />
                                            <div className="flex-1 flex items-start justify-between gap-2">
                                                <span className="text-[#6B7280] text-xs shrink-0">{label}</span>
                                                <span className="text-[#1E293B] text-xs font-semibold text-right">{value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {project.highlights && project.highlights.length > 0 && (
                                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                    <div className="px-5 py-4 border-b border-gray-100">
                                        <h3 className="text-[#1E293B] font-bold text-base">Project Highlights</h3>
                                        <div className="w-8 h-0.5 bg-[#59D66F] rounded mt-1" />
                                    </div>
                                    <ul className="px-5 py-4 flex flex-col gap-3">
                                        {project.highlights.map((item) => (
                                            <li key={item} className="flex items-center gap-2.5">
                                                <CheckCircle2 size={14} className="text-[#59D66F] shrink-0" />
                                                <span className="text-[#1E293B] text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ GALLERY ══ */}
            {gallery.length > 0 && (
                <section className="py-16 bg-[#F7F9F8]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <h2 className="text-[#1E293B] text-2xl font-bold mb-8">Project Gallery</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {gallery.map((url) => (
                                <div key={url} className="group relative aspect-square rounded-xl overflow-hidden bg-[#DDE9E2] cursor-pointer">
                                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${url}')` }} />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ RELATED ══ */}
            {related.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-[#1E293B] text-2xl font-bold">Other Project You Might Be Interested In</h2>
                            <Link href="/projects/all" className="text-[#1F6B45] text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-3 transition-all whitespace-nowrap">
                                View All Projects <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {related.map((p) => {
                                const relThumb = p.thumbnailImage;
                                const relTag = p.applicationType ?? 'Project';
                                return (
                                    <Link key={p.id} href={`/projects/${p.slug}`} className="group flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#59D66F]/40 hover:shadow-md transition-all">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#DDE9E2] shrink-0">
                                            {relThumb && <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundImage: `url('${relThumb}')` }} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[#1E293B] text-xs font-semibold leading-snug line-clamp-2">{p.title}</p>
                                            <span className="text-[#59D66F] text-[10px] font-bold uppercase tracking-wide">{relTag}</span>
                                        </div>
                                        <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1F6B45] transition-colors shrink-0" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ CTA ══ */}
            <CtaBanner
                heading="Have a Project Requirement to Discuss?"
                subtext="If you already have a defined scope, technical requirement, or planned upgrade, submit a quote request and our team will review your project needs."
            />
        </main>
    );
}