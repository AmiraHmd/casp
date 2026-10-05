import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';
import { getSeriesFromBookId } from '@/utils/bookSeries';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Protect Admin Routes
  if (pathname.includes('/admin')) {
    const cookie = request.cookies.get('session')?.value;
    const session = await decrypt(cookie || '');

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect Electronic Book Reader — series-specific OTP check
  if (pathname.includes('/book-reader')) {
    const pdfUrl = searchParams.get('pdfUrl');
    // Allow public storybooks to bypass OTP checks
    if (!pdfUrl || !pdfUrl.startsWith('/storybooks/')) {
        const bookId = searchParams.get('bookId') ?? '';
        const series  = getSeriesFromBookId(bookId);
        const otpCookie = request.cookies.get(`book_otp_session_${series}`)?.value;

        if (!otpCookie) {
          // No valid series session → redirect to home
          return NextResponse.redirect(new URL('/', request.url));
        }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ar|fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)',]
};
