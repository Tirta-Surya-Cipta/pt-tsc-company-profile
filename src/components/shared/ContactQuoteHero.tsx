'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* ─── Types ─────────────────────────────────────────────────────────────────── */

interface CtaConfig {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface ContactQuoteHeroProps {
  eyebrow: string;
  headline: React.ReactNode;
  description: string;
  primaryCta: CtaConfig;
  secondaryCta: CtaConfig;
  imageSrc: string;
  supportingDetails?: string[];
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export function ContactQuoteHero({
  eyebrow,
  headline,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  supportingDetails,
}: ContactQuoteHeroProps) {
  return (
    <section className="relative pt-28 lg:pt-36 bg-[#06100D] overflow-hidden flex flex-col justify-between min-h-[600px] lg:min-h-[680px]">
      {/* ── Right-side background image (desktop/tablet) ── */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] lg:w-[52%] h-full hidden md:block select-none pointer-events-none z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-45 lg:opacity-55"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#06100D_0%,rgba(6,16,13,0.97)_22%,rgba(6,16,13,0.78)_44%,rgba(6,16,13,0.35)_68%,rgba(6,16,13,0.10)_100%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-center py-12 lg:py-20">
        <div className="max-w-[640px] md:max-w-[52%] lg:max-w-[48%] flex flex-col justify-center">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            <span className="text-[#86EFA0] text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-[#86EFA0]/40 hidden sm:block" />
          </div>

          {/* Headline */}
          <h1
            className="text-[38px] sm:text-[48px] lg:text-[62px] font-semibold leading-[1.02] text-[#F5F7F6] tracking-tight mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: '250ms' }}
          >
            {headline}
          </h1>

          {/* Description */}
          <p
            className="text-[#A8B3AE] text-base sm:text-[17px] leading-[1.65] max-w-[530px] mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-3 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '550ms' }}
          >
            <CtaButton {...primaryCta} variant="primary" />
            <CtaButton {...secondaryCta} variant="secondary" />
          </div>

          {/* Supporting details */}
          {supportingDetails && supportingDetails.length > 0 && (
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 opacity-0 animate-fade-up"
              style={{ animationDelay: '650ms' }}
            >
              {supportingDetails.map((detail, i) => (
                <span key={detail} className="flex items-center gap-2">
                  <span className="text-[#A8B3AE]/70 text-[12px] font-normal">{detail}</span>
                  {i < supportingDetails.length - 1 && (
                    <span className="text-[#86EFA0]/30 text-[10px]">•</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Mobile image */}
          <div
            className="block md:hidden mt-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '700ms' }}
          >
            <div className="w-full h-[220px] rounded-[10px] overflow-hidden relative bg-[#0A1713]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-55"
                style={{ backgroundImage: `url('${imageSrc}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06100D]/80 via-transparent to-[#06100D]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Button ────────────────────────────────────────────────────────────── */

function CtaButton({
  label,
  href,
  icon,
  external,
  variant,
}: CtaConfig & { variant: 'primary' | 'secondary' }) {
  const isPrimary = variant === 'primary';

  const className = isPrimary
    ? 'group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#86EFA0] text-[#06100D] text-sm font-semibold hover:bg-[#9af5b3] transition-all duration-300'
    : 'group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#86EFA0]/25 bg-transparent text-[#86EFA0] text-sm font-semibold hover:border-[#86EFA0]/50 hover:bg-[#86EFA0]/5 transition-all duration-300';

  const arrow = (
    <ArrowRight
      size={15}
      className="group-hover:translate-x-1 transition-transform duration-300"
    />
  );

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
      {!icon && arrow}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  // Check if href is an anchor (scroll)
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
