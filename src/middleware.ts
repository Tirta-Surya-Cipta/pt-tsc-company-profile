import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Edge-compatible cryptographic JWT verification.
 * Verifies the token signature using AUTH_SECRET.
 */
async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret || secret.length < 16) return false;
    
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey);

    return payload?.role === 'admin';
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  const isAccessingAdmin = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAccessingLogin = pathname === '/admin/login';

  // Scenario 1: Accessing admin route without token -> Redirect to login
  if (isAccessingAdmin && !token) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Scenario 2: Accessing admin route with token -> Verify signature and role
  if (isAccessingAdmin && token) {
    const isValid = await verifyAdminToken(token);

    if (!isValid) {
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Scenario 3: Already logged in with valid token, accessing login page -> Redirect to dashboard
  if (isAccessingLogin && token) {
    const isValid = await verifyAdminToken(token);
    if (isValid) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
