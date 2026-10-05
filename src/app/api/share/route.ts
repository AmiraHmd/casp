import { NextRequest, NextResponse } from 'next/server';
import { generatePdfAccessToken } from '@/lib/token';

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Ensure locale is used if provided, otherwise default
    const lang = locale || 'en';

    // Define the private Blob path for the PDF
    // Ideally this comes from a configuration or database, 
    // but based on requirements we use a fixed path or pass it from client if validated.
    // Given requirements, we'll hardcode or allow specific paths.
    // For now, let's assume a default private book or a mapped ID.
    // For this implementation, we will use a placeholder or a specific private path 
    // that the user should configure.
    
    // NOTE: Replace this with the ACTUAL Vercel Blob URL or path you want to protect.
    // The user mentioned "private file" in Vercel Blob.
    // We will assume the `blobPath` is passed or determined here.
    // For security, we should NOT trust client-provided paths unless validated.
    // Let's use a dummy protected path for now, which mapped in the PDF route.
    const blobPath = 'private/books/sample-protected.pdf'; 

    const token = generatePdfAccessToken({ email, blobPath, watermark: true });

    // Construct the secure link
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host');
    const baseUrl = `${protocol}://${host}`;
    
    const accessLink = `${baseUrl}/api/book-auth?token=${token}&locale=${lang}`;

    return NextResponse.json({ success: true, message: 'Access link generated', accessLink });
  } catch (error) {
    console.error('Share API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
