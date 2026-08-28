import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MainLayoutWrapper from '@/components/layout/MainLayoutWrapper';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PT Tirta Surya Cipta – Industrial Automation Solutions',
  description:
    'We deliver integrated industrial solutions, from control systems to field services, built for performance, reliability, and long-term value.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <Navbar />
        <MainLayoutWrapper>
          {children}
        </MainLayoutWrapper>
        <Footer />
        <Toaster position="top-right" richColors closeButton />
        <Analytics />
      </body>
    </html>
  );
}