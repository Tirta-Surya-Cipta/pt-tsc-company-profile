import Link from 'next/link';
import { MapPin, BarChart2, Activity, LucideIcon } from 'lucide-react';

type CtaFeature = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

type CtaBannerProps = {
    id?: string;
    heading: string;
    subtext: string;
    primaryLabel?: string;
    primaryHref?: string;
    features?: CtaFeature[];
};

const defaultFeatures: CtaFeature[] = [
    { icon: MapPin, title: 'Consultation & Site Survey', desc: 'We assess your needs on-site' },
    { icon: BarChart2, title: 'Engineering & Solution Design', desc: 'Tailored to your operational goals' },
    { icon: Activity, title: 'Support & After-Sales Service', desc: 'Reliable support for long-term operations' },
];

export default function CtaBanner({
    id = 'cta-heading',
    heading,
    subtext,
    primaryLabel = 'Request a Quote →',
    primaryHref = '/quote',
    features = defaultFeatures,
}: CtaBannerProps) {
    return (
        <section className="py-6 bg-[#F7F9F8]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div
                    aria-labelledby={id}
                    className="relative w-full overflow-hidden rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/home-hero.webp')" }}
                >
                    <div className="absolute inset-0 bg-[#071A14]/80" />

                    {/* Top row */}
                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-8 pt-8 pb-5">
                        <div className="max-w-sm">
                            <h3 id={id} className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-2">
                                {heading}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{subtext}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                            <Link
                                href={primaryHref}
                                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold hover:bg-[#4bc45e] transition-colors whitespace-nowrap"
                            >
                                {primaryLabel}
                            </Link>
                            <a
                                href="https://wa.me/6285159775365"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border border-[#59D66F] bg-transparent text-[#59D66F] text-sm font-bold hover:bg-[#59D66F]/10 transition-colors whitespace-nowrap"
                            >
                                <img src="https://c.animaapp.com/NrFfujo6/img/ic-baseline-whatsapp.svg" className="w-5 h-5" alt="" aria-hidden />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Bottom features row */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 px-8 pb-7 pt-2 border-t border-white/10 mt-2">
                        {features.map(({ icon: Icon, title, desc }, i) => (
                            <div key={title} className="flex items-center gap-3 flex-1">
                                {i > 0 && <div className="hidden sm:block h-8 w-px bg-white/15 mr-1 shrink-0" />}
                                <div className="w-7 h-7 rounded-lg bg-[#1F6B45]/50 flex items-center justify-center shrink-0">
                                    <Icon size={13} className="text-[#59D66F]" />
                                </div>
                                <div>
                                    <p className="text-white text-xs font-semibold leading-snug">{title}</p>
                                    <p className="text-gray-400 text-[11px] leading-snug">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}