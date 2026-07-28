import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Edge-compatible JWT payload decoding (no signature verification).
 * Full cryptographic verification happens in verifyAdmin() on Node.js runtime.
 */
function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Fix base64url to base64
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  const isAccessingAdmin = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAccessingLogin = pathname === '/admin/login';

  // Skenario 1: Belum login tapi maksa masuk halaman admin -> Lempar ke Login
  if (isAccessingAdmin && !token) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Skenario 2: Token ada tapi malformed/expired -> Lempar ke Login
  if (isAccessingAdmin && token) {
    const payload = decodeJwtPayload(token);

    if (!payload || !payload.exp || !payload.role) {
      // Malformed token → hapus cookie dan redirect
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      return response;
    }

    // Cek expired (exp dalam detik, Date.now() dalam milidetik)
    if (payload.exp * 1000 < Date.now()) {
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      return response;
    }

    // Cek role
    if (payload.role !== 'admin') {
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Skenario 3: Sudah login dan valid, akses login page → redirect ke dashboard
  if (isAccessingLogin && token) {
    const payload = decodeJwtPayload(token);
    if (payload && payload.exp && payload.exp * 1000 > Date.now() && payload.role === 'admin') {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// Konfigurasi: Middleware ini hanya berjaga di rute yang berawalan /admin
export const config = {
  matcher: ['/admin/:path*'],
};