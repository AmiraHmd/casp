"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface BookReaderClientProps {
    token?: string;
    pdfUrl?: string;
    title: string;
    locale: string;
}

type Theme = "normal" | "sepia" | "night";

const i18n: Record<string, Record<string, string>> = {
    ar: { back: "رجوع", contents: "المحتويات", spread: "صفحة", pages: "الصفحات", of: "من", page: "الصفحة", close: "إغلاق", loading: "جاري تحميل الكتاب", wait: "الرجاء الانتظار" },
    fr: { back: "Retour", contents: "Sommaire", spread: "Planche", pages: "Pages", of: "de", page: "Page", close: "Fermer", loading: "Chargement du livre", wait: "Veuillez patienter" },
    en: { back: "Back", contents: "Contents", spread: "Spread", pages: "Pages", of: "of", page: "Page", close: "Close", loading: "Loading the book", wait: "Please wait" },
};

export default function BookReaderClient({ token, pdfUrl, title, locale }: BookReaderClientProps) {
    const t = (key: string) => (i18n[locale] ?? i18n["ar"])[key] ?? i18n["en"][key];

    const [numPages, setNumPages] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [blobPdfUrl, setBlobPdfUrl] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
    const [zoom, setZoom] = useState(1.0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useState<Theme>("normal");
    const [pageWidth, setPageWidth] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);

    const stageRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const pdfBlobRef = useRef<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isRTL = locale === "ar";

    // ── Mobile detection ───────────────────────────────────────────────────────
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // ── Mobile: current single page index ─────────────────────────────────────
    const [mobilePage, setMobilePage] = useState(1);
    const goMobilePrev = () => setMobilePage(p => Math.max(p - 1, 1));
    const goMobileNext = () => setMobilePage(p => Math.min(p + 1, numPages ?? 1));
    const canMobilePrev = mobilePage > 1;
    const canMobileNext = mobilePage < (numPages ?? 1);

    // ── Mobile swipe ──────────────────────────────────────────────────────────
    const swipeStart = useRef<{ x: number; y: number } | null>(null);
    const onMobileTouchStart = (e: React.TouchEvent) => {
        swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onMobileTouchEnd = (e: React.TouchEvent) => {
        if (!swipeStart.current) return;
        const dx = e.changedTouches[0].clientX - swipeStart.current.x;
        const dy = e.changedTouches[0].clientY - swipeStart.current.y;
        swipeStart.current = null;
        if (Math.abs(dx) < Math.abs(dy) * 0.8 || Math.abs(dx) < 40) return; // mostly vertical = scroll, ignore
        if (dx > 0) { isRTL ? goMobileNext() : goMobilePrev(); }
        else { isRTL ? goMobilePrev() : goMobileNext(); }
    };


    // ── Fetch PDF ─────────────────────────────────────────────────────────────
    const fetchPdf = useCallback(async (tk?: string, fileUrl?: string) => {
        if (!tk && !fileUrl) return;
        try {
            const endpoint = fileUrl ? fileUrl : `/api/book-reader?token=${encodeURIComponent(tk!)}`;
            const res = await fetch(endpoint);
            if (!res.ok) throw new Error("fetch failed");

            const contentLength = res.headers.get("content-length");
            const total = contentLength ? parseInt(contentLength, 10) : 0;
            const reader = res.body!.getReader();
            const chunks: Uint8Array[] = [];
            let received = 0;

            // If no content-length, simulate with a smooth timer
            let fakeTimer: ReturnType<typeof setInterval> | null = null;
            if (!total) {
                fakeTimer = setInterval(() => {
                    setLoadingProgress(p => {
                        if (p >= 90) { clearInterval(fakeTimer!); return 90; }
                        return p + 2;
                    });
                }, 300);
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                received += value.length;
                if (total > 0) {
                    // Always move forward, never backward
                    setLoadingProgress(prev =>
                        Math.max(prev, Math.min(Math.round((received / total) * 100), 99))
                    );
                }
            }

            if (fakeTimer) clearInterval(fakeTimer);
            setLoadingProgress(100);

            const rawBuffer = new Uint8Array(received);
            let pos = 0;
            for (const chunk of chunks) { rawBuffer.set(chunk, pos); pos += chunk.length; }
            const blob = new Blob([rawBuffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            if (pdfBlobRef.current) URL.revokeObjectURL(pdfBlobRef.current);
            pdfBlobRef.current = url;
            setBlobPdfUrl(url);
        } catch {
            setHasError(true);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if ((token || pdfUrl) && !blobPdfUrl) fetchPdf(token, pdfUrl);
        else if (!token && !pdfUrl) { setHasError(true); setIsLoading(false); }
    }, [token, pdfUrl, blobPdfUrl, fetchPdf]);

    useEffect(() => () => { if (pdfBlobRef.current) URL.revokeObjectURL(pdfBlobRef.current); }, []);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => { setIsMounted(true); }, []);

    // ── Spreads ───────────────────────────────────────────────────────────────
    const spreads = useMemo<(number | null)[][]>(() => {
        if (!numPages) return [];
        const result: (number | null)[][] = [[1]];
        for (let i = 2; i <= numPages; i += 2) result.push([i, i + 1 <= numPages ? i + 1 : null]);
        return result;
    }, [numPages]);

    const currentSpread = spreads[currentSpreadIndex] ?? [];

    const goPrev = () => setCurrentSpreadIndex(p => Math.max(p - 1, 0));
    const goNext = () => setCurrentSpreadIndex(p => Math.min(p + 1, spreads.length - 1));
    const canPrev = currentSpreadIndex > 0;
    const canNext = currentSpreadIndex < spreads.length - 1;

    // On Desktop, currentSpreadIndex indexes the `spreads` array.
    // On Mobile, currentSpreadIndex indexes the individual physical page (0 to numPages - 1).
    const firstPhysical = isMobile ? currentSpreadIndex + 1 : (currentSpread[0] ?? 1);
    const lastPhysical = isMobile ? currentSpreadIndex + 1 : (currentSpread.filter(Boolean).slice(-1)[0] ?? firstPhysical);

    const isStory = !!pdfUrl;

    // Convert physical pages (1-based) to logical pages according to book type
    const getLogicalPage = (p: number) => isStory ? Math.max(0, p - 1) : p;
    const firstLogical = getLogicalPage(firstPhysical);
    const lastLogical = getLogicalPage(lastPhysical);
    const totalLogical = numPages ? (isStory ? Math.max(0, numPages - 1) : numPages) : 0;

    const pageLabel = firstLogical === lastLogical
        ? `${t("page")} ${firstLogical} ${t("of")} ${totalLogical}`
        : `${t("page")} ${firstLogical}–${lastLogical} ${t("of")} ${totalLogical}`;

    // ── Responsive sizing ─────────────────────────────────────────────────────
    const calcPageWidth = useCallback(() => {
        if (!stageRef.current) return;
        const W = stageRef.current.clientWidth;
        const H = stageRef.current.clientHeight;
        if (isMobile) {
            // Mobile: fill the stage width, limited by height
            const maxByH = (H - 60) / 1.41; // leave room for bottom bar
            setPageWidth(Math.max(80, Math.min(W - 8, maxByH)));
            return;
        }
        const isTwoPage = currentSpread.filter(Boolean).length === 2;
        const maxW = isTwoPage ? (W - 200) / 2 : W - 180;
        const maxH = H - 40;
        const maxByH = maxH / 1.41;
        setPageWidth(Math.max(100, Math.min(maxW, maxByH)));
    }, [currentSpread, isMobile]);

    useEffect(() => {
        calcPageWidth();
        const obs = new ResizeObserver(calcPageWidth);
        if (stageRef.current) obs.observe(stageRef.current);
        return () => obs.disconnect();
    }, [calcPageWidth]);

    // ── Keyboard ──────────────────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (isMobile) return; // keyboard nav only on desktop
            if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "ArrowRight") goNext();
            else if (e.key === "Escape") setMenuOpen(false);
            else if (e.key === "F12" || (e.ctrlKey && e.shiftKey && "IJ".includes(e.key)) || (e.ctrlKey && e.key === "u"))
                e.preventDefault();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    });

    // ── Drag-to-pan handlers ─────────────────────────────────────────────────
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsPanning(true);
        panStart.current = {
            x: e.clientX,
            y: e.clientY,
            scrollLeft: scrollRef.current?.scrollLeft ?? 0,
            scrollTop: scrollRef.current?.scrollTop ?? 0,
        };
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isPanning || !panStart.current || !scrollRef.current) return;
        e.preventDefault();
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        scrollRef.current.scrollLeft = panStart.current.scrollLeft - dx;
        scrollRef.current.scrollTop = panStart.current.scrollTop - dy;
    };

    const onMouseUp = () => {
        setIsPanning(false);
        panStart.current = null;
    };

    const touchStart = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            scrollLeft: scrollRef.current.scrollLeft,
            scrollTop: scrollRef.current.scrollTop,
        };
    };
    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchStart.current || !scrollRef.current) return;
        const dx = e.touches[0].clientX - touchStart.current.x;
        const dy = e.touches[0].clientY - touchStart.current.y;
        scrollRef.current.scrollLeft = touchStart.current.scrollLeft - dx;
        scrollRef.current.scrollTop = touchStart.current.scrollTop - dy;
    };

    function onLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const themeFilter =
        theme === "sepia" ? "sepia(0.8) brightness(0.97)" :
            theme === "night" ? "invert(1) hue-rotate(180deg)" : "none";

    if (!isMounted) return null;

    // Show the loading overlay only until the blob URL is ready.
    // Once blobPdfUrl is set, react-pdf takes over and renders from there.
    if (!blobPdfUrl) {
        const radius = 54;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (loadingProgress / 100) * circumference;

        return createPortal(
            <div
                className="fixed inset-0 z-[9999999] flex items-center justify-center"
                style={{ background: "#eef2f6", direction: isRTL ? "rtl" : "ltr" }}
            >
                {/* Background logo watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <Image
                        src="/images/logo/casp-logo.png"
                        alt=""
                        width={500}
                        height={500}
                        className="object-contain opacity-[0.06]"
                    />
                </div>
                <div className="flex flex-col items-center gap-8">
                    {/* Logo */}
                    <Image
                        src="/images/logo/casp-logo.png"
                        alt="CASP Logo"
                        width={100}
                        height={100}
                        className="object-contain drop-shadow-md"
                    />
                    {/* Circular progress ring */}
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                            {/* Background track */}
                            <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                            {/* Animated foreground arc */}
                            <circle
                                cx="60" cy="60" r={radius}
                                fill="none"
                                stroke="url(#progress-gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                style={{ transition: "stroke-dashoffset 0.4s ease" }}
                            />
                            <defs>
                                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Percentage counter in the middle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-black text-blue-700 tabular-nums">
                                {loadingProgress}
                                <span className="text-2xl">%</span>
                            </span>
                        </div>
                    </div>

                    {/* Book icon + title */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="flex items-center gap-2 bg-white rounded-full shadow px-5 py-2 border border-slate-100">
                            <Icon icon="solar:notebook-bold-duotone" className="text-xl text-orange-500" />
                            <span className="text-sm font-bold text-slate-700 truncate max-w-[220px]">{title}</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800">{t("loading")}</p>
                        <p className="text-base text-slate-500 font-medium animate-pulse">{t("wait")}</p>
                    </div>

                    {/* Linear progress bar */}
                    <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            style={{ width: `${loadingProgress}%`, transition: "width 0.4s ease" }}
                        />
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div
            className="fixed inset-0 flex flex-col z-[999999] font-sans"
            style={{ background: "#eef2f6", direction: isRTL ? "rtl" : "ltr" }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Background logo watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <Image
                    src="/images/logo/casp-logo.png"
                    alt=""
                    width={600}
                    height={600}
                    className="object-contain opacity-[0.05]"
                />
            </div>
            {/* ── TOP TOOLBAR ──────────────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 z-50">

                {/* RIGHT (Visually in RTL): Zoom */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white rounded-full shadow-sm px-1.5 py-1.5 h-10" dir="ltr">
                        <button onClick={() => setZoom(z => Math.min(z + 0.1, 4.0))}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors text-xl font-bold">
                            &#x2B;
                        </button>
                        <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors text-xl font-bold">
                            &#x2212;
                        </button>
                        <div className="w-px h-5 bg-slate-200 mx-1" />
                        <div className="flex items-center px-3 cursor-pointer hover:bg-gray-50 rounded-full transition-colors h-full flex-row-reverse gap-1">
                            <span className="text-sm font-bold text-slate-700 tabular-nums min-w-[3rem] text-center">
                                {Math.round(zoom * 100)}%
                            </span>
                            <Icon icon="solar:alt-arrow-down-linear" className="text-sm text-slate-400" />
                        </div>
                    </div>
                </div>

                {/* CENTER: Page Indicator / Navigation */}
                <div className="hidden md:flex items-center bg-white rounded-full shadow-sm p-1.5 border border-slate-100">
                    <button
                        onClick={goPrev}
                        disabled={!canPrev}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 transition-colors"
                    >
                        <Icon icon="solar:alt-arrow-right-linear" className="text-lg" />
                    </button>

                    <div className="flex items-center gap-2 px-4 h-full border-x border-slate-100">
                        <Icon icon="solar:book-bold" className="text-blue-600 text-lg" />
                        <span className="text-sm font-bold text-slate-700">{numPages ? pageLabel : "…"}</span>
                    </div>

                    <button
                        onClick={goNext}
                        disabled={!canNext}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 transition-colors"
                    >
                        <Icon icon="solar:alt-arrow-left-linear" className="text-lg" />
                    </button>
                </div>

                {/* RIGHT: Hamburger, Title, Back */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-700 hover:bg-gray-50 transition-colors shrink-0"
                        >
                            <Icon icon={menuOpen ? "solar:close-circle-bold" : "solar:hamburger-menu-bold"} className="text-xl" />
                        </button>

                        {menuOpen && (
                            <div
                                className="absolute top-12 right-0 w-68 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] flex flex-col overflow-hidden"
                                style={{ maxHeight: "70vh" }}
                            >
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="solar:list-bold-duotone" className="text-blue-700 text-lg" />
                                        <span className="font-bold text-slate-800 text-sm">
                                            {t("contents")} — {numPages ?? "…"} {t("pages")}
                                        </span>
                                    </div>
                                    <button onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-slate-700">
                                        <Icon icon="solar:close-square-linear" className="text-xl" />
                                    </button>
                                </div>
                                <div className="overflow-y-auto flex-1">
                                    {isMobile ? (
                                        // On mobile, show every single page and link to currentSpreadIndex directly
                                        Array.from({ length: numPages || 0 }).map((_, idx) => {
                                            const isActive = idx === currentSpreadIndex;
                                            const label = idx === 0
                                                ? locale === "ar" ? `الغلاف${isStory ? " (0)" : ""}` : locale === "fr" ? `Couverture${isStory ? " (0)" : ""}` : `Cover${isStory ? " (0)" : ""}`
                                                : `${t("page")} ${isStory ? idx : idx + 1}`;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => { setCurrentSpreadIndex(idx); setMenuOpen(false); }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-slate-50 last:border-0 ${isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-600 hover:bg-slate-50 font-semibold"}`}
                                                >
                                                    <span>{label}</span>
                                                    {isActive && <Icon icon="solar:eye-bold" className="ml-auto text-blue-600 text-sm" />}
                                                </button>
                                            );
                                        })
                                    ) : (
                                        // On desktop, show spreads and link to spread index
                                        spreads.map((spread, idx) => {
                                            const isActive = idx === currentSpreadIndex;
                                            const p = spread.filter(Boolean);
                                            const logicalFirst = getLogicalPage(p[0]!);
                                            const logicalLast = getLogicalPage(p[p.length - 1]!);
                                            
                                            const label = idx === 0
                                                ? locale === "ar" ? `الغلاف${isStory ? " (0)" : ""}` : locale === "fr" ? `Couverture${isStory ? " (0)" : ""}` : `Cover${isStory ? " (0)" : ""}`
                                                : `${t("page")} ${logicalFirst}${logicalFirst !== logicalLast ? `–${logicalLast}` : ""}`;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => { setCurrentSpreadIndex(idx); setMenuOpen(false); }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-slate-50 last:border-0 ${isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-600 hover:bg-slate-50 font-semibold"}`}
                                                >
                                                    <span>{label}</span>
                                                    {isActive && <Icon icon="solar:eye-bold" className="ml-auto text-blue-600 text-sm" />}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5 bg-white rounded-full shadow-sm px-5 py-2 shrink-0">
                        <span className="text-sm font-bold text-slate-800 truncate max-w-[160px] hidden sm:inline">{title}</span>
                        <Icon icon="solar:notebook-bold-duotone" className="text-brand-orange text-lg shrink-0" />
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-full shadow-sm transition-all shrink-0"
                        title={t("back")}
                    >{t("back")}
                        <Icon icon="solar:alt-arrow-left-bold" className="text-base" />

                    </button>
                </div>
            </div>

            {/* ── MAIN STAGE ───────────────────────────────────────────────────── */}
            <div ref={stageRef} className="flex-1 flex items-center justify-center relative overflow-hidden pb-2">

                {/* ── DESKTOP: Side navigation arrows ── */}
                {!isMobile && (
                    <button
                        onClick={goPrev}
                        disabled={!canPrev}
                        className="shrink-0 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-blue-900 hover:bg-blue-50 hover:shadow-2xl transition-all disabled:opacity-25 z-30 mx-4 md:mx-8 group border border-slate-100"
                        aria-label="Previous spread"
                    >
                        <Icon icon="solar:alt-arrow-right-bold" className="text-2xl group-hover:-translate-x-1 transition-transform" />
                    </button>
                )}

                {/* Scrollable book viewport (DESKTOP only) */}
                {!isMobile && (
                    <div
                        ref={scrollRef}
                        className="flex-1 h-full overflow-auto block"
                        style={{
                            cursor: isPanning ? "grabbing" : "grab",
                            scrollbarWidth: "none"
                        }}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                    >
                        <div
                            style={{
                                display: "flex",
                                minWidth: "100%",
                                minHeight: "100%",
                                width: "max-content",
                                height: "max-content",
                                padding: "1rem 4rem 4rem 4rem", // Minimal top padding, thick sides/bottom 
                            }}
                        >
                            <div style={{ margin: "0 auto auto auto" }} className="flex items-center justify-center relative pb-16">
                                {isLoading && (
                                    <div className="flex items-center justify-center" style={{ width: pageWidth * 2 || 600, height: 400 }}>
                                        <div className="w-14 h-14 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                                    </div>
                                )}

                                {hasError && !isLoading && (
                                    <div className="flex flex-col items-center gap-4 text-slate-500 p-16">
                                        <Icon icon="solar:shield-warning-bold-duotone" className="text-6xl text-red-500" />
                                        <p className="font-bold">الكتاب غير متاح حالياً</p>
                                    </div>
                                )}

                                {blobPdfUrl && (
                                    <Document file={blobPdfUrl} onLoadSuccess={onLoadSuccess} loading={null} className="flex">
                                        <div
                                            className="flex rounded-[8px] overflow-hidden select-none"
                                            style={{
                                                filter: themeFilter,
                                                boxShadow: "0 10px 40px -10px rgba(20,40,70,0.3), 0 2px 10px rgba(20,40,70,0.1), inset 0 0 0 1px rgba(0,0,0,0.05)",
                                                transition: "filter 0.3s ease",
                                            }}
                                            draggable={false}
                                        >
                                            {currentSpread[0] != null && (
                                                <BookPage
                                                    pageNumber={currentSpread[0]}
                                                    width={pageWidth * zoom}
                                                    side={currentSpread[1] ? "left" : "single"}
                                                />
                                            )}
                                            {currentSpread[1] != null && (
                                                <BookPage
                                                    pageNumber={currentSpread[1]}
                                                    width={pageWidth * zoom}
                                                    side="right"
                                                />
                                            )}
                                        </div>
                                    </Document>
                                )}
                            </div>
                        </div>
                    </div>
                )} {/* end !isMobile desktop viewport */}

                {/* ── MOBILE: swipe viewport ── */}
                {isMobile && blobPdfUrl && (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        onTouchStart={onMobileTouchStart}
                        onTouchEnd={onMobileTouchEnd}
                    >
                        {/* Overlay tap zones — prev / next */}
                        <button
                            onClick={isRTL ? goMobileNext : goMobilePrev}
                            disabled={isRTL ? !canMobileNext : !canMobilePrev}
                            className="absolute left-0 inset-y-0 w-12 z-30 flex items-center justify-start ps-1 disabled:opacity-0 transition-opacity group"
                            aria-label="Previous page"
                        >
                            <span className="w-7 h-12 bg-white/70 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-slate-200 group-hover:bg-white transition-all">
                                <Icon icon="solar:alt-arrow-right-bold" className="text-sm text-blue-700" />
                            </span>
                        </button>

                        <Document file={blobPdfUrl} onLoadSuccess={onLoadSuccess} loading={null}>
                            <div
                                className="rounded-lg overflow-hidden select-none"
                                style={{
                                    filter: themeFilter,
                                    boxShadow: "0 8px 32px -8px rgba(20,40,70,0.35), 0 2px 8px rgba(20,40,70,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)",
                                    transition: "filter 0.3s ease",
                                }}
                                draggable={false}
                            >
                                <BookPage
                                    pageNumber={mobilePage}
                                    width={pageWidth * zoom}
                                    side="single"
                                />
                            </div>
                        </Document>

                        <button
                            onClick={isRTL ? goMobilePrev : goMobileNext}
                            disabled={isRTL ? !canMobilePrev : !canMobileNext}
                            className="absolute right-0 inset-y-0 w-12 z-30 flex items-center justify-end pe-1 disabled:opacity-0 transition-opacity group"
                            aria-label="Next page"
                        >
                            <span className="w-7 h-12 bg-white/70 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-slate-200 group-hover:bg-white transition-all">
                                <Icon icon="solar:alt-arrow-left-bold" className="text-sm text-blue-700" />
                            </span>
                        </button>
                    </div>
                )}


                {/* ── DESKTOP: Right nav arrow ── */}
                {!isMobile && (
                    <button
                        onClick={goNext}
                        disabled={!canNext}
                        className="shrink-0 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-blue-900 hover:bg-blue-50 hover:shadow-2xl transition-all disabled:opacity-25 z-30 mx-4 md:mx-8 group border border-slate-100"
                        aria-label="Next spread"
                    >
                        <Icon icon="solar:alt-arrow-left-bold" className="text-2xl group-hover:translate-x-1 transition-transform" />
                    </button>
                )}

                {/* FLOATING ZOOM CONTROLS (Desktop only) */}
                <div className="absolute right-10 top-1 flex-col gap-4 z-40 hidden md:flex">
                    <button onClick={() => setZoom(z => Math.min(z + 0.1, 4.0))}
                        className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-900 border border-slate-100 hover:bg-blue-50 hover:scale-110 transition-all font-light text-4xl pb-1"
                    >
                        &#x2B;
                    </button>
                    <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))}
                        className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-900 border border-slate-100 hover:bg-blue-50 hover:scale-110 transition-all font-light text-5xl pb-1"
                    >
                        &#x2212;
                    </button>
                </div>

                {/* ── MOBILE bottom page indicator bar ── */}
                {isMobile && numPages && (
                    <div className="absolute bottom-0 left-0 right-0 z-40 flex flex-col items-center gap-1 pb-2 pointer-events-none">
                        {/* Thin progress bar */}
                        <div className="w-full h-1 bg-slate-200">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                                style={{ width: `${(mobilePage / numPages) * 100}%` }}
                            />
                        </div>
                        {/* Page label */}
                        <span className="text-[11px] font-bold text-slate-500 tracking-wide">
                            {t("page")} {mobilePage} {t("of")} {numPages}
                        </span>
                    </div>
                )}
            </div>
            {(menuOpen || langMenuOpen) && (
                <div className="fixed inset-0 z-40" onClick={() => { setMenuOpen(false); setLangMenuOpen(false); }} />
            )}
        </div>,
        document.body
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// BookPage sub-component
// ─────────────────────────────────────────────────────────────────────────────
interface BookPageProps { pageNumber: number; width: number; side: "left" | "right" | "single"; }

function BookPage({ pageNumber, width, side }: BookPageProps) {
    return (
        <div
            className="relative overflow-hidden bg-white"
            style={{ borderLeft: side === "right" ? "1px solid rgba(0,0,0,0.06)" : undefined }}
        >
            <Page
                pageNumber={pageNumber}
                width={Math.max(80, width)}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="block"
            />
            {/* Spine shadow */}
            {side === "left" && (
                <div className="absolute inset-y-0 right-0 w-16 pointer-events-none z-20"
                    style={{ background: "linear-gradient(to left, rgba(20,40,70,0.12), transparent)" }} />
            )}
            {side === "right" && (
                <div className="absolute inset-y-0 left-0 w-16 pointer-events-none z-20"
                    style={{ background: "linear-gradient(to right, rgba(20,40,70,0.12), transparent)" }} />
            )}
            {side === "single" && (
                <div className="absolute inset-0 pointer-events-none z-20"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent 50%, rgba(20,40,70,0.06))" }} />
            )}
            {/* Watermark */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cg transform='rotate(-38,110,110)'%3E%3Ctext x='50%25' y='44%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial,sans-serif' font-size='16' font-weight='bold' fill='%23000' opacity='0.05'%3ECASP%3C/text%3E%3Ctext x='50%25' y='57%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial,sans-serif' font-size='10' fill='%23000' opacity='0.05'%3Ewww.casp.ca%3C/text%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "220px 220px",
                }}
            />
        </div>
    );
}
