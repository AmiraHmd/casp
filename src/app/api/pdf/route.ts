import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { watermarkPdf } from "@/lib/pdf";
import { verifyPdfAccessToken } from "@/lib/token";
import { cookies } from "next/headers";
import { decodeAssetUrl } from "@/utils/obfuscation";

export async function GET(request: NextRequest) {
  // ── Layer 1: Block direct browser navigation ──────────────────────────
  // Chromium/Firefox automatically set these headers and JavaScript CANNOT forge them.
  // When a user pastes the URL into a new tab:
  //   Sec-Fetch-Dest: "document"  ← we reject this
  //   Sec-Fetch-Site: "none"      ← we reject this
  // When our own fetch() call is made from the PrivateBook page:
  //   Sec-Fetch-Dest: "empty"     ← allowed
  //   Sec-Fetch-Site: "same-origin" ← allowed
  const fetchDest = request.headers.get("sec-fetch-dest");
  const fetchSite = request.headers.get("sec-fetch-site");

  const hasFetchHeaders = fetchDest !== null || fetchSite !== null;
  if (hasFetchHeaders) {
    const isLegitFetch = fetchDest === "empty" && fetchSite === "same-origin";
    if (!isLegitFetch) {
      console.warn(
        `[pdf-proxy] Blocked direct navigation attempt. Sec-Fetch-Dest=${fetchDest} Sec-Fetch-Site=${fetchSite}`
      );
      return new NextResponse("Forbidden: direct URL access not allowed", { status: 403 });
    }
  }

  const { searchParams } = new URL(request.url);
  let blobUrl = searchParams.get("url");

  // De-obfuscate if the URL is provided and doesn't look like a plain relative path or API route
  if (blobUrl && !blobUrl.startsWith("/") && !blobUrl.startsWith("http")) {
    blobUrl = decodeAssetUrl(blobUrl);
  }

  const accessCode = searchParams.get("code");
  const fileId = searchParams.get("file");

  const r2BaseUrl =
    process.env.NEXT_PUBLIC_R2_BASE_URL ||
    "https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev";

  // Map fileId to blob URL if provided
  if (!blobUrl && fileId) {
    if (fileId.startsWith("mufid-")) {
      const key = fileId.replace("mufid-", "");
      blobUrl = `${r2BaseUrl}/store-book/mufid-book/mufid-${key}/mufid-${key}.pdf`;
    }
  }

  if (!blobUrl) return new NextResponse("Missing URL", { status: 400 });

  // Handle relative URLs (prepend R2 Base URL)
  if (blobUrl.startsWith("/") && !blobUrl.startsWith("/api/")) {
    blobUrl = `${r2BaseUrl}${blobUrl}`;
  }

  // Safety check: only allow proxying from the authorized R2 domain or local API routes
  const r2Domain = new URL(r2BaseUrl).hostname;
  const isLocalApi = blobUrl.startsWith("/api/");
  if (!blobUrl.includes(r2Domain) && !isLocalApi) {
    return new NextResponse("Forbidden source domain", { status: 403 });
  }

  // Determine the fetch URL (absolute URL required for local API routes)
  let fetchUrl = blobUrl;
  if (isLocalApi) {
    const baseUrl = new URL(request.url).origin;
    fetchUrl = `${baseUrl}${blobUrl}`;
  }

  // Determine if it's a public resource (e.g., teacher guides in dalil-book or store samples)
  const isPublicResource = blobUrl.includes("/dalil-book/") || blobUrl.includes("/store-book/");

  let user = null;
  const standardSession = await getSession();

  if (standardSession) {
    user = standardSession.user;
  } else if (!isPublicResource) {
    // Only check for other auth methods if it's NOT a public resource
    // Check for book_session cookie (used by code access flow)
    const cookieStore = await cookies();
    const bookSessionToken = cookieStore.get("book_session")?.value;

    if (bookSessionToken) {
      try {
        const payload = verifyPdfAccessToken(bookSessionToken) as { email: string; userId?: string; codeId?: string };
        user = {
          id: payload.userId || null,
          codeId: payload.codeId || null,
          name: "Guest User",
          email: payload.email || "guest@example.com",
        };
      } catch (err) {
        console.error("Book session verification failed:", err);
      }
    }

    // Fallback to direct access code check if provided in URL
    if (!user && accessCode) {
      const crypto = await import("crypto");
      const codeHash = crypto
        .createHash("sha256")
        .update(accessCode)
        .digest("hex");

      const code = await prisma.accessCode.findUnique({
        where: { codeHash },
        include: { user: true },
      });

      if (code && !code.used && new Date(code.expiresAt) > new Date()) {
        user = code.user
          ? {
            id: code.userId,
            codeId: code.id,
            name: `${code.user.firstName} ${code.user.lastName}`,
            email: code.user.email,
          }
          : {
            id: null,
            codeId: code.id,
            name: "Access Code User",
            email: code.email || "guest@example.com",
          };
      }
    }
  }

  // Final auth check: either authenticated user or public resource
  if (!user && !isPublicResource) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch file from R2 or Local API
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      console.error(
        `Failed to fetch PDF: ${response.status} ${response.statusText}`,
      );
      return new NextResponse(`Error fetching resource: ${response.status}`, {
        status: response.status,
      });
    }

    const pdfBuffer = await response.arrayBuffer();

    // Determine user identity for logging
    const finalUserId = standardSession?.user?.id || (user as { id?: string | null })?.id || null;
    const finalCodeId = (user as { codeId?: string | null })?.codeId || null;

    // Apply watermark if requested
    // Check multiple sources for watermark flag to allow hiding "?watermark=true"
    const watermarkFromUrl = searchParams.get("watermark") === "true";
    const watermarkFromObfuscated = searchParams.get("w") === "1";
    const watermarkFromEncodedUrl = blobUrl.includes("watermark=true");

    // Also check token payload if it came from book_session
    let watermarkFromToken = false;
    const cookieStore = await cookies();
    const bookSessionToken = cookieStore.get("book_session")?.value;
    if (bookSessionToken) {
      try {
        const payload = verifyPdfAccessToken(bookSessionToken);
        if (payload.watermark === true) {
          watermarkFromToken = true;
        }
      } catch { }
    }

    const shouldWatermark = watermarkFromUrl || watermarkFromObfuscated || watermarkFromEncodedUrl || watermarkFromToken;

    const finalBuffer = shouldWatermark
      ? await watermarkPdf(pdfBuffer)
      : pdfBuffer;

    if (finalUserId || finalCodeId) {
      try {
        await prisma.accessLog.create({
          data: {
            userId: finalUserId,
            codeId: finalCodeId,
            ip: request.headers.get("x-forwarded-for") || "unknown",
          },
        });
      } catch (logError) {
        // Handle P2003 (Foreign Key Violation) or other logging errors gracefully
        if (typeof logError === 'object' && logError !== null && 'code' in logError && logError.code === 'P2003') {
          console.warn("PDF Access Logging: Foreign key violation (P2003). Likely a stale session or invalid reference.");
        } else {
          console.error("Failed to log access:", logError);
        }
      }
    }

    return new NextResponse(Buffer.from(finalBuffer as Uint8Array), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=\"document.pdf\"",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("PDF Stream Error:", error);
    return new NextResponse("Error streaming PDF", { status: 500 });
  }
}
