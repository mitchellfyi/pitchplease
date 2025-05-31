import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { guestRegex, isDevelopmentEnvironment } from './lib/constants';
import { createClient } from './lib/supabase/middleware';

// HTTP Basic Authentication
function isAuthenticated(request: NextRequest) {
  const authheader =
    request.headers.get('authorization') ||
    request.headers.get('Authorization');

  if (!authheader) {
    return false;
  }

  const auth = authheader.split(' ');
  if (auth[0] !== 'Basic') {
    return false;
  }

  const credentials = Buffer.from(auth[1], 'base64').toString().split(':');
  const username = credentials[0];
  const password = credentials[1];

  // Get credentials from environment variables
  const validUsername = process.env.HTTP_AUTH_USERNAME || 'admin';
  const validPassword = process.env.HTTP_AUTH_PASSWORD || 'password';

  return username === validUsername && password === validPassword;
}

function requestAuth() {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  // Skip HTTP auth in development and test environments (optional)
  const skipHttpAuth =
    isDevelopmentEnvironment ||
    process.env.SKIP_HTTP_AUTH === 'true' ||
    process.env.NODE_ENV === 'test';

  // Apply HTTP Basic Authentication (unless skipped)
  if (!skipHttpAuth && !isAuthenticated(request)) {
    return requestAuth();
  }

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (!token) {
    const redirectUrl = encodeURIComponent(request.url);

    return NextResponse.redirect(
      new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url),
    );
  }

  const isGuest = guestRegex.test(token?.email ?? '');

  if (token && !isGuest && ['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return createClient(request);
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',
    '/login',
    '/register',

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
