'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About & Capabilities', href: '/about' },
  { label: 'Projects & Application Areas', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#071A14]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#071A14]/80 backdrop-blur-sm'} border-b border-white/5`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[70px] flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/images/logo-navbar.webp" alt="TSC" width={120} height={48} className="object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors whitespace-nowrap ${pathname === href ? 'text-[#59D66F] font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold hover:bg-[#4bc45e] transition-colors"
          >
            Request Quote
          </Link>
          {/* hamburger – always visible on < lg */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white hover:border-white/30 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-[#071A14] border-t border-white/5 px-6 py-5 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-sm border-b border-white/5 transition-colors ${pathname === href ? 'text-[#59D66F] font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="mt-3 flex justify-center items-center px-5 py-3 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold"
          >
            Request Quote
          </Link>
        </div>
      )}
    </header>
  );
}