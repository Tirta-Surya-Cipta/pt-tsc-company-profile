import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MainLayoutWrapper from '@/components/layout/MainLayoutWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tirtasuryacipta.com'),
  title: {
    default: 'PT Tirta Surya Cipta – Industrial Automation Solutions',
    template: '%s | Tirta Surya Cipta',
  },
  description:
    'We deliver integrated industrial solutions, from control systems to field services, built for performance, reliability, and long-term value.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'PT Tirta Surya Cipta – Industrial Automation Solutions',
    description:
      'We deliver integrated industrial solutions, from control systems to field services, built for performance, reliability, and long-term value.',
    url: 'https://www.tirtasuryacipta.com',
    siteName: 'PT Tirta Surya Cipta',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Tirta Surya Cipta – Industrial Automation Solutions',
    description:
      'We deliver integrated industrial solutions, from control systems to field services, built for performance, reliability, and long-term value.',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PT Tirta Surya Cipta',
  alternateName: 'TSC',
  url: 'https://www.tirtasuryacipta.com',
  logo: 'https://www.tirtasuryacipta.com/icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-851-5977-5365',
    contactType: 'customer service',
    email: 'admin@tirtasuryacipta.com',
    areaServed: 'ID',
    availableLanguage: ['English', 'Indonesian'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Yudistira No.69, Rt.003/Rw.003, Jatiasih, Kec. Jatiasih',
    addressLocality: 'Kota Bekasi',
    addressRegion: 'Jawa Barat',
    postalCode: '17423',
    addressCountry: 'ID',
  },
  sameAs: [
    'https://www.linkedin.com/company/pt-tirta-surya-cipta',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <MainLayoutWrapper>
          {children}
        </MainLayoutWrapper>
        <Footer />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}