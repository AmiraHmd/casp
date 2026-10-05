import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";


const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    
    if (!path || path.length === 0) {
      return new NextResponse("Filename is required", { status: 400 });
    }

    const filePath = path.join("/");

    if (
      !process.env.R2_ACCOUNT_ID ||
      !process.env.R2_ACCESS_KEY_ID ||
      !process.env.R2_SECRET_ACCESS_KEY ||
      !process.env.R2_BUCKET_NAME
    ) {
      console.error("R2 credentials not fully configured");
      return new NextResponse("R2 credentials not fully configured", {
        status: 500,
      });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: filePath,
    });

    //
    const response = (await s3Client.send(command)) as GetObjectCommandOutput;

    if (!response.Body) {
      return new NextResponse("File not found", { status: 404 });
    }

    const revalidateTime = Number(process.env.REVALIDATE_TIME) || 86400;
    const cacheMaxAge = process.env.CACHE_MAX_AGE || "31536000";
    const contentType = response.ContentType || "application/pdf";

    return new Response(response.Body as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${cacheMaxAge}, s-maxage=${revalidateTime}, stale-while-revalidate=86400, immutable`,
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching file from R2:", error);
    
    if (error instanceof Error && error.name === "NoSuchKey") {
      return new NextResponse("File not found", { status: 404 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
