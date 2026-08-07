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
                { label: 'Facebook', href: '#', char: 'f' },
                { label: 'Instagram', href: '#', char: '◎' },
                { label: 'X', href: '#', char: '✕' },
                { label: 'WhatsApp', href: 'https://wa.me/6285159775365', char: '◉' },
              ].map(({ label, href, char }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-xs text-gray-400 hover:border-[#59D66F] hover:text-[#59D66F] transition-colors"
                >
                  {char}
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
                  href="https://maps.app.goo.gl/rFeiQhs7FRXtNNJo7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  Ruko simprug No.B2-15, Sertajaya, Kec. Cikarang Timur, Kab. Bekasi, Jawa Barat, 17530
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