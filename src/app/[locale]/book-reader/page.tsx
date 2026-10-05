import DynamicBookReaderClient from "./DynamicBookReaderClient";
import { createBookToken } from "@/utils/bookToken";

export default async function BookReaderPage({
    searchParams,
    params,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ locale: string }>;
}) {
    const currentSearchParams = await searchParams;
    const bookId = currentSearchParams.bookId as string;
    const directPdfUrl = currentSearchParams.pdfUrl as string;
    const { locale } = await params;

    // Build the PDF path server-side for protected books via token.
    let pdfPath = "";
    
    // For universal/public books (like stories), use the provided URL directly.
    let publicPdfUrl = directPdfUrl || "";

    if (bookId && !directPdfUrl) {
        if (bookId.startsWith("guide-")) {
            const rawId = bookId.replace("guide-", "");
            if (rawId.startsWith("garden-")) {
                const key = rawId.replace("garden-", "");
                // Files on R2 use original key directly: gardenGuide-R.pdf, gardenGuide-P.pdf, etc.
                pdfPath = `/dalil-book/garden-guide/gardenGuide-${key}.pdf`;
            } else if (rawId.startsWith("mufid-")) {
                const key = rawId.replace("mufid-", "");
                pdfPath = `/dalil-book/mufid-guide/mufidGuide-${key}.pdf`;
            } else if (rawId.startsWith("wafi-")) {
                const key = rawId.replace("wafi-", "");
                pdfPath = `/dalil-book/wafi-guide/wafiGuide-${key}.pdf`;
            } else if (rawId.startsWith("happy-muslim-")) {
                const key = rawId.replace("happy-muslim-", "");
                // Files on R2 use original key directly: happyMuslim-guide-R.pdf, happyMuslim-guide-P.pdf, etc.
                pdfPath = `/dalil-book/happyMuslim-guide/happyMuslim-guide-${key}.pdf`;
            } else {
                // Generic fallback for other future series
                const parts = rawId.split("-");
                const series = parts[0];
                const key = parts[parts.length - 1]; // last part is key
                pdfPath = `/dalil-book/${series}-guide/${series}Guide-${key}.pdf`;
            }
        } else if (bookId.startsWith("garden-")) {
            const parts = bookId.split("-");
            const key = parts[1];
            const section = parts[2];
            const isExercises = section === "exercices";
            pdfPath = isExercises
                ? `/book-office/garden/exercices/${key}.pdf`
                : `/book-office/garden/assas/${key}.pdf`;
        } else if (bookId.startsWith("tareeq-al-muneer-")) {
            const key = bookId.replace("tareeq-al-muneer-", "");
            pdfPath = `/book-office/tarikmunirAr/${key}.pdf`;
        } else if (bookId.startsWith("happy-muslim-")) {
            const key = bookId.replace("happy-muslim-", "");
            pdfPath = `/book-office/happymuslimEn/${key}.pdf`;
        } else if (bookId.startsWith("mufid-")) {
            const key = bookId.replace("mufid-", "");
            pdfPath = `/book-office/mufid/${key}.pdf`;
        } else if (bookId.startsWith("shamil-")) {
            const key = bookId.replace("shamil-", "");
            pdfPath = `/book-office/shamil/${key}.pdf`;
        } else if (bookId.startsWith("wafi-")) {
            const parts = bookId.split("-");
            const sectionPrefix = parts[1];
            const key = parts[2] || parts[1];
            const sectionFolder = sectionPrefix === "ex" ? "exercices" : "assas";
            pdfPath = `/book-office/wafi/${sectionFolder}/${key}.pdf`;
        } else if (bookId.startsWith("qawaed-mobasta-")) {
            const key = bookId.replace("qawaed-mobasta-", "");
            pdfPath = `/book-office/qawaed/${key}.pdf`;
        } else if (bookId.startsWith("hidayah-fr-")) {
            const key = bookId.replace("hidayah-fr-", "");
            pdfPath = `/book-office/hidayaFr/${key}.pdf`;
        }
    }

    const title = (currentSearchParams.title as string) || "Book Viewer";

    // Encrypt the PDF path into a short-lived opaque token.
    // The browser only receives the token — the real /book-office/... path
    // is never present in any network request.
    const token = pdfPath ? createBookToken(pdfPath) : "";

    return (
        <div className="w-full h-screen bg-gray-900 overflow-hidden flex flex-col">
            <DynamicBookReaderClient token={token} pdfUrl={publicPdfUrl} title={title} locale={locale} />
        </div>
    );
}
