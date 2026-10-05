"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the actual client reader with SSR disabled to prevent react-pdf from crashing (DOMMatrix is not defined error)
const BookReaderClient = dynamic(() => import("./BookReaderClient"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-12 h-12 border-4 border-brand-sky/30 border-t-brand-sky rounded-full animate-spin mb-4"></div>
            <p>Initializing PDF Reader...</p>
        </div>
    )
});

interface BookReaderClientProps {
    token?: string;
    pdfUrl?: string;
    title: string;
    locale: string;
}

export default function DynamicBookReaderClient(props: BookReaderClientProps) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <BookReaderClient {...props} />;
}
