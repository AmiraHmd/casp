"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import { encodeAssetUrl } from "@/utils/obfuscation";

// Import CSS for react-pdf
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface BookViewerProps {
  title: string;
  pdfUrl: string;
  readLabel: string;
  downloadLabel: string;
  closeLabel: string;
  color: string;
  borderColor: string;
  icon: string;
  isRTL: boolean;
  coverImage?: string;
  watermark?: boolean; // Ensure watermark prop is maintained
}

export default function BookViewer({
  title,
  pdfUrl: initialPdfUrl,
  readLabel,
  closeLabel,
  color,
  borderColor,
  icon,
  isRTL,
  coverImage,
  watermark = true,
}: BookViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [zoom, setZoom] = useState(1.0);
  const [imageError, setImageError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [hasError, setHasError] = useState(false);
  const [blobPdfUrl, setBlobPdfUrl] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const pdfBlobRef = useRef<string | null>(null);

  // Shared function to fetch assets securely with real progress tracking
  const fetchAsset = useCallback(
    async (
      url: string,
      setter: (blobUrl: string) => void,
      ref: React.MutableRefObject<string | null>,
    ) => {
      try {
        let fetchUrl = url;

        const isPdf = url.toLowerCase().endsWith(".pdf");
        const isApiPdf = url.includes("/api/pdf");

        if (isPdf || isApiPdf) {
          // Use the secure proxy endpoint with watermarking support
          if (isPdf) {
            // Append watermark=true to URL before encoding to hide it
            const separator = url.includes("?") ? "&" : "?";
            const urlWithWatermark = watermark ? `${url}${separator}watermark=true` : url;
            const encodedUrl = encodeAssetUrl(urlWithWatermark);
            fetchUrl = `/api/pdf?url=${encodedUrl}`;
          }

          if (watermark) {
            // Use obfuscated parameter for additional layer of detection
            fetchUrl += (fetchUrl.includes("?") ? "&" : "?") + "w=1";
          }

          // Try to get access code from URL or local storage
          const searchParams = new URLSearchParams(window.location.search);
          const urlCode = searchParams.get("token") || searchParams.get("code");
          const storedCode = localStorage.getItem("accessCode");
          const code = urlCode || storedCode;

          if (code) {
            fetchUrl += `&code=${code}`;
          }
        } else if (
          !url.startsWith("/") &&
          !url.includes(
            typeof window !== "undefined" ? window.location.origin : "",
          )
        ) {
          // Proxy images (only if external)
          const encoded = encodeAssetUrl(url);
          fetchUrl = `/api/assets?url=${encoded}`;
        }

        setLoadingProgress(0);

        // Start a smooth fake progress timer IMMEDIATELY before fetch
        // because the backend proxy might take a few seconds to return headers
        const fakeTimer = setInterval(() => {
          setLoadingProgress(p => { 
            if (p >= 100) { clearInterval(fakeTimer); return 100; } 
            return p + 1; 
          });
        }, 150);

        let response: Response;
        try {
          response = await fetch(fetchUrl);
          if (!response.ok) throw new Error("Failed to fetch asset");
        } catch (e) {
          clearInterval(fakeTimer);
          throw e;
        }

        const contentLength = response.headers.get("content-length");
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        const reader = response.body!.getReader();
        const chunks: Uint8Array[] = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          if (total > 0) {
            setLoadingProgress(prev => Math.max(prev, Math.min(Math.round((received / total) * 100), 99)));
          }
        }

        if (fakeTimer) clearInterval(fakeTimer);
        setLoadingProgress(100);

        const rawBuffer = new Uint8Array(received);
        let pos = 0;
        for (const chunk of chunks) { rawBuffer.set(chunk, pos); pos += chunk.length; }
        const blob = new Blob([rawBuffer], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        if (ref.current) URL.revokeObjectURL(ref.current);

        ref.current = blobUrl;
        setter(blobUrl);
      } catch (error) {
        console.error("Failed to load protected asset:", error);
        setHasError(true);
      }
    },
    [watermark],
  );

  // Asset protection: Fetch PDF only when the modal is opened
  useEffect(() => {
    if (isOpen && initialPdfUrl) {
      if (initialPdfUrl.toLowerCase().endsWith(".html")) {
        // Handle HTML flipbooks (no blob fetching required)
      } else if (!blobPdfUrl) {
        fetchAsset(initialPdfUrl, setBlobPdfUrl, pdfBlobRef);
      }
    }
  }, [isOpen, initialPdfUrl, blobPdfUrl, fetchAsset]);

  // Cleanup PDF blob on unmount
  useEffect(() => {
    return () => {
      if (pdfBlobRef.current) {
        URL.revokeObjectURL(pdfBlobRef.current);
        pdfBlobRef.current = null;
      }
    };
  }, []);

  // soft protection: handle context menu and key shortcuts
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        console.warn("Protected content: Inspection is disabled.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Resize handler for responsive PDF
  const updatePageWidth = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setPageWidth(Math.min(width * 0.95, 800));
    }
  }, []);

  // Update width on resize and open
  useEffect(() => {
    if (!isOpen) return;

    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);

    const resizeObserver = new ResizeObserver(updatePageWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updatePageWidth);
      resizeObserver.disconnect();
    };
  }, [isOpen, updatePageWidth]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(updatePageWidth, 100);
      setZoom(1.0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, updatePageWidth]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setHasError(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error);
    setHasError(true);
  }

  // Safelist for Tailwind JIT
  // hover:shadow-emerald-300 hover:shadow-teal-300 hover:shadow-indigo-300 hover:shadow-orange-300 hover:shadow-brand-gold-dark hover:shadow-amber-300 hover:shadow-red-300 hover:shadow-brand-gold hover:shadow-brand-navy hover:shadow-blue-300 hover:shadow-lime-300
  // dark:hover:shadow-emerald-800 dark:hover:shadow-teal-800 dark:hover:shadow-indigo-800 dark:hover:shadow-orange-800 dark:hover:shadow-brand-gold-dark dark:hover:shadow-amber-800 dark:hover:shadow-red-800 dark:hover:shadow-brand-gold dark:hover:shadow-brand-navy dark:hover:shadow-blue-800 dark:hover:shadow-lime-800
  const shadowClasses = borderColor.split(' ').map((c: string) => c.replace('border-', 'shadow-')).join(' ') + ' ' + borderColor.split(' ').map((c: string) => c.replace('border-', 'hover:shadow-')).join(' ');

  const isHtmlMode = initialPdfUrl && initialPdfUrl.toLowerCase().endsWith(".html");

  return (
    <>
      {/* Card Design */}
      <div
        className={`group relative bg-white dark:bg-brand-navy-dark p-8 md:p-10 rounded-4xl shadow-xl ${shadowClasses} border-2 ${borderColor} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center h-full`}
      >
        {/* Background Decoration */}
        <div className="absolute top-8 left-8 rtl:right-auto rtl:left-8 ltr:left-auto ltr:right-8 opacity-5 pointer-events-none">
          <Icon icon="solar:book-2-bold" className="text-6xl dark:text-white" />
        </div>

        {/* Icon Box or Cover Image */}
        {coverImage ? (
          <div className="w-full aspect-3/4 mb-4 relative z-10 group-hover:-translate-y-4 transition-transform duration-500 ease-out perspective-1000">
            <div
              onContextMenu={handleContextMenu}
              className="relative w-full h-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden transform group-hover:rotate-x-2 group-hover:scale-105 transition-all duration-500 ring-1 ring-black/5 dark:ring-white/10 group-hover:ring-4 group-hover:ring-brand-gold/20 dark:group-hover:ring-brand-sky/20 bg-gray-50 dark:bg-white/5"
            >
              {coverImage && !imageError ? (
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110 p-2"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/50 p-6 text-center">
                  <Icon
                    icon="solar:book-2-bold-duotone"
                    className="text-6xl text-brand-navy/20 dark:text-white/20 mb-3"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        ) : (
          <div
            className={`w-24 h-24 rounded-4xl flex items-center justify-center text-5xl shadow-inner-soft ${color} mb-6 relative z-10`}
          >
            <Icon icon={icon} />
          </div>
        )}
        {/* Title */}
        <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-4 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Action Button 2 */}
        <button
          onClick={() => setIsOpen(true)}
          className="group relative px-8 py-4 bg-brand-gold text-brand-navy-dark rounded-2xl font-bold shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            {readLabel}
            <Icon icon="solar:eye-bold" className={isRTL ? "rotate-0" : ""} />
          </span>
          {/* Shine Effect on Button */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
        </button>
      </div>

      {/* PDF Modal */}
      {isOpen &&
        createPortal(
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 ${isHtmlMode ? 'p-0' : 'p-4'}`}
          >
            <div
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className={isHtmlMode ? "w-full h-full flex flex-col relative animate-in zoom-in-95 duration-300 cursor-default bg-black" : "w-full max-w-6xl h-[95vh] bg-gray-100 dark:bg-[#0f172a] rounded-4xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300 ring-1 ring-white/10 cursor-default"}
            >

              {/* HTML Mode Close Button */}
              {isHtmlMode && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 left-4 z-50 flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all cursor-pointer border-2 border-white"
                >
                  <Icon icon="solar:close-circle-bold" className="text-3xl" />
                </button>
              )}

              {/* Header for Standard Modal */}
              {!isHtmlMode && (
                <div className="flex items-center justify-between p-4 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-white/5 z-20 shadow-sm shrink-0">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div
                      className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <Icon icon={icon} className="text-xl" />
                    </div>
                    <h3 className="font-bold text-lg text-brand-navy dark:text-white truncate">
                      {title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Close Button */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 transition-colors"
                    >
                      <Icon icon="solar:close-circle-bold" className="text-xl" />
                      <span className="hidden sm:inline font-bold text-sm">
                        {closeLabel}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Vertical Zoom Toolbar */}
              {!hasError && !isHtmlMode && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center bg-white/90 dark:bg-brand-navy-dark/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden min-w-14 animate-in slide-in-from-right-10 duration-500">
                  <button
                    onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2.0))}
                    className="w-full h-14 flex items-center justify-center hover:bg-brand-sky hover:text-white dark:hover:bg-brand-sky text-brand-navy dark:text-white transition-all duration-300 group/btn"
                    title="Zoom In"
                  >
                    <Icon
                      icon="solar:add-circle-bold-duotone"
                      className="text-3xl group-hover/btn:scale-110 transition-transform"
                    />
                  </button>

                  <div className="w-8 h-px bg-gray-200 dark:bg-white/10 mx-auto"></div>

                  <button
                    onClick={() => setZoom(1.0)}
                    className="w-full h-14 flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-brand-navy dark:text-white transition-all duration-300 group/btn"
                    title="Reset Zoom"
                  >
                    <Icon
                      icon="solar:refresh-linear"
                      className="text-2xl group-hover/btn:rotate-180 transition-transform duration-500"
                    />
                  </button>

                  <div className="w-8 h-px bg-gray-200 dark:bg-white/10 mx-auto"></div>

                  <button
                    onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}
                    className="w-full h-14 flex items-center justify-center hover:bg-brand-sky hover:text-white dark:hover:bg-brand-sky text-brand-navy dark:text-white transition-all duration-300 group/btn"
                    title="Zoom Out"
                  >
                    <Icon
                      icon="solar:minus-circle-bold-duotone"
                      className="text-3xl group-hover/btn:scale-110 transition-transform"
                    />
                  </button>

                  <div className="w-full py-2 bg-gray-50 dark:bg-white/5 text-center border-t border-gray-200 dark:border-white/10">
                    <span className="text-[10px] font-black text-brand-navy dark:text-gray-400">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                </div>
              )}

              {/* Content Area - Scrollable */}
              {isHtmlMode ? (
                <iframe
                  src={initialPdfUrl}
                  className="w-full h-full border-none"
                  title={title}
                  allowFullScreen
                />
              ) : (
                <div
                  ref={containerRef}
                  onContextMenu={handleContextMenu}
                  className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200/50 dark:bg-[#020617] relative p-4 md:p-8 flex flex-col items-center select-none custom-scrollbar"
                >
                  {/* Watermark Background */}
                  <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05]">
                    <Image
                      src="/images/logo/casp-logo.png"
                      alt=""
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>

                  {/* === PREMIUM LOADING OVERLAY === */}
                  {!blobPdfUrl && !hasError && (() => {
                    const radius = 54;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = circumference - (loadingProgress / 100) * circumference;
                    const locale = isRTL ? "ar" : "en";
                    const loadingText = locale === "ar" ? "جاري تحميل الكتاب" : "Loading the book";
                    const waitText = locale === "ar" ? "الرجاء الانتظار" : "Please wait";
                    return (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-20" style={{ background: "#eef2f6" }}>
                        {/* Background logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                          <Image src="/images/logo/casp-logo.png" alt="" width={500} height={500} className="object-contain opacity-[0.06]" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-8">
                          {/* Logo */}
                          <Image src="/images/logo/casp-logo.png" alt="CASP" width={100} height={100} className="object-contain drop-shadow-md" />
                          {/* Circular ring */}
                          <div className="relative w-40 h-40">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                              <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                              <circle cx="60" cy="60" r={radius} fill="none" stroke="url(#bv-grad)" strokeWidth="8"
                                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                                style={{ transition: "stroke-dashoffset 0.4s ease" }} />
                              <defs>
                                <linearGradient id="bv-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#3b82f6" />
                                  <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-4xl font-black text-blue-700 tabular-nums">
                                {loadingProgress}<span className="text-2xl">%</span>
                              </span>
                            </div>
                          </div>
                          {/* Title pill */}
                          <div className="flex items-center gap-2 bg-white rounded-full shadow px-5 py-2 border border-slate-100">
                            <Icon icon="solar:notebook-bold-duotone" className="text-xl text-orange-500" />
                            <span className="text-sm font-bold text-slate-700 truncate max-w-[220px]">{title}</span>
                          </div>
                          <p className="text-3xl font-black text-slate-800">{loadingText}</p>
                          <p className="text-base text-slate-500 font-medium animate-pulse">{waitText}</p>
                          {/* Linear bar */}
                          <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                              style={{ width: `${loadingProgress}%`, transition: "width 0.4s ease" }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Error State */}
                  {hasError && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6">
                        <Icon
                          icon="solar:shield-warning-bold-duotone"
                          className="text-5xl text-orange-500"
                        />
                      </div>
                      <h4 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">
                        Coming Soon!
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        This book is currently being prepared and will be
                        available shortly. Thank you for your patience.
                      </p>
                    </div>
                  )}

                  {/* Content Render PDF */}
                  {!hasError && blobPdfUrl && (
                    <Document
                      file={blobPdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      loading={
                        <div className="h-96 flex items-center justify-center text-gray-500">
                          Loading Book...
                        </div>
                      }
                      className="flex flex-col gap-6 md:gap-8 items-center w-full"
                    >
                      {/* Render all pages with lazy loading */}
                      {numPages &&
                        Array.from(new Array(numPages), (el, index) => (
                          <LazyPage
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={pageWidth * zoom}
                            loading={
                              <div className="flex items-center justify-center text-gray-400">
                                Loading Page {index + 1}...
                              </div>
                            }
                          />
                        ))}
                    </Document>
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-gutter: stable;
          direction: ltr !important;
        }
        
        .custom-scrollbar > * {
          direction: ${isRTL ? 'rtl' : 'ltr'};
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 32px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          border: 4px solid transparent;
          background-clip: content-box;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 100px;
          border: 6px solid transparent;
          background-clip: content-box;
          min-height: 80px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.6);
          background-clip: content-box;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
          background-clip: content-box;
        }
      `}</style>
    </>
  );
}

// Lazy loading component for PDF pages
interface LazyPageProps {
  pageNumber: number;
  width: number;
  loading: React.ReactNode;
}

function LazyPage({ pageNumber, width, loading }: LazyPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, just show it
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "400px 0px", // Load pages ahead of scroll
        threshold: 0,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // Standard A4 aspect ratio is 1.414. Using 1.4 as a safe bet for most books.
  const estimatedHeight = width * 1.4;

  return (
    <div
      ref={containerRef}
      className="relative shadow-lg md:shadow-2xl rounded-sm overflow-hidden bg-white"
      style={{
        width: width,
        minHeight: isVisible ? "auto" : estimatedHeight,
      }}
    >
      {isVisible ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          loading={
            <div
              style={{ width, height: estimatedHeight }}
              className="bg-white flex items-center justify-center text-gray-400 animate-pulse transition-opacity duration-300"
            >
              {loading}
            </div>
          }
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="bg-white block"
        />
      ) : (
        <div
          style={{ width, height: estimatedHeight }}
          className="bg-white flex items-center justify-center text-gray-400 animate-pulse"
        >
          {loading}
        </div>
      )}
    </div>
  );
}
