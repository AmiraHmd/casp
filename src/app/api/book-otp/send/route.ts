import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOtpEmail } from '@/lib/mailer';
import crypto from 'crypto';

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale } = body as { email: string; locale?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const safeLocale = (['ar', 'fr', 'en'].includes(locale ?? '') ? locale : 'ar') as
      | 'ar'
      | 'fr'
      | 'en';

    // Rate-limit check
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
    const recentSends = await prisma.bookOtpCode.count({
      where: {
        email: normalizedEmail,
        createdAt: { gte: windowStart },
      },
    });

    if (recentSends >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    }

    // Invalidate existing unused codes
    await prisma.bookOtpCode.updateMany({
      where: { email: normalizedEmail, used: false },
      data: { used: true },
    });

    // Generate 6-digit OTP and SHA-256 hash it
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Persist
    await prisma.bookOtpCode.create({
      data: {
        email: normalizedEmail,
        codeHash,
        expiresAt,
        used: false,
      },
    });

    // Send email via Resend
    await sendOtpEmail(normalizedEmail, otp, safeLocale);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[book-otp/send]', error);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
