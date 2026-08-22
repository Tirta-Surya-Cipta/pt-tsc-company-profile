'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About & Capabilities', href: '/about' },
  { label: 'Projects & Application Areas', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

const solutions = [
  'Electrical & Control System Engineering',
  'Panel Manufacturing & Integration',
  'Technical Service & Long-Term Support',
  'Commisioning & Troubleshooting',
  'Inverter / VSD Implementation for Industrial Systems',
  'Upgrade, Retrofit, and Optimization of Existing Systems',
];

export default function Footer() {
  const pathname = usePathname();

  // Do not render public Footer on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#071A14] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold text-2xl leading-snug">
              PT Tirta Surya<br />Cipta
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Industrial solution provider for Variable Speed Drives, motor control, automation, and field engineering services across Indonesia.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {[
                {
                  label: 'Facebook',
                  href: '#',
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: '#',
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  label: 'X',
                  href: '#',
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: 'WhatsApp',
                  href: 'https://wa.me/6285159775365',
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.805-.736 2.059-1.446.253-.71.253-1.317.177-1.445-.077-.127-.278-.203-.583-.356ZM12 2.04c-5.5 0-9.96 4.47-9.96 9.96 0 2.02.6 3.92 1.7 5.53L2.04 22l4.63-1.22c1.54.91 3.32 1.4 5.17 1.4 5.5 0 9.96-4.47 9.96-9.96 0-5.5-4.47-9.96-9.96-9.96Zm0 18.04c-1.73 0-3.4-.46-4.86-1.33l-.35-.21-2.76.72.74-2.69-.23-.37C3.59 14.7 3.08 12.9 3.08 11 3.08 6.08 7.08 2.08 12 2.08c4.92 0 8.92 4 8.92 8.92 0 4.92-4 8.92-8.92 8.92Z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:border-[#59D66F] hover:text-[#59D66F] hover:bg-white/5 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 text-sm hover:text-[#59D66F] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm">Solutions</h4>
            <ul className="flex flex-col gap-3">
              {solutions.map(s => (
                <li key={s}>
                  <Link href="/projects" className="text-gray-400 text-sm hover:text-[#59D66F] transition-colors leading-snug block">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm">Our Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-[#59D66F] mt-0.5 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/43776ByPxaYSQcXZ9?g_st=awb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  Jl. Yudistira No.69, Rt.003/Rw.003, Jatiasih, Kec. Jatiasih, Kota Bks, Jawa Barat 17423
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={15} className="text-[#59D66F] shrink-0" />
                <a href="tel:+6285159775365" className="hover:text-white transition-colors">+62 851 5977 5365</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={15} className="text-[#59D66F] shrink-0" />
                <a href="mailto:admin@tirtasuryacipta.com" className="hover:text-white transition-colors">admin@tirtasuryacipta.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock size={15} className="text-[#59D66F] shrink-0" />
                <span>Senin – Sabtu 08.00 – 17.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 PT Tirta Surya Cipta. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}