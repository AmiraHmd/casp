import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generatePdfAccessToken } from '@/lib/token';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, series } = body as { email: string; code: string; series: string };

    if (!email || !code) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    // Validate series slug: only lowercase letters, numbers, hyphens
    const safeSeries = /^[a-z0-9-]+$/.test(series ?? '') ? series : 'unknown';

    const normalizedEmail = email.toLowerCase().trim();
    const codeHash = crypto.createHash('sha256').update(code.trim()).digest('hex');
    const now = new Date();

    const record = await prisma.bookOtpCode.findFirst({
      where: {
        email: normalizedEmail,
        codeHash,
        used: false,
        expiresAt: { gt: now },
      },
    });

    if (!record) {
      return NextResponse.json({ error: 'invalid' }, { status: 401 });
    }

    // Mark as used
    await prisma.bookOtpCode.update({
      where: { id: record.id },
      data: { used: true },
    });

    // Issue a JWT session token (reusing existing token infrastructure)
    const token = generatePdfAccessToken({
      email: normalizedEmail,
      blobPath: 'public/ebook',
      watermark: false,
    });

    const response = NextResponse.json({ success: true });
    const maxAge = 60 * 60 * 24; // 24 hours

    // ── Series-specific HTTP-only session token (backend API verifications) ─
    response.cookies.set({
      name: `book_otp_session_${safeSeries}`,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    // ── Series-specific client-readable marker (UI gating / bypass popup) ───
    response.cookies.set({
      name: `book_otp_verified_${safeSeries}`,
      value: 'true',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    return response;
  } catch (error) {
    console.error('[book-otp/verify]', error);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
