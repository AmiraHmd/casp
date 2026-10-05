import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generatePdfAccessToken } from '@/lib/token';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    const normalizedCode = code.trim();
    const codeHash = crypto.createHash('sha256').update(normalizedCode).digest('hex');

    const validCode = await prisma.accessCode.findFirst({
      where: {
        codeHash: codeHash,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!validCode) {
      return NextResponse.json(
        { error: 'invalid' },
        { status: 401 }
      );
    }

    const token = generatePdfAccessToken({ 
      email: validCode.email || 'riyada_user', 
      blobPath: 'private/all',
      watermark: false
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: 'book_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 10,
    });

    return response;

  } catch (error) {
    console.error('Verify Riyada Code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
