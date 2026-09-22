import type { Metadata } from 'next';
import HomeClientPage from './HomeClientPage';

export const metadata: Metadata = {
  title: 'Industrial Automation Solutions | PT Tirta Surya Cipta',
  description:
    'Leading industrial automation Indonesia & control system engineering provider. Expert panel manufacturing, VSD implementation, and site technical service.',
  keywords: [
    'industrial automation Indonesia',
    'control system engineering',
    'panel manufacturing',
    'VSD inverter implementation',
    'electrical control system',
    'PT Tirta Surya Cipta',
  ],
  alternates: {
    canonical: 'https://www.tirtasuryacipta.com',
  },
  openGraph: {
    title: 'Industrial Automation Solutions | PT Tirta Surya Cipta',
    description:
      'Leading industrial automation Indonesia & control system engineering provider. Expert panel manufacturing, VSD implementation, and site technical service.',
    url: 'https://www.tirtasuryacipta.com',
    siteName: 'PT Tirta Surya Cipta',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClientPage />;
}