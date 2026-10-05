import { NextRequest, NextResponse } from "next/server";
import { verifyBookToken } from "@/utils/bookToken";
import { getSeriesFromPdfPath } from "@/utils/bookSeries";

/**
 * /api/book-reader
 *
 * Secured PDF proxy. Security layers:
 *  1. AES-256-GCM encrypted token      (path never visible in network tab)
 *  2. Token expires after 60 minutes   (limited replay window)
 *  3. Sec-Fetch-Dest: "empty"          (blocks direct browser navigation)
 *  4. Sec-Fetch-Site: "same-origin"    (blocks cross-origin embedding)
 *  5. Path allow-list                  (no open proxy)
 *  6. Series-specific OTP cookie       (code for one series ≠ access to another)
 *  7. Content-Type: octet-stream       (browser cannot show inline PDF)
 *
 * Guide books (/dalil-book/) → fetched via private S3 SDK.
 * Regular books (/book-office/) → fetched via public R2 CDN.
 */
export async function GET(request: NextRequest) {
  // ── Layer 3 & 4: Block direct browser navigation ──────────────────────────
  const fetchDest = request.headers.get("sec-fetch-dest");
  const fetchSite = request.headers.get("sec-fetch-site");

  const hasFetchHeaders = fetchDest !== null || fetchSite !== null;
  if (hasFetchHeaders) {
    const isLegitFetch = fetchDest === "empty" && fetchSite === "same-origin";
    if (!isLegitFetch) {
      console.warn(
        `[book-reader] Blocked: Sec-Fetch-Dest=${fetchDest} Sec-Fetch-Site=${fetchSite}`
      );
      return new NextResponse("Forbidden: direct URL access not allowed", { status: 403 });
    }
  }

  // ── Token extraction ───────────────────────────────────────────────────────
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) return new NextResponse("Missing token parameter", { status: 400 });

  // ── Layer 1 & 2: Decrypt and verify the token ─────────────────────────────
  let pdfPath: string;
  try {
    pdfPath = verifyBookToken(token);
  } catch (err) {
    console.warn("[book-reader] Invalid or expired token:", err);
    return new NextResponse("Forbidden: invalid or expired token", { status: 403 });
  }

  // ── Layer 5: Path allow-list ──────────────────────────────────────────────
  const isBookOffice = pdfPath.startsWith("/book-office/");
  const isDalilBook  = pdfPath.startsWith("/dalil-book/");
  if (!isBookOffice && !isDalilBook) {
    return new NextResponse("Forbidden: path not in allow-list", { status: 403 });
  }

  // ── Layer 6: Series-specific OTP session cookie ───────────────────────────
  const series    = getSeriesFromPdfPath(pdfPath);
  const otpCookie = request.cookies.get(`book_otp_session_${series}`)?.value;
  if (!otpCookie) {
    return new NextResponse(
      `Forbidden: Missing OTP session for series "${series}"`,
      { status: 403 }
    );
  }

  try {
    let responseBody: ReadableStream | null = null;
    let contentLength: string | null = null;

    if (isDalilBook) {
      // ── Guide/Teacher books: private S3/R2 SDK ────────────────────────────
      const { S3Client, GetObjectCommand } = await import("@aws-sdk/client-s3");
      const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId:     process.env.R2_ACCESS_KEY_ID     || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
      });
      const key    = pdfPath.replace(/^\//, "");
      const s3Res  = await s3.send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }));
      if (!s3Res.Body) return new NextResponse("Guide book not found", { status: 404 });
      responseBody  = s3Res.Body as ReadableStream;
      contentLength = s3Res.ContentLength?.toString() ?? null;

    } else {
      // ── Regular books: public R2 CDN ──────────────────────────────────────
      const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL || "https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev";
      const response  = await fetch(`${r2BaseUrl}${pdfPath}`);
      if (!response.ok) {
        console.error(`[book-reader] CDN fetch failed: ${response.status} — ${r2BaseUrl}${pdfPath}`);
        return new NextResponse(`Error fetching resource: ${response.status}`, { status: response.status });
      }
      responseBody  = response.body;
      contentLength = response.headers.get("content-length");
    }

    // ── Layer 7: Prevent inline rendering ─────────────────────────────────
    return new NextResponse(responseBody, {
      headers: {
        "Content-Type":           "application/octet-stream",
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        "Content-Disposition":    "attachment; filename=\"book.pdf\"",
        "Cache-Control":          "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });

  } catch (error) {
    console.error("[book-reader] Stream Error:", error);
    return new NextResponse("Error streaming PDF", { status: 500 });
  }
}
