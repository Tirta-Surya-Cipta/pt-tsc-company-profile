'use client';

import { usePathname } from 'next/navigation';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <main className={isAdmin ? '' : 'pt-[70px]'}>
      {children}
    </main>
  );
}
