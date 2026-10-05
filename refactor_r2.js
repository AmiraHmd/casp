import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "src");
const oldDomain = "https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev";

function searchAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchAndReplace(fullPath);
    } else if (
      fullPath.endsWith(".ts") ||
      fullPath.endsWith(".tsx") ||
      fullPath.endsWith(".js")
    ) {
      let content = fs.readFileSync(fullPath, "utf-8");
      let modified = false;

      // Specifically for api/books route
      if (
        fullPath.endsWith("/api/books/[...path]/route.ts") ||
        fullPath.endsWith("\\api\\books\\[...path]\\route.ts")
      ) {
        const newCode = `import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const filePath = path.join("/");

    const r2BaseUrl = process.env.R2_PUBLIC_BASE_URL;
    if (!r2BaseUrl) {
      return new NextResponse("R2 Base URL not configured", { status: 500 });
    }
    const fileUrl = \`\${r2BaseUrl}/\${filePath}\`;

    const revalidateTime = Number(process.env.REVALIDATE_TIME) || 86400;
    const cacheMaxAge = process.env.CACHE_MAX_AGE || "31536000";

    const response = await fetch(fileUrl, {
      next: { revalidate: revalidateTime },
    });

    if (!response.ok) {
      return new NextResponse("File not found", { status: response.status });
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const buffer = await response.arrayBuffer();

    // Cache-Control: public, max-age=31536000, immutable
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": \`public, max-age=\${cacheMaxAge}, immutable\`,
      },
    });
  } catch (error) {
    console.error("Error fetching file from R2:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
`;
        fs.writeFileSync(fullPath, newCode, "utf-8");
        console.log("Modified API route: " + fullPath);
        continue;
      }

      // BookViewer.tsx client component
      if (fullPath.endsWith("BookViewer.tsx")) {
        // We know it has: const r2Domain = 'https://...';
        const originalContent = content;
        content = content.replace(
          `const r2Domain = 'https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev';`,
          `const r2Domain = process.env.NEXT_PUBLIC_R2_BASE_URL!;`,
        );
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, "utf-8");
          console.log("Modified BookViewer: " + fullPath);
        }
        continue;
      }

      // api/pdf/route.ts
      if (
        fullPath.endsWith("/api/pdf/route.ts") ||
        fullPath.endsWith("\\api\\pdf\\route.ts")
      ) {
        const originalContent = content;
        content = content.replace(
          /const r2BaseUrl = "https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev";/g,
          `const r2BaseUrl = process.env.R2_PUBLIC_BASE_URL;`,
        );
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, "utf-8");
          console.log("Modified API PDF route: " + fullPath);
        }
        continue;
      }

      if (content.includes(oldDomain)) {
        // If it's a page in /store/ or /teacher-guide/, we need to inject the env variables and fix the URLs
        if (
          (fullPath.includes("/store/") ||
            fullPath.includes("\\store\\") ||
            fullPath.includes("/teacher-guide/") ||
            fullPath.includes("\\teacher-guide\\")) &&
          fullPath.endsWith("page.tsx")
        ) {
          // We need to inject const baseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL!; inside the component if absent.
          // But actually, we can just replace the old domain with \${process.env.NEXT_PUBLIC_R2_BASE_URL}
          // since it's a server component (many store pages are async Server Components).
          // Or, using it dynamically.
          // Let's replace 'https://pub-....r2.dev' with \${process.env.NEXT_PUBLIC_R2_BASE_URL} for images and /api/books for PDFs.

          // The URLs look like:
          // bookCover: \`https://pub-.../\${path}\`
          // pdfUrl: \`https://pub-.../\${path}\`

          // We'll replace bookCover: \`https://pub-... with bookCover: \`\${process.env.NEXT_PUBLIC_R2_BASE_URL}
          // We'll replace pdfUrl: \`https://pub-... with pdfUrl: \`/api/books

          // regex: /https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev([^`'"]*\.png|jpg|jpeg|svg|webp)/g
          // to: \${process.env.NEXT_PUBLIC_R2_BASE_URL}$1

          // regex: /https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev([^`'"]*\.pdf)/g
          // to: /api/books$1

          // Generic replace:
          content = content.replace(
            /bookCover:\s*`https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev\//g,
            "bookCover: `${process.env.NEXT_PUBLIC_R2_BASE_URL}/",
          );
          content = content.replace(
            /bookCover:\s*'https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev\//g,
            "bookCover: `${process.env.NEXT_PUBLIC_R2_BASE_URL}/",
          );
          content = content.replace(
            /bookCover:\s*"https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev\//g,
            "bookCover: `${process.env.NEXT_PUBLIC_R2_BASE_URL}/",
          );

          content = content.replace(
            /pdfUrl:\s*`https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev\//g,
            "pdfUrl: `/api/books/",
          );
          content = content.replace(
            /pdfUrl:\s*'https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev\//g,
            "pdfUrl: `/api/books/",
          );
          content = content.replace(
            /pdfUrl:\s*"https:\/\/pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev\//g,
            "pdfUrl: `/api/books/",
          );

          // Other random usages in the file if any?
          content = content.replace(
            new RegExp(oldDomain, "g"),
            "${process.env.NEXT_PUBLIC_R2_BASE_URL}",
          );

          fs.writeFileSync(fullPath, content, "utf-8");
          console.log("Modified store page: " + fullPath);
          modified = true;
        } else if (fullPath.includes("VideoSection.tsx")) {
          content = content.replace(
            new RegExp(oldDomain, "g"),
            "${process.env.NEXT_PUBLIC_R2_BASE_URL}",
          );
          fs.writeFileSync(fullPath, content, "utf-8");
          console.log("Modified VideoSection: " + fullPath);
        } else {
          // Just replace straight up if it's anywhere else
          content = content.replace(
            new RegExp(oldDomain, "g"),
            "${process.env.NEXT_PUBLIC_R2_BASE_URL}",
          );
          fs.writeFileSync(fullPath, content, "utf-8");
          console.log("Modified other file: " + fullPath);
        }
      }
    }
  }
}
searchAndReplace(srcDir);
// Let's also update next.config.ts
const nextConfigPath = path.join(__dirname, "next.config.ts");
if (fs.existsSync(nextConfigPath)) {
  let cfg = fs.readFileSync(nextConfigPath, "utf-8");
  cfg = cfg.replace(
    /'pub-2e481fdf58914ed08e036eeb987a1a89\.r2\.dev'/g,
    `process.env.NEXT_PUBLIC_R2_BASE_URL ? new URL(process.env.NEXT_PUBLIC_R2_BASE_URL).hostname : 'pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev'`,
  );
  fs.writeFileSync(nextConfigPath, cfg, "utf-8");
  console.log("Modified next.config.ts");
}
