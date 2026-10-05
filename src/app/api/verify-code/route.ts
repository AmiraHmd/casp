import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generatePdfAccessToken } from '@/lib/token';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    // Use original case since admin generates mixed-case alphanumeric and symbols
    const normalizedCode = code.trim();
    const codeHash = crypto.createHash('sha256').update(normalizedCode).digest('hex');

    // 1. Find the access code in database
    // We search by email and matching codeHash
    const validCode = await prisma.accessCode.findFirst({
      where: {
        email: email,
        codeHash: codeHash,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!validCode) {
      // If we didn't find it with email, let's see if it's an unassigned code (email is null)
      // or if it's just invalid/expired.
      // But based on the current logic, the user MUST enter the email assigned to them.
      return NextResponse.json(
        { error: 'invalid' },
        { status: 401 }
      );
    }

    // 3. Generate a JWT token for the session
    // We use the same payload structure as the magic link session
    // blobPath can be generic here since the PrivateBook page decides which file to proxy based on internal logic 
    // or we can just pass a generic "all-access" or similar if the token allows it.
    // Looking at PrivateBook/page.tsx, it uses verifyPdfAccessToken(sessionToken) and extracts email.
    // So blobPath is actually required by the interface but not strictly used to restrict files in PrivateBook page itself 
    // (though the /api/pdf route might use it).
    
    const token = generatePdfAccessToken({ 
      email: validCode.email!, 
      blobPath: 'private/all', // Placeholder, the actual proxy handles specific files
      watermark: true
    });

    // 4. Create response and set cookie
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: 'book_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 3, // 3 hours
    });

    // 5. Optionally mark code as used if it's one-time use
    // The schema has a 'used' flag.
    /*
    await prisma.accessCode.update({
      where: { id: validCode.id },
      data: { used: true }
    });
    */

    return response;

  } catch (error) {
    console.error('Verify Code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
