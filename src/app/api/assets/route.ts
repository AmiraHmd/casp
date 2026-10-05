import { NextRequest, NextResponse } from 'next/server';
import { decodeAssetUrl } from '@/utils/obfuscation';

/**
 * Proxy route to stream assets from Vercel Blob storage without exposing original URLs.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const encodedUrl = searchParams.get('url');

  if (!encodedUrl) {
    return new NextResponse('Missing asset URL', { status: 400 });
  }

  const originalUrl = decodeAssetUrl(encodedUrl);

  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL || "https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev";
  const r2Domain = new URL(r2BaseUrl).hostname;

  if (!originalUrl || (!originalUrl.includes('vercel-storage.com') && !originalUrl.includes(r2Domain))) {
    return new NextResponse('Invalid asset URL', { status: 400 });
  }

  try {
    const response = await fetch(originalUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      return new NextResponse('Failed to fetch asset', { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Disposition': 'inline',
      },
    });
  } catch (error) {
    console.error('Asset proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
